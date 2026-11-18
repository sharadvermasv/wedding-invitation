import { useState, useEffect } from 'react';
import { CheckIcon, WhatsAppIcon, CloseIcon } from './Icons.jsx';
import { sendToGoogleSheet } from '../services/googleSheet.js';

const MY_RSVP_KEY = 'my_wedding_rsvp_v1';

export default function RSVPModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state: only essential fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    status: 'attending', // 'attending' | 'declined'
    guestCount: 2,
  });

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Check if user already submitted on this device
      const saved = localStorage.getItem(MY_RSVP_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData(parsed);
          setSubmitted(true);
        } catch {
          // ignore
        }
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Submit RSVP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }

    setLoading(true);
    const payload = {
      type: 'rsvp',
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      status: formData.status,
      guestCount: formData.status === 'declined' ? 0 : Number(formData.guestCount) || 1,
    };

    // Forward to Google Sheet
    sendToGoogleSheet(payload);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.entry) {
          localStorage.setItem(MY_RSVP_KEY, JSON.stringify(data.entry));
          setSubmitted(true);
          setLoading(false);
          return;
        }
      }
    } catch {
      // offline/fallback
    }

    localStorage.setItem(MY_RSVP_KEY, JSON.stringify(payload));
    setSubmitted(true);
    setLoading(false);
  };

  // WhatsApp confirmation message
  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `*Wedding RSVP — Shubham & Preeti*\n\n` +
      `Namaste Verma Family! 🙏\n` +
      `*Guest Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Attendance:* ${formData.status === 'attending' ? `Joyfully Attending (${formData.guestCount} ${Number(formData.guestCount) === 1 ? 'Person' : 'People'})` : 'Regretfully Declining'}\n\n` +
      `Looking forward to celebrating together in Varanasi!`
    );
  };

  const count = Number(formData.guestCount) || 1;
  const attending = formData.status === 'attending';

  return (
    <div className="vm-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="vm-rsvp-title">
      <div className="vm-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="vm-top">
          <span className="vm-top-mark">S <em>&amp;</em> P</span>
          <button type="button" className="vm-close" onClick={onClose} aria-label="Close RSVP window">
            CLOSE <CloseIcon />
          </button>
        </div>

        {submitted ? (
          <div className="vm-body">
            <p className="v-kicker center"><em>with</em> GRATITUDE · <span className="deva">धन्यवाद</span></p>
            <h3 className="vm-title" id="vm-rsvp-title">
              {attending ? <>WE’LL <em>see</em> YOU<br />IN VARANASI.</> : <>YOU’LL <em>be</em><br />MISSED.</>}
            </h3>
            <p className="vm-deva deva">आपकी उपस्थिति हमारे लिए अत्यंत सौभाग्यकारी है।</p>

            <dl className="vm-summary">
              <div><dt>Guest / Family</dt><dd>{formData.name}</dd></div>
              <div><dt>Phone</dt><dd>{formData.phone}</dd></div>
              <div>
                <dt>Response</dt>
                <dd>{attending ? <><em>Joyfully attending</em> · {count} {count === 1 ? 'guest' : 'guests'}</> : <em>Regretfully declining</em>}</dd>
              </div>
            </dl>

            <div className="vm-actions">
              <a
                href={`https://wa.me/918130545740?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="v-btn vm-btn"
              >
                <span className="v-btn-ico"><WhatsAppIcon /></span>
                <span><em>Send to</em> THE FAMILY ON WHATSAPP</span>
              </a>
              <button type="button" className="vm-link" onClick={() => setSubmitted(false)}>
                Change my response
              </button>
            </div>
          </div>
        ) : (
          <form className="vm-body" onSubmit={handleSubmit}>
            <p className="v-kicker center"><em>kindly</em> RSVP · <span className="deva">निमंत्रण स्वीकृति</span></p>
            <h3 className="vm-title" id="vm-rsvp-title">WILL <em>you</em> JOIN<br />US IN VARANASI?</h3>
            <p className="vm-sub">Shubh Vivah · Thursday, 3 December 2026 · Hotel Regency</p>

            <fieldset className="vm-field">
              <legend className="vm-label"><span>01</span> Your response</legend>
              <div className="vm-choices">
                <button
                  type="button"
                  className={`vm-choice ${attending ? 'is-on' : ''}`}
                  aria-pressed={attending}
                  onClick={() => setFormData((p) => ({ ...p, status: 'attending', guestCount: p.guestCount || 2 }))}
                >
                  <span className="vm-choice-en"><em>Joyfully</em> ATTENDING</span>
                  <span className="vm-choice-hi deva">हाँ, हम अवश्य सम्मिलित होंगे</span>
                </button>
                <button
                  type="button"
                  className={`vm-choice ${!attending ? 'is-on' : ''}`}
                  aria-pressed={!attending}
                  onClick={() => setFormData((p) => ({ ...p, status: 'declined' }))}
                >
                  <span className="vm-choice-en"><em>Regretfully</em> DECLINING</span>
                  <span className="vm-choice-hi deva">सादर असमर्थ, शुभकामनाओं सहित</span>
                </button>
              </div>
            </fieldset>

            <div className="vm-grid">
              <label className="vm-field">
                <span className="vm-label"><span>02</span> Name / family</span>
                <input
                  id="rsvp-guest-name"
                  type="text"
                  className="vm-input"
                  placeholder="Rajesh Verma & Family"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </label>
              <label className="vm-field">
                <span className="vm-label"><span>03</span> WhatsApp / phone</span>
                <input
                  id="rsvp-guest-phone"
                  type="tel"
                  className="vm-input"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </label>
            </div>

            {attending && (
              <fieldset className="vm-field">
                <legend className="vm-label"><span>04</span> Guests attending</legend>
                <div className="vm-count">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`vm-num ${count === num ? 'is-on' : ''}`}
                      aria-pressed={count === num}
                      onClick={() => setFormData({ ...formData, guestCount: num })}
                    >
                      {num}
                    </button>
                  ))}
                  <input
                    type="number"
                    min="7"
                    max="30"
                    className={`vm-num vm-num-input ${count > 6 ? 'is-on' : ''}`}
                    aria-label="More than six guests"
                    value={count > 6 ? count : ''}
                    placeholder="7+"
                    onChange={(e) => {
                      const val = Math.max(1, parseInt(e.target.value, 10) || 1);
                      setFormData({ ...formData, guestCount: val });
                    }}
                  />
                </div>
              </fieldset>
            )}

            <div className="vm-actions">
              <button type="submit" disabled={loading} className="v-btn vm-btn">
                <span className="v-btn-ico"><CheckIcon /></span>
                <span>{loading ? <><em>sending</em> …</> : <><em>Confirm</em> MY RSVP</>}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
