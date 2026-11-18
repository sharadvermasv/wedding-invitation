import { useState, useEffect } from 'react';
import { SparklesIcon } from './Icons.jsx';

export default function StickyRSVPButton({ onOpenRsvp }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside 
      className={`vrsvp-sticky-dock ${visible ? 'is-visible' : ''}`}
      aria-label="RSVP Quick Access"
    >
      <button
        type="button"
        className="vrsvp-sticky-pill-single"
        onClick={onOpenRsvp}
        aria-label="Confirm attendance RSVP"
      >
        <span className="vrsvp-sticky-icon">
          <SparklesIcon />
        </span>
        <span className="vrsvp-sticky-label">
          <span className="vrsvp-sticky-en">Confirm RSVP</span>
          <span className="vrsvp-sticky-hi deva">उपस्थिति</span>
        </span>
      </button>
    </aside>
  );
}
