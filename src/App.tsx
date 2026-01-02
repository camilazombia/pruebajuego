import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/router/AppRouter';
import { ChildProvider } from './features/child/context/ChildContext';
import { ProgressProvider } from './features/progress/context/ProgressContext';
import { AvatarProvider } from './app/providers/AvatarProvider';

export const App: React.FC = () => {
  return (
    <AvatarProvider>
      <ProgressProvider>
        <ChildProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ChildProvider>
      </ProgressProvider>
    </AvatarProvider>
  );
};
