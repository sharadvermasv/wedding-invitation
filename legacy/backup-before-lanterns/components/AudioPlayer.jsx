import { useEffect, useState } from 'react';
import { music, musicDetails } from '../content.js';
import { SpeakerWave, SpeakerXMark } from './Icons.jsx';

/* ---------------------------------------------------------------------------
   Auspicious Wedding Music System:
   1. Primary: Authentic Banaras Shehnai & Duggi recital by Ustad Bismillah Khan
      (digitized by Sangeet Natak Akademi archives, recorded in Varanasi).
   2. Fallback: Live Web Audio synthesis in celebratory Bilawal Mangal Dhun
      with Shehnai, Sur drone, Tanpura, and Keherwa Dholak.
--------------------------------------------------------------------------- */

const SA = 277.18; // Sa = C#4 (canonical Shehnai pitch)
// Shubh Mangal Dhun scale (Bilawal / Kalyani joyous wedding notes)
const SWARA = { S: 0, R: 2, G: 4, M: 5, m: 6, P: 7, D: 9, N: 11 };
const BPM = 96;
const BEAT = 60 / BPM;

// Celebratory Indian Wedding Mangal Dhun melody
const MELODY = [
  // Auspicious invocation
  ['S', 2], ['R', 1], ['G', 1], ['P', 3], ['M', 1], ['G', 2], ['R', 2], ['S', 4],
  [null, 1], ['G', 1], ['P', 2], ['D', 2], ["S'", 4], ['N', 1], ['D', 1], ['P', 2],
  ['M', 1], ['G', 1], ['R', 2], ['G', 1], ['M', 1], ['P', 3], ['G', 1], ['R', 2], ['S', 4],
  [null, 2],
  // Festive wedding ascent
  ['P', 1], ['D', 1], ["S'", 2], ["R'", 1], ["S'", 1], ['N', 2], ['D', 2], ['P', 4],
  ['G', 1], ['P', 1], ['D', 2], ['P', 1], ['M', 1], ['G', 2], ['R', 1], ['G', 1], ['S', 4],
  [null, 2],
];
const LOOP_BEATS = MELODY.reduce((a, [, b]) => a + b, 0);

// keherwa: dha ge na ti | na ka dhi na  (bass, treble, slap)
const KEHERWA = [
  { b: 1, t: 1 }, { b: 0.7 }, { t: 0.8 }, { t: 0.45 },
  { t: 0.8 }, { s: 0.6 }, { b: 0.9, t: 0.9 }, { t: 0.7 },
];

const hz = (sw) => {
  const oct = sw.endsWith("'") ? 1 : sw.endsWith('.') ? -1 : 0;
  return SA * 2 ** ((SWARA[sw[0]] + oct * 12) / 12);
};

class WeddingMusic {
  constructor() {
    this.isPlaying = false;
    this.listeners = new Set();
    this.ctx = null;
    this.session = null;
    this.el = null; // <audio> when a file is configured
  }

  subscribe(fn) { this.listeners.add(fn); fn(this.isPlaying); return () => this.listeners.delete(fn); }
  notify() { this.listeners.forEach((fn) => fn(this.isPlaying)); }

