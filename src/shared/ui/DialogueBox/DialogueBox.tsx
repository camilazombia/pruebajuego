import React, { useEffect, useCallback } from 'react';
import { useAudio } from '../../../app/providers/AudioProvider';
import styles from './DialogueBox.module.css';

interface DialogueBoxProps {
	characterName: string;
	text: string;
	audioUrl: string;
	onClose?: () => void;
	autoCloseDelayMs?: number;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
	characterName,
	text,
	audioUrl,
	onClose,
	autoCloseDelayMs = 5000,
}) => {
	const { playNarrative } = useAudio();

	useEffect(() => {
		playNarrative(audioUrl).catch(() => {});
	}, [audioUrl, playNarrative]);

	useEffect(() => {
		if (!onClose || autoCloseDelayMs <= 0) return;
		const timer = setTimeout(onClose, autoCloseDelayMs);
		return () => clearTimeout(timer);
	}, [onClose, autoCloseDelayMs]);

	const handleClose = useCallback(() => {
		onClose?.();
	}, [onClose]);

	return (
		<div className={styles.container} role="dialog" aria-labelledby="dialogue-character" aria-describedby="dialogue-text">
			<div id="dialogue-character" className={styles.characterName}>
				{characterName}
			</div>
			<p id="dialogue-text" className={styles.text}>
				{text}
			</p>
			{onClose && (
				<button type="button" className={styles.closeButton} onClick={handleClose} aria-label="Cerrar">
					Continuar
				</button>
			)}
		</div>
	);
};
