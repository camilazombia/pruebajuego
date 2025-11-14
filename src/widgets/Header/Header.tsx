import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../../assets/svg/logo.svg';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <img src={Logo} alt="Mundo Mágico Inglés" className={styles.logo} />

        {/* Menu Items */}
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
        </nav>

        {/* User Section */}
        <div className={styles.userSection}>
          <button className={styles.exitButton}>
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
