import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Página inicial (Landing) */}
      <Route path="/" element={<LandingPage />} />

      {/* Página de Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
