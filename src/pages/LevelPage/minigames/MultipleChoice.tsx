// Placeholder de mini‑juego de elección múltiple para Mundo Mágico Inglés.
// Sin scoring real; sirve como actividad interactiva básica.
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MiniGames.module.css';

import type { MiniGameWord } from './DragAndDropWords';

interface MultipleChoiceProps {
	words: MiniGameWord[];
	onComplete: () => void;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({ words, onComplete }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
	const [completed, setCompleted] = useState(false);

	const current = words[currentIndex];

	const buildOptions = () => {
		const wrongs = words.filter((w) => w.spanish !== current.spanish).slice(0, 2);
		const options = [current, ...wrongs];
		return options.sort(() => Math.random() - 0.5);
	};

	const handleOption = (spanish: string) => {
		if (spanish === current.spanish) {
			const nextIndex = currentIndex + 1;
			if (nextIndex >= words.length) {
				if (!completed) {
					setCompleted(true);
					onComplete();
				}
			} else {
				setCurrentIndex(nextIndex);
			}
			setFeedback('correct');
		} else {
			setFeedback('wrong');
		}
	};

	return (
		<div className={styles.gameContainer}>
			<h2 className={styles.gameTitle}>Elige el significado correcto</h2>
			<p className={styles.gameSubtitle}>
				¿Qué significa <strong>{current.english}</strong>?
			</p>

			<div className={styles.optionsGrid}>
				{buildOptions().map((opt) => (
					<button
						key={opt.spanish}
						type="button"
						className={styles.choiceButton}
						onClick={() => handleOption(opt.spanish)}
					>
						<span className={styles.emoji}>{opt.emoji}</span>
						{opt.spanish}
					</button>
				))}
			</div>

			{feedback === 'correct' && (
				<motion.div
					className={styles.feedbackBubble}
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
				>
					¡Bien hecho! ✅
				</motion.div>
			)}

			{feedback === 'wrong' && (
				<motion.div
					className={styles.feedbackBubbleError}
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
				>
					Casi, inténtalo otra vez 🙂
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

