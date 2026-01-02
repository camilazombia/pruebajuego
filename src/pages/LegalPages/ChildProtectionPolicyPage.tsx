import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';

export const ChildProtectionPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Política de Protección Infantil</h1>
        
        <div className={styles.content}>
          <section>
            <h2>1. Compromiso con la Protección Infantil</h2>
            <p>
              Mundo Mágico Inglés se compromete firmemente a crear un ambiente seguro, 
              apropiado y positivo para todos los niños que utilizan nuestra plataforma.
            </p>
          </section>

          <section>
            <h2>2. Diseño Centrado en Menores</h2>
            <p>
              Todo nuestro contenido y funcionalidades están diseñados teniendo en mente el bienestar 
              de los menores:
            </p>
            <ul>
              <li>Sin contenido violento, sexual o inapropiado</li>
              <li>Sin publicidad dirigida a menores</li>
              <li>Sin recopilación innecesaria de datos personales</li>
              <li>Con interfaces intuitivas y seguras</li>
              <li>Con controles parentales robustos</li>
            </ul>
          </section>

          <section>
            <h2>3. Consentimiento Parental</h2>
            <p>
              Para usuarios menores de 13 años, requerimos consentimiento verificable de los padres/tutores 
              antes de recopilar cualquier información personal.
            </p>
          </section>

          <section>
            <h2>4. Protección de Datos de Menores</h2>
            <p>
              Aplicamos medidas especiales para proteger la información de menores:
            </p>
            <ul>
              <li>Cumplimiento con COPPA (EE.UU.) y RGPD (UE)</li>
              <li>No vendemos datos de menores a terceros</li>
              <li>Acceso limitado a datos por parte del personal</li>
              <li>Encriptación de datos sensibles</li>
              <li>Retención limitada de datos</li>
            </ul>
          </section>

          <section>
            <h2>5. Interacción Segura</h2>
            <p>
              Para proteger a los menores de contacto inapropiado:
            </p>
            <ul>
              <li>No hay funcionalidades de chat privado con extraños</li>
              <li>Las interacciones se monitorean automáticamente</li>
              <li>Los padres tienen control sobre la comunicación</li>
              <li>Contenido moderado por humanos regularmente</li>
              <li>Reportes fáciles de uso inapropiado</li>
            </ul>
          </section>

          <section>
            <h2>6. Educación en Seguridad Digital</h2>
            <p>
              Proporcionamos recursos educativos sobre:
            </p>
            <ul>
              <li>Seguridad en línea y privacidad</li>
              <li>Ciberseguridad para niños</li>
              <li>Uso responsable de internet</li>
              <li>Reconocimiento de amenazas en línea</li>
            </ul>
          </section>

          <section>
            <h2>7. Reportes de Abuso</h2>
            <p>
              Contamos con un sistema de reporte confidencial y seguro para que niños, padres y personal 
              reporten contenido inapropiado o comportamiento abusivo.
            </p>
            <p>
              <strong>Línea de Denuncia:</strong> abuse@mundomagicoinges.com
            </p>
          </section>

          <section>
            <h2>8. Controles Parentales</h2>
            <p>
              Los padres tienen acceso a:
            </p>
            <ul>
              <li>Panel de control del tiempo de pantalla</li>
              <li>Restricciones de contenido</li>
              <li>Historial de actividad</li>
              <li>Reportes de progreso educativo</li>
              <li>Configuración de privacidad</li>
            </ul>
          </section>

          <section>
            <h2>9. Cumplimiento Normativo</h2>
            <p>
              Nos adherimos a todas las regulaciones de protección de menores, incluyendo:
            </p>
            <ul>
              <li>RGPD (Reglamento General de Protección de Datos - UE)</li>
              <li>COPPA (Ley de Protección de la Privacidad Infantil en Línea - EE.UU.)</li>
              <li>LGPD (Ley General de Protección de Datos - Brasil)</li>
              <li>Leyes locales de protección infantil</li>
            </ul>
          </section>

          <section>
            <h2>10. Contacto</h2>
            <p>
              Para preguntas sobre seguridad infantil: <strong>safety@mundomagicoinges.com</strong>
            </p>
          </section>

          <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default ChildProtectionPolicyPage;
