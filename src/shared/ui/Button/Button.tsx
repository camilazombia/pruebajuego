import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import styles from './Button.module.css';

export interface ButtonProps {
  text?: string;
  icon?: string;
  showIconCircle?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  title?: string;
  id?: string;
  tabIndex?: number;
}

export const Button: React.FC<ButtonProps> = ({
  text = 'COMENZAR',
  icon = 'play_arrow',
  showIconCircle = false,
  className,
  children,
  onClick,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
  title,
  id,
  tabIndex,
}) => {
  return (
    <motion.button
      className={cn(styles.button, className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      title={title}
      id={id}
      tabIndex={tabIndex}
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
      {children}
    </motion.button>
  );
};
