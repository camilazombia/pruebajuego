import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../../app/providers/AudioProvider';
import styles from './ListenAndChoose.module.css';
import type { MiniGameWord } from './DragAndDropWords';

interface ListenAndChooseProps {
	words: MiniGameWord[];
	onComplete: () => void;
}

/** Habla un texto usando el Web Speech API del navegador (funciona en todos los browsers modernos) */
function speak(text: string, lang = 'es-ES', rate = 0.82, pitch = 1.1) {
	if (!window.speechSynthesis) return;
	window.speechSynthesis.cancel();
	const utt = new SpeechSynthesisUtterance(text);
	utt.lang = lang;
	utt.rate = rate;
	utt.pitch = pitch;
	window.speechSynthesis.speak(utt);
}

export const ListenAndChoose: React.FC<ListenAndChooseProps> = ({ words, onComplete }) => {
	const { playFeedback } = useAudio();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
	const [completed, setCompleted] = useState(false);
	const [speaking, setSpeaking] = useState(false);
	const initRef = useRef(false);

	const current = words[currentIndex];

	// Opciones: la respuesta correcta (en inglés) + 2 incorrectas
	const buildOptions = () => {
		const wrong = words.filter((w) => w.english !== current.english).slice(0, 2);
		return [...wrong, current].sort(() => Math.random() - 0.5);
	};

	const [options] = useState(() => buildOptions());
	const [shuffledOptions, setShuffledOptions] = useState(options);

	// Al cambiar de palabra, rebarajar opciones
	useEffect(() => {
		const wrong = words.filter((w) => w.english !== current.english).slice(0, 2);
		setShuffledOptions([...wrong, current].sort(() => Math.random() - 0.5));
	}, [currentIndex]);

	// Hablar la palabra española al iniciar cada ronda
	const sayWord = (word: MiniGameWord) => {
		setSpeaking(true);
		speak(word.spanish, 'es-ES', 0.8, 1.15);
		setTimeout(() => setSpeaking(false), 1200);
	};

	useEffect(() => {
		if (initRef.current) return;
		initRef.current = true;
		// Pequeña pausa antes de hablar para que el niño esté listo
		setTimeout(() => sayWord(words[0]), 600);
	}, []);

	useEffect(() => {
		if (currentIndex === 0) return;
		setTimeout(() => sayWord(current), 400);
	}, [currentIndex]);

	const handleOption = (english: string) => {
		if (completed || feedback) return;

		if (english === current.english) {
			setFeedback('correct');
			playFeedback('correct');
			// Pronunciar la palabra en inglés como recompensa
			setTimeout(() => speak(current.english, 'en-US', 0.85, 1.0), 300);

			setTimeout(() => {
				const next = currentIndex + 1;
				if (next >= words.length) {
					setCompleted(true);
					playFeedback('star');
					onComplete();
				} else {
					setCurrentIndex(next);
					setFeedback(null);
				}
			}, 1400);
		} else {
			setFeedback('wrong');
			playFeedback('wrong');
			setTimeout(() => setFeedback(null), 900);
		}
	};

	return (
		<div className={styles.container}>
			{/* Instrucción */}
			<p className={styles.instruction}>¿Cómo se dice en inglés?</p>

			{/* Tarjeta de la palabra a buscar */}
			<motion.div
				key={current.english}
				className={styles.wordCard}
				initial={{ scale: 0.85, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: 'spring', stiffness: 280, damping: 18 }}
			>
				<span className={styles.bigEmoji}>{current.emoji}</span>
				<span className={styles.spanishWord}>{current.spanish}</span>

				{/* Botón de escuchar — Web Speech API */}
				<motion.button
					type="button"
					className={`${styles.speakBtn} ${speaking ? styles.speakBtnActive : ''}`}
					onClick={() => sayWord(current)}
					whileTap={{ scale: 0.9 }}
					aria-label={`Escuchar: ${current.spanish}`}
				>
					{speaking ? '🔊' : '🔈'} Escuchar
				</motion.button>
			</motion.div>

			{/* Progreso */}
			<div className={styles.progressRow}>
				{words.map((_, i) => (
					<div
						key={i}
						className={`${styles.progressDot} ${i < currentIndex ? styles.progressDone : ''} ${i === currentIndex ? styles.progressCurrent : ''}`}
					/>
				))}
			</div>

			{/* Opciones en inglés */}
			<div className={styles.optionsGrid}>
				{shuffledOptions.map((opt) => (
					<motion.button
						key={opt.english}
						type="button"
						className={`${styles.optionBtn} ${feedback === 'correct' && opt.english === current.english ? styles.optionCorrect : ''} ${feedback === 'wrong' && opt.english === current.english ? styles.optionHint : ''}`}
						onClick={() => handleOption(opt.english)}
						whileTap={{ scale: 0.95 }}
						whileHover={{ scale: 1.04 }}
					>
						<span className={styles.optionEmoji}>{opt.emoji}</span>
						<span className={styles.optionLabel}>{opt.english}</span>
					</motion.button>
				))}
			</div>

			{/* Feedback */}
			<AnimatePresence>
				{feedback === 'correct' && (
					<motion.div
						key="correct"
						className={styles.feedbackCorrect}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
					>
						¡Correcto! &quot;{current.english}&quot; = {current.spanish} ✅
					</motion.div>
				)}
				{feedback === 'wrong' && (
					<motion.div
						key="wrong"
						className={styles.feedbackWrong}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
					>
						Casi, inténtalo otra vez 🙂
					</motion.div>
				)}
				{completed && (
					<motion.div
						key="done"
						className={styles.feedbackCorrect}
						initial={{ opacity: 0, scale: 0.85 }}
						animate={{ opacity: 1, scale: 1 }}
					>
						¡Estrella ganada! 🌟
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