  /* ---------- shared graph ---------- */
  ensureCtx() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AC();
    const c = this.ctx;
    this.master = c.createGain();
    this.master.gain.value = 0;
    this.master.connect(c.destination);
    // generated reverb impulse (warm hall, ~2.6 s)
    const len = c.sampleRate * 2.6;
    const ir = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2.4;
    }
    this.reverb = c.createConvolver();
    this.reverb.buffer = ir;
    this.wet = c.createGain();
    this.wet.gain.value = 0.28;
    this.reverb.connect(this.wet).connect(this.master);
    this.dry = c.createGain();
    this.dry.connect(this.master);
    // white-noise buffer for drums & cymbals
    this.noise = c.createBuffer(1, c.sampleRate, c.sampleRate);
    const nd = this.noise.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  }

  out(node, wet = 0.5) {
    node.connect(this.dry);
    const s = this.ctx.createGain();
    s.gain.value = wet;
    node.connect(s).connect(this.reverb);
  }

  /* ---------- instruments ---------- */
  makeShehnai() {
    const c = this.ctx;
    const o1 = c.createOscillator(); o1.type = 'sawtooth';
    const o2 = c.createOscillator(); o2.type = 'square';
    const mix2 = c.createGain(); mix2.gain.value = 0.35;
    const vib = c.createOscillator(); vib.frequency.value = 5.6;
    const vibAmt = c.createGain(); vibAmt.gain.value = 0;
    vib.connect(vibAmt); vibAmt.connect(o1.frequency); vibAmt.connect(o2.frequency);
    // nasal double-reed formants
    const f1 = c.createBiquadFilter(); f1.type = 'peaking'; f1.frequency.value = 1150; f1.Q.value = 2.2; f1.gain.value = 9;
    const f2 = c.createBiquadFilter(); f2.type = 'peaking'; f2.frequency.value = 2700; f2.Q.value = 3; f2.gain.value = 6;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3800; lp.Q.value = 0.6;
    const amp = c.createGain(); amp.gain.value = 0;
    o1.connect(f1); o2.connect(mix2).connect(f1);
    f1.connect(f2).connect(lp).connect(amp);
    this.out(amp, 0.55);
    [o1, o2, vib].forEach((o) => o.start());
    return { o1, o2, vibAmt, amp, nodes: [o1, o2, vib] };
  }

  makeSur() { // second shehnai holding Sa + Pa, very soft
    const c = this.ctx;
    const amp = c.createGain(); amp.gain.value = 0;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400;
    const nodes = [SA, SA * 1.5, SA / 2].map((f, i) => {
      const o = c.createOscillator(); o.type = i === 2 ? 'triangle' : 'sawtooth';
      o.frequency.value = f; o.detune.value = (i - 1) * 4;
      const g = c.createGain(); g.gain.value = i === 2 ? 0.5 : 0.28;
      o.connect(g).connect(lp); o.start();
      return o;
    });
    lp.connect(amp);
    this.out(amp, 0.6);
    amp.gain.setTargetAtTime(0.022, c.currentTime, 1.5);
    return { amp, nodes };
  }

  pluck(t, f, vol = 0.08) { // tanpura string with buzzy jawari
    const c = this.ctx;
    const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
    const o2 = c.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = f * 1.003;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 3;
    lp.frequency.setValueAtTime(2600, t); lp.frequency.exponentialRampToValueAtTime(500, t + 2.4);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3);
    o.connect(lp); o2.connect(lp); lp.connect(g); this.out(g, 0.5);
    o.start(t); o2.start(t); o.stop(t + 3.1); o2.stop(t + 3.1);
  }

  dholBass(t, v) { // "ge": pitch-dropping skin
    const c = this.ctx;
    const o = c.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(62, t + 0.28);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.42 * v, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    o.connect(g); this.out(g, 0.15); o.start(t); o.stop(t + 0.5);
  }

  dholTreble(t, v) { // "na / ta": ringing rim
    const c = this.ctx;
    const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = 420;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16 * v, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    const n = c.createBufferSource(); n.buffer = this.noise;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2600; bp.Q.value = 1.4;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.12 * v, t); ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    o.connect(g); n.connect(bp).connect(ng);
    this.out(g, 0.2); this.out(ng, 0.2);
    o.start(t); o.stop(t + 0.2); n.start(t, Math.random()); n.stop(t + 0.08);
  }

  dholSlap(t, v) { // "ka": dry slap
    const c = this.ctx;
    const n = c.createBufferSource(); n.buffer = this.noise;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 0.8;
    const g = c.createGain();
    g.gain.setValueAtTime(0.2 * v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    n.connect(bp).connect(g); this.out(g, 0.15); n.start(t, Math.random()); n.stop(t + 0.09);
  }

  manjira(t, v = 1) { // small brass cymbals
    const c = this.ctx;
    const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3000;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.035 * v, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    [3210, 4730, 6120].forEach((f) => {
      const o = c.createOscillator(); o.type = 'square'; o.frequency.value = f;
      o.connect(hp); o.start(t); o.stop(t + 1);
    });
    hp.connect(g); this.out(g, 0.6);
  }

  bell(t) { // temple bell
    const c = this.ctx;
    [[1, 0.09], [2.42, 0.05], [3.9, 0.03], [5.4, 0.018]].forEach(([m, a]) => {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = SA * 2 * m;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(a, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 4.5 / Math.sqrt(m));
      o.connect(g); this.out(g, 0.8); o.start(t); o.stop(t + 5);
    });
  }

  /* ---------- melody (one legato shehnai voice) ---------- */
  sing(t, sw, beats) {
    const v = this.session.shehnai;
    const dur = beats * BEAT;
    if (!sw) { // breath
      v.amp.gain.setTargetAtTime(0, t, 0.12);
      v.vibAmt.gain.setTargetAtTime(0, t, 0.1);
      this.session.prev = null;
      return;
    }
    const f = hz(sw);
    const glide = this.session.prev && beats >= 2 ? 0.09 : 0.025; // meend into long notes
    // kan: brief grace note from the swara above, before long notes
    if (beats >= 2 && this.session.prev) {
      const fUp = f * 2 ** (2 / 12);
      [v.o1, v.o2].forEach((o) => {
        o.frequency.setTargetAtTime(fUp, t, 0.012);
        o.frequency.setTargetAtTime(f, t + 0.07, glide);
      });
    } else {
      [v.o1, v.o2].forEach((o) => o.frequency.setTargetAtTime(f, t, glide));
    }
    // articulation: light tongue between notes, swell, vibrato blooms on held notes
    v.amp.gain.setTargetAtTime(0.06, t, 0.015);
    v.amp.gain.setTargetAtTime(0.11, t + 0.04, 0.06);
    if (dur > 0.8) v.amp.gain.setTargetAtTime(0.085, t + dur * 0.6, 0.25);
    v.vibAmt.gain.setTargetAtTime(0, t, 0.02);
    if (dur > 0.7) v.vibAmt.gain.setTargetAtTime(f * 0.006, t + 0.25, 0.2);
    this.session.prev = sw;
  }

  /* ---------- scheduler (look-ahead on the audio clock) ---------- */
  schedule() {
    const s = this.session;
    const ahead = this.ctx.currentTime + 0.25;
    while (s.nextBeat < ahead) {
      const t = s.nextBeat;
      const beatInLoop = s.beat % LOOP_BEATS;
      const swing = s.beat % 2 ? 0.018 : 0;
      // percussion enters after the first two bars of solo shehnai
      if (s.beat >= 16) {
        const k = KEHERWA[s.beat % 8];
        if (k.b) this.dholBass(t + swing, k.b);
        if (k.t) this.dholTreble(t + swing, k.t);
        if (k.s) this.dholSlap(t + swing, k.s);
        if (s.beat % 4 === 0) this.manjira(t, s.beat % 8 === 0 ? 1 : 0.6);
      }
      if (s.beat % 4 === 0) { // tanpura cycle: Pa  Sa'  Sa'  Sa
        const cyc = [SA * 0.75, SA, SA, SA / 2][(s.beat / 4) % 4];
        this.pluck(t, cyc, 0.05);
      }
      if (beatInLoop === 0) this.bell(t);
      // melody notes that start on this beat
      while (s.mIndex < MELODY.length && s.mBeat <= beatInLoop) {
        const [sw, b] = MELODY[s.mIndex];
        this.sing(t + (s.mBeat - beatInLoop) * BEAT, sw, b);
        s.mBeat += b; s.mIndex++;
      }
      s.beat++; s.nextBeat += BEAT;
      if (s.beat % LOOP_BEATS === 0) { s.mIndex = 0; s.mBeat = 0; }
    }
  }

  /* ---------- public API ---------- */
  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    if (this.fadeTimer) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }

    const audioSrc = typeof music === 'string' ? music : music?.src;
    if (audioSrc) {
      if (!this.el) {
        this.el = new Audio(audioSrc);
        this.el.loop = true;
        this.el.volume = 0;
        this.el.preload = 'auto';
      }

      const p = this.el.play();
      if (p !== undefined) {
        p.then(() => {
          this.fadeTimer = setInterval(() => {
            if (!this.el || !this.isPlaying) {
              clearInterval(this.fadeTimer);
              return;
            }
            if (this.el.volume >= 0.6) {
              this.el.volume = 0.6;
              clearInterval(this.fadeTimer);
              return;
            }
            this.el.volume = Math.min(0.6, this.el.volume + 0.05);
          }, 60);
        }).catch((err) => {
          console.warn('Audio element playback blocked or failed, using Web Audio synthesizer:', err);
          this.playSynthesized();
        });
        return;
      }
    }

    this.playSynthesized();
  }

  playSynthesized() {
    this.ensureCtx();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0.45, now + 1.2);
    if (!this.session) {
      this.session = {
        shehnai: this.makeShehnai(),
        sur: this.makeSur(),
        beat: 0,
        nextBeat: now + 0.2,
        mIndex: 0,
        mBeat: 0,
        prev: null,
      };
      this.timer = setInterval(() => this.schedule(), 40);
    }
  }

  mute() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.notify();

    if (this.fadeTimer) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }

    if (this.el) {
      const el = this.el;
      this.fadeTimer = setInterval(() => {
        if (!el || this.isPlaying) {
          clearInterval(this.fadeTimer);
          return;
        }
        if (el.volume <= 0.05) {
          el.volume = 0;
          el.pause();
          clearInterval(this.fadeTimer);
          return;
        }
        el.volume = Math.max(0, el.volume - 0.06);
      }, 50);
      return;
    }

    if (this.timer) clearInterval(this.timer);
    const s = this.session;
    if (!this.ctx || !s) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.5);
    setTimeout(() => {
      if (s) {
        [...s.shehnai.nodes, ...s.sur.nodes].forEach((n) => {
          try { n.stop(); } catch { /* already stopped */ }
        });
      }
    }, 600);
    this.session = null;
  }

  toggle() {
    if (this.isPlaying) { this.mute(); return false; }
    this.play();
    return true;
  }
}

