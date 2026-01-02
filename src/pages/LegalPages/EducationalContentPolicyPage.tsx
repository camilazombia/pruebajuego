import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';

export const EducationalContentPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Política de Contenidos Educativos</h1>
        
        <div className={styles.content}>
          <section>
            <h2>1. Estándares de Calidad</h2>
            <p>
              Todo el contenido educativo en Mundo Mágico Inglés cumple con los estándares 
              internacionales de enseñanza de idiomas:
            </p>
            <ul>
              <li>Marco Europeo Común de Referencia (MCER)</li>
              <li>Estándares de Cambridge</li>
              <li>Pedagogía moderna basada en investigación</li>
              <li>Métodos de aprendizaje lúdico (gamified learning)</li>
            </ul>
          </section>

          <section>
            <h2>2. Desarrollo de Contenidos</h2>
            <p>
              Nuestro equipo de creadores incluye:
            </p>
            <ul>
              <li>Maestros certificados de inglés</li>
              <li>Especialistas en pedagogía infantil</li>
              <li>Diseñadores de experiencia educativa</li>
              <li>Expertos en adquisición de idiomas</li>
            </ul>
          </section>

          <section>
            <h2>3. Estructura de Aprendizaje</h2>
            <p>
              Los contenidos se organizan por:
            </p>
            <ul>
              <li><strong>Niveles:</strong> Adaptados a edad y competencia</li>
              <li><strong>Habilidades:</strong> Escucha, lectura, escritura, conversación</li>
              <li><strong>Temas:</strong> Vida cotidiana, viajes, naturaleza, ciencia</li>
              <li><strong>Progresión:</strong> Gradual y coherente</li>
            </ul>
          </section>

          <section>
            <h2>4. Precisión Lingüística</h2>
            <p>
              Todo el contenido es revisado por hablantes nativos de inglés para garantizar:
            </p>
            <ul>
              <li>Pronunciación correcta</li>
              <li>Gramática precisa</li>
              <li>Vocabulario apropiado por nivel</li>
              <li>Contexto cultural auténtico</li>
            </ul>
          </section>

          <section>
            <h2>5. Seguridad del Contenido</h2>
            <p>
              Verificamos que todo el contenido sea:
            </p>
            <ul>
              <li>Apropiado para la edad</li>
              <li>Libre de sesgo cultural o discriminación</li>
              <li>Respetuoso con diversidades</li>
              <li>Libre de violencia, sexualidad o lenguaje ofensivo</li>
            </ul>
          </section>

          <section>
            <h2>6. Actualización de Contenidos</h2>
            <p>
              Revisamos y actualizamos regularmente:
            </p>
            <ul>
              <li>Vocabulario con nuevas palabras en uso</li>
              <li>Expresiones culturalmente relevantes</li>
              <li>Temas de interés actual</li>
              <li>Recursos multimedia</li>
            </ul>
          </section>

          <section>
            <h2>7. Diversidad e Inclusión</h2>
            <p>
              Nos comprometemos a reflejar la diversidad del mundo:
            </p>
            <ul>
              <li>Representación de diferentes culturas</li>
              <li>Inclusión de diferentes estructuras familiares</li>
              <li>Personas con diferentes capacidades</li>
              <li>Igualdad de género en todos los contenidos</li>
            </ul>
          </section>

          <section>
            <h2>8. Retroalimentación Educativa</h2>
            <p>
              Los padres y educadores pueden proporcionar retroalimentación sobre:
            </p>
            <ul>
              <li>Calidad del contenido</li>
              <li>Dificultad y progresión</li>
              <li>Relevancia educativa</li>
              <li>Preocupaciones de seguridad</li>
            </ul>
          </section>

          <section>
            <h2>9. Certificaciones</h2>
            <p>
              Nuestro contenido está alineado con:
            </p>
            <ul>
              <li>Planes de estudio nacionales</li>
              <li>Exámenes internacionales de Cambridge</li>
              <li>Estándares TOEFL y IELTS</li>
              <li>Requisitos educativos modernos</li>
            </ul>
          </section>

          <section>
            <h2>10. Contacto</h2>
            <p>
              Para comentarios sobre contenido educativo: <strong>content@mundomagicoinges.com</strong>
            </p>
          </section>

          <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default EducationalContentPolicyPage;
