import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { photos } from '../content.js';
import { prefersReducedMotion } from '../lib.js';

// Vero's pinned statement: big mixed-case lines, an image that opens up
// between them as you scroll, then a short paragraph and a call to action.
export default function Statement() {
  const root = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 721px)', () => {
      gsap.timeline({
        scrollTrigger: { trigger: '.vs-stage', start: 'top top', end: '+=140%', scrub: 1, pin: true },
      })
        .fromTo('.vs-window', { clipPath: 'inset(30% 36% 30% 36%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
        .fromTo('.vs-window img', { scale: 1.35 }, { scale: 1, ease: 'none' }, 0)
        .fromTo('.vs-line.a', { yPercent: 0 }, { yPercent: -120, opacity: 0, ease: 'none' }, 0.15)
        .fromTo('.vs-line.b', { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, ease: 'none' }, 0.45);
    });
    mm.add('(max-width: 720px)', () => {
      gsap.fromTo('.vs-window', { clipPath: 'inset(18% 18% 18% 18%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
        scrollTrigger: { trigger: '.vs-window', start: 'top 85%', end: 'center center', scrub: true },
      });
    });
    gsap.from('.vs-copy > *', {
      opacity: 0, y: 30, duration: 1.1, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.vs-copy', start: 'top 85%' },
    });
  }, { scope: root });

  return (
    <section className="vstatement" id="statement" ref={root}>
      <div className="vs-stage">
        <h2 className="vs-line a">TWO FAMILIES,<br /><em>one</em> SACRED BOND</h2>
        <div className="vs-window">
          <img src={photos.storyPanigrahan || photos.hero} alt="Hastamelap by the sacred fire" />
        </div>
        <h2 className="vs-line b">SEVEN VOWS TO<br />LAST <em>forever.</em></h2>
      </div>

      <div className="vs-copy">
        <p className="vs-lead">
          With the blessings of Lord Ganesha and our elders, the Verma family invites you to celebrate the wedding of Shubham Verma and
          Preeti Kumari.
        </p>
        <p className="vs-body">
          Four days of rituals, from the first anointing of the Tail Poojan to the tender farewell of the Vidaai, with the sacred Panigrahan
          Sanskar on Thursday, 3 December 2026, at Hotel Regency, Varanasi.
        </p>
        <a className="vs-cta" href="#weekend"><em>Open the</em> INVITATION</a>
      </div>
    </section>
  );
}
