import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { guestName, prefersReducedMotion } from './lib.js';
import Doors from './components/Doors.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Statement from './components/Statement.jsx';
import Weekend from './components/Weekend.jsx';
import Story from './components/Story.jsx';
import Ceremonies from './components/Ceremonies.jsx';
import Travel from './components/Travel.jsx';
import Countdown from './components/Countdown.jsx';
import Family from './components/Family.jsx';
import Footer from './components/Footer.jsx';
import BlessingsModal from './components/BlessingsModal.jsx';
import AudioButton from './components/AudioPlayer.jsx';
import { LotusIcon } from './components/Icons.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const [opened, setOpened] = useState(false);
  const [blessingsOpen, setBlessingsOpen] = useState(false);
  const guest = guestName();
  const main = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('locked', !opened);
    if (opened) ScrollTrigger.refresh();
  }, [opened]);

  // Site-wide scroll reveals
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 35, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.utils.toArray('[data-clip]').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 85%' } });
      const pat = el.querySelector('.art-pat, img');
      if (pat) gsap.fromTo(pat, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.to('.flame.f1', { scaleY: 1.12, scaleX: 0.94, duration: 0.35, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 100%' });
    gsap.to('.flame.f2', { scaleY: 0.85, duration: 0.25, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 100%' });
    gsap.to('.sparkle path', { scale: 0.4, opacity: 0.4, transformOrigin: 'center', duration: 1.2, stagger: 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.cd-mandala', { rotation: 360, duration: 90, repeat: -1, ease: 'none' });
  }, { scope: main });

  return (
    <>
      {!opened && <Doors guest={guest} onOpen={() => setOpened(true)} />}
      <Header onOpenBlessings={() => setBlessingsOpen(true)} />
      <main ref={main}>
        <Hero play={opened} />
        <Statement />
        <Weekend />
        <Story guest={guest} />
        <Ceremonies />
        <Travel />
        <Countdown />
        <Family />
      </main>
      <Footer onOpenBlessings={() => setBlessingsOpen(true)} />

      {opened && (
        <div className="floating-actions-bar" aria-label="Quick Actions">
          <AudioButton className="floating-audio-btn" compact={true} />
          <button
            className="floating-blessings-btn"
            onClick={() => setBlessingsOpen(true)}
            title="Send Blessings to Shubham & Preeti"
            aria-label="Send Blessings"
          >
            <LotusIcon className="floating-svg-icon" />
            <span className="floating-text">Blessings</span>
          </button>
        </div>
      )}

      <BlessingsModal
        isOpen={blessingsOpen}
        onClose={() => setBlessingsOpen(false)}
      />
    </>
  );
}
