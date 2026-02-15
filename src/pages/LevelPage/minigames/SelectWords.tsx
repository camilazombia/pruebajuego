// Placeholder de mini‑juego de selección de palabras para Mundo Mágico Inglés.
// El niño toca la palabra correcta en inglés según una pista en español.
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MiniGames.module.css';

import type { MiniGameWord } from './DragAndDropWords';

interface SelectWordsProps {
	words: MiniGameWord[];
	onComplete: () => void;
}

export const SelectWords: React.FC<SelectWordsProps> = ({ words, onComplete }) => {
	const [index, setIndex] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

	const current = words[index];

	const handleClick = (english: string) => {
		if (english === current.english) {
			const next = index + 1;
			if (next >= words.length) {
				if (!completed) {
					setCompleted(true);
					onComplete();
				}
			} else {
				setIndex(next);
			}
			setFeedback('correct');
		} else {
			setFeedback('wrong');
		}
	};

	return (
		<div className={styles.gameContainer}>
			<h2 className={styles.gameTitle}>Toca la palabra correcta</h2>
			<p className={styles.gameSubtitle}>
				Busca en inglés: <strong>{current.spanish}</strong>
			</p>

			<div className={styles.optionsRow}>
				{words.map((word) => (
					<button
						key={word.english}
						type="button"
						className={styles.choiceButton}
						onClick={() => handleClick(word.english)}
					>
						<span className={styles.emoji}>{word.emoji}</span>
						{word.english}
					</button>
				))}
			</div>

			{feedback === 'correct' && (
				<motion.div
					className={styles.feedbackBubble}
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
				>
					¡Muy bien! 🎉
				</motion.div>
			)}

			{feedback === 'wrong' && (
				<motion.div
					className={styles.feedbackBubbleError}
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
				>
					Prueba con otra palabra 😉
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

