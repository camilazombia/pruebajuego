import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Atrás
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Contacto / Soporte</h1>
        
        <div className={styles.content}>
          <section>
            <h2>¿Cómo Podemos Ayudarte?</h2>
            <p>
              Estamos aquí para responder tus preguntas, recibir sugerencias y proporcionar soporte técnico. 
              Elige la mejor forma de comunicarte con nosotros.
            </p>
          </section>

          <section>
            <h2>Formas de Contacto</h2>
            <div className={styles.contactMethods}>
              <div className={styles.method}>
                <h3>💬 WhatsApp</h3>
                <p><strong>+34 XXX XXX XXX</strong></p>
                <p>Respuesta rápida en horario de atención</p>
              </div>
            </div>
          </section>

          <section>
            <h2>Formulario de Contacto</h2>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Asunto *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="¿De qué se trata?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Cuéntanos más detalles..."
                  rows={6}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Enviar Mensaje
              </button>
            </form>
          </section>

          <section>
            <h2>Tiempo de Respuesta</h2>
            <p>
              Nos esforzamos por responder a todos los mensajes dentro de 24-48 horas hábiles. 
              Para problemas urgentes, contáctanos por teléfono.
            </p>
          </section>

          <section>
            <h2>Ubicación</h2>
            <p>
              <strong>Mundo Mágico Inglés</strong><br />
              Bogotá, Colombia<br />
              <br />
              Horario de Atención:<br />
              Lunes a Viernes: 8:00 - 17:00<br />
              Sábado: 8:00 - 12:00<br />
              Domingo: Cerrado
            </p>
          </section>

          <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
