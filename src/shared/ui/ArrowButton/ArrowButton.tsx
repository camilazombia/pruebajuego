import React from 'react';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './ArrowButton.module.css';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  size?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction = 'left',
  size = 60,
  className,
  onClick,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const Icon = direction === 'left' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <motion.button
      className={`${styles.arrowButton} ${className ?? ''}`}
      style={{ width: size, height: size }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 2 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      <div className={styles.innerCircle}>
        <Icon className={styles.icon} />
      </div>
    </motion.button>
  );
};

export default ArrowButton;
