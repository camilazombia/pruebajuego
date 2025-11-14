import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './WelcomePage.module.css';

// UI
import Logo from '../../assets/svg/logo.svg';
import { Button } from '../../shared/ui/Button/Button';
import { SoundButton } from '../../shared/ui/SoundButton/SoundButton';

export default function WelcomePage() {
  const location = useLocation();
  const childName = location.state?.childName || 'Aventurero';
  const selectedAvatar = location.state?.selectedAvatar || { emoji: '👦' };

  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/home', { replace: true });
  };

  return (
    <div className={styles.page}>
      {/* HEADER con logo centrado */}
      <header className={styles.navbar}>
        <div className={styles.navCenter}>
          <img src={Logo} alt="Mundo Mágico Inglés" className={styles.logoSvg} />
        </div>
      </header>

      {/* MAIN */}
      <main className={styles.main}>
        <motion.section
          className={styles.card}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          aria-label="Bienvenida"
        >
          {/* Avatar del Niño */}
          <motion.div
            className={styles.avatarDisplay}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className={styles.avatarLarge}>{selectedAvatar.emoji}</span>
          </motion.div>

          {/* Título de bienvenida */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            ¡Bienvenido, <span className={styles.childName}>{childName}</span>!
          </motion.h1>

          {/* Sound Button */}
          <motion.div
            className={styles.soundButtonContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <SoundButton />
          </motion.div>

          {/* Subtítulo */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Tu aventura mágica está a punto de comenzar. Prepárate para explorar mundos increíbles, completar misiones emocionantes y aprender inglés de una forma divertida que nunca habías imaginado.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Button
              className={styles.cta}
              onClick={handleContinue}
            >
              ¡COMENZAR AVENTURA!
            </Button>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
