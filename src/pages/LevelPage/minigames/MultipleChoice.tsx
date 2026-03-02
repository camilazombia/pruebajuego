import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../../app/providers/AudioProvider';
import styles from './MiniGames.module.css';

import type { MiniGameWord } from './DragAndDropWords';

interface MultipleChoiceProps {
	words: MiniGameWord[];
	onComplete: () => void;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({ words, onComplete }) => {
	const { playWord, playFeedback, playNarrative } = useAudio();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
	const [completed, setCompleted] = useState(false);
	const [ready, setReady] = useState(false);
	const initRef = useRef(false);

	const current = words[currentIndex];

	useEffect(() => {
		if (initRef.current) return;
		initRef.current = true;
		playNarrative('/assets/audio/voices/instructions/multiple_choice.mp3')
			.then(() => {
				setReady(true);
				playWord(words[0].english);
			})
			.catch(() => {
				setReady(true);
				playWord(words[0].english);
			});
	}, []);

	useEffect(() => {
		if (!ready || currentIndex === 0) return;
		if (current) {
			const timer = setTimeout(() => playWord(current.english), 300);
			return () => clearTimeout(timer);
		}
	}, [currentIndex, ready]);

	const buildOptions = () => {
		const wrongs = words.filter((w) => w.spanish !== current.spanish).slice(0, 2);
		const options = [current, ...wrongs];
		return options.sort(() => Math.random() - 0.5);
	};

	const handleOption = (spanish: string) => {
		if (completed) return;

		if (spanish === current.spanish) {
			setFeedback('correct');
			playFeedback('correct');
			playWord(current.english);
			const nextIndex = currentIndex + 1;

			setTimeout(() => {
				if (nextIndex >= words.length) {
					if (!completed) {
						setCompleted(true);
						playFeedback('star');
						onComplete();
					}
				} else {
					setCurrentIndex(nextIndex);
					setFeedback(null);
				}
			}, 1200);
		} else {
			setFeedback('wrong');
			playFeedback('wrong');
			setTimeout(() => setFeedback(null), 1000);
		}
	};

	return (
		<div className={styles.gameContainer}>
			<h2 className={styles.gameTitle}>Elige el significado correcto</h2>
			<p className={styles.gameSubtitle}>
				¿Qué significa <strong>{current.english}</strong>?
			</p>

			<button
				type="button"
				onClick={() => playWord(current.english)}
				className={styles.audioButtonSmall}
				aria-label="Escuchar palabra"
			>
				🔊 Escuchar
			</button>

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
