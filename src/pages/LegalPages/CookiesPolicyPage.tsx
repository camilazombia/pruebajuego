import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';

export const CookiesPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Política de Cookies</h1>
        
        <div className={styles.content}>
          <section>
            <h2>1. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando 
              visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia de navegación.
            </p>
          </section>

          <section>
            <h2>2. Tipos de Cookies que Utilizamos</h2>
            <ul>
              <li>
                <strong>Cookies de Sesión:</strong> Se eliminan cuando cierras tu navegador
              </li>
              <li>
                <strong>Cookies Persistentes:</strong> Se guardan en tu dispositivo durante un período específico
              </li>
              <li>
                <strong>Cookies de Seguimiento:</strong> Para analizar tu comportamiento de navegación
              </li>
              <li>
                <strong>Cookies de Preferencia:</strong> Para recordar tus configuraciones
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Propósito de las Cookies</h2>
            <p>Usamos cookies para:</p>
            <ul>
              <li>Mantener tu sesión activa</li>
              <li>Recordar tus preferencias de idioma y configuración</li>
              <li>Analizar estadísticas de uso del sitio</li>
              <li>Mejorar el rendimiento de la plataforma</li>
              <li>Proporcionar contenido personalizado</li>
              <li>Proteger contra actividades fraudulentas</li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies de Terceros</h2>
            <p>
              Algunos servicios de terceros (como Google Analytics) pueden establecer cookies 
              en nuestra plataforma. Estos terceros tienen sus propias políticas de privacidad.
            </p>
          </section>

          <section>
            <h2>5. Control de Cookies</h2>
            <p>
              Puedes controlar y eliminar cookies a través de la configuración de tu navegador. 
              Sin embargo, desactivar ciertas cookies puede afectar la funcionalidad de nuestra plataforma.
            </p>
          </section>

          <section>
            <h2>6. Consentimiento</h2>
            <p>
              Al usar nuestra plataforma, consientes el uso de cookies según se describe en esta política. 
              Puedes cambiar tu consentimiento en cualquier momento a través de la configuración de cookies.
            </p>
          </section>

          <section>
            <h2>7. Cookies y Menores</h2>
            <p>
              Para usuarios menores de edad, limitamos el uso de cookies solo a aquellas necesarias 
              para la funcionalidad de la plataforma, sin cookies de seguimiento o publicidad.
            </p>
          </section>

          <section>
            <h2>8. Contacto</h2>
            <p>
              Para preguntas sobre cookies, contáctanos en: <strong>cookies@mundomagicoinges.com</strong>
            </p>
          </section>

          <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicyPage;
