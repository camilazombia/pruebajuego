// Minijuego de escuchar y elegir - NO requiere lectura, solo audio y emojis grandes
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './MiniGames.module.css';

import type { MiniGameWord } from './DragAndDropWords';

interface ListenAndChooseProps {
	words: MiniGameWord[];
	introAudioKey?: string;
	wordAudioKeys?: Record<string, string>;
	onComplete: () => void;
}

export const ListenAndChoose: React.FC<ListenAndChooseProps> = ({
	words,
	introAudioKey,
	wordAudioKeys = {},
	onComplete,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
	const [completed, setCompleted] = useState(false);
	const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

	const current = words[currentIndex];

	// Reproducir audio intro al montar
	useEffect(() => {
		if (introAudioKey) {
			const audio = new Audio(`/assets/audio/voices/${introAudioKey}.mp3`);
			audio.play().catch(() => {});
		}
	}, [introAudioKey]);

	// Reproducir audio de la palabra actual automáticamente
	useEffect(() => {
		if (current && wordAudioKeys[current.english]) {
			const audio = new Audio(`/assets/audio/voices/${wordAudioKeys[current.english]}.mp3`);
			setCurrentAudio(audio);
			audio.play().catch(() => {});
		}
	}, [currentIndex, current, wordAudioKeys]);

	const playCurrentWord = () => {
		if (currentAudio) {
			currentAudio.currentTime = 0;
			currentAudio.play().catch(() => {});
		} else if (wordAudioKeys[current.english]) {
			const audio = new Audio(`/assets/audio/voices/${wordAudioKeys[current.english]}.mp3`);
			setCurrentAudio(audio);
			audio.play().catch(() => {});
		}
	};

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
				setFeedback(null);
			}
			setFeedback('correct');
		} else {
			setFeedback('wrong');
		}
	};

	return (
		<div className={styles.gameContainer}>
			<h2 className={styles.gameTitle}>Escucha y elige</h2>
			
			{/* Botón grande de reproducir audio */}
			<button
				type="button"
				onClick={playCurrentWord}
				className={styles.audioButton}
				aria-label="Reproducir palabra"
			>
				<span className={styles.audioIcon}>🔊</span>
				<span>Toca para escuchar</span>
			</button>

			{/* Emoji grande de la palabra actual */}
			<div className={styles.bigEmoji}>{current.emoji}</div>

			<div className={styles.optionsGrid}>
				{buildOptions().map((opt) => (
					<button
						key={opt.spanish}
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
