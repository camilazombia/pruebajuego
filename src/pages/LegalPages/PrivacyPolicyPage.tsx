import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';

export const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Política de Privacidad</h1>
        
        <div className={styles.content}>
          <section>
            <h2>1. Introducción</h2>
            <p>
              En Mundo Mágico Inglés, proteger la privacidad de nuestros usuarios, especialmente 
              la de los menores de edad, es nuestra máxima prioridad. Esta Política de Privacidad 
              describe cómo recopilamos, utilizamos, protegemos y compartimos su información personal.
            </p>
          </section>

          <section>
            <h2>2. Información que Recopilamos</h2>
            <p>Recopilamos información en las siguientes categorías:</p>
            <ul>
              <li><strong>Información de Registro:</strong> Nombre, correo electrónico, edad, contraseña</li>
              <li><strong>Información de Uso:</strong> Progreso en cursos, puntuaciones, tiempo de actividad</li>
              <li><strong>Información Técnica:</strong> Dirección IP, tipo de dispositivo, navegador</li>
              <li><strong>Información de Pago:</strong> Datos de transacciones (procesados de forma segura)</li>
            </ul>
          </section>

          <section>
            <h2>3. Uso de la Información</h2>
            <p>Utilizamos su información para:</p>
            <ul>
              <li>Proporcionar y mejorar nuestros servicios educativos</li>
              <li>Personalizar su experiencia de aprendizaje</li>
              <li>Enviar notificaciones sobre progresos y actualizaciones</li>
              <li>Garantizar la seguridad de nuestra plataforma</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2>4. Protección de Menores</h2>
            <p>
              Nuestros servicios están diseñados para menores de edad. Requerimos consentimiento parental 
              para usuarios menores de 13 años. No vendemos información personal de menores a terceros.
            </p>
          </section>

          <section>
            <h2>5. Seguridad de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información 
              contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </section>

          <section>
            <h2>6. Cookies</h2>
            <p>
              Utilizamos cookies para mejorar su experiencia. Puede controlar las preferencias de cookies 
              en la configuración de su navegador.
            </p>
          </section>

          <section>
            <h2>7. Derechos del Usuario</h2>
            <p>Tiene derecho a:</p>
            <ul>
              <li>Acceder a su información personal</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de su cuenta</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2>8. Contacto</h2>
            <p>
              Para consultas sobre privacidad, contáctenos en: <strong>privacidad@mundomagicoinges.com</strong>
            </p>
          </section>

          <section>
            <h2>9. Cambios en la Política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política. Los cambios serán notificados 
              a través de email o en nuestra plataforma.
            </p>
          </section>

          <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
