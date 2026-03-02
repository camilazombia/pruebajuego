import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import styles from './SoundButton.module.css';

interface SoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
  audioSrc?: string;
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  size = 60,
  className,
  audioSrc,
  onClick,
  ...props
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
      className={`${styles.soundButton} ${className || ''}`}
      style={{ width: size, height: size }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 2 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      {...props}
    >
      <div className={styles.innerCircle}>
        <VolumeUpIcon className={styles.icon} />
      </div>
    </motion.button>
  );
};

export default SoundButton;
