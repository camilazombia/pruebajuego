import React from 'react';
import { motion } from 'framer-motion';
import styles from './WhatsAppButton.module.css';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '34XXXXXXXXX', // Reemplazar con número real
}) => {
  const handleClick = () => {
    // Formato: https://wa.me/[country-code][number]
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hola%2C%20tengo%20una%20consulta%20sobre%20Mundo%20M%C3%A1gico%20Ingl%C3%A9s`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      className={styles.whatsappButton}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title="Contactar por WhatsApp"
      aria-label="Contactar por WhatsApp"
    >
      <span className="material-symbols-outlined">chat_bubble</span>
    </motion.button>
  );
};

export default WhatsAppButton;
