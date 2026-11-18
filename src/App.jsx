import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { guestName, prefersReducedMotion } from './lib.js';
import { TopBar, Section1, Couple, Message, Things, Night, Closing } from './lv/Sections.jsx';
import { shehnaiAudio } from './components/AudioPlayer.jsx';
import BlessingsModal from './components/BlessingsModal.jsx';
import RSVPModal from './components/RSVPModal.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const [blessingsOpen, setBlessingsOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const guest = guestName();
  const root = useRef(null);

  useEffect(() => {
    const handleFirstGesture = () => {
      shehnaiAudio.play();
    };
    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Smooth parallax on hero elements as you scroll down
      gsap.to('[data-hero-names]', {
        yPercent: -35,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.lv-hero-viewport',
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
      });

      gsap.to('.lv-lantern-track', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.lv-hero-viewport',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Safe, visible-by-default reveal for cards and sections
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      document.querySelectorAll('[data-rv], .lv-event, .lv-burst, .lv-thing, .lv-moon, .lv-rsvp, .lv-portraits figure').forEach((el) => {
        el.classList.add('lv-reveal-init');
        observer.observe(el);
      });

      return () => observer.disconnect();
    },
    { scope: root }
  );

  return (
    <div className="lv" ref={root}>
      <TopBar onRsvp={() => setRsvpOpen(true)} />
      <Section1 guest={guest} />
      <Couple />
      <Message onRsvp={() => setRsvpOpen(true)} />
      <Things onBlessings={() => setBlessingsOpen(true)} />
      <Night />
      <Closing />

      <BlessingsModal isOpen={blessingsOpen} onClose={() => setBlessingsOpen(false)} />
      <RSVPModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </div>
  );
}
