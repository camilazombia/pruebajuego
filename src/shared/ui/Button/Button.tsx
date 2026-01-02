import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import styles from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: string; // Material Symbols icon name
  showIconCircle?: boolean; // Whether to show the yellow circle background
}

export const Button: React.FC<ButtonProps> = ({
  text = 'COMENZAR',
  icon = 'play_arrow',
  showIconCircle = false,
  className,
  ...props
}) => {
  return (
    <motion.button
      className={cn(styles.button, className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {showIconCircle ? (
        <span className={styles.iconCircle}>
          <span className="material-symbols-outlined">{icon}</span>
        </span>
      ) : (
        <span className={styles.iconOnly}>
          <span className="material-symbols-outlined">{icon}</span>
        </span>
      )}
      {text && <span className={styles.text}>{text}</span>}
    </motion.button>
  );
};
