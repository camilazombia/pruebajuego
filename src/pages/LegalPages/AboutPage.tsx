import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Acerca de Mundo Mágico Inglés</h1>
        
        <div className={styles.content}>
          <section>
            <h2>🌟 Nuestra Misión</h2>
            <p>
              Hacer que el aprendizaje del inglés sea una aventura mágica, divertida y efectiva 
              para niños de todas las edades. Creemos que cada niño tiene el potencial de convertirse 
              en un hablante de inglés fluido y confiado.
            </p>
          </section>

          <section>
            <h2>👥 Quiénes Somos</h2>
            <p>
              Somos un equipo apasionado de educadores, diseñadores y tecnólogos dedicados a crear 
              la mejor experiencia de aprendizaje de idiomas para niños. Con más de 50 años de experiencia 
              combinada en educación, hemos desarrollado una metodología única que combina:
            </p>
            <ul>
              <li>Pedagogía moderna basada en investigación</li>
              <li>Tecnología de última generación</li>
              <li>Diseño centrado en el usuario</li>
              <li>Pasión por la educación infantil</li>
            </ul>
          </section>

          <section>
            <h2>🎯 Valores</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.value}>
                <h3>Innovación</h3>
                <p>Constantemente exploramos nuevas formas de enseñar</p>
              </div>
              <div className={styles.value}>
                <h3>Seguridad</h3>
                <p>La protección de nuestros estudiantes es prioritaria</p>
              </div>
              <div className={styles.value}>
                <h3>Calidad</h3>
                <p>Excelencia en cada aspecto de nuestro servicio</p>
              </div>
              <div className={styles.value}>
                <h3>Diversidad</h3>
                <p>Inclusión y respeto por todas las diferencias</p>
              </div>
              <div className={styles.value}>
                <h3>Diversión</h3>
                <p>El aprendizaje debe ser alegre y emocionante</p>
              </div>
              <div className={styles.value}>
                <h3>Impacto</h3>
                <p>Transformamos vidas a través de la educación</p>
              </div>
            </div>
          </section>

          <section>
            <h2>📊 Por Números</h2>
            <ul>
              <li>+100,000 estudiantes activos</li>
              <li>+500 horas de contenido educativo</li>
              <li>+50 años de experiencia combinada en educación</li>
              <li>+30 países con usuarios</li>
              <li>+15 idiomas soportados</li>
              <li>99.9% de disponibilidad de plataforma</li>
            </ul>
          </section>

          <section>
            <h2>🏆 Reconocimientos</h2>
            <ul>
              <li>Premio a la Mejor Plataforma Educativa Digital 2024</li>
              <li>Certificación COPPA - Protección de Menores en Línea</li>
              <li>Cumplimiento RGPD - Protección de Datos UE</li>
              <li>Acceso Nivel AA WCAG 2.1 - Accesibilidad Web</li>
              <li>Socio Oficial de Cambridge English</li>
            </ul>
          </section>

          <section>
            <h2>📱 Nuestras Características</h2>
            <ul>
              <li>Aprendizaje adaptativo con IA</li>
              <li>Contenido gamificado y divertido</li>
              <li>Seguimiento del progreso en tiempo real</li>
              <li>Comunidad segura de estudiantes</li>
              <li>Acceso a maestros certificados</li>
              <li>Certificados de logros verificables</li>
              <li>Disponible en dispositivos móviles y desktop</li>
              <li>Sin publicidad ni contenido inapropiado</li>
            </ul>
          </section>

          <section>
            <h2>🌍 Nuestro Alcance Global</h2>
            <p>
              Mundo Mágico Inglés opera en más de 30 países, sirviendo a estudiantes de diversas 
              culturas y antecedentes. Nuestro equipo es verdaderamente internacional, con miembros 
              en América Latina, Europa, Asia y África.
            </p>
          </section>

          <section>
            <h2>🚀 Visión Futura</h2>
            <p>
              Nos comprometemos a:
            </p>
            <ul>
              <li>Expandir a más países y idiomas</li>
              <li>Integrar tecnología de IA más avanzada</li>
              <li>Crear contenido más personalizado</li>
              <li>Desarrollar métodos innovadores de evaluación</li>
              <li>Mantener la plataforma 100% segura para menores</li>
              <li>Ser carbon-neutral en 2025</li>
            </ul>
          </section>

          <section>
            <h2>📞 Contáctanos</h2>
            <p>
              Nos encantaría saber de ti. Si tienes preguntas o comentarios sobre nuestra empresa, 
              contáctanos en: <strong>info@mundomagicoinges.com</strong>
            </p>
          </section>

          <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
