import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';

export const LegalNoticePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Aviso Legal</h1>
        
        <div className={styles.content}>
          <section>
            <h2>1. Identificación</h2>
            <p>
              <strong>Nombre Comercial:</strong> Mundo Mágico Inglés<br />
              <strong>Tipo de Entidad:</strong> Empresa Educativa Digital<br />
              <strong>Domicilio:</strong> Madrid, España<br />
              <strong>Email de Contacto:</strong> info@mundomagicoinges.com
            </p>
          </section>

          <section>
            <h2>2. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de Mundo Mágico Inglés (textos, imágenes, videos, juegos, gráficos, logos) 
              está protegido por derechos de autor. No está permitido reproducir, distribuir o modificar 
              sin autorización explícita.
            </p>
          </section>

          <section>
            <h2>3. Acceso a la Plataforma</h2>
            <p>
              Nos reservamos el derecho de modificar, suspender o interrumpir el acceso a cualquier parte 
              de la plataforma sin previo aviso. No somos responsables por:
            </p>
            <ul>
              <li>Indisponibilidad temporal o permanente del servicio</li>
              <li>Pérdida de datos durante interrupciones</li>
              <li>Errores o fallas técnicas</li>
            </ul>
          </section>

          <section>
            <h2>4. Enlaces a Terceros</h2>
            <p>
              Nuestra plataforma puede contener enlaces a sitios web de terceros. No somos responsables 
              por el contenido, la precisión o las prácticas de privacidad de estos sitios externos.
            </p>
          </section>

          <section>
            <h2>5. Limitación de Responsabilidad</h2>
            <p>
              En la máxima medida permitida por la ley, Mundo Mágico Inglés no será responsable por:
            </p>
            <ul>
              <li>Daños directos, indirectos o consecuentes</li>
              <li>Pérdida de ganancias o datos</li>
              <li>Interrupción de servicios</li>
              <li>Errores en el contenido educativo</li>
            </ul>
          </section>

          <section>
            <h2>6. Renuncia de Garantías</h2>
            <p>
              El contenido se proporciona "tal cual" sin garantías de ningún tipo, 
              expresas o implícitas, incluida la garantía de idoneidad para un propósito específico.
            </p>
          </section>

          <section>
            <h2>7. Indemnización</h2>
            <p>
              Usted acepta indemnizar y eximir de responsabilidad a Mundo Mágico Inglés de cualquier 
              reclamación, daño o gasto que surja de su uso de la plataforma.
            </p>
          </section>

          <section>
            <h2>8. Ley Aplicable</h2>
            <p>
              Este aviso legal se rige por las leyes de España y la Unión Europea, 
              particularmente por la RGPD.
            </p>
          </section>

          <section>
            <h2>9. Jurisdicción</h2>
            <p>
              Los tribunales de Madrid, España, tendrán jurisdicción exclusiva para resolver 
              cualquier disputa relacionada con este aviso legal.
            </p>
          </section>

          <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticePage;
