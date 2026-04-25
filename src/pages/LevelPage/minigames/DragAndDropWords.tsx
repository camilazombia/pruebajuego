import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
	const [selectedSpanish, setSelectedSpanish] = useState<string | null>(null);
	const [wrongTarget, setWrongTarget] = useState<string | null>(null);
	const [completed, setCompleted] = useState(false);
	const initRef = useRef(false);

	const shuffledSpanish = useMemo(
		() => [...words].sort(() => Math.random() - 0.5),
		[words],
	);

	useEffect(() => {
		if (initRef.current) return;
		initRef.current = true;
		playNarrative('/assets/audio/voices/instructions/drag_and_drop.mp3').catch(() => {});
	}, []);

	const handleSpanishTap = (english: string) => {
		if (matches[english]) return; // already matched
		setSelectedSpanish((prev) => (prev === english ? null : english));
		setWrongTarget(null);
	};

	const handleEnglishTap = (targetEnglish: string) => {
		if (matches[targetEnglish]) return; // already matched
		if (!selectedSpanish) return; // nothing selected yet

		const isCorrect = selectedSpanish === targetEnglish;

		if (isCorrect) {
			playFeedback('correct');
			setTimeout(() => playWord(targetEnglish), 300);
			setMatches((prev) => {
				const next = { ...prev, [targetEnglish]: selectedSpanish };
				const allMatched = words.every((w) => next[w.english]);
				if (allMatched && !completed) {
					setCompleted(true);
					setTimeout(() => playFeedback('star'), 500);
					onComplete();
				}
				return next;
			});
			setSelectedSpanish(null);
		} else {
			playFeedback('wrong');
			setWrongTarget(targetEnglish);
			setTimeout(() => {
				setWrongTarget(null);
				setSelectedSpanish(null);
			}, 700);
		}
	};

	return (
		<div className={styles.gameContainer}>
			<h2 className={styles.gameTitle}>Une la palabra en inglés con su pareja en español</h2>
			{selectedSpanish && (
				<p className={styles.gameSubtitle}>
					Ahora toca la palabra en inglés correcta ➜
				</p>
			)}
			{!selectedSpanish && !completed && (
				<p className={styles.gameSubtitle}>
					Toca una palabra en español para comenzar
				</p>
			)}

			<div className={styles.dragDropLayout}>
				{/* Spanish column — tap to select */}
				<ul className={styles.dragColumn} aria-label="Palabras en español">
					{shuffledSpanish.map((word) => {
						const isMatched = !!matches[word.english];
						const isSelected = selectedSpanish === word.english;
						return (
							<motion.li
								key={word.english}
								className={`${styles.draggableItem} ${isMatched ? styles.draggableMatched : ''} ${isSelected ? styles.draggableSelected : ''}`}
								onClick={() => handleSpanishTap(word.english)}
								whileTap={!isMatched ? { scale: 0.93 } : {}}
								animate={isSelected ? { scale: 1.06 } : { scale: 1 }}
								transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								style={{ cursor: isMatched ? 'default' : 'pointer' }}
							>
								<span className={styles.emoji}>{word.emoji}</span>
								<span>{word.spanish}</span>
								{isSelected && <span style={{ marginLeft: 'auto' }}>👆</span>}
							</motion.li>
						);
					})}
				</ul>

				{/* English column — tap to match */}
				<ul className={styles.dropColumn} aria-label="Palabras en inglés">
					{words.map((word) => {
						const isMatched = !!matches[word.english];
						const isWrong = wrongTarget === word.english;
						const isActive = !!selectedSpanish && !isMatched;
						return (
							<motion.li
								key={word.english}
								className={`${styles.dropSlot} ${isMatched ? styles.dropSlotCorrect : ''} ${isActive ? styles.dropSlotActive : ''}`}
								onClick={() => handleEnglishTap(word.english)}
								whileTap={isActive ? { scale: 0.95 } : {}}
								animate={isWrong ? { x: [-6, 6, -6, 6, 0] } : {}}
								transition={{ duration: 0.35 }}
								style={{ cursor: isMatched ? 'default' : isActive ? 'pointer' : 'default' }}
							>
								<span className={styles.englishLabel}>{word.english}</span>
								{isMatched && (
									<span className={styles.matchBadge}>
										✓ {words.find((w) => w.english === matches[word.english])?.spanish}
									</span>
								)}
							</motion.li>
						);
					})}
				</ul>
			</div>

			<AnimatePresence>
				{completed && (
					<motion.div
						className={styles.feedbackBubble}
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0 }}
					>
						¡Estrella ganada! 🌟
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
