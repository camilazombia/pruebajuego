import React, { createContext, useContext, useCallback, useRef } from 'react';
import { useSettingsStore } from '../store/settings.store';

interface AudioContextType {
	playSound: (soundId: string) => void;
	playVoice: (text: string, lang?: string) => void;
	playNarrative: (audioUrl: string) => Promise<void>;
	playWord: (englishWord: string) => void;
	playFeedback: (type: 'correct' | 'wrong' | 'complete' | 'star') => void;
	stopAllSounds: () => void;
	playMusic: (musicId: string) => void;
	stopMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
	const context = useContext(AudioContext);
	if (!context) {
		throw new Error('useAudio must be used within AudioProvider');
	}
	return context;
};

interface AudioProviderProps {
	children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
	const { soundEffectsEnabled, musicEnabled, voiceEnabled, voiceSpeed } = useSettingsStore();
	const activeSoundsRef = useRef<HTMLAudioElement[]>([]);
	const musicRef = useRef<HTMLAudioElement | null>(null);

	const stopAllSounds = useCallback(() => {
		activeSoundsRef.current.forEach((a) => {
			a.pause();
			a.currentTime = 0;
		});
		activeSoundsRef.current = [];
	}, []);

	const playSound = useCallback(
		(soundId: string) => {
			if (!soundEffectsEnabled) return;
			try {
				const audio = new Audio(`/assets/audio/sfx/${soundId}.mp3`);
				activeSoundsRef.current.push(audio);
				audio.play().catch(() => {});
				audio.onended = () => {
					activeSoundsRef.current = activeSoundsRef.current.filter((a) => a !== audio);
				};
			} catch {
				// ignore
			}
		},
		[soundEffectsEnabled]
	);

	const playNarrative = useCallback(
		(audioUrl: string): Promise<void> => {
			if (!voiceEnabled) return Promise.resolve();
			stopAllSounds();
			return new Promise<void>((resolve) => {
				try {
					const audio = new Audio(audioUrl.startsWith('/') ? audioUrl : `/${audioUrl}`);
					audio.playbackRate = voiceSpeed;
					activeSoundsRef.current.push(audio);
					audio.onended = () => {
						activeSoundsRef.current = activeSoundsRef.current.filter((a) => a !== audio);
						resolve();
					};
					audio.onerror = () => resolve();
					audio.play().catch(() => resolve());
				} catch {
					resolve();
				}
			});
		},
		[voiceEnabled, voiceSpeed, stopAllSounds]
	);

	const playVoice = useCallback(
		(text: string, _lang = 'en-US') => {
			if (!voiceEnabled) return;
			const voiceFile = text.toLowerCase().replace(/\s+/g, '-');
			playNarrative(`/assets/audio/voices/${voiceFile}.mp3`);
		},
		[voiceEnabled, playNarrative]
	);

	const playWord = useCallback(
		(englishWord: string) => {
			if (!voiceEnabled) return;
			const key = englishWord.toLowerCase().replace(/\s+/g, '_');
			const audio = new Audio(`/assets/audio/voices/words/${key}.mp3`);
			audio.playbackRate = voiceSpeed;
			activeSoundsRef.current.push(audio);
			audio.play().catch(() => {});
			audio.onended = () => {
				activeSoundsRef.current = activeSoundsRef.current.filter((a) => a !== audio);
			};
		},
		[voiceEnabled, voiceSpeed]
	);

	const playFeedback = useCallback(
		(type: 'correct' | 'wrong' | 'complete' | 'star') => {
			if (!soundEffectsEnabled) return;
			try {
				const audio = new Audio(`/assets/audio/sfx/${type}.mp3`);
				activeSoundsRef.current.push(audio);
				audio.play().catch(() => {});
				audio.onended = () => {
					activeSoundsRef.current = activeSoundsRef.current.filter((a) => a !== audio);
				};
			} catch {
				// ignore
			}
		},
		[soundEffectsEnabled]
	);

	const playMusic = useCallback(
		(musicId: string) => {
			if (!musicEnabled) return;
			if (musicRef.current) {
				musicRef.current.pause();
				musicRef.current = null;
			}
			try {
				const audio = new Audio(`/assets/audio/music/${musicId}.mp3`);
				audio.loop = true;
				audio.volume = 0.3;
				musicRef.current = audio;
				audio.play().catch(() => {});
			} catch {
				// ignore
			}
		},
		[musicEnabled]
	);

	const stopMusic = useCallback(() => {
		if (musicRef.current) {
			musicRef.current.pause();
			musicRef.current.currentTime = 0;
			musicRef.current = null;
		}
	}, []);

	const value: AudioContextType = {
		playSound,
		playVoice,
		playNarrative,
		playWord,
		playFeedback,
		stopAllSounds,
		playMusic,
		stopMusic,
	};

	return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
