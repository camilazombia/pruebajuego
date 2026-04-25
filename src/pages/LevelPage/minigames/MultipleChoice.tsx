import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../../app/providers/AudioProvider';
import styles from './ListenAndChoose.module.css';
import type { MiniGameWord } from './DragAndDropWords';

interface MultipleChoiceProps {
	words: MiniGameWord[];
	onComplete: () => void;
}

function speak(text: string, lang = 'en-US', rate = 0.85, pitch = 1.0) {
	if (!window.speechSynthesis) return;
	window.speechSynthesis.cancel();
	const utt = new SpeechSynthesisUtterance(text);
	utt.lang = lang;
	utt.rate = rate;
	utt.pitch = pitch;
	window.speechSynthesis.speak(utt);
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({ words, onComplete }) => {
	const { playFeedback } = useAudio();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
	const [completed, setCompleted] = useState(false);
	const [speaking, setSpeaking] = useState(false);
	const initRef = useRef(false);

	const current = words[currentIndex];

	const options = useMemo(() => {
		const wrongs = words.filter((w) => w.spanish !== current.spanish).slice(0, 2);
		return [current, ...wrongs].sort(() => Math.random() - 0.5);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex]);

	const sayWord = (word: MiniGameWord) => {
		setSpeaking(true);
		speak(word.english, 'en-US', 0.82, 1.05);
		setTimeout(() => setSpeaking(false), 1200);
	};

	useEffect(() => {
		if (initRef.current) return;
		initRef.current = true;
		setTimeout(() => sayWord(words[0]), 600);
	}, []);

	useEffect(() => {
		if (currentIndex === 0) return;
		setTimeout(() => sayWord(current), 400);
	}, [currentIndex]);

	const handleOption = (spanish: string) => {
		if (completed || feedback) return;

		if (spanish === current.spanish) {
			setFeedback('correct');
			playFeedback('correct');
			// Refuerzo: pronuncia inglés y luego español
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
			<p className={styles.instruction}>¿Qué significa esta palabra en inglés?</p>

			{/* Tarjeta grande con la palabra en inglés */}
			<motion.div
				key={current.english}
				className={styles.wordCard}
				initial={{ scale: 0.85, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: 'spring', stiffness: 280, damping: 18 }}
			>
				<span className={styles.bigEmoji}>{current.emoji}</span>
				<span className={styles.spanishWord}>{current.english}</span>

				<motion.button
					type="button"
					className={`${styles.speakBtn} ${speaking ? styles.speakBtnActive : ''}`}
					onClick={() => sayWord(current)}
					whileTap={{ scale: 0.9 }}
					aria-label={`Pronunciar: ${current.english}`}
				>
					{speaking ? '🔊' : '🔈'} Pronunciar
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

			{/* Opciones: traducciones en español */}
			<div className={styles.optionsGrid}>
				{options.map((opt) => (
					<motion.button
						key={opt.spanish}
						type="button"
						className={`${styles.optionBtn} ${feedback === 'correct' && opt.spanish === current.spanish ? styles.optionCorrect : ''}`}
						onClick={() => handleOption(opt.spanish)}
						whileTap={{ scale: 0.95 }}
						whileHover={{ scale: 1.04 }}
					>
						<span className={styles.optionEmoji}>{opt.emoji}</span>
						<span className={styles.optionLabel}>{opt.spanish}</span>
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
						¡Bien! &quot;{current.english}&quot; = {current.spanish} {current.emoji} ✅
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
