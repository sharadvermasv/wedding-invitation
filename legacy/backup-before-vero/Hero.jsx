import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { photos } from '../content.js';
import { patternStyle, prefersReducedMotion } from '../lib.js';
import { CalendarIcon, MapPinIcon, StarSparkle } from './Icons.jsx';

function Toran({ strands }) {
  const W = 1200;
  const gap = W / strands;
  const cols = ['#FFB347', '#F6D365', '#C8372D'];
  const swags = [];
  for (let i = 0; i < strands; i += 2) {
    const x0 = i * gap, x1 = x0 + gap * 2, mx = x0 + gap;
    for (let t = 0; t <= 1.001; t += 0.07) {
      const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * mx + t * t * x1;
      const y = (1 - t) ** 2 * 6 + 2 * (1 - t) * t * 56 + t * t * 6;
      swags.push(<circle key={`${i}-${t}`} cx={x} cy={y} r="5" fill={cols[Math.round(t * 14) % 3]} />);
    }
  }
  const hangs = [];
  for (let i = 0; i <= strands; i++) {
    const x = i * gap, n = i % 2 === 0 ? 8 : 4, ly = 14 + n * 9;
    hangs.push(
      <g key={i} className="strand" style={{ transformOrigin: `${x}px 6px` }}>
        <line x1={x} y1="6" x2={x} y2={12 + n * 9} stroke="#5B1A22" strokeWidth=".8" />
        {Array.from({ length: n }, (_, j) => (
          <circle key={j} cx={x} cy={14 + j * 9} r={4.4 - j * 0.12} fill={cols[(i + j) % 3]} />
        ))}
        <path d={`M${x} ${ly} q8 10 0 26 q-8 -16 0 -26z`} fill="#3F5A2A" />
        <path d={`M${x} ${ly + 2} v22`} stroke="#9BB37A" strokeWidth=".6" />
      </g>
    );
  }
  return (
    <svg className="toran" viewBox={`0 0 ${W} 140`} preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <rect x="0" y="0" width={W} height="6" fill="#5B1A22" />
      {swags}
      {hangs}
    </svg>
  );
}

function Mandala({ layers = 9, className }) {
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
export { Mandala };

export default function Hero({ play }) {
  const root = useRef(null);
  const mobile = typeof window !== 'undefined' && window.innerWidth < 720;
  const petals = useMemo(() => Array.from({ length: mobile ? 14 : 26 }, (_, i) => i), [mobile]);
  const reduce = prefersReducedMotion();

  // initial hidden state + ambient motion
  useGSAP(() => {
    if (reduce) return;
    gsap.set('.hero-names .ln > span, .hero-card, .hero-eyebrow-badge, .hero-subkicker, .hero-amp', { opacity: 0 });
    gsap.to('.hero-mandala', { rotation: 360, duration: 180, repeat: -1, ease: 'none' });
    gsap.to('.hero-bg', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-inner', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
  }, { scope: root });

  // intro — once the doors open
  useGSAP(() => {
    if (!play || reduce) return;
    gsap.timeline()
      .from('.strand', { scaleY: 0, duration: 1.2, stagger: { each: 0.03, from: 'center' }, ease: 'elastic.out(1,.6)' })
      .fromTo('.hero-eyebrow-badge', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
      .fromTo('.hero-subkicker', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3)
      .fromTo('.hero-names .ln > span', { opacity: 0, yPercent: 105 }, { opacity: 1, yPercent: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }, 0.35)
      .fromTo('.hero-amp', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(2)' }, 0.5)
      .fromTo('.hero-card', { opacity: 0, y: 40, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0.9);
    gsap.to('.strand', { rotation: () => gsap.utils.random(-3, 3), duration: () => gsap.utils.random(2, 3.5), yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.4 });
    gsap.utils.toArray('.petal', root.current).forEach((p) => {
      gsap.set(p, { left: `${Math.random() * 100}%`, scale: gsap.utils.random(0.5, 1.1), rotation: Math.random() * 360 });
      gsap.to(p, { y: () => window.innerHeight + 80, duration: gsap.utils.random(7, 13), delay: gsap.utils.random(0, 8), repeat: -1, ease: 'none' });
      gsap.to(p, { x: `+=${gsap.utils.random(40, 110)}`, rotation: `+=${gsap.utils.random(180, 540)}`, duration: gsap.utils.random(2.5, 4), yoyo: true, repeat: -1, ease: 'sine.inOut' });
    });
  }, { scope: root, dependencies: [play] });

  const petalCols = ['#FFB347', '#F6D365', '#C8372D', '#FFF1D6', '#8E1B2B'];

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-bg">
        {photos.hero ? (
          <img src={photos.hero} alt="" />
        ) : (
          <>
            <div className="hero-pat" style={patternStyle('butti', 'rgba(255,230,190,.16)', 64)} />
            <Mandala className="hero-mandala" />
          </>
        )}
      </div>
      <div className="hero-shade" />
      <Toran strands={mobile ? 13 : 25} />
      <div className="petals" aria-hidden="true">
        {petals.map((i) => <span key={i} className="petal" style={{ background: petalCols[i % petalCols.length] }} />)}
      </div>

      <div className="hero-inner">
        <div className="hero-eyebrow-badge">
          <StarSparkle className="badge-sparkle-svg" />
          <p className="hero-eyebrow">॥ श्री गणेशाय नमः ॥</p>
          <StarSparkle className="badge-sparkle-svg" />
        </div>
        <p className="hero-subkicker">With the divine blessings of our ancestors &amp; elders</p>
        <h2 className="hero-names" aria-label="Shubham and Preeti">
          <span className="ln"><span>Shubham</span></span>
          <span className="hero-amp">&amp;</span>
          <span className="ln"><span>Preeti</span></span>
        </h2>
        <div className="hero-card">
          <div className="hero-card-col">
            <span className="hero-card-icon-wrap"><CalendarIcon className="hero-svg-icon" /></span>
            <p><strong>1 – 4 December 2026</strong><br />Tuesday to Friday</p>
          </div>
          <span className="hero-card-div" />
          <div className="hero-card-col">
            <span className="hero-card-icon-wrap"><MapPinIcon className="hero-svg-icon" /></span>
            <p><strong>Hotel Regency</strong><br />G.T. Road, Varanasi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
