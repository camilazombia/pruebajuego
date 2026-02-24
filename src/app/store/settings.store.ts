/**
 * Store mínimo de configuración de audio
 * Contexto React con valores por defecto
 */

import { createContext, useContext } from 'react';

export interface SettingsState {
	masterVolume: number;
	soundEffectsEnabled: boolean;
	musicEnabled: boolean;
	voiceEnabled: boolean;
	voiceSpeed: number;
	voiceType: string;
}

export const DEFAULT_SETTINGS: SettingsState = {
	masterVolume: 1,
	soundEffectsEnabled: true,
	musicEnabled: true,
	voiceEnabled: true,
	voiceSpeed: 1,
	voiceType: 'sparkle',
};

const SettingsContext = createContext<SettingsState>(DEFAULT_SETTINGS);

export const SettingsProvider = SettingsContext.Provider;

export const useSettingsStore = (): SettingsState => {
	const ctx = useContext(SettingsContext);
	return ctx ?? DEFAULT_SETTINGS;
};
