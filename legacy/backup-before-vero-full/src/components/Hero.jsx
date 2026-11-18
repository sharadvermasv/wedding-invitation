import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { photos } from '../content.js';
import { patternStyle, prefersReducedMotion } from '../lib.js';

// Mandala is also used by the Countdown section.
export function Mandala({ layers = 9, className }) {
  const items = [];
  const step = 46 / layers;
  for (let i = 0; i < layers; i++) {
    const rIn = 4 + i * step, len = step * 1.15, n = 8 + i * 4, w = Math.max(1.4, ((Math.PI * rIn) / n) * 0.9);
    items.push(<circle key={`c${i}`} r={rIn} fill="none" stroke="currentColor" strokeWidth=".18" />);
    for (let k = 0; k < n; k++) {
      const a = (360 / n) * k + (i % 2 ? 180 / n : 0);
      items.push(
        i % 3 === 2
          ? <circle key={`${i}-${k}`} cx="0" cy={-(rIn + len / 2)} r={Math.min(w * 0.45, len * 0.3)} transform={`rotate(${a})`} fill="none" stroke="currentColor" strokeWidth=".22" />
          : <path key={`${i}-${k}`} d={`M0 ${-rIn} Q${w} ${-(rIn + len / 2)} 0 ${-(rIn + len)} Q${-w} ${-(rIn + len / 2)} 0 ${-rIn}Z`} transform={`rotate(${a})`} fill="none" stroke="currentColor" strokeWidth=".22" />
      );
    }
  }
  return (
    <svg className={className} viewBox="-51 -51 102 102" aria-hidden="true">
      {items}
      <circle r="50" fill="none" stroke="currentColor" strokeWidth=".3" />
    </svg>
  );
}

const split = (word) => [...word].map((c, i) => <span key={i} className="vh-ch">{c}</span>);

// Vero-style hero: full-bleed image, oversized serif wordmark,
// a tagline mixing italic lowercase with spaced capitals, quiet corner details.
export default function Hero({ play }) {
  const root = useRef(null);
  const reduce = prefersReducedMotion();

  // hidden start state + scroll behaviour (wordmark shrinks away, image drifts)
  useGSAP(() => {
    if (reduce) return;
    gsap.set('.vh-ch, .vh-amp, .vh-ganesh, .vh-tag, .vh-corner, .vh-cue', { opacity: 0 });
    const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
    gsap.fromTo('.vh-media', { scale: 1.12 }, { scale: 1, yPercent: 12, ease: 'none', scrollTrigger: st });
    gsap.to('.vh-mark', { scale: 0.42, yPercent: -70, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '70% top' } });
    gsap.to('.vh-tag, .vh-ganesh', { opacity: 0, y: -30, ease: 'none', scrollTrigger: { ...st, end: '40% top' } });
  }, { scope: root });

  // intro when the doors open
  useGSAP(() => {
    if (!play || reduce) return;
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo('.vh-media', { scale: 1.25, filter: 'blur(8px)' }, { scale: 1.12, filter: 'blur(0px)', duration: 2.2, ease: 'power2.out' }, 0)
      .fromTo('.vh-ganesh', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1 }, 0.3)
      .fromTo('.vh-ch', { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, duration: 1.3, stagger: 0.045 }, 0.45)
      .fromTo('.vh-amp', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'back.out(1.8)' }, 0.8)
      .fromTo('.vh-tag', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.1 }, 1.25)
      .fromTo('.vh-corner, .vh-cue', { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.1 }, 1.5);
    gsap.to('.vh-cue svg', { y: 6, duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.5 });
  }, { scope: root, dependencies: [play] });

  return (
    <section className="vhero" id="top" ref={root}>
      <div className="vh-media">
        {photos.hero ? (
          <img src={photos.hero} alt="Shubh Vivah mandap at dusk" />
        ) : (
          <div className="vh-fallback" style={patternStyle('butti', 'rgba(255,230,190,.16)', 64)} />
        )}
      </div>
      <div className="vh-shade" />

      <div className="vh-center">
        <p className="vh-ganesh">॥ श्री गणेशाय नमः ॥</p>
        <h1 className="vh-mark" aria-label="Shubham and Preeti">
          <span className="vh-word">{split('SHUBHAM')}</span>
          <span className="vh-amp">&amp;</span>
          <span className="vh-word">{split('PREETI')}</span>
        </h1>
        <p className="vh-tag">
          <em>The</em> SHUBH VIVAH <em>of two families,</em> ONE BLESSING.
        </p>
      </div>

      <p className="vh-corner left"><em>Tuesday to Friday</em><br />01 — 04 . XII . 2026</p>
      <p className="vh-corner right"><em>Hotel Regency</em><br />VARANASI</p>
      <a className="vh-cue" href="#statement" aria-label="Scroll to invitation">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 9l6 6 6-6" /></svg>
      </a>
    </section>
  );
}
