import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ceremonies } from '../content.js';
import { prefersReducedMotion } from '../lib.js';
import ArtPanel from './ArtPanel.jsx';
import { ceremonyIcon, CalendarIcon, StarSparkle } from './Icons.jsx';

// Grand Ceremony cards with authentic photos, Hindi titles, and timings.
export default function Ceremonies() {
  const root = useRef(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.cer-icon', {
      scale: 0, rotation: -45, duration: 1, stagger: 0.12, ease: 'back.out(2)',
      scrollTrigger: { trigger: '.cer-grid', start: 'top 80%' },
    });
  }, { scope: root });

  return (
    <section className="ceremonies" id="ceremonies" ref={root}>
      <div className="sec-head" data-reveal>
        <div className="cer-kicker-wrap">
          <StarSparkle className="gold-sparkle-svg" />
          <p className="hi-kicker">मांगलिक कार्यक्रम</p>
          <StarSparkle className="gold-sparkle-svg" />
        </div>
        <h2 className="h-sec ink">The Wedding Itinerary</h2>
        <p className="sec-subtitle">Four days of auspicious celebrations, heartfelt rituals, and joyous festivities</p>
      </div>
      <div className="cer-grid">
        {ceremonies.map((c, i) => {
          const Icon = ceremonyIcon[c.key];
          return (
            <article className={`cer ${c.main ? 'main' : ''}`} key={c.key}>
              <div className="cer-card-inner">
                <ArtPanel photo={c.photo} color={c.color} pattern={c.pattern} className="cer-art" data-clip>
                  <div className="cer-art-overlay">
                    <div className="cer-art-top">
                      <span className="cer-badge-num">RITUAL 0{i + 1}</span>
                      {c.main && (
                        <span className="cer-main-tag">
                          <StarSparkle className="inline-star" />
                          <span>Main Auspicious Event</span>
                        </span>
                      )}
                    </div>
                    <div className="cer-art-bottom">
                      <Icon className="cer-icon" />
                      <p className="cer-hi">{c.hi}</p>
                    </div>
                  </div>
                </ArtPanel>
                <div className="cer-content" data-reveal>
                  <div className="cer-header-row">
                    <h3 className="h-card">{c.name}</h3>
                    {c.time && <span className="cer-time-badge">{c.time}</span>}
                  </div>
                  <p className="cer-when">
                    <CalendarIcon className="cer-calendar-svg" />
                    <strong>{c.day}</strong>, {c.date}
                  </p>
                  <p className="cer-text">{c.text}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