export const shehnaiAudio = new WeddingMusic();

export default function AudioButton({ className = '', compact = false }) {
  const [playing, setPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timer = null;
    const unsub = shehnaiAudio.subscribe((isP) => {
      setPlaying(isP);
      if (isP) {
        setShowToast(true);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => setShowToast(false), 4600);
      } else {
        setShowToast(false);
        if (timer) clearTimeout(timer);
      }
    });
    return () => {
      unsub();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const titleText = playing
    ? 'Mute wedding shehnai'
    : `Play ${musicDetails?.title || 'Banarasi Shehnai'} (${musicDetails?.artist || 'Ustad Bismillah Khan'})`;

  return (
    <>
      <button
        className={`audio-toggle ${playing ? 'is-playing' : 'is-muted'} ${compact ? 'compact' : ''} ${className}`}
        onClick={() => shehnaiAudio.toggle()}
        title={titleText}
        aria-label={titleText}
        aria-pressed={playing}
      >
        <span className="audio-icon-wrap" aria-hidden="true">
          {playing ? <SpeakerWave className="audio-svg" /> : <SpeakerXMark className="audio-svg" />}
        </span>
        {!compact && (
          <span className="audio-bars" aria-hidden="true"><i /><i /><i /><i /></span>
        )}
        <span className="audio-label">{playing ? 'Mute' : 'Shehnai'}</span>
      </button>

      {showToast && (
        <div className="audio-toast" role="status" aria-live="polite">
          <SpeakerWave className="audio-toast-svg" />
          <span>{musicDetails?.title || 'Banarasi Shehnai'} · {musicDetails?.artist || 'Ustad Bismillah Khan'}</span>
        </div>
      )}
    </>
  );
}
