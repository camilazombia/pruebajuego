// Minijuego de construir frases arrastrando palabras en orden
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MiniGames.module.css';

interface Phrase {
	englishWords: string[];
	spanish: string;
	emoji?: string;
	audioKey?: string;
}

interface BuildPhraseProps {
	phrases: Phrase[];
	onComplete: () => void;
}

export const BuildPhrase: React.FC<BuildPhraseProps> = ({ phrases, onComplete }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
	const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
	const [completed, setCompleted] = useState(false);

	const current = phrases[currentIndex];
	const allWords = current.englishWords.slice().sort(() => Math.random() - 0.5);

	const handleWordClick = (word: string) => {
		if (selectedOrder.includes(word)) return;
		const newOrder = [...selectedOrder, word];
		setSelectedOrder(newOrder);

		if (newOrder.length === current.englishWords.length) {
			const isCorrect = JSON.stringify(newOrder) === JSON.stringify(current.englishWords);
			if (isCorrect) {
				setFeedback('correct');
				const nextIndex = currentIndex + 1;
				if (nextIndex >= phrases.length) {
					if (!completed) {
						setCompleted(true);
						onComplete();
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

			{/* Área de construcción */}
			<div className={styles.phraseBuilder}>
				<div className={styles.phraseSlot}>
					{selectedOrder.length === 0 ? (
						<div className={styles.emptySlot}>Arrastra las palabras aquí</div>
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

				{/* Palabras disponibles */}
				<div className={styles.availableWords}>
					{allWords
						.filter((w) => !selectedOrder.includes(w))
						.map((word) => (
							<button
								key={word}
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
