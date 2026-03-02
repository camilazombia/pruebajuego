import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../../app/providers/AudioProvider';
import styles from './MiniGames.module.css';

import type { MiniGameWord } from './DragAndDropWords';

interface ListenAndChooseProps {
	words: MiniGameWord[];
	onComplete: () => void;
}

export const ListenAndChoose: React.FC<ListenAndChooseProps> = ({
	words,
	onComplete,
}) => {
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
		playNarrative('/assets/audio/voices/instructions/listen_and_choose.mp3')
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

	const playCurrentWord = useCallback(() => {
		if (current) playWord(current.english);
	}, [current, playWord]);

	const buildOptions = () => {
		const wrongs = words.filter((w) => w.spanish !== current.spanish).slice(0, 2);
		const options = [current, ...wrongs];
		return options.sort((a, b) => a.english.localeCompare(b.english));
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
					setCompleted(true);
					playFeedback('star');
					onComplete();
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
			<h2 className={styles.gameTitle}>Escucha y elige</h2>

			<button
				type="button"
				onClick={playCurrentWord}
				className={styles.audioButton}
				aria-label="Reproducir palabra"
			>
				<span className={styles.audioIcon}>🔊</span>
				<span>Toca para escuchar</span>
			</button>

			<div className={styles.bigEmoji}>{current.emoji}</div>

			<div className={styles.optionsGrid}>
				{buildOptions().map((opt) => (
					<button
						key={opt.english}
						type="button"
						className={styles.choiceButton}
						onClick={() => handleOption(opt.spanish)}
					>
						<span className={styles.emoji}>{opt.emoji}</span>
						<span>{opt.spanish}</span>
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
