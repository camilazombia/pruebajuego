import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: 'General',
    question: '¿Qué es Mundo Mágico Inglés?',
    answer: 'Mundo Mágico Inglés es una plataforma educativa digital diseñada para enseñar inglés a niños de manera divertida e interactiva. Usamos juegos, actividades y contenido multimedia para hacer el aprendizaje emocionante.'
  },
  {
    id: 2,
    category: 'General',
    question: '¿Cuál es la edad recomendada?',
    answer: 'Nuestra plataforma está diseñada para niños de 4 a 16 años. Tenemos contenido adaptado a diferentes niveles de edad y competencia en inglés.'
  },
  {
    id: 3,
    category: 'General',
    question: '¿Puedo probar antes de pagar?',
    answer: 'Sí, ofrecemos una prueba gratuita de 14 días donde puedes acceder a todas las características. No se requiere tarjeta de crédito.'
  },
  {
    id: 4,
    category: 'Suscripción',
    question: '¿Cuánto cuesta la suscripción?',
    answer: 'Ofrecemos varios planes: Básico (€9.99/mes), Premium (€19.99/mes) y Familia (€34.99/mes para hasta 4 niños). Descuentos disponibles con planes anuales.'
  },
  {
    id: 5,
    category: 'Suscripción',
    question: '¿Puedo cancelar en cualquier momento?',
    answer: 'Sí, puedes cancelar tu suscripción en cualquier momento sin penalizaciones. La cancelación se hará efectiva al final de tu ciclo de facturación actual.'
  },
  {
    id: 6,
    category: 'Suscripción',
    question: '¿Se ofrecen descuentos?',
    answer: 'Sí, ofrecemos descuentos de hasta 30% en planes anuales, y descuentos especiales para escuelas e instituciones educativas.'
  },
  {
    id: 7,
    category: 'Técnico',
    question: '¿Qué dispositivos son compatibles?',
    answer: 'Mundo Mágico Inglés funciona en iPhone, iPad, Android, PC y Mac. Recomendamos navegadores actualizados como Chrome, Safari o Firefox.'
  },
  {
    id: 8,
    category: 'Técnico',
    question: '¿Necesito conexión a internet todo el tiempo?',
    answer: 'Sí, la plataforma requiere conexión a internet. Sin embargo, puedes descargar lecciones para acceso offline en la aplicación móvil.'
  },
  {
    id: 9,
    category: 'Técnico',
    question: '¿Cuál es el requisito mínimo de internet?',
    answer: 'Recomendamos una conexión de al menos 2 Mbps para video en definición estándar y 5 Mbps para HD. La mayoría de conexiones modernas son más que suficientes.'
  },
  {
    id: 10,
    category: 'Seguridad',
    question: '¿Es seguro para mis hijos?',
    answer: 'Absolutamente. Cumplimos con COPPA, RGPD y otros estándares de seguridad infantil. Todos nuestros contenidos son moderados y apropiados para la edad.'
  },
  {
    id: 11,
    category: 'Seguridad',
    question: '¿Cómo proteges los datos de mis hijos?',
    answer: 'Usamos encriptación de nivel bancario, almacenamiento seguro en servidores protegidos, y nunca vendemos datos de menores a terceros.'
  },
  {
    id: 12,
    category: 'Seguridad',
    question: '¿Tiene controles parentales?',
    answer: 'Sí, los padres pueden controlar el tiempo de pantalla, restricciones de contenido, ver historial de actividad y recibir reportes de progreso.'
  },
  {
    id: 13,
    category: 'Progreso',
    question: '¿Cómo se mide el progreso?',
    answer: 'Proporcionamos reportes detallados que muestran habilidades aprendidas, puntuaciones de actividades, tiempo estudiado y nivel de competencia actual.'
  },
  {
    id: 14,
    category: 'Progreso',
    question: '¿Se otorgan certificados?',
    answer: 'Sí, cuando completes un nivel, recibes un certificado digital verificable que puedes compartir. También ofrecemos certificados de alineación con Cambridge English.'
  },
  {
    id: 15,
    category: 'Progreso',
    question: '¿Qué pasa si mi hijo se aburre?',
    answer: 'El contenido es altamente variado con juegos, historias, actividades interactivas y desafíos. Si algo no funciona, contáctanos para personalizaciones.'
  },
  {
    id: 16,
    category: 'Padres',
    question: '¿Necesito hablar inglés para ayudar a mi hijo?',
    answer: 'No es necesario. La plataforma es autónoma y el sistema proporciona guías y sugerencias. Puedes ver el progreso sin saber inglés.'
  },
  {
    id: 17,
    category: 'Padres',
    question: '¿Cuánto tiempo debe estudiar mi hijo por día?',
    answer: 'Recomendamos 20-30 minutos diarios para óptimos resultados. La plataforma puede adaptarse a tu horario específico.'
  },
  {
    id: 18,
    category: 'Padres',
    question: '¿Cómo recibo actualizaciones del progreso?',
    answer: 'Puedes recibir reportes por email semanales, mensuales o personalizados. También puedes revisar el progreso anytime en tu panel de control.'
  },
  {
    id: 19,
    category: 'Soporte',
    question: '¿Hay soporte al cliente?',
    answer: 'Sí, contamos con soporte por email (24-48h), chat en vivo (horario comercial) y teléfono (lunes-viernes, 9-18h).'
  },
  {
    id: 20,
    category: 'Soporte',
    question: '¿Qué hacer si tengo problemas técnicos?',
    answer: 'Contáctanos a soporte@mundomagicoinges.com con detalles del problema. Generalmente resolvemos problemas técnicos en menos de 2 horas.'
  }
];

export const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', ...new Set(faqData.map(item => item.category))];
  const filteredFAQ = selectedCategory === 'Todas' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Preguntas Frecuentes (FAQ)</h1>
        
        <div className={styles.content}>
          <section>
            <h2>¿Tienes Preguntas?</h2>
            <p>
              Aquí encontrarás respuestas a las preguntas más comunes sobre Mundo Mágico Inglés. 
              Si no encuentras lo que buscas, contáctanos en info@mundomagicoinges.com
            </p>
          </section>

          <section>
            <div className={styles.categoryFilter}>
              {categories.map(category => (
                <button
                  key={category}
                  className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.faqList}>
            {filteredFAQ.map((item) => (
              <div key={item.id} className={styles.faqItem}>
                {/* eslint-disable-next-line jsx-a11y/aria-props, @typescript-eslint/no-explicit-any */}
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={expandedId === item.id ? 'true' : 'false'}
                  {...({} as any)}
                >
                  <span>{item.question}</span>
                  <span className={styles.faqIcon}>
                    {expandedId === item.id ? '−' : '+'}
                  </span>
                </button>
                {expandedId === item.id && (
                  <div className={styles.faqAnswer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </section>

          <section>
            <h2>¿Aún tienes preguntas?</h2>
            <p>
              Si tu pregunta no se ha respondido aquí, contáctanos:
            </p>
            <ul>
              <li>📧 <strong>info@mundomagicoinges.com</strong> - Consultas generales</li>
              <li>🆘 <strong>soporte@mundomagicoinges.com</strong> - Soporte técnico</li>
              <li>📞 <strong>+34 XXX XXX XXX</strong> - Llamadas (Lun-Vie 9-18h)</li>
            </ul>
          </section>

          <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
