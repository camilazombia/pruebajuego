import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import styles from './WelcomePage.module.css';

// UI
import Logo from '../../assets/svg/logo.svg';
import { Button } from '../../shared/ui/Button/Button';

export default function WelcomePage() {
  const location = useLocation();
  const childName = location.state?.childName || 'Aventurero';
  const selectedAvatar = location.state?.selectedAvatar || { emoji: '👦' };

  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/home', { replace: true });
  };

  return (
    <>
    <OrientationAlert />
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
          {/* Título de bienvenida */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            ¡Bienvenido, <span className={styles.childName}>{childName}</span>!
          </motion.h1>

          {/* Video Section */}
          <motion.div
            className={styles.videoSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <video
              className={styles.video}
              controls
              controlsList="nodownload"
              poster="/assets/videos/welcome-poster.jpg"
            >
              <source src="/assets/videos/welcome.mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
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
    </>
  );
}
