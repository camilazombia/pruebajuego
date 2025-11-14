// src/app/providers/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome to English Kids Platform!',
      },
    },
    es: {
      translation: {
        welcome: '¡Bienvenido a English Kids Platform!',
      },
    },
  },
  lng: 'es', // idioma por defecto
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
