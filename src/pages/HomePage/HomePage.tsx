import React from 'react';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <section className={styles.card} aria-label="Home">
        <h1 className={styles.title}>Inicio</h1>
        <p className={styles.subtitle}>Bienvenido a tu panel. Aquí verás tus misiones, recompensas y progreso.</p>
      </section>
    </div>
  );
};

export default HomePage;
