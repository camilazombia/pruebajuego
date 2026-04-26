import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import styles from './SoundButton.module.css';

interface SoundButtonProps {
  size?: number;
  className?: string;
  audioSrc?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  title?: string;
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  size = 60,
  className,
  audioSrc,
  onClick,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
  title,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (audioSrc) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.play().catch(() => {});
      }
      onClick?.(e);
    },
    [audioSrc, onClick],
  );

  return (
    <motion.button
      className={`${styles.soundButton} ${className ?? ''}`}
      style={{ width: size, height: size }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 2 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      title={title}
    >
      <div className={styles.innerCircle}>
        <VolumeUpIcon className={styles.icon} />
      </div>
    </motion.button>
  );
};

export default SoundButton;
