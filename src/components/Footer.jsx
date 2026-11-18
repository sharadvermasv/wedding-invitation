import { useLayoutEffect, useRef } from 'react';
import { contact, travel } from '../content.js';

// Vero footer: small rows of links, a wordmark that spans the full width, legal line.
export default function Footer({ onOpenBlessings, onOpenRsvp }) {
  const mark = useRef(null);

  // scale the wordmark so it always fills the width exactly
  useLayoutEffect(() => {
    const el = mark.current;
    const fit = () => {
      el.style.fontSize = '100px';
      const w = el.scrollWidth;
      const avail = el.parentElement.clientWidth;
      el.style.fontSize = `${(100 * avail) / w}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <footer className="vfooter">
      <div className="vft-top">
        <div>
          <p className="vft-label">CALL THE FAMILY</p>
          <p className="vft-host">{contact.sender}</p>
          {contact.phones.map((p) => (
            <a key={p} className="vft-phone" href={`tel:${p.replace(/\s/g, '')}`}><span>{p}</span><span>→</span></a>
          ))}
        </div>
        <nav className="vft-links" aria-label="Footer">
          <a href="#weekend">The Couple ↗</a>
          <a href="#ceremonies">Ceremonies ↗</a>
          <a href="#story">Invitation ↗</a>
          {onOpenRsvp ? (
            <button onClick={() => onOpenRsvp()}>Confirm RSVP ↗</button>
          ) : (
            <a href="#rsvp">Confirm RSVP ↗</a>
          )}
          <a href="#travel">Getting There ↗</a>
          <a href="#arrivals">Arriving in Varanasi ↗</a>
          <a href="#countdown">Countdown ↗</a>
          <a href={travel.venue.map} target="_blank" rel="noopener noreferrer">Venue Map ↗</a>
          {onOpenBlessings && <button onClick={onOpenBlessings}>Send Blessings ↗</button>}
        </nav>
      </div>

      <div className="vft-mark-wrap">
        <p className="vft-mark" ref={mark}>SHUBH VIVAH</p>
      </div>

      <div className="vft-legal">
        <span>{contact.address}</span>
        <span className="deva">शुभ विवाह · ०३ · १२ · २०२६</span>
        <span>With warmest regards, the Verma Family</span>
      </div>
    </footer>
  );
}
