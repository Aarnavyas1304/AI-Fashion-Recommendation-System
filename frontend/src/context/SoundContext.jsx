import React, { createContext, useContext, useState, useEffect } from 'react';
import { playCinematicStartupSound } from '../utils/sound';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('af_sound_muted');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    localStorage.setItem('af_sound_muted', JSON.stringify(isMuted));
  }, [isMuted]);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (!nextState) {
      playCinematicStartupSound(false);
    }
  };

  const playStartupSound = () => {
    if (!isMuted) {
      playCinematicStartupSound(false);
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleSound, playStartupSound, hasInteracted, setHasInteracted }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
