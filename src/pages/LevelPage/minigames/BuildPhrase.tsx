import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../../app/providers/AudioProvider';
import styles from './MiniGames.module.css';

interface Phrase {
	englishWords: string[];
	spanish: string;
	emoji?: string;
}

interface BuildPhraseProps {
	phrases: Phrase[];
	onComplete: () => void;
}

export const BuildPhrase: React.FC<BuildPhraseProps> = ({ phrases, onComplete }) => {
	const { playWord, playFeedback, playNarrative } = useAudio();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
	const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
	const [completed, setCompleted] = useState(false);
	const [shuffledWords, setShuffledWords] = useState<string[]>([]);
	const initRef = useRef(false);

	const current = phrases[currentIndex];

	useEffect(() => {
		if (initRef.current) return;
		initRef.current = true;
		playNarrative('/assets/audio/voices/instructions/build_phrase.mp3').catch(() => {});
	}, []);

	useEffect(() => {
		setShuffledWords(current.englishWords.slice().sort(() => Math.random() - 0.5));
	}, [currentIndex]);

	const handleWordClick = (word: string) => {
		if (completed) return;
		playWord(word);

		const newOrder = [...selectedOrder, word];
		setSelectedOrder(newOrder);

		if (newOrder.length === current.englishWords.length) {
			const isCorrect = JSON.stringify(newOrder) === JSON.stringify(current.englishWords);
			if (isCorrect) {
				setFeedback('correct');
				playFeedback('correct');
				const phrase = current.englishWords.join(' ').toLowerCase().replace(/\s+/g, '_');
				setTimeout(() => playNarrative(`/assets/audio/voices/phrases/${phrase}.mp3`).catch(() => {}), 400);

				const nextIndex = currentIndex + 1;
				if (nextIndex >= phrases.length) {
					if (!completed) {
						setCompleted(true);
						setTimeout(() => playFeedback('star'), 800);
						setTimeout(() => onComplete(), 1500);
					}
				} else {
					setTimeout(() => {
						setCurrentIndex(nextIndex);
						setSelectedOrder([]);
						setFeedback(null);
					}, 1500);
				}
			} else {
				setFeedback('wrong');
				playFeedback('wrong');
				setTimeout(() => {
					setSelectedOrder([]);
					setFeedback(null);
				}, 1500);
			}
		}
	};

	const removeWord = (index: number) => {
		setSelectedOrder(selectedOrder.filter((_, i) => i !== index));
	};

	return (
		<div className={styles.gameContainer}>
			<h2 className={styles.gameTitle}>Construye la frase</h2>
			<p className={styles.gameSubtitle}>
				<span className={styles.emoji}>{current.emoji}</span> {current.spanish}
			</p>

			<div className={styles.phraseBuilder}>
				<div className={styles.phraseSlot}>
					{selectedOrder.length === 0 ? (
						<div className={styles.emptySlot}>Toca las palabras en orden</div>
					) : (
						selectedOrder.map((word, idx) => (
							<button
								key={`${word}-${idx}`}
								type="button"
								className={styles.wordChip}
								onClick={() => removeWord(idx)}
							>
								{word}
								<span className={styles.removeIcon}>×</span>
							</button>
						))
					)}
				</div>

				<div className={styles.availableWords}>
					{shuffledWords
						.filter((w) => {
							const usedCount = selectedOrder.filter((s) => s === w).length;
							const availableCount = shuffledWords.filter((s) => s === w).length;
							return usedCount < availableCount;
						})
						.map((word, i) => (
							<button
								key={`${word}-${i}`}
								type="button"
								className={styles.wordButton}
								onClick={() => handleWordClick(word)}
							>
								{word}
							</button>
						))}
				</div>
			</div>

			{feedback === 'correct' && (
				<motion.div
					className={styles.feedbackBubble}
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
				>
					¡Frase perfecta! 🎉
				</motion.div>
			)}

			{feedback === 'wrong' && (
				<motion.div
					className={styles.feedbackBubbleError}
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
				>
					El orden no es correcto, intenta otra vez
				</motion.div>
			)}

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
