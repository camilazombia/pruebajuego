import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface AvatarState {
  [key: string]: string;
}

interface AvatarContextType {
  avatarState: AvatarState;
  setAvatarState: (state: AvatarState) => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

const initialAvatarState: AvatarState = {
  skin: 'skin_light',
  body: 'body_slim',
  hair: 'hair_short',
  hairAcc: '',
  eyes: 'eyes_open',
  eyebrows: 'eyebrows_normal',
  mouth: 'mouth_smile',
  top: 'top_tshirt',
  jacket: '',
  bottom: 'bottom_pants',
  shoes: 'shoes_sneakers',
  socks: 'socks_plain',
  hat: '',
  glasses: '',
  jewelry: '',
  accessories: '',
  special: '',
  effects: '',
};

interface AvatarProviderProps {
  children: ReactNode;
}

export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
  // Initialize from localStorage if available
  const [avatarState, setAvatarState] = useState<AvatarState>(() => {
    try {
      const saved = localStorage.getItem('avatarState');
      return saved ? JSON.parse(saved) : initialAvatarState;
    } catch {
      return initialAvatarState;
    }
  });

  const handleSetAvatarState = (state: AvatarState) => {
    setAvatarState(state);
    // Persist to localStorage
    try {
      localStorage.setItem('avatarState', JSON.stringify(state));
    } catch {
      console.error('Failed to save avatar state to localStorage');
    }
  };

  return (
    <AvatarContext.Provider value={{ avatarState, setAvatarState: handleSetAvatarState }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within AvatarProvider');
  }
  return context;
};
