import { useState, useEffect } from 'react';
import { LotusIcon, StarSparkle, CloseIcon } from './Icons.jsx';

const DEFAULT_BLESSINGS = [
  { name: 'Ramesh & Sunita Gupta', text: 'Wishing Shubham & Preeti a lifetime of unconditional love, joy, and eternal togetherness.', time: 'Just now' },
  { name: 'Dr. V.K. Srivastava', text: 'May Lord Ganesha bestow boundless happiness, health, and prosperity upon the newly wedded couple. Sada Saubhagyavati Bhava.', time: '1 hour ago' },
  { name: 'Ananya & Family', text: 'Heartiest congratulations to both families. Eagerly looking forward to celebrating with you in Varanasi.', time: 'Yesterday' }
];

export default function BlessingsModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [flowerType, setFlowerType] = useState('rose');
  const [blessings, setBlessings] = useState(() => {
    try {
      const saved = localStorage.getItem('shubham_preeti_blessings');
      return saved ? JSON.parse(saved) : DEFAULT_BLESSINGS;
    } catch {
      return DEFAULT_BLESSINGS;
    }
  });
  const [showerActive, setShowerActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('shubham_preeti_blessings', JSON.stringify(blessings));
    } catch {
      // storage fallback
    }
  }, [blessings]);

  if (!isOpen) return null;

  const handleShower = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newBlessing = {
      name: name.trim(),
      text: message.trim() || 'Wishing you both a blessed marriage filled with joy, prosperity, and lifelong companionship.',
      time: 'Just now',
    };

    setBlessings([newBlessing, ...blessings]);
    setShowerActive(true);
    setSubmitted(true);

    setTimeout(() => {
      setShowerActive(false);
    }, 4000);
  };

  const sampleMessages = [
    'May your love grow stronger with each passing day. Shubh Vivah.',
    'Sending our warmest blessings to the couple for a blissful journey ahead.',
    'May Lord Shiva and Goddess Parvati always bless your sacred union.',
    'Congratulations Shubham & Preeti. Wishing you both unending happiness.'
  ];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
          <p className="modal-desc">Share your love, congratulations and warm wishes for Shubham &amp; Preeti.</p>
        </div>

        {submitted ? (
          <div className="blessing-thankyou">
            <div className="thankyou-badge-wrap">
              <LotusIcon className="thankyou-lotus-svg" />
            </div>
            <h4>Thank You for Your Blessings</h4>
            <p>Your loving wishes have been showered upon Shubham &amp; Preeti with deepest gratitude.</p>
            <button className="pill light solid" style={{ marginTop: 22 }} onClick={() => setSubmitted(false)}>
              Send Another Blessing
            </button>
          </div>
        ) : (
          <form className="blessing-form" onSubmit={handleShower}>
            <div className="form-group">
              <label>Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Sharma & Family"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Your Warm Blessing</label>
              <textarea
                rows={3}
                placeholder="Write your sweet wishes or choose from suggestions below..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="quick-messages">
                {sampleMessages.map((msg, i) => (
                  <button
                    key={i}
                    type="button"
                    className="quick-msg-btn"
                    onClick={() => setMessage(msg)}
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Celebratory Petal Shower</label>
              <div className="flower-options">
                {[
                  { id: 'rose', label: 'Fragrant Rose Petals', icon: LotusIcon },
                  { id: 'marigold', label: 'Auspicious Marigolds', icon: LotusIcon },
                  { id: 'gold', label: 'Golden Sparkles', icon: StarSparkle },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <label key={f.id} className={`flower-choice ${flowerType === f.id ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="flowerType"
                        value={f.id}
                        checked={flowerType === f.id}
                        onChange={() => setFlowerType(f.id)}
                      />
                      <Icon className={`flower-choice-svg ${f.id}`} />
                      <span>{f.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="pill gold-solid shower-btn">
              <LotusIcon className="btn-svg" />
              <span>Shower Blessings</span>
            </button>
          </form>
        )}

        <div className="blessings-wall">
          <h4 className="wall-title">Blessings from Loved Ones ({blessings.length})</h4>
          <div className="blessings-list">
            {blessings.map((b, i) => (
              <div key={i} className="blessing-card">
                <div className="blessing-card-top">
                  <strong className="blessing-author">{b.name}</strong>
                  <span className="blessing-time">{b.time}</span>
                </div>
                <p className="blessing-text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {showerActive && (
          <div className="petal-burst-container" aria-hidden="true">
            {Array.from({ length: 45 }).map((_, i) => (
              <span
                key={i}
                className={`burst-petal ${flowerType}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${1.8 + Math.random() * 2}s`,
                  animationDelay: `${Math.random() * 0.4}s`,
                  transform: `scale(${0.6 + Math.random() * 0.8}) rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
