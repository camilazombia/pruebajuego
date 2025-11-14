import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text = 'COMENZAR',
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
      <span className={styles.iconCircle}>
        <Play size={18} fill="var(--mm-blue)" />
      </span>
      <span className={styles.text}>{text}</span>
    </motion.button>
  );
};
