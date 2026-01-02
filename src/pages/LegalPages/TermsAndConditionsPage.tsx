import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';

export const TermsAndConditionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Términos y Condiciones de Uso</h1>
        
        <div className={styles.content}>
          <section>
            <h2>1. Aceptación de Términos</h2>
            <p>
              Al acceder y utilizar Mundo Mágico Inglés, acepta estar vinculado por estos Términos 
              y Condiciones. Si no está de acuerdo, por favor no utilice nuestros servicios.
            </p>
          </section>

          <section>
            <h2>2. Descripción del Servicio</h2>
            <p>
              Mundo Mágico Inglés es una plataforma de aprendizaje de inglés diseñada para niños. 
              Ofrecemos contenido educativo interactivo, juegos, actividades y seguimiento de progreso.
            </p>
          </section>

          <section>
            <h2>3. Elegibilidad</h2>
            <p>
              Los menores de 13 años requieren consentimiento parental. Los padres/tutores son 
              responsables del monitoreo del uso de la plataforma por parte de los menores.
            </p>
          </section>

          <section>
            <h2>4. Cuenta de Usuario</h2>
            <p>
              Usted es responsable de mantener la confidencialidad de su contraseña y de toda 
              actividad que ocurra en su cuenta. Notifíquenos inmediatamente de cualquier acceso no autorizado.
            </p>
          </section>

          <section>
            <h2>5. Uso Aceptable</h2>
            <p>Se compromete a NO:</p>
            <ul>
              <li>Usar la plataforma para actividades ilegales o dañinas</li>
              <li>Acosar, amenazar o difamar a otros usuarios</li>
              <li>Intentar acceder sin autorización a sistemas de la plataforma</li>
              <li>Distribuir virus o código malicioso</li>
              <li>Copiar contenido protegido por derechos de autor</li>
            </ul>
          </section>

          <section>
            <h2>6. Contenido Generado por Usuarios</h2>
            <p>
              Cualquier contenido que cree en la plataforma debe ser apropiado, legal y respetuoso. 
              Nos reservamos el derecho de eliminar contenido que viole estos términos.
            </p>
          </section>

          <section>
            <h2>7. Limitación de Responsabilidad</h2>
            <p>
              Mundo Mágico Inglés se proporciona "tal cual". No somos responsables por:
            </p>
            <ul>
              <li>Pérdida de datos o información</li>
              <li>Interrupciones del servicio</li>
              <li>Daños indirectos o consecuentes</li>
              <li>Cambios en el contenido o servicios</li>
            </ul>
          </section>

          <section>
            <h2>8. Cancelación y Terminación</h2>
            <p>
              Puede cancelar su cuenta en cualquier momento. Nos reservamos el derecho de suspender 
              o terminar cuentas que violen estos términos.
            </p>
          </section>

          <section>
            <h2>9. Cambios en los Términos</h2>
            <p>
              Podemos actualizar estos términos en cualquier momento. Se le notificará de cambios 
              significativos por correo electrónico.
            </p>
          </section>

          <section>
            <h2>10. Ley Aplicable</h2>
            <p>
              Estos términos se rigen por las leyes locales de España y la Unión Europea.
            </p>
          </section>

          <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
