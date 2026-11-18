import { useEffect, useState } from 'react';
import { LotusIcon, CloseIcon } from './Icons.jsx';
import { sendToGoogleSheet } from '../services/googleSheet.js';

export default function BlessingsModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showerActive, setShowerActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleShower = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const blessingPayload = {
      type: 'blessing',
      name: name.trim(),
      text: message.trim() || 'Wishing you both a lifetime of happiness, unconditional love, and eternal togetherness.',
      time: 'Just now',
      createdAt: new Date().toISOString(),
    };

    // Forward to Google Sheet
    sendToGoogleSheet(blessingPayload);

    // Save to local storage
    try {
      const saved = localStorage.getItem('shubham_preeti_blessings');
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(blessingPayload);
      localStorage.setItem('shubham_preeti_blessings', JSON.stringify(list));
    } catch {
      // ignore
    }

    setShowerActive(true);
    setSubmitted(true);

    setTimeout(() => {
      setShowerActive(false);
    }, 4500);
  };

  const handleReset = () => {
    setName('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="vm-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="vm-bless-title">
      <div className="vm-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="vm-top">
          <span className="vm-top-mark">S <em>&amp;</em> P</span>
          <button type="button" className="vm-close" onClick={onClose} aria-label="Close dialog">
            CLOSE <CloseIcon />
          </button>
        </div>

        {submitted ? (
          <div className="vm-body">
            <p className="v-kicker center"><em>with</em> GRATITUDE · <span className="deva">धन्यवाद</span></p>
            <h3 className="vm-title" id="vm-bless-title">YOUR <em>blessing</em><br />HAS REACHED US.</h3>
            <p className="vm-deva deva">आपका आशीर्वाद हमारे लिए अमूल्य है।</p>
            <p className="vm-sub">Shubham &amp; Preeti will treasure your words, and so will the Verma family.</p>
            <div className="vm-actions">
              <button type="button" className="v-btn vm-btn" onClick={onClose}>
                <span className="v-btn-ico"><CloseIcon /></span>
                <span><em>Back to</em> THE INVITATION</span>
              </button>
              <button type="button" className="vm-link" onClick={handleReset}>
                Write another blessing
              </button>
            </div>
          </div>
        ) : (
          <form className="vm-body" onSubmit={handleShower}>
            <p className="v-kicker center"><em>send your</em> BLESSINGS · <span className="deva">शुभाशीर्वाद</span></p>
            <h3 className="vm-title" id="vm-bless-title">A <em>few</em> WORDS<br />FOR THE COUPLE.</h3>
            <p className="vm-sub">Share your love and warm wishes for Shubham &amp; Preeti.</p>

            <label className="vm-field">
              <span className="vm-label"><span>01</span> Name / family</span>
              <input
                id="blessing-name"
                type="text"
                className="vm-input"
                required
                autoComplete="name"
                placeholder="Anand Sharma & Family"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="vm-field">
              <span className="vm-label"><span>02</span> Your blessing</span>
              <textarea
                id="blessing-message"
                className="vm-input vm-textarea"
                rows={3}
                placeholder="May your union be blessed with endless joy…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <div className="vm-actions">
              <button type="submit" className="v-btn vm-btn">
                <span className="v-btn-ico"><LotusIcon /></span>
                <span><em>Shower</em> BLESSINGS</span>
              </button>
            </div>
          </form>
        )}

        {showerActive && (
          <div className="petal-burst-container" aria-hidden="true">
            {Array.from({ length: 45 }).map((_, i) => {
              const petalType = i % 3 === 0 ? 'gold' : i % 2 === 0 ? 'marigold' : 'rose';
              return (
                <span
                  key={i}
                  className={`burst-petal ${petalType}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${1.8 + Math.random() * 2}s`,
                    animationDelay: `${Math.random() * 0.4}s`,
                    transform: `scale(${0.6 + Math.random() * 0.8}) rotate(${Math.random() * 360}deg)`,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
