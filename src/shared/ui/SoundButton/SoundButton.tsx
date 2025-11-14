import React from 'react';
import { motion } from 'framer-motion';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import styles from './SoundButton.module.css';

interface SoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  size = 60,
  className,
  ...props
}) => {
  return (
    <motion.button
      className={`${styles.soundButton} ${className || ''}`}
      style={{ width: size, height: size }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 2 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div className={styles.innerCircle}>
        <VolumeUpIcon className={styles.icon} />
      </div>
    </motion.button>
  );
};

export default SoundButton;
