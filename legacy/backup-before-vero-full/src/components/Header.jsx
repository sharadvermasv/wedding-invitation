import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import AudioButton from './AudioPlayer.jsx';
import { LotusIcon } from './Icons.jsx';

const LINKS = [
  ['The Couple', '#weekend'],
  ['Our Story & Blessings', '#story'],
  ['Ceremonies', '#ceremonies'],
  ['Getting There', '#travel'],
  ['Countdown', '#countdown'],
  ['With Love', '#family'],
];

// Vero-style header: square buttons in the corners, centred wordmark that
// appears once the hero has scrolled away.
export default function Header({ onOpenBlessings }) {
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
        <button className="vhdr-sq" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className={`vhdr-burger ${open ? 'x' : ''}`}><i /><i /></span>
        </button>

        <a className="vhdr-logo" href="#top" aria-label="Back to top">S <em>&amp;</em> P</a>

        <div className="vhdr-right">
          <AudioButton compact className="vhdr-sq vhdr-audio" />
          <button className="vhdr-sq" onClick={onOpenBlessings} aria-label="Send blessings" title="Send blessings">
            <LotusIcon className="vhdr-ico" />
          </button>
        </div>
      </header>

      {open && (
        <nav className="menu" ref={menu} aria-label="Main">
          <ul>
            {LINKS.map(([label, href]) => (
              <li key={href}><a href={href} onClick={() => setOpen(false)}>{label}</a></li>
            ))}
          </ul>
          <div className="menu-actions">
            <button className="pill cream" onClick={() => { setOpen(false); onOpenBlessings(); }}>
              <LotusIcon className="btn-svg" />
              <span>Shower Blessings</span>
            </button>
          </div>
          <p className="menu-foot">Shubham Verma &amp; Preeti Kumari · 03 . 12 . 2026 · Varanasi</p>
        </nav>
      )}
    </>
  );
}
