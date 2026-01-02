import React from 'react';
import { useSearchParams } from 'react-router-dom';
import LegalPagesLayout from './LegalPagesLayout';
import { WhatsAppButton } from '../../shared/ui/WhatsAppButton/WhatsAppButton';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import TermsAndConditionsPage from './TermsAndConditionsPage';
import CookiesPolicyPage from './CookiesPolicyPage';
import ChildProtectionPolicyPage from './ChildProtectionPolicyPage';
import EducationalContentPolicyPage from './EducationalContentPolicyPage';
import AccessibilityPage from './AccessibilityPage';
import LegalNoticePage from './LegalNoticePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import FAQPage from './FAQPage';

const LEGAL_PAGES = [
  {
    id: 'privacy',
    label: 'Política de Privacidad',
    title: 'Privacidad de Datos',
    component: PrivacyPolicyPage,
  },
  {
    id: 'terms',
    label: 'Términos y Condiciones',
    title: 'Términos de Servicio',
    component: TermsAndConditionsPage,
  },
  {
    id: 'cookies',
    label: 'Política de Cookies',
    title: 'Uso de Cookies',
    component: CookiesPolicyPage,
  },
  {
    id: 'child-protection',
    label: 'Protección Infantil',
    title: 'Política de Protección Infantil',
    component: ChildProtectionPolicyPage,
  },
  {
    id: 'educational',
    label: 'Contenido Educativo',
    title: 'Política de Contenido Educativo',
    component: EducationalContentPolicyPage,
  },
  {
    id: 'accessibility',
    label: 'Accesibilidad',
    title: 'Política de Accesibilidad',
    component: AccessibilityPage,
  },
  {
    id: 'legal-notice',
    label: 'Aviso Legal',
    title: 'Aviso Legal',
    component: LegalNoticePage,
  },
  {
    id: 'about',
    label: 'Acerca de Nosotros',
    title: 'Acerca de Mundo Mágico Inglés',
    component: AboutPage,
  },
  {
    id: 'contact',
    label: 'Contacto',
    title: 'Ponte en Contacto',
    component: ContactPage,
  },
  {
    id: 'faq',
    label: 'Preguntas Frecuentes',
    title: 'Preguntas Frecuentes',
    component: FAQPage,
  },
];

export const PoliciesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Obtener el parámetro 'page' de la URL, por defecto 'privacy'
  const pageParam = searchParams.get('page') || 'privacy';
  
  return (
    <>
      <LegalPagesLayout currentPageId={pageParam} pages={LEGAL_PAGES} />
      <WhatsAppButton phoneNumber="34XXXXXXXXX" />
    </>
  );
};

export default PoliciesPage;
