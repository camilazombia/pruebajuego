import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../../features/progress/context/ProgressContext';
import styles from './Header.module.css';
import Logo from '../../assets/svg/logo.svg';

export default function Header() {
  const navigate = useNavigate();
  const { magicCoins } = useProgressStore();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <img src={Logo} alt="Mundo Magico Ingles" className={styles.logo} />

        <nav className={styles.nav}>
          <button onClick={() => navigate('/home')} className={styles.navItem}>
            Inicio
          </button>
          <button onClick={() => navigate('/worlds')} className={styles.navItem}>
            Mundos
          </button>
          <button onClick={() => navigate('/rewards')} className={styles.navItem}>
            Premios
          </button>
          <button onClick={() => navigate('/review')} className={styles.navItem}>
            Repaso
          </button>
          <button onClick={() => navigate('/parent-zone')} className={styles.navItem}>
            Zona de Padres
          </button>
        </nav>

        <div className={styles.userSection}>
          <div className={styles.coinsBadge} aria-label={`${magicCoins} monedas magicas`}>
            <span className={styles.coinIcon} aria-hidden="true">&#129689;</span>
            <span className={styles.coinCount}>{magicCoins}</span>
          </div>
          <button className={styles.exitButton}>
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
