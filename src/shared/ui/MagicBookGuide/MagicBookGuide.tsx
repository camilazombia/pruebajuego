import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../../app/providers/AudioProvider';
import styles from './MagicBookGuide.module.css';

interface MagicBookGuideProps {
	instructionText: string;
	audioSrc?: string;
}

export const MagicBookGuide: React.FC<MagicBookGuideProps> = ({
	instructionText,
	audioSrc,
}) => {
	const { playNarrative } = useAudio();

	const handlePlayAudio = useCallback(() => {
		if (audioSrc) {
			playNarrative(audioSrc).catch(() => {});
		}
	}, [audioSrc, playNarrative]);

	return (
		<motion.div
			className={styles.container}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeOut' }}
		>
			<div className={styles.bookIcon} aria-hidden="true">
				<span className={styles.bookEmoji}>📖</span>
				<motion.div
					className={styles.sparkle}
					animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
					transition={{ duration: 2, repeat: Infinity }}
				/>
			</div>

			<p className={styles.instructionText}>{instructionText}</p>

			{audioSrc && (
				<button
					type="button"
					className={styles.playButton}
					onClick={handlePlayAudio}
					aria-label="Reproducir instrucción"
				>
					<span className={styles.playIcon}>&#9654;</span>
				</button>
			)}
		</motion.div>
	);
};
