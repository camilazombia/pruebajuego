import React from 'react';
import styles from './HelpPage.module.css';

const HelpPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <section className={styles.card} aria-label="Ayuda">
        <h1 className={styles.title}>Ayuda</h1>
        <p className={styles.text}>
          Aquí puedes encontrar información útil y preguntas frecuentes para ayudarte a usar la aplicación.
        </p>

        <div className={styles.grid}>
          <div className={styles.block}>
            <h3>¿Cómo inicio?</h3>
            <p>Comienza en la pantalla de Inicio y explora los mundos. Si necesitas acceso, pide el código a tu tutor.</p>
          </div>
          <div className={styles.block}>
            <h3>Soporte</h3>
            <p>Si necesitas ayuda adicional, escribe a <strong>soporte@example.com</strong>.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
