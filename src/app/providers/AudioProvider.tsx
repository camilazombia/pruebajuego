import React, { createContext, useContext, useCallback, useRef, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { useSettingsStore } from '@app/store/settings.store';

interface AudioContextType {
  playSound: (soundId: string) => void;
  playVoice: (text: string, lang?: string) => void;
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
  const { 
    masterVolume, 
    soundEffectsEnabled, 
    musicEnabled, 
    voiceSpeed,
    voiceType 
  } = useSettingsStore();

  const soundsRef = useRef<Record<string, Howl>>({});
  const musicRef = useRef<Howl | null>(null);
  const voiceRef = useRef<Howl | null>(null);

  // Update global volume
  useEffect(() => {
    Howler.volume(masterVolume);
  }, [masterVolume]);

  const playSound = useCallback((soundId: string) => {
    if (!soundEffectsEnabled) return;

    try {
      // Check if sound is already loaded
      if (!soundsRef.current[soundId]) {
        soundsRef.current[soundId] = new Howl({
          src: [`/assets/sounds/${soundId}.mp3`, `/assets/sounds/${soundId}.ogg`],
          volume: 0.7,
          preload: true,
        });
      }

      soundsRef.current[soundId].play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [soundEffectsEnabled]);

  const playVoice = useCallback((text: string, lang: string = 'en-US') => {
    // Stop previous voice
    if (voiceRef.current) {
      voiceRef.current.stop();
    }

    // TODO: Implement real TTS or pre-recorded voice
    // For now, this is a placeholder
    const voiceFile = `${text.toLowerCase().replace(/\s+/g, '-')}-${voiceType}`;
    
    try {
      voiceRef.current = new Howl({
        src: [`/assets/voices/${voiceFile}.mp3`, `/assets/voices/${voiceFile}.ogg`],
        volume: 1,
        rate: voiceSpeed,
        onend: () => {
          voiceRef.current = null;
        },
      });

      voiceRef.current.play();
    } catch (error) {
      console.error('Error playing voice:', error);
    }
  }, [voiceSpeed, voiceType]);

  const stopAllSounds = useCallback(() => {
    Object.values(soundsRef.current).forEach(sound => sound.stop());
    if (voiceRef.current) {
      voiceRef.current.stop();
    }
  }, []);

  const playMusic = useCallback((musicId: string) => {
    if (!musicEnabled) return;

    // Stop current music
    if (musicRef.current) {
      musicRef.current.fade(musicRef.current.volume(), 0, 500);
      setTimeout(() => {
        musicRef.current?.stop();
      }, 500);
    }

    try {
      musicRef.current = new Howl({
        src: [`/assets/music/${musicId}.mp3`, `/assets/music/${musicId}.ogg`],
        volume: 0.3,
        loop: true,
        preload: true,
      });

      musicRef.current.play();
    } catch (error) {
      console.error('Error playing music:', error);
    }
  }, [musicEnabled]);

  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.fade(musicRef.current.volume(), 0, 1000);
      setTimeout(() => {
        musicRef.current?.stop();
        musicRef.current = null;
      }, 1000);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(soundsRef.current).forEach(sound => sound.unload());
      musicRef.current?.unload();
      voiceRef.current?.unload();
    };
  }, []);

  const value: AudioContextType = {
    playSound,
    playVoice,
    stopAllSounds,
    playMusic,
    stopMusic,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};