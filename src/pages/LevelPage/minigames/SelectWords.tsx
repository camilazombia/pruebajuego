import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../../app/providers/AudioProvider';
import styles from './MiniGames.module.css';

import type { MiniGameWord } from './DragAndDropWords';

interface SelectWordsProps {
	words: MiniGameWord[];
	onComplete: () => void;
}

export const SelectWords: React.FC<SelectWordsProps> = ({ words, onComplete }) => {
	const { playWord, playFeedback, playNarrative } = useAudio();
	const [index, setIndex] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
	const [ready, setReady] = useState(false);
	const initRef = useRef(false);

	const current = words[index];

	useEffect(() => {
		if (initRef.current) return;
		initRef.current = true;
		playNarrative('/assets/audio/voices/instructions/select_words.mp3')
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
		if (!ready || index === 0) return;
		if (current) {
			const timer = setTimeout(() => playWord(current.english), 300);
			return () => clearTimeout(timer);
		}
	}, [index, ready]);

	const handleClick = (english: string) => {
		if (completed) return;

		if (english === current.english) {
			setFeedback('correct');
			playFeedback('correct');
			playWord(english);
			const next = index + 1;

			setTimeout(() => {
				if (next >= words.length) {
					if (!completed) {
						setCompleted(true);
						playFeedback('star');
						onComplete();
					}
				} else {
					setIndex(next);
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
			<h2 className={styles.gameTitle}>Toca la palabra correcta</h2>
			<p className={styles.gameSubtitle}>
				Busca en inglés: <strong>{current.spanish}</strong> {current.emoji}
			</p>

			<button
				type="button"
				onClick={() => playWord(current.english)}
				className={styles.audioButtonSmall}
				aria-label="Escuchar palabra"
			>
				🔊 Escuchar
			</button>

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
