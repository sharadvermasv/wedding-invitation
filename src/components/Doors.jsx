import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { patternStyle, prefersReducedMotion } from '../lib.js';
import { photos } from '../content.js';
import { shehnaiAudio } from './AudioPlayer.jsx';
import WaxSeal from './WaxSeal.jsx';

// Entry screen: temple doors held shut by a wax seal. Opening the invitation
// cracks the seal and swings both doors open onto the hero.
export default function Doors({ guest, onOpen }) {
  const root = useRef(null);
  const reduce = prefersReducedMotion();

  // gentle arrival of the text, and a slow breathing glow on the seal
  useGSAP(() => {
    if (reduce) return;
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo('.vd-img', { scale: 1.12 }, { scale: 1.04, duration: 2.4, ease: 'power2.out' }, 0)
      .from('.vd-ganesh, .vd-kicker', { opacity: 0, y: 14, duration: 1, stagger: 0.12 }, 0.3)
      .from('.vd-name > span', { opacity: 0, yPercent: 100, duration: 1.3, stagger: 0.12, ease: 'power4.out' }, 0.5)
      .from('.vd-seal', { opacity: 0, scale: 0.6, rotation: -30, duration: 1.1, ease: 'back.out(1.7)' }, 0.9)
      .from('.vd-btn, .vd-corner', { opacity: 0, y: 12, duration: 0.9, stagger: 0.08 }, 1.1);
    gsap.to('.vd-seal-glow', { opacity: 0.85, scale: 1.12, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  }, { scope: root });

  const open = () => {
    try { shehnaiAudio.play(); } catch { /* autoplay policy */ }
    if (reduce) return onOpen();
    const q = gsap.utils.selector(root);
    gsap.timeline({ onComplete: onOpen })
      .to(q('.vd-btn, .vd-text, .vd-corner'), { opacity: 0, y: -10, duration: 0.45, ease: 'power2.in' })
      .to(q('.vd-seal-glow'), { opacity: 0, duration: 0.3 }, '<')
      // the seal cracks along the seam
      .to(q('.vd-seal-half.l'), { xPercent: -28, rotation: -14, duration: 0.55, ease: 'power2.out' }, '-=0.1')
      .to(q('.vd-seal-half.r'), { xPercent: 28, rotation: 14, duration: 0.55, ease: 'power2.out' }, '<')
      .to(q('.vd-seal'), { opacity: 0, scale: 0.9, duration: 0.35 }, '-=0.15')
      .to(q('.vd-door.l'), { rotationY: -105, duration: 1.7, ease: 'power3.inOut' }, '-=0.2')
      .to(q('.vd-door.r'), { rotationY: 105, duration: 1.7, ease: 'power3.inOut' }, '<')
      .to(root.current, { backgroundColor: 'rgba(0,0,0,0)', duration: 0.8 }, '-=0.9');
  };

  const door = (side) => (
    <div className={`vd-door ${side}`}>
      {photos.doors ? (
        <div className={`vd-img-wrap ${side}`}><img className="vd-img" src={photos.doors} alt="" /></div>
      ) : (
        <div className="vd-pat" style={patternStyle('jaali', 'rgba(244,230,208,.16)', 64)} />
      )}
      <div className="vd-shade" />
    </div>
  );

  return (
    <div className="vdoors" ref={root} role="dialog" aria-label="Wedding invitation">
      {door('l')}
      {door('r')}

      <div className="vd-content">
        <div className="vd-text">
          <p className="vd-ganesh">॥ श्री गणेशाय नमः ॥</p>
          <p className="vd-kicker">
            {guest ? <><em>specially for</em> {guest.toUpperCase()}</> : <><em>with joyful hearts, you are</em> CORDIALLY INVITED</>}
          </p>
          <h1 className="vd-name" aria-label="Shubham and Preeti">
            <span>SHUBHAM</span>
            <span><em>&amp;</em> PREETI</span>
          </h1>
        </div>

        <div className="vd-seal" aria-hidden="true">
          <span className="vd-seal-glow" />
          <span className="vd-seal-half l"><span className="vd-cord" /><WaxSeal id="wsl" /></span>
          <span className="vd-seal-half r"><span className="vd-cord" /><WaxSeal id="wsr" /></span>
        </div>

        <button className="vd-btn" onClick={open}>
          <span className="vd-btn-dia" aria-hidden="true" />
          <span className="vd-btn-label"><em>Open the</em> INVITATION</span>
          <span className="vd-btn-dia" aria-hidden="true" />
        </button>
      </div>

      <p className="vd-corner l"><em>Tuesday to Friday</em><br />01 — 04 . XII . 2026</p>
      <p className="vd-corner r"><em>Hotel Regency</em><br />VARANASI</p>
    </div>
  );
}
