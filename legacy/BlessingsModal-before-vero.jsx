import { useState } from 'react';
import { LotusIcon, StarSparkle, CloseIcon } from './Icons.jsx';
import { sendToGoogleSheet } from '../services/googleSheet.js';

export default function BlessingsModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showerActive, setShowerActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content minimal-blessing" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">
          <CloseIcon className="modal-close-svg" />
        </button>

        <div className="modal-header">
          <div className="modal-kicker-row">
            <StarSparkle className="gold-sparkle-svg" />
            <p className="hi-kicker">शुभकामनाएँ एवं आशीर्वाद</p>
            <StarSparkle className="gold-sparkle-svg" />
          </div>
          <h3 className="h-card">Bless the Couple</h3>
          <p className="modal-desc">Share your love and warm wishes for Shubham &amp; Preeti.</p>
        </div>

        {submitted ? (
          <div className="blessing-thankyou">
            <div className="thankyou-badge-wrap">
              <LotusIcon className="thankyou-lotus-svg" />
            </div>
            <h4>Thank You for Your Blessings</h4>
            <p className="deva" style={{ fontSize: '1.05rem', color: 'var(--rust)', margin: '8px 0 14px' }}>
              सदा सौभाग्यवती भव · आपका आशीर्वाद हमारे लिए अमूल्य है।
            </p>
            <p style={{ color: 'var(--grey)', fontSize: '0.92rem' }}>
              Your loving wishes have been showered upon Shubham &amp; Preeti with deepest gratitude.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
              <button type="button" className="pill light solid" onClick={handleReset}>
                Write Another Blessing
              </button>
              <button type="button" className="pill gold-solid" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <form className="blessing-form" onSubmit={handleShower}>
            <div className="form-group">
              <label htmlFor="blessing-name">Your Name / Family Name *</label>
              <input
                id="blessing-name"
                type="text"
                required
                placeholder="e.g. Anand Sharma & Family"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="blessing-message">Your Warm Blessing</label>
              <textarea
                id="blessing-message"
                rows={3}
                placeholder="May your sacred union be blessed with endless joy, harmony, and togetherness..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="pill gold-solid shower-btn" style={{ marginTop: 6 }}>
              <LotusIcon className="btn-svg" />
              <span>Shower Blessings · आशीर्वाद दें</span>
            </button>
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
