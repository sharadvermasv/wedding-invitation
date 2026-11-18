import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { travel } from '../content.js';
import { prefersReducedMotion } from '../lib.js';
import { Car, CompassIcon } from './Icons.jsx';


// Quiet, hairline-ruled information section in Vero's typographic voice.
export default function Travel() {
  const root = useRef(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.timeline({ scrollTrigger: { trigger: '.vt-route', start: 'top 85%', end: 'top 35%', scrub: 1 } })
      .to('.vt-route-fill', { scaleX: 1, ease: 'none' }, 0)
      .fromTo('.vt-car', { left: '0%' }, { left: '100%', ease: 'none' }, 0);
    gsap.from('.vt-row', { opacity: 0, y: 24, duration: 0.9, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.vt-rows', start: 'top 85%' } });
  }, { scope: root });

  return (
    <section className="vtravel" id="travel" ref={root}>
      <p className="v-kicker center" data-reveal><em>getting</em> THERE · <span className="deva">यात्रा मार्गदर्शिका</span></p>
      <h2 className="v-display center">
        <span className="v-mask"><span><em>from</em> FATEHPUR</span></span>
        <span className="v-mask"><span><em>to</em> VARANASI.</span></span>
      </h2>

      <div className="vt-route" data-reveal>
        <div className="vt-line"><i className="vt-route-fill" /><span className="vt-dot a" /><span className="vt-dot b" /><Car className="vt-car" /></div>
        <div className="vt-ends">
          <span><em>Groom's home</em><br />FATEHPUR</span>
          <span className="mid">~210 km via NH 19 · about 4½ hours</span>
          <span className="r"><em>Wedding venue</em><br />VARANASI</span>
        </div>
      </div>

      <div className="vt-rows">
        <div className="vt-row">
          <p className="vt-label"><em>the</em> BARAAT</p>
          <div>
            <p className="vt-main">{travel.baraat.time}</p>
            <p className="vt-sub">{travel.baraat.text}</p>
          </div>
          <a className="vt-link" href={travel.baraat.map} target="_blank" rel="noopener noreferrer">Starting point ↗</a>
        </div>
        <div className="vt-row">
          <p className="vt-label"><em>the</em> VENUE</p>
          <div>
            <p className="vt-main">{travel.venue.name}</p>
            <p className="vt-sub">{travel.venue.text}</p>
          </div>
          <a className="vt-link" href={travel.venue.map} target="_blank" rel="noopener noreferrer">Open in Maps ↗</a>
        </div>
      </div>

      <div className="v-center-btn" data-reveal>
        <a className="v-btn" href={travel.venue.map} target="_blank" rel="noopener noreferrer"><span className="v-btn-ico" aria-hidden="true"><CompassIcon /></span><span><em>Navigate to the</em> VENUE</span></a>
      </div>
    </section>
  );
}
