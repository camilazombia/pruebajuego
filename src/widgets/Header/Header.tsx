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
          <button
            className={styles.coinsBadge}
            aria-label={`${magicCoins} monedas magicas - Ir a la tienda`}
            onClick={() => navigate('/rewards')}
            title="Ir a la Tienda"
          >
            <span className={styles.coinIcon} aria-hidden="true">&#129689;</span>
            <span className={styles.coinCount}>{magicCoins}</span>
            <span className={styles.shopHint} aria-hidden="true">&#128722;</span>
          </button>
          <button className={styles.exitButton}>
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
