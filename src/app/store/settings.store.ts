/**
 * Store de configuración de audio con estado mutable + persistencia.
 *
 * useSettingsStore()   → valores de lectura (mismo shape que antes)
 * useSettingsActions() → toggle functions para UI
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SETTINGS_STORAGE_KEY = 'mundo_magico_settings';

export interface SettingsState {
	masterVolume: number;
	soundEffectsEnabled: boolean;
	musicEnabled: boolean;
	voiceEnabled: boolean;
	voiceSpeed: number;
	voiceType: string;
}

export interface SettingsActions {
	toggleMusic: () => void;
	toggleSoundEffects: () => void;
	toggleVoice: () => void;
}

export const DEFAULT_SETTINGS: SettingsState = {
	masterVolume: 1,
	soundEffectsEnabled: true,
	musicEnabled: true,
	voiceEnabled: true,
	voiceSpeed: 1,
	voiceType: 'sparkle',
};

interface SettingsContextValue {
	state: SettingsState;
	actions: SettingsActions;
}

const SettingsContext = createContext<SettingsContextValue>({
	state: DEFAULT_SETTINGS,
	actions: {
		toggleMusic: () => {},
		toggleSoundEffects: () => {},
		toggleVoice: () => {},
	},
});

interface SettingsProviderProps {
	children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
	const [state, setState] = useState<SettingsState>(() => {
		try {
			const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				return { ...DEFAULT_SETTINGS, ...parsed };
			}
		} catch { /* ignore */ }
		return { ...DEFAULT_SETTINGS };
	});

	useEffect(() => {
		try {
			localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(state));
		} catch { /* ignore */ }
	}, [state]);

	const toggleMusic = useCallback(() => {
		setState(prev => ({ ...prev, musicEnabled: !prev.musicEnabled }));
	}, []);

	const toggleSoundEffects = useCallback(() => {
		setState(prev => ({ ...prev, soundEffectsEnabled: !prev.soundEffectsEnabled }));
	}, []);

	const toggleVoice = useCallback(() => {
		setState(prev => ({ ...prev, voiceEnabled: !prev.voiceEnabled }));
	}, []);

	const value: SettingsContextValue = {
		state,
		actions: { toggleMusic, toggleSoundEffects, toggleVoice },
	};

	return React.createElement(SettingsContext.Provider, { value }, children);
};

/**
 * Hook de lectura — misma firma que antes.
 * AudioProvider y cualquier otro consumidor existente siguen funcionando sin cambios.
 */
export const useSettingsStore = (): SettingsState => {
	const ctx = useContext(SettingsContext);
	return ctx.state;
};

/** Hook de acciones — nuevo, para conectar botones de UI. */
export const useSettingsActions = (): SettingsActions => {
	const ctx = useContext(SettingsContext);
	return ctx.actions;
};
