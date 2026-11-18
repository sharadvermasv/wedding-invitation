import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { invocation } from '../content.js';
import { prefersReducedMotion } from '../lib.js';

// Vero's closing poem ("I HELD A MOMENT IN MY HAND…") with a wax seal in the middle,
// here the Mangalam shloka in English, sealed with S & P.
const LINES = [
  ['AUSPICIOUS IS', 'LORD VISHNU,'],
  ['AUSPICIOUS IS HE', 'WHOSE BANNER'],
  ['BEARS GARUDA,', 'AUSPICIOUS'],
  ['IS THE LOTUS-', 'EYED ONE.'],
];

export default function Shloka() {
  const root = useRef(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true };
    gsap.utils.toArray('.vsh-line', root.current).forEach((l, i) => {
      gsap.fromTo(l, { xPercent: i % 2 ? 6 : -6 }, { xPercent: i % 2 ? -6 : 6, ease: 'none', scrollTrigger: st });
    });
    gsap.fromTo('.vsh-seal', { rotation: -25, scale: 0.85 }, { rotation: 20, scale: 1, ease: 'none', scrollTrigger: st });
  }, { scope: root });

  return (
    <section className="vshloka" ref={root} aria-label={invocation.shlokaEn}>
      <div className="vsh-lines" aria-hidden="true">
        {LINES.map(([a, b], i) => (
          <p className={`vsh-line ${i === 2 ? 'has-seal' : ''}`} key={a}>
            <span>{a}</span>
            {i === 2 ? <span className="vsh-seal"><b>S<em>&amp;</em>P</b></span> : <span className="vsh-gap" />}
            <span>{b}</span>
          </p>
        ))}
      </div>
      <p className="vsh-attr">MANGALAM SHLOKA</p>
      <p className="vsh-deva deva">{invocation.shloka[0]}<br />{invocation.shloka[1]}</p>
    </section>
  );
}
