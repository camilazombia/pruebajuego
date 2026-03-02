import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../../app/providers/AudioProvider';
import styles from './MiniGames.module.css';

export type MiniGameWord = {
	english: string;
	spanish: string;
	emoji?: string;
};

interface DragAndDropWordsProps {
	words: MiniGameWord[];
	onComplete: () => void;
}

export const DragAndDropWords: React.FC<DragAndDropWordsProps> = ({ words, onComplete }) => {
	const { playWord, playFeedback, playNarrative } = useAudio();
	const [matches, setMatches] = useState<Record<string, string>>({});
	const [completed, setCompleted] = useState(false);
	const initRef = useRef(false);

	const shuffledSpanish = useMemo(
		() => words.map((w) => ({ english: w.english, spanish: w.spanish, emoji: w.emoji }))
			.sort(() => Math.random() - 0.5),
		[words],
	);

	useEffect(() => {
		if (initRef.current) return;
		initRef.current = true;
		playNarrative('/assets/audio/voices/instructions/drag_and_drop.mp3').catch(() => {});
	}, []);

	const handleDrop = (targetEnglish: string, draggedEnglish: string) => {
		const draggedWord = words.find((w) => w.english === draggedEnglish);
		const targetWord = words.find((w) => w.english === targetEnglish);
		if (!draggedWord || !targetWord) return;

		const isCorrect = draggedWord.spanish === targetWord.spanish
			&& draggedEnglish === targetEnglish;

		if (isCorrect) {
			playFeedback('correct');
			setTimeout(() => playWord(targetEnglish), 300);
		} else {
			playFeedback('wrong');
		}

		setMatches((prev) => {
			if (!isCorrect) return prev;
			const next = { ...prev, [targetEnglish]: draggedEnglish };
			const allMatched = words.every((w) => next[w.english]);
			if (allMatched && !completed) {
				setCompleted(true);
				setTimeout(() => playFeedback('star'), 500);
				onComplete();
			}
			return next;
		});
	};

	return (
		<div className={styles.gameContainer}>
			<h2 className={styles.gameTitle}>Une la palabra en inglés con su pareja en español</h2>
			<div className={styles.dragDropLayout}>
				<ul className={styles.dragColumn} aria-label="Palabras en español">
					{shuffledSpanish.map((word) => {
						const alreadyMatched = !!matches[word.english];
						return (
							<li
								key={word.english}
								className={`${styles.draggableItem} ${alreadyMatched ? styles.draggableMatched : ''}`}
								draggable={!alreadyMatched}
								onDragStart={(e) => {
									e.dataTransfer.setData('text/plain', word.english);
								}}
							>
								<span className={styles.emoji}>{word.emoji}</span>
								<span>{word.spanish}</span>
							</li>
						);
					})}
				</ul>

				<ul className={styles.dropColumn} aria-label="Palabras en inglés">
					{words.map((word) => {
						const matched = !!matches[word.english];
						return (
							<li
								key={word.english}
								className={`${styles.dropSlot} ${matched ? styles.dropSlotCorrect : ''}`}
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									const draggedEnglish = e.dataTransfer.getData('text/plain');
									handleDrop(word.english, draggedEnglish);
								}}
							>
								<span className={styles.englishLabel}>{word.english}</span>
								{matched && (
									<span className={styles.matchBadge}>
										✓ {words.find((w) => w.english === matches[word.english])?.spanish}
									</span>
								)}
							</li>
						);
					})}
				</ul>
			</div>

			{completed && (
				<motion.div
					className={styles.feedbackBubble}
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
				>
					¡Estrella ganada! 🌟
				</motion.div>
			)}
		</div>
	);
};
