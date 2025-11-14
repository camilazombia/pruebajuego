import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import FamilyAccessPage from '../../pages/FamilyAccessPage/FamilyAccessPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../../pages/HomePage/HomePage';
import WorldsMapPage from '../../pages/WorldsMapPage/WorldsMapPage';
import RewardsPage from '../../pages/RewardsPage/RewardsPage';
import ReviewPage from '../../pages/ReviewPage/ReviewPage';
import HelpPage from '../../pages/HelpPage/HelpPage';

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
        <Route path="/worlds" element={<WorldsMapPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
