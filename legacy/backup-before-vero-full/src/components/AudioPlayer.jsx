import { useEffect, useState } from 'react';
import { SpeakerWave, SpeakerXMark } from './Icons.jsx';

// Web Audio API Indian Classical Shehnai & Tanpura Synthesizer with smooth cinematic fade
class IndianShehnaiSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.masterGain = null;
    this.listeners = new Set();
    this.scale = [293.66, 329.63, 369.99, 415.30, 440.0, 493.88, 554.37, 587.33]; // Raga Yaman
    this.melodyPattern = [
      0, 1, 2, 4, 3, 2, 1, 0,
      2, 4, 5, 7, 6, 5, 4, 2,
      4, 5, 7, 8, 7, 5, 4, 2,
      1, 2, 4, 2, 1, 0
    ];
    this.step = 0;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm ambient acoustic delay
    this.delay = this.ctx.createDelay();
    this.delay.delayTime.setValueAtTime(0.28, this.ctx.currentTime);
    this.feedback = this.ctx.createGain();
    this.feedback.gain.setValueAtTime(0.35, this.ctx.currentTime);

    this.delay.connect(this.feedback);
    this.feedback.connect(this.delay);
    this.delay.connect(this.masterGain);
  }

  startDrone() {
    const rootFreq = 146.83; // D3
    const fifthFreq = 220.0;  // A3

    [rootFreq, rootFreq * 2, fifthFreq].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = i === 2 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.2 + i * 0.15, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.2, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
    });
  }

  playNote(freq, dur = 0.8) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    subOsc.type = 'triangle';

    osc.frequency.setValueAtTime(freq, now);
    subOsc.frequency.setValueAtTime(freq * 0.5, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(4.5, now);

    // Shehnai meend (gentle portamento glide)
    osc.frequency.linearRampToValueAtTime(freq * 1.015, now + 0.1);
    osc.frequency.linearRampToValueAtTime(freq, now + 0.25);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.07, now + dur * 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    gain.connect(this.delay);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + dur);
    subOsc.stop(now + dur);
  }

  tick() {
    if (!this.isPlaying) return;
    const noteIdx = this.melodyPattern[this.step % this.melodyPattern.length];
    const freq = this.scale[noteIdx % this.scale.length];
    const dur = (noteIdx === 0 || noteIdx === 4 || noteIdx === 7) ? 1.4 : 0.7;

    this.playNote(freq, dur);
    this.step++;

    const nextDelay = dur * 850 + Math.random() * 150;
    this.timer = setTimeout(() => this.tick(), nextDelay);
  }

  play() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;
    this.isPlaying = true;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 0.6);
    }
    this.startDrone();
    this.tick();
    this.notify();
  }

  mute() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
    }
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.mute();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const shehnaiAudio = new IndianShehnaiSynth();

export default function AudioButton({ className = '', compact = false }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return shehnaiAudio.subscribe(setPlaying);
  }, []);

  const toggle = () => {
    shehnaiAudio.toggle();
  };

  return (
    <button
      className={`audio-toggle ${playing ? 'is-playing' : 'is-muted'} ${compact ? 'compact' : ''} ${className}`}
      onClick={toggle}
      title={playing ? 'Mute Music' : 'Unmute Auspicious Shehnai Music'}
      aria-label={playing ? 'Mute Audio' : 'Unmute Audio'}
    >
      <span className="audio-icon-wrap" aria-hidden="true">
        {playing ? <SpeakerWave className="audio-svg" /> : <SpeakerXMark className="audio-svg" />}
      </span>
      {!compact && (
        <span className="audio-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      )}
      <span className="audio-label">{playing ? 'Mute' : 'Music On'}</span>
    </button>
  );
}
