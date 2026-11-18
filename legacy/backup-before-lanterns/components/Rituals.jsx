import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ceremonies } from '../content.js';
import { prefersReducedMotion } from '../lib.js';

export default function Rituals() {
  const root = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const el = root.current;
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      const n = ceremonies.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.vr-pin',
          start: 'top top',
          end: () => `+=${(n - 1) * window.innerWidth}`,
          pin: true,
          scrub: 1,
          snap: { snapTo: 1 / (n - 1), duration: 0.5, ease: 'power2.inOut' },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIdx = Math.min(n - 1, Math.max(0, Math.round(self.progress * (n - 1))));
            setActiveIndex(nextIdx);
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger;
      tl.to('.vr-track', { xPercent: (-100 * (n - 1)) / n, ease: 'none' }, 0);
    });
  }, { scope: root });

  const handleNavClick = (idx, key) => {
    if (window.innerWidth >= 769 && scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const targetScroll = st.start + (idx / (ceremonies.length - 1)) * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      const targetEl = document.getElementById(`ritual-card-${key}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    setActiveIndex(idx);
  };

  return (
    <section className="vrituals" id="ceremonies" ref={root}>
      <div className="vr-intro">
        <p className="v-kicker center" data-reveal><em>the</em> MANGALIK KARYAKRAM · <span className="deva">मांगलिक कार्यक्रम</span></p>
        <h2 className="v-display center">
          <span className="v-mask"><span><em>four</em> DAYS <em>of</em></span></span>
          <span className="v-mask"><span>SACRED RITUALS.</span></span>
        </h2>
      </div>

      <div className="vr-pin">
        <div className="vr-track" style={{ width: `${ceremonies.length * 100}%` }}>
          {ceremonies.map((c, i) => (
            <article className={`vr-slide ${i === activeIndex ? 'is-active' : ''}`} key={c.key} id={`ritual-card-${c.key}`}>
              <div className="vr-img-wrap">
                <img src={c.photo} alt={c.name} loading="lazy" />
              </div>
              <div className="vr-shade" />

              <div className="vr-info">
                <div className="vr-badge">
                  <span className="vr-dot-accent" />
                  <span>RITUAL 0{i + 1} OF 0{ceremonies.length}</span>
                  {c.main && <span className="vr-badge-main">MAIN CEREMONY</span>}
                </div>

                <h3 className="vr-hi deva">{c.hi}</h3>
                <h4 className="vr-en">{c.name}</h4>

                <div className="vr-divider" />

                <p className="vr-when">
                  <span className="vr-when-day">{c.day}, {c.date}</span>
                  {c.time && <span className="vr-when-time">{c.time}</span>}
                </p>

                <p className="vr-text">{c.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Ceremonial Navigation Stepper — replaces the broken cut-off caption */}
        <div className="vr-nav-bar" aria-label="Ritual Navigator">
          <div className="vr-nav-pills">
            {ceremonies.map((c, i) => (
              <button
                type="button"
                key={c.key}
                className={`vr-nav-pill ${i === activeIndex ? 'active' : ''}`}
                onClick={() => handleNavClick(i, c.key)}
                aria-label={`Go to ${c.name}`}
              >
                <span className="vr-pill-num">0{i + 1}</span>
                <span className="vr-pill-label">
                  <span className="vr-pill-en">{c.name}</span>
                  <span className="vr-pill-hi deva">{c.hi}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
