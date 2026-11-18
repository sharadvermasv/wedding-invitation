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

export default function Header({ onOpenBlessings }) {
  const [open, setOpen] = useState(false);
  const menu = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!menu.current) return;
    if (open) {
      gsap.fromTo(menu.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.inOut' });
      gsap.fromTo(menu.current.querySelectorAll('li'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, delay: 0.3, duration: 0.6, ease: 'power3.out' });
    }
  }, [open]);

  return (
    <>
      <header className="site-header">
        <a className="logo" href="#top">
          <span className="logo-initials">S &amp; P</span>
          <span className="logo-deva">शुभ विवाह</span>
        </a>
        <div className="header-right">
          <AudioButton />
          <button className="pill sm gold-nav-btn" onClick={onOpenBlessings}>
            <LotusIcon className="nav-btn-icon-svg" />
            <span>Blessings</span>
          </button>
          <a className="pill sm nav-directions-btn" href="#travel">Directions</a>
          <button className={`burger ${open ? 'x' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span />
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
