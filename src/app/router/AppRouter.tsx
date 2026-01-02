import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import FamilyAccessPage from '../../pages/FamilyAccessPage/FamilyAccessPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../../pages/HomePage/HomePage';
import ChapterMapPage from '../../pages/ChapterMapPage/ChapterMapPage';
import LevelPage from '../../pages/LevelPage/LevelPage';
import WorldsMapPage from '../../pages/WorldsMapPage/WorldsMapPage';
import MissionsMapPage from '../../pages/MissionsMapPage/MissionsMapPage';
import MissionPage from '../../pages/MissionPage/MissionPage';
import RewardsPage from '../../pages/RewardsPage/RewardsPage';
import ReviewPage from '../../pages/ReviewPage/ReviewPage';
import FlashcardsPage from '../../pages/ReviewPage/FlashcardsPage';
import StoriesPage from '../../pages/ReviewPage/StoriesPage';
import ColoringPage from '../../pages/ReviewPage/ColoringPage';
import HelpPage from '../../pages/HelpPage/HelpPage';
import ParentZonePage from '../../pages/ParentZonePage/ParentZonePage';

// Legal Pages
import {
  PrivacyPolicyPage,
  TermsAndConditionsPage,
  CookiesPolicyPage,
  LegalNoticePage,
  ChildProtectionPolicyPage,
  EducationalContentPolicyPage,
  AccessibilityPage,
  ContactPage,
  AboutPage,
  FAQPage,
} from '../../pages/LegalPages';
import PoliciesPage from '../../pages/LegalPages/PoliciesPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Página inicial (Landing) */}
      <Route path="/" element={<LandingPage />} />

      {/* Página de Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Página de Acceso Familiar */}
      <Route path="/family-access" element={<FamilyAccessPage />} />

      {/* Página de Bienvenida */}
      <Route path="/welcome" element={<WelcomePage />} />

      {/* Rutas internas que usan MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/chapters/:worldId" element={<ChapterMapPage />} />
        <Route path="/level/:levelId" element={<LevelPage />} />
        <Route path="/worlds" element={<WorldsMapPage />} />
        <Route path="/missions/:worldId" element={<MissionsMapPage />} />
        <Route path="/mission/:missionId" element={<MissionPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/review/flashcards" element={<FlashcardsPage />} />
        <Route path="/review/stories" element={<StoriesPage />} />
        <Route path="/review/coloring" element={<ColoringPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/parent-zone" element={<ParentZonePage />} />
      </Route>

      {/* Legal Pages (sin MainLayout) */}
      <Route path="/policies" element={<PoliciesPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsAndConditionsPage />} />
      <Route path="/cookies" element={<CookiesPolicyPage />} />
      <Route path="/legal" element={<LegalNoticePage />} />
      <Route path="/child-protection" element={<ChildProtectionPolicyPage />} />
      <Route path="/educational-content" element={<EducationalContentPolicyPage />} />
      <Route path="/accessibility" element={<AccessibilityPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
