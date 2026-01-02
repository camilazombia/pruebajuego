import React from 'react';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './ArrowButton.module.css';

interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'left' | 'right';
  size?: number;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction = 'left',
  size = 60,
  className,
  ...props
}) => {
  const Icon = direction === 'left' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <motion.button
      className={`${styles.arrowButton} ${className || ''}`}
      style={{ width: size, height: size }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 2 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div className={styles.innerCircle}>
        <Icon className={styles.icon} />
      </div>
    </motion.button>
  );
};

export default ArrowButton;
