import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface AvatarState {
  // Configuración del avatar
  [key: string]: any; // Permite otras claves de string
  // Ropa desbloqueada
  unlockedTops: string[];
  unlockedBottoms: string[];
  unlockedShoes: string[];
}

interface AvatarContextType {
  avatarState: AvatarState;
  setAvatarState: (state: AvatarState) => void;
  unlockTop: (topId: string) => void;
  unlockBottom: (bottomId: string) => void;
  unlockShoes: (shoeId: string) => void;
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
  top: 'top_red_shirt',
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
  // Por defecto, solo la ropa inicial está desbloqueada
  unlockedTops: ['top_red_shirt'],
  unlockedBottoms: ['bottom_pants'],
  unlockedShoes: ['shoes_sneakers'],
};

interface AvatarProviderProps {
  children: ReactNode;
}

export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
  const [avatarState, setAvatarState] = useState<AvatarState>(() => {
    try {
      const saved = localStorage.getItem('avatarState');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Asegurar que los arrays de desbloqueo existan
        return {
          ...initialAvatarState,
          ...parsed,
          unlockedTops: parsed.unlockedTops || initialAvatarState.unlockedTops,
          unlockedBottoms: parsed.unlockedBottoms || initialAvatarState.unlockedBottoms,
          unlockedShoes: parsed.unlockedShoes || initialAvatarState.unlockedShoes,
        };
      }
      return initialAvatarState;
    } catch {
      return initialAvatarState;
    }
  });

  const persistState = (state: AvatarState) => {
    try {
      localStorage.setItem('avatarState', JSON.stringify(state));
    } catch {
      console.error('Failed to save avatar state to localStorage');
    }
  };
  
  const handleSetAvatarState = (state: AvatarState) => {
    setAvatarState(state);
    persistState(state);
  };

  const unlockTop = useCallback((topId: string) => {
    setAvatarState(prevState => {
      const newTops = [...new Set([...prevState.unlockedTops, topId])];
      const newState = { ...prevState, unlockedTops: newTops };
      persistState(newState);
      return newState;
    });
  }, []);

  const unlockBottom = useCallback((bottomId: string) => {
    setAvatarState(prevState => {
      const newBottoms = [...new Set([...prevState.unlockedBottoms, bottomId])];
      const newState = { ...prevState, unlockedBottoms: newBottoms };
      persistState(newState);
      return newState;
    });
  }, []);

  const unlockShoes = useCallback((shoeId: string) => {
    setAvatarState(prevState => {
      const newShoes = [...new Set([...prevState.unlockedShoes, shoeId])];
      const newState = { ...prevState, unlockedShoes: newShoes };
      persistState(newState);
      return newState;
    });
  }, []);

  return (
    <AvatarContext.Provider value={{ avatarState, setAvatarState: handleSetAvatarState, unlockTop, unlockBottom, unlockShoes }}>
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
