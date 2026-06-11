import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CelebrationModal.module.css';

interface ConfettiPiece {
	id: number;
	x: number;
	delay: number;
	duration: number;
	color: string;
	size: number;
	rotation: number;
}

const CONFETTI_COLORS = ['#FFD93D', '#FF6B6B', '#6BCB77', '#4ECDC4', '#A66CFF', '#FF9F43', '#0ABDE3', '#FD79A8'];

function generateConfetti(count: number): ConfettiPiece[] {
	return Array.from({ length: count }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		delay: Math.random() * 0.8,
		duration: 2 + Math.random() * 2,
		color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
		size: 6 + Math.random() * 8,
		rotation: Math.random() * 360,
	}));
}

interface CelebrationModalProps {
	guardianEmoji: string;
	guardianName: string;
	worldTitle: string;
	isWorldComplete?: boolean;
	onContinue: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
	guardianEmoji,
	guardianName,
	worldTitle,
	isWorldComplete = false,
	onContinue,
}) => {
	const [confetti] = useState(() => generateConfetti(40));
	const [visible, setVisible] = useState(true);
	const audioPlayed = useRef(false);

	useEffect(() => {
		if (!audioPlayed.current) {
			audioPlayed.current = true;
			const src = isWorldComplete
				? '/assets/audio/sfx/world_complete.mp3'
				: '/assets/audio/sfx/chapter_complete.mp3';
			const audio = new Audio(src);
			audio.play().catch(() => {});
		}
	}, [isWorldComplete]);

	useEffect(() => {
		const timer = setTimeout(() => handleClose(), 3500);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		};
		window.addEventListener('keydown', handleEsc);
		return () => window.removeEventListener('keydown', handleEsc);
	}, []);

	const handleClose = () => {
		setVisible(false);
		setTimeout(onContinue, 350);
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					className={styles.overlay}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.35 }}
					role="dialog"
					aria-modal="true"
					aria-label="Celebracion"
				>
					{/* Confetti layer */}
					<div className={styles.confettiLayer} aria-hidden="true">
						{confetti.map((piece) => (
							<motion.div
								key={piece.id}
								className={styles.confettiPiece}
								style={{
									left: `${piece.x}%`,
									width: piece.size,
									height: piece.size * 0.4,
									background: piece.color,
									borderRadius: piece.size > 10 ? '50%' : '2px',
								}}
								initial={{ y: -20, opacity: 0, rotate: 0 }}
								animate={{
									y: ['0vh', '100vh'],
									opacity: [0, 1, 1, 0],
									rotate: [0, piece.rotation, piece.rotation * 2],
								}}
								transition={{
									duration: piece.duration,
									delay: piece.delay,
									repeat: Infinity,
									ease: 'linear',
								}}
							/>
						))}
					</div>

					{/* Content card */}
					<motion.div
						className={styles.card}
						initial={{ scale: 0.5, opacity: 0, y: 40 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
					>
						{/* Guardian bouncing */}
						<motion.div
							className={styles.guardianContainer}
							animate={{ y: [0, -18, 0] }}
							transition={{ duration: 0.7, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
						>
							<span className={styles.guardianEmoji}>{guardianEmoji}</span>
						</motion.div>

						<motion.div
							className={styles.starsRow}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
						>
							<span className={styles.starIcon}>&#11088;</span>
							<span className={styles.starIcon}>&#11088;</span>
							<span className={styles.starIcon}>&#11088;</span>
						</motion.div>

						<h2 className={styles.title}>
							{isWorldComplete ? '🎉 Mundo Completado 🎉' : '✅ Capitulo Completado'}
						</h2>

						<p className={styles.message}>
							{isWorldComplete
								? `¡${guardianName} recuperó todo su poder! 🎉`
								: `¡${guardianName} se siente mejor! 💪`}
						</p>

						<motion.button
							className={styles.continueButton}
							onClick={handleClose}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
						>
							Continuar
						</motion.button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
