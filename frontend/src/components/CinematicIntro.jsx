import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2 } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export default function CinematicIntro({ onComplete }) {
  const [stage, setStage] = useState('black'); // black -> logo -> anim -> fadeOut
  const { isMuted, playStartupSound } = useSound();
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    // Stage 1: Black screen to Logo (300ms)
    const t1 = setTimeout(() => {
      setStage('logo');
      if (!isMuted && !audioPlayed) {
        playStartupSound();
        setAudioPlayed(true);
      }
    }, 300);

    // Stage 2: Logo glow animation (1500ms)
    const t2 = setTimeout(() => {
      setStage('anim');
    }, 1800);

    // Stage 3: Fade out and finish (2800ms)
    const t3 = setTimeout(() => {
      setStage('fadeOut');
    }, 2900);

    const t4 = setTimeout(() => {
      onComplete();
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isMuted, audioPlayed, onComplete, playStartupSound]);

  const handleManualStart = () => {
    if (!audioPlayed) {
      playStartupSound();
      setAudioPlayed(true);
    }
    onComplete();
  };

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === 'fadeOut' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#111111] flex flex-col items-center justify-center select-none"
        >
          {/* Subtle Champagne Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-[#C5A880]/15 via-transparent to-transparent opacity-50 pointer-events-none" />

          {/* Logo Animation Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: stage === 'anim' ? 1.05 : 1,
                opacity: stage === 'black' ? 0 : 1
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex items-center gap-2 mb-3"
            >
              <Sparkles className="w-6 h-6 text-[#C5A880] animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] font-bold">
                StyleAI Exclusive
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: stage === 'black' ? 20 : 0,
                opacity: stage === 'black' ? 0 : 1
              }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl font-bold tracking-wider text-[#FAF8F5] mb-2"
            >
              StyleAI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 'black' ? 0 : 0.9 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#C5A880] font-semibold"
            >
              YOUR STYLE. OUR INTELLIGENCE.
            </motion.p>
          </div>

          {/* Sound & Skip Controls */}
          <div className="absolute bottom-10 flex items-center gap-4">
            <button
              onClick={handleManualStart}
              className="flex items-center gap-2 text-xs tracking-widest text-[#FAF8F5]/80 hover:text-[#C5A880] transition-colors py-2 px-5 rounded-full border border-[#C5A880]/30 hover:border-[#C5A880] bg-black/40"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>ENTER EXPERIENCE</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

