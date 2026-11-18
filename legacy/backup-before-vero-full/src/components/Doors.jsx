import { useRef } from 'react';
import gsap from 'gsap';
import { patternStyle, prefersReducedMotion } from '../lib.js';
import { photos } from '../content.js';
import { shehnaiAudio } from './AudioPlayer.jsx';
import { StarSparkle } from './Icons.jsx';

// Grand Royal Palace & Temple doors that swing open in 3D to reveal the invitation.
export default function Doors({ guest, onOpen }) {
  const root = useRef(null);

  const open = () => {
    // Attempt audio start on user gesture
    try {
      shehnaiAudio.play();
    } catch {
      // AudioContext policy fallback
    }

    if (prefersReducedMotion()) return onOpen();
    const q = gsap.utils.selector(root);
    gsap.timeline({ onComplete: onOpen })
      .to(q('.doors-center'), { opacity: 0, scale: 0.88, duration: 0.6, ease: 'power2.in' })
      .to(q('.door.l'), { rotationY: -110, duration: 1.8, ease: 'power3.inOut' }, '-=0.15')
      .to(q('.door.r'), { rotationY: 110, duration: 1.8, ease: 'power3.inOut' }, '<')
      .to(root.current, { backgroundColor: 'rgba(0,0,0,0)', duration: 0.8 }, '-=0.9');
  };

  const pat = patternStyle('jaali', 'rgba(244,230,208,.16)', 64);

  return (
    <div className="doors" ref={root} role="dialog" aria-label="Royal Wedding Invitation">
      <div className="door l">
        {photos.doors ? (
          <div className="door-img-wrap l">
            <img src={photos.doors} alt="" className="door-wood-img" />
            <div className="door-overlay" />
          </div>
        ) : (
          <div className="door-pat" style={pat} />
        )}
        <div className="door-handle left" />
      </div>

      <div className="door r">
        {photos.doors ? (
          <div className="door-img-wrap r">
            <img src={photos.doors} alt="" className="door-wood-img" />
            <div className="door-overlay" />
          </div>
        ) : (
          <div className="door-pat" style={pat} />
        )}
        <div className="door-handle right" />
      </div>

      <div className="doors-center">
        <p className="doors-ganesh">॥ श्री गणेशाय नमः ॥</p>
        <div className="seal">
          <div className="seal-ring" />
          <span>शुभ<br />विवाह</span>
        </div>
        <p className="for">{guest ? `Specially for ${guest}` : 'With Joyful Hearts, You Are Cordially Invited'}</p>
        <h1 className="doors-couple-title">Shubham <span>&amp;</span> Preeti</h1>
        <p className="doors-dates">1 — 4 December 2026 · Hotel Regency, Varanasi</p>
        <button className="pill light gold-glow" onClick={open}>
          <span>Open the Royal Invitation</span>
          <StarSparkle className="door-sparkle-svg" />
        </button>
      </div>
    </div>
  );
}
