import React, { useState } from 'react';
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
	const { playNarrative } = useAudio();
	const [matches, setMatches] = useState<Record<string, string>>({});
	const [completed, setCompleted] = useState(false);

	const playWordAudio = (english: string) => {
		const audioKey = `word_${english.replace(/\s+/g, '')}`;
		playNarrative(`/assets/audio/voices/${audioKey}.mp3`).catch(() => {});
	};

	const handleDrop = (english: string, spanish: string) => {
		const isCorrect = words.find((w) => w.english === english)?.spanish === spanish;
		if (isCorrect) {
			playWordAudio(english);
		}

		setMatches((prev) => {
			const next = { ...prev, [english]: spanish };
			const allMatched = words.every((w) => next[w.english] === w.spanish);
			if (allMatched && !completed) {
				setCompleted(true);
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
					{words.map((word) => (
						<li
							key={word.spanish}
							className={styles.draggableItem}
							draggable
							onDragStart={(e) => {
								e.dataTransfer.setData('text/plain', word.spanish);
							}}
						>
							<span className={styles.emoji}>{word.emoji}</span>
							<span>{word.spanish}</span>
						</li>
					))}
				</ul>

				<ul className={styles.dropColumn} aria-label="Palabras en inglés">
					{words.map((word) => {
						const matched = matches[word.english] === word.spanish;
						return (
							<li
								key={word.english}
								className={`${styles.dropSlot} ${matched ? styles.dropSlotCorrect : ''}`}
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									const spanish = e.dataTransfer.getData('text/plain');
									handleDrop(word.english, spanish);
								}}
							>
								<span className={styles.englishLabel}>{word.english}</span>
								{matched && <span className={styles.matchBadge}>✓ {matches[word.english]}</span>}
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

