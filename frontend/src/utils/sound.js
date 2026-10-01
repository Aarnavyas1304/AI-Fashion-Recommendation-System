// Web Audio API Synthesizer for Original Cinematic Fashion "tudumm" Startup Sound

let audioCtx = null;

export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function playCinematicStartupSound(isMuted = false) {
  if (isMuted) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // --- OSCILLATOR 1: Sub Bass Drop (First 'tu' note: D1 ~36Hz to A0 ~27Hz) ---
    const oscSub = ctx.createOscillator();
    const gainSub = ctx.createGain();
    
    oscSub.type = 'sine';
    // Frequency ramp for initial sub impact
    oscSub.frequency.setValueAtTime(55, now); // A1
    oscSub.frequency.exponentialRampToValueAtTime(32, now + 0.3); // Low sub bass drop
    oscSub.frequency.exponentialRampToValueAtTime(28, now + 2.2);

    gainSub.gain.setValueAtTime(0.001, now);
    gainSub.gain.linearRampToValueAtTime(0.7, now + 0.15); // Quick rise
    gainSub.gain.exponentialRampToValueAtTime(0.001, now + 2.4); // Deep decay

    // Lowpass filter to keep sound warm and deep
    const filterSub = ctx.createBiquadFilter();
    filterSub.type = 'lowpass';
    filterSub.frequency.setValueAtTime(180, now);
    filterSub.frequency.exponentialRampToValueAtTime(80, now + 2.0);

    oscSub.connect(gainSub);
    gainSub.connect(filterSub);
    filterSub.connect(ctx.destination);

    // --- OSCILLATOR 2: Secondary Mid Bass Impact ('dumm' resonance: D2 ~73Hz) ---
    const oscMid = ctx.createOscillator();
    const gainMid = ctx.createGain();

    oscMid.type = 'triangle';
    oscMid.frequency.setValueAtTime(110, now + 0.25); // 'dumm' accent slightly delayed
    oscMid.frequency.exponentialRampToValueAtTime(45, now + 1.8);

    gainMid.gain.setValueAtTime(0.001, now);
    gainMid.gain.setValueAtTime(0.001, now + 0.2);
    gainMid.gain.linearRampToValueAtTime(0.85, now + 0.35); // Second punch
    gainMid.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    const filterMid = ctx.createBiquadFilter();
    filterMid.type = 'lowpass';
    filterMid.frequency.setValueAtTime(400, now + 0.2);
    filterMid.frequency.exponentialRampToValueAtTime(100, now + 2.0);

    oscMid.connect(gainMid);
    gainMid.connect(filterMid);
    filterMid.connect(ctx.destination);

    // --- SHIMMER: Subtle Champagne Gold High-End Sparkle (Luxury Fashion Feel) ---
    const oscGold = ctx.createOscillator();
    const gainGold = ctx.createGain();
    
    oscGold.type = 'sine';
    oscGold.frequency.setValueAtTime(440, now + 0.4);
    oscGold.frequency.exponentialRampToValueAtTime(880, now + 1.2);

    gainGold.gain.setValueAtTime(0.001, now);
    gainGold.gain.setValueAtTime(0.001, now + 0.35);
    gainGold.gain.linearRampToValueAtTime(0.08, now + 0.6); // Very subtle air
    gainGold.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    oscGold.connect(gainGold);
    gainGold.connect(ctx.destination);

    // Start Oscillators
    oscSub.start(now);
    oscMid.start(now + 0.2);
    oscGold.start(now + 0.35);

    // Stop Oscillators
    oscSub.stop(now + 2.5);
    oscMid.stop(now + 2.6);
    oscGold.stop(now + 2.3);

  } catch (err) {
    console.warn("Audio playback issue (autoplay policy or browser restriction):", err);
  }
}
