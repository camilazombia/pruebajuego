// Minijuego de escuchar y elegir - NO requiere lectura, solo audio y emojis grandes
import React, { useState, useEffect, useCallback } from 'react';
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

	// --- Audio Handling ---

	// Efecto para PRE-CARGAR el audio de la palabra actual sin reproducirlo
	useEffect(() => {
		if (current && wordAudioKeys[current.english]) {
			const audio = new Audio(`/assets/audio/voices/${wordAudioKeys[current.english]}.mp3`);
			audio.preload = 'auto';
			setCurrentAudio(audio);
		}
	}, [currentIndex, current, wordAudioKeys]);

	// Efecto para reproducir el audio de introducción UNA SOLA VEZ al inicio
	useEffect(() => {
		if (introAudioKey) {
			const audio = new Audio(`/assets/audio/voices/${introAudioKey}.mp3`);
			audio.play().catch(() => {});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [introAudioKey]);


	const playCurrentWord = useCallback(() => {
		if (currentAudio) {
			currentAudio.currentTime = 0;
			currentAudio.play().catch(() => {});
		}
	}, [currentAudio]);

	// --- Game Logic ---

	const buildOptions = () => {
		const wrongs = words.filter((w) => w.spanish !== current.spanish).slice(0, 2);
		const options = [current, ...wrongs];
		// Aseguramos que el array de opciones siempre tenga un orden consistente para evitar re-renders inesperados
		return options.sort((a, b) => a.english.localeCompare(b.english));
	};

	const handleOption = (spanish: string) => {
		if (completed) return; // No permitir más acciones si ya se completó

		if (spanish === current.spanish) {
			setFeedback('correct');
			const nextIndex = currentIndex + 1;

			setTimeout(() => {
				if (nextIndex >= words.length) {
					setCompleted(true);
					onComplete();
				} else {
					setCurrentIndex(nextIndex);
					setFeedback(null); // Limpiar feedback para la siguiente palabra
				}
			}, 1000); // Pequeño delay para que el usuario vea el feedback

		} else {
			setFeedback('wrong');
			// El feedback de error desaparece solo para que pueda intentarlo de nuevo
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
						key={opt.english} // Usar una clave única y estable
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
