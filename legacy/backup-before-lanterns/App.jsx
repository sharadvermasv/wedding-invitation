import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { guestName, prefersReducedMotion } from './lib.js';
import Doors from './components/Doors.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Statement from './components/Statement.jsx';
import Couple from './components/Couple.jsx';
import Rituals from './components/Rituals.jsx';
import Story from './components/Story.jsx';
import Travel from './components/Travel.jsx';
import Arrivals from './components/Arrivals.jsx';
import Shloka from './components/Shloka.jsx';
import Countdown from './components/Countdown.jsx';
import Family from './components/Family.jsx';
import Footer from './components/Footer.jsx';
import BlessingsModal from './components/BlessingsModal.jsx';
import RSVPModal from './components/RSVPModal.jsx';
import StickyRSVPButton from './components/StickyRSVPButton.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const [opened, setOpened] = useState(false);
  const [blessingsOpen, setBlessingsOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const guest = guestName();
  const main = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('locked', !opened);
    if (opened) ScrollTrigger.refresh();
  }, [opened]);

  // Site-wide motion in Vero's manner: headline lines rise out of a mask,
  // images open like a curtain, copy fades up.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.utils.toArray('.v-mask > span').forEach((el) => {
      gsap.from(el, { yPercent: 110, duration: 1.3, ease: 'power4.out', scrollTrigger: { trigger: el.parentElement, start: 'top 90%' } });
    });
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 30, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
    gsap.utils.toArray('[data-clip]').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(12% 12% 12% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      const img = el.querySelector('img');
      if (img) gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
  }, { scope: main });

  return (
    <>
      {!opened && <Doors guest={guest} onOpen={() => setOpened(true)} />}
      <Header 
        onOpenBlessings={() => setBlessingsOpen(true)} 
        onOpenRsvp={() => setRsvpOpen(true)}
      />
      <main ref={main}>
        <Hero play={opened} />
        <Statement />
        <Couple />
        <Rituals />
        <Story guest={guest} />
        <Travel />
        <Arrivals />
        <Shloka />
        <Countdown />
        <Family />
      </main>
      <Footer 
        onOpenBlessings={() => setBlessingsOpen(true)} 
        onOpenRsvp={() => setRsvpOpen(true)}
      />
      
      {/* Floating Sticky RSVP Button */}
      <StickyRSVPButton onOpenRsvp={() => setRsvpOpen(true)} />

      {/* Popups / Modals */}
      <BlessingsModal isOpen={blessingsOpen} onClose={() => setBlessingsOpen(false)} />
      <RSVPModal 
        isOpen={rsvpOpen} 
        onClose={() => setRsvpOpen(false)} 
      />
    </>
  );
}
