import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './LandingPage.module.css';

// SVGs
import Bunny from '../../assets/svg/Bunny';
import RocketScene from '../../assets/svg/RocketScene';
import Logo from '../../assets/svg/logo.svg'; // ✅ Nuevo logo importado


// Botones reutilizables
import { Button } from '../../shared/ui/Button/Button';
import { SoundButton } from '../../shared/ui/SoundButton/SoundButton';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* NAV */}
      <header className={styles.navbar}>
        <div className={styles.navContent}>
          {/* Logo SVG */}
          <img src={Logo} alt="Mundo Mágico Inglés Logo" className={styles.logoSvg} />
        </div>
      </header>

      {/* HERO */}
<section className={styles.hero}>
  <div className={styles.heroInner}>
    <div className={styles.heroRow}>
      {/* Conejo grande, a la izquierda y alineado con el texto */}
      <motion.div
        className={styles.bunnySide}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        aria-hidden="true"
      >
        <Bunny className={styles.bunnySvg} />
      </motion.div>

      {/* Texto a la derecha */}
      <motion.div
        className={styles.heroCopy}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className={styles.heroTitle}>
          APRENDE INGLÉS
          <br />
          <span className={styles.heroTitleEmph}>JUGANDO</span> Y
          <br />
          EXPLORANDO
        </h1>

        <p className={styles.heroSub}>
          Una aventura mágica diseñada
          <br />
          especialmente para niños.
        </p>

        <div className={styles.heroActions}>
          <Button
            variant="primary"
            size="md"
            className={styles.ctaPrimary}
            onClick={() => navigate('/login')}
          >
            <span className={styles.bullet}>●</span> COMENZAR
          </Button>

          <SoundButton size="md" soundSrc="/sounds/hero-intro.mp3" />
        </div>
      </motion.div>
    </div>
  </div>
</section>


      {/* POR QUÉ NOS AMAN */}
      <section className={styles.why}>
        <div className={styles.whyInner}>
          <h2 className={styles.whyTitle}>
            ¿POR QUÉ LOS NIÑOS AMAN
            <br />
            NUESTRA PLATAFORMA?
          </h2>

          <div className={styles.grid}>
            {/* Columna izquierda */}
            <div className={styles.col}>
              <div className={styles.item}>
                <div className={styles.itemTitle}>
                  AVENTURAS
                  <br />
                  INCREÍBLES
                </div>
                <p className={styles.itemDesc}>
                  Explora mundos mágicos
                  <br />
                  mientras aprendes inglés.
                </p>
                <SoundButton size="sm" soundSrc="/sounds/adventure.mp3" />
              </div>

              <div className={styles.item}>
                <div className={styles.itemTitle}>
                  SIGUE TU
                  <br />
                  PROGRESO
                </div>
                <p className={styles.itemDesc}>
                  Completa misiones
                  <br />
                  y mide tu avance.
                </p>
                <SoundButton size="sm" soundSrc="/sounds/progress.mp3" />
              </div>
            </div>

            {/* Ilustración central */}
            <div className={styles.centerArt} aria-hidden="true">
              <motion.div
                className={styles.artPiece}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <RocketScene size={520} className={styles.artPiece} />
              </motion.div>
            </div>

            {/* Columna derecha */}
            <div className={styles.col}>
              <div className={styles.item}>
                <div className={styles.itemTitle}>
                  GANA
                  <br />
                  RECOMPENSAS
                </div>
                <p className={styles.itemDesc}>
                  Colecciona trofeos y desbloquea
                  <br />
                  artículos especiales.
                </p>
                <SoundButton size="sm" soundSrc="/sounds/reward.mp3" />
              </div>

              <div className={styles.item}>
                <div className={styles.itemTitle}>
                  APRENDE
                  <br />
                  JUGANDO
                </div>
                <p className={styles.itemDesc}>
                  Actividades divertidas
                  <br />
                  diseñadas para niños.
                </p>
                <SoundButton size="sm" soundSrc="/sounds/learn.mp3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.copy}>
            © 2025 Mundo Mágico Inglés. Todos los derechos reservados.
          </p>

          <ul className={styles.links}>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Términos y Condiciones de Uso</a></li>
            <li><a href="#">Política de Cookies</a></li>
            <li><a href="#">Aviso Legal</a></li>
            <li><a href="#">Política de Protección Infantil</a></li>
            <li><a href="#">Política de Contenidos Educativos</a></li>
            <li><a href="#">Accesibilidad Digital</a></li>
            <li><a href="#">Contacto / Soporte</a></li>
            <li><a href="#">Acerca de / Sobre Nosotros</a></li>
            <li><a href="#">Preguntas Frecuentes (FAQ)</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
