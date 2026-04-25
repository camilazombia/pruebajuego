import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../../app/providers/AudioProvider';
import styles from './ListenAndChoose.module.css';
import type { MiniGameWord } from './DragAndDropWords';

interface SelectWordsProps {
	words: MiniGameWord[];
	onComplete: () => void;
}

function speak(text: string, lang = 'es-ES', rate = 0.82, pitch = 1.1) {
	if (!window.speechSynthesis) return;
	window.speechSynthesis.cancel();
	const utt = new SpeechSynthesisUtterance(text);
	utt.lang = lang;
	utt.rate = rate;
	utt.pitch = pitch;
	window.speechSynthesis.speak(utt);
}

export const SelectWords: React.FC<SelectWordsProps> = ({ words, onComplete }) => {
	const { playFeedback } = useAudio();
	const [index, setIndex] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
	const [speaking, setSpeaking] = useState(false);
	const initRef = useRef(false);

	const current = words[index];

	const sayWord = (word: MiniGameWord) => {
		setSpeaking(true);
		speak(word.spanish, 'es-ES', 0.8, 1.15);
		setTimeout(() => setSpeaking(false), 1200);
	};

	useEffect(() => {
		if (initRef.current) return;
		initRef.current = true;
		setTimeout(() => sayWord(words[0]), 600);
	}, []);

	useEffect(() => {
		if (index === 0) return;
		setTimeout(() => sayWord(current), 400);
	}, [index]);

	const handleClick = (english: string) => {
		if (completed || feedback) return;

		if (english === current.english) {
			setFeedback('correct');
			playFeedback('correct');
			setTimeout(() => speak(current.english, 'en-US', 0.85, 1.0), 300);

			setTimeout(() => {
				const next = index + 1;
				if (next >= words.length) {
					setCompleted(true);
					playFeedback('star');
					onComplete();
				} else {
					setIndex(next);
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
			<p className={styles.instruction}>¿Cuál es la palabra en inglés?</p>

			{/* Tarjeta grande con la palabra a buscar */}
			<motion.div
				key={current.english}
				className={styles.wordCard}
				initial={{ scale: 0.85, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: 'spring', stiffness: 280, damping: 18 }}
			>
				<span className={styles.bigEmoji}>{current.emoji}</span>
				<span className={styles.spanishWord}>{current.spanish}</span>

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
						className={`${styles.progressDot} ${i < index ? styles.progressDone : ''} ${i === index ? styles.progressCurrent : ''}`}
					/>
				))}
			</div>

			{/* Opciones en inglés */}
			<div className={styles.optionsGrid}>
				{words.map((word) => (
					<motion.button
						key={word.english}
						type="button"
						className={`${styles.optionBtn} ${feedback === 'correct' && word.english === current.english ? styles.optionCorrect : ''}`}
						onClick={() => handleClick(word.english)}
						whileTap={{ scale: 0.95 }}
						whileHover={{ scale: 1.04 }}
					>
						<span className={styles.optionEmoji}>{word.emoji}</span>
						<span className={styles.optionLabel}>{word.english}</span>
					</motion.button>
				))}
			</div>

			<AnimatePresence>
				{feedback === 'correct' && (
					<motion.div
						key="ok"
						className={styles.feedbackCorrect}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
					>
						¡Muy bien! &quot;{current.english}&quot; = {current.spanish} ✅
					</motion.div>
				)}
				{feedback === 'wrong' && (
					<motion.div
						key="err"
						className={styles.feedbackWrong}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
					>
						Prueba con otra palabra 😉
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
