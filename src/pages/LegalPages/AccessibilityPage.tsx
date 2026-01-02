import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';

export const AccessibilityPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Accesibilidad Digital</h1>
        
        <div className={styles.content}>
          <section>
            <h2>1. Compromiso con la Accesibilidad</h2>
            <p>
              Mundo Mágico Inglés se compromete a proporcionar una plataforma accesible 
              para todos los usuarios, incluyendo aquellos con discapacidades.
            </p>
          </section>

          <section>
            <h2>2. Estándares de Accesibilidad</h2>
            <p>
              Nos adherimos a:
            </p>
            <ul>
              <li><strong>WCAG 2.1:</strong> Web Content Accessibility Guidelines (nivel AA)</li>
              <li><strong>ADA:</strong> Americans with Disabilities Act</li>
              <li><strong>AODA:</strong> Accessibility for Ontarians with Disabilities Act</li>
              <li><strong>Directiva 2016/2102:</strong> Accesibilidad web (UE)</li>
            </ul>
          </section>

          <section>
            <h2>3. Características de Accesibilidad</h2>
            <p>
              Nuestro sitio incluye:
            </p>
            <ul>
              <li><strong>Navegación por Teclado:</strong> Funcionalidad completa sin ratón</li>
              <li><strong>Lector de Pantalla:</strong> Compatible con NVDA, JAWS, VoiceOver</li>
              <li><strong>Contraste Alto:</strong> Colores que mejoran la legibilidad</li>
              <li><strong>Ampliación de Texto:</strong> Hasta 200% sin pérdida de funcionalidad</li>
              <li><strong>Subtítulos:</strong> Para todos los videos educativos</li>
              <li><strong>Transcripciones:</strong> De contenido de audio</li>
            </ul>
          </section>

          <section>
            <h2>4. Dislexia y Dificultades de Lectura</h2>
            <p>
              Ofrecemos:
            </p>
            <ul>
              <li>Fuentes dyslexia-friendly</li>
              <li>Espaciado ajustable</li>
              <li>Modo de alto contraste</li>
              <li>Soporte de texto a voz</li>
              <li>Diccionarios integrados</li>
            </ul>
          </section>

          <section>
            <h2>5. Deficiencias Motoras</h2>
            <p>
              Para usuarios con limitaciones motoras:
            </p>
            <ul>
              <li>Navegación completa por teclado</li>
              <li>Control por voz</li>
              <li>Botones grandes y espaciados</li>
              <li>Sin temporizadores estrictos (flexibles)</li>
              <li>Compatibilidad con dispositivos asistivos</li>
            </ul>
          </section>

          <section>
            <h2>6. Deficiencias Visuales</h2>
            <p>
              Proporcionamos:
            </p>
            <ul>
              <li>Descripciones de todas las imágenes</li>
              <li>Modo de alto contraste</li>
              <li>Ampliación de hasta 400%</li>
              <li>Lectura en pantalla completa</li>
              <li>Navegación lógica y coherente</li>
            </ul>
          </section>

          <section>
            <h2>7. Deficiencias Auditivas</h2>
            <p>
              Ofrecemos:
            </p>
            <ul>
              <li>Subtítulos precisos y sincronizados</li>
              <li>Descripción de audio de eventos sonoros importantes</li>
              <li>Transcripciones completas</li>
              <li>Sin dependencia única de audio</li>
            </ul>
          </section>

          <section>
            <h2>8. Tecnologías Asistivas Compatibles</h2>
            <p>
              Nuestra plataforma es compatible con:
            </p>
            <ul>
              <li>NVDA (NonVisual Desktop Access)</li>
              <li>JAWS (Job Access With Speech)</li>
              <li>VoiceOver (macOS/iOS)</li>
              <li>Narrator (Windows)</li>
              <li>Controles de voz</li>
              <li>Ampliadores de pantalla</li>
            </ul>
          </section>

          <section>
            <h2>9. Pruebas de Accesibilidad</h2>
            <p>
              Realizamos pruebas regulares:
            </p>
            <ul>
              <li>Pruebas automatizadas mensualmente</li>
              <li>Auditorías manuales trimestrales</li>
              <li>Pruebas con usuarios con discapacidades</li>
              <li>Feedback de usuarios permanente</li>
            </ul>
          </section>

          <section>
            <h2>10. Reporte de Problemas de Accesibilidad</h2>
            <p>
              Si encuentras problemas de accesibilidad, contáctanos:
            </p>
            <p>
              <strong>Email:</strong> accessibility@mundomagicoinges.com<br />
              <strong>Teléfono:</strong> +34 XXX XXX XXX<br />
              <strong>Formulario:</strong> En la sección de Contacto
            </p>
          </section>

          <section>
            <h2>11. Mejoras Continuas</h2>
            <p>
              Nos comprometemos a:
            </p>
            <ul>
              <li>Revisar accesibilidad regularmente</li>
              <li>Implementar mejoras según feedback</li>
              <li>Mantenernos actualizados con estándares</li>
              <li>Capacitar a nuestro equipo en accesibilidad</li>
            </ul>
          </section>

          <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;
