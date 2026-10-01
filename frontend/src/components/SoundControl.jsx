import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export default function SoundControl() {
  const { isMuted, toggleSound } = useSound();

  return (
    <button
      onClick={toggleSound}
      aria-label={isMuted ? "Enable Sound" : "Mute Sound"}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-fashion-darkGray/90 backdrop-blur-md text-fashion-ivory px-3 py-2 rounded-full border border-fashion-gold/30 hover:border-fashion-gold shadow-gold-glow transition-all duration-300 group text-xs uppercase tracking-widest"
    >
      {isMuted ? (
        <>
          <VolumeX className="w-4 h-4 text-fashion-muted group-hover:text-fashion-ivory" />
          <span className="hidden sm:inline text-fashion-muted group-hover:text-fashion-ivory">Sound Off</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-fashion-gold animate-pulse" />
          <span className="hidden sm:inline text-fashion-gold font-medium">Sound On</span>
          <span className="w-1.5 h-1.5 rounded-full bg-fashion-gold animate-ping"></span>
        </>
      )}
    </button>
  );
}
