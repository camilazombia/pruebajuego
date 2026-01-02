import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './OrientationAlert.module.css';
import rotateGif from '../../../assets/svg/rotate.gif';

export const OrientationAlert: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioPlayedRef = useRef(false);

  useEffect(() => {
    // Detectar si es mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };

    // Detectar orientación
    const checkOrientation = () => {
      const isPort = window.innerHeight > window.innerWidth;
      setIsPortrait(isPort);
    };

    checkMobile();
    checkOrientation();

    // Event listeners
    window.addEventListener('orientationchange', checkOrientation);
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('orientationchange', checkOrientation);
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  // Reproducir sonido solo una vez cuando entra en orientación vertical
  useEffect(() => {
    if (isPortrait && isMobile && !audioPlayedRef.current) {
      audioPlayedRef.current = true;
      const audio = new Audio('/assets/audio/sfx/orientation/rotate.mp3');
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [isPortrait, isMobile]);

  // Solo mostrar en mobile y en orientación vertical
  if (!isMobile || !isPortrait) return null;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* GIF animado de rotación */}
          <motion.div
            className={styles.gifContainer}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={rotateGif} alt="Girar pantalla" className={styles.rotateGif} />
          </motion.div>

          {/* Texto grande y simple */}
          <div className={styles.textSection}>
            <p className={styles.hint}>¡Voltea tu teléfono!</p>
            <p className={styles.subHint}>Gira hacia el lado</p>
          </div>

          {/* Puntos pulsantes */}
          <div className={styles.dots}>
            <motion.div
              className={styles.dot}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className={styles.dot}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className={styles.dot}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrientationAlert;
