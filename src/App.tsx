import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/router/AppRouter';
import { ChildProvider } from './features/child/context/ChildContext';
import { ProgressProvider } from './features/progress/context/ProgressContext';
import { AvatarProvider } from './app/providers/AvatarProvider';
import { AudioProvider } from './app/providers/AudioProvider';
import { SettingsProvider, DEFAULT_SETTINGS } from './app/store/settings.store';

export const App: React.FC = () => {
  return (
    <SettingsProvider value={DEFAULT_SETTINGS}>
      <AudioProvider>
        <AvatarProvider>
          <ProgressProvider>
            <ChildProvider>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </ChildProvider>
          </ProgressProvider>
        </AvatarProvider>
      </AudioProvider>
    </SettingsProvider>
  );
};
