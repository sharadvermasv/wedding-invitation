import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import AudioButton from './AudioPlayer.jsx';
import { LotusIcon, SparklesIcon } from './Icons.jsx';

const LINKS = [
  ['The Couple', '#weekend'],
  ['Ceremonies', '#ceremonies'],
  ['Our Story & Blessings', '#story'],
  ['RSVP & Attendance', '#rsvp'],
  ['Getting There', '#travel'],
  ['Arriving in Varanasi', '#arrivals'],
  ['Countdown', '#countdown'],
  ['With Love', '#family'],
];

// Vero-style header: square buttons in the corners, centred wordmark that
// appears once the hero has scrolled away.
export default function Header({ onOpenBlessings, onOpenRsvp }) {
  const [open, setOpen] = useState(false);
  const [past, setPast] = useState(false);
  const menu = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const p = window.scrollY > window.innerHeight * 0.75;
      setPast(p);
      document.body.classList.toggle('past-hero', p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!menu.current || !open) return;
    gsap.fromTo(menu.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.inOut' });
    gsap.fromTo(menu.current.querySelectorAll('li'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, delay: 0.3, duration: 0.6, ease: 'power3.out' });
  }, [open]);

  return (
    <>
      <header className={`vhdr ${past ? 'is-past' : ''} ${open ? 'is-open' : ''}`}>
        <button className="vhdr-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? 'CLOSE' : 'MENU'}
        </button>

        <a className="vhdr-logo" href="#top" aria-label="Back to top">S <em>&amp;</em> P</a>

        <div className="vhdr-right">
          <AudioButton compact className="vhdr-sq vhdr-audio" />
          {onOpenRsvp && (
            <button className="vhdr-btn vhdr-rsvp-btn" onClick={() => onOpenRsvp()} aria-label="Confirm attendance">
              <span className="vhdr-long"><em>Confirm</em> RSVP</span>
              <span className="vhdr-short">RSVP</span>
            </button>
          )}
          <button className="vhdr-btn" onClick={onOpenBlessings} aria-label="Send blessings">
            <span className="vhdr-long"><em>Send your</em> BLESSINGS</span>
            <span className="vhdr-short"><em>Send</em> BLESSINGS</span>
          </button>
        </div>
      </header>

      {open && (
        <nav className="menu" ref={menu} aria-label="Main">
          <ul>
            {LINKS.map(([label, href]) => (
              <li key={href}>
                {href === '#rsvp' && onOpenRsvp ? (
                  <a href="#rsvp" onClick={(e) => { e.preventDefault(); setOpen(false); onOpenRsvp(); }}>
                    {label}
                  </a>
                ) : (
                  <a href={href} onClick={() => setOpen(false)}>{label}</a>
                )}
              </li>
            ))}
          </ul>
          <div className="menu-actions">
            {onOpenRsvp && (
              <button className="v-btn" onClick={() => { setOpen(false); onOpenRsvp(); }}>
                <span className="v-btn-ico"><SparklesIcon /></span>
                <span><em>Kindly</em> RSVP</span>
              </button>
            )}
            <button className="v-btn" onClick={() => { setOpen(false); onOpenBlessings(); }}>
              <span className="v-btn-ico"><LotusIcon /></span>
              <span><em>Send your</em> BLESSINGS</span>
            </button>
          </div>
          <p className="menu-foot">Shubham Verma &amp; Preeti Kumari · 03 . 12 . 2026 · Varanasi</p>
        </nav>
      )}
    </>
  );
}
