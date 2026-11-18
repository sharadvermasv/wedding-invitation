import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { arrivals, travel } from '../content.js';
import { prefersReducedMotion } from '../lib.js';
import { MapPinIcon } from './Icons.jsx';

// Dedicated section for outstation guests: stations & airport near the venue.
export default function Arrivals() {
  const root = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    // distances count up when the row scrolls into view
    gsap.utils.toArray('.va-num', root.current).forEach((el) => {
      const target = parseFloat(el.dataset.value);
      const decimals = (el.dataset.value.split('.')[1] || '').length;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate: () => { el.textContent = obj.v.toFixed(decimals); },
      });
    });
    gsap.from('.va-col', {
      opacity: 0, y: 40, duration: 1, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.va-grid', start: 'top 85%' },
    });
  }, { scope: root });

  return (
    <section className="varrivals" id="arrivals" ref={root}>
      <p className="v-kicker center" data-reveal><em>for our</em> OUTSTATION GUESTS · <span className="deva">वाराणसी आगमन</span></p>
      <h2 className="v-display center">
        <span className="v-mask"><span><em>arriving in</em></span></span>
        <span className="v-mask"><span>VARANASI.</span></span>
      </h2>
      <p className="va-lead" data-reveal>
        {travel.venue.name} at Andhrapul is well connected to the city's railway stations and airport. Autos and cabs are available around the clock.
      </p>

      <div className="va-grid">
        {arrivals.map((a, i) => {
          const [value, unit] = a.dist.split(' ');
          return (
            <article className="va-col" key={a.name}>
              <p className="va-mode"><span><em>by</em> {a.mode.toUpperCase()}</span><span>0{i + 1}</span></p>
              <p className="va-dist"><b className="va-num" data-value={value}>{value}</b> <span>{unit}</span></p>
              <h3 className="va-name">{a.name}</h3>
              <p className="va-note">{a.note}</p>
              <p className="va-time"><em>from the venue</em> · {a.time}</p>
            </article>
          );
        })}
      </div>

      <div className="v-center-btn" data-reveal>
        <a className="v-btn va-btn" href={travel.venue.map} target="_blank" rel="noopener noreferrer"><span className="v-btn-ico" aria-hidden="true"><MapPinIcon /></span><span><em>Open the venue in</em> MAPS</span></a>
      </div>
    </section>
  );
}
