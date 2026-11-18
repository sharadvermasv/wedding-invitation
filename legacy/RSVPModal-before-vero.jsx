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

  return (
    <div className="vrsvp-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="vrsvp-modal-card simple" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          type="button" 
          className="vrsvp-modal-close" 
          onClick={onClose}
          aria-label="Close RSVP window"
        >
          <CloseIcon />
        </button>

        {/* Modal Header */}
        <div className="vrsvp-modal-header">
          <p className="vrsvp-form-tag">॥ निमंत्रण स्वीकृति · RSVP ॥</p>
          <h3 className="vrsvp-modal-title">Confirm Your Attendance</h3>
          <p className="vrsvp-modal-sub">Shubham Verma &amp; Preeti Kumari · Hotel Regency, Varanasi</p>
        </div>

        <div className="vrsvp-modal-body">
          {submitted ? (
            <div className="vrsvp-success-card">
              <div className="vrsvp-success-icon-wrap">
                <CheckIcon className="vrsvp-success-icon" />
              </div>
              <h3 className="vrsvp-success-title">RSVP Confirmed!</h3>
              <p className="vrsvp-success-hi deva">आपकी उपस्थिति हमारे लिए अत्यंत सौभाग्यकारी है।</p>
              
              <div className="vrsvp-summary-box">
                <div className="vrsvp-summary-row">
                  <span className="vrsvp-sum-label">Guest / Family:</span>
                  <strong className="vrsvp-sum-val">{formData.name}</strong>
                </div>
                <div className="vrsvp-summary-row">
                  <span className="vrsvp-sum-label">Phone:</span>
                  <span className="vrsvp-sum-val">{formData.phone}</span>
                </div>
                <div className="vrsvp-summary-row">
                  <span className="vrsvp-sum-label">Status:</span>
                  <span className="vrsvp-sum-badge green">
                    {formData.status === 'attending' 
                      ? `Attending (${formData.guestCount} ${Number(formData.guestCount) === 1 ? 'Guest' : 'Guests'})` 
                      : 'Declined'}
                  </span>
                </div>
              </div>

              <div className="vrsvp-actions-row">
                <a
                  href={`https://wa.me/918130545740?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vrsvp-btn-whatsapp"
                >
                  <WhatsAppIcon className="vrsvp-btn-icon" />
                  <span>Send Confirmation to Verma Family on WhatsApp</span>
                </a>

                <button
                  type="button"
                  className="vrsvp-btn-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Edit / Change My Response
                </button>
              </div>
            </div>
          ) : (
            <form className="vrsvp-modal-form" onSubmit={handleSubmit}>
              {/* Will you attend radio pills */}
              <div className="vrsvp-field">
                <label className="vrsvp-label">Will you be gracing the wedding? *</label>
                <div className="vrsvp-radio-group">
                  <button
                    type="button"
                    className={`vrsvp-radio-btn ${formData.status === 'attending' ? 'selected' : ''}`}
                    onClick={() => setFormData((p) => ({ ...p, status: 'attending', guestCount: p.guestCount || 2 }))}
                  >
                    <span className="vrsvp-radio-circle">
                      {formData.status === 'attending' && <span className="vrsvp-radio-dot" />}
                    </span>
                    <span className="vrsvp-radio-text">
                      <strong>Joyfully Attending</strong>
                      <span className="deva">हाँ, हम अवश्य सम्मिलित होंगे</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`vrsvp-radio-btn ${formData.status === 'declined' ? 'selected' : ''}`}
                    onClick={() => setFormData((p) => ({ ...p, status: 'declined' }))}
                  >
                    <span className="vrsvp-radio-circle">
                      {formData.status === 'declined' && <span className="vrsvp-radio-dot" />}
                    </span>
                    <span className="vrsvp-radio-text">
                      <strong>Regretfully Declining</strong>
                      <span className="deva">सादर असमर्थ (शुभकामनाएं सहित)</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Guest Name & Phone */}
              <div className="vrsvp-grid-2">
                <div className="vrsvp-field">
                  <label className="vrsvp-label" htmlFor="rsvp-guest-name">
                    Your Name / Family Name *
                  </label>
                  <input
                    id="rsvp-guest-name"
                    type="text"
                    className="vrsvp-input"
                    placeholder="e.g. Rajesh Kumar Verma & Family"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="vrsvp-field">
                  <label className="vrsvp-label" htmlFor="rsvp-guest-phone">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    id="rsvp-guest-phone"
                    type="tel"
                    className="vrsvp-input"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* How many people are coming (if attending) */}
              {formData.status === 'attending' && (
                <div className="vrsvp-field">
                  <label className="vrsvp-label">How many people are coming? *</label>
                  <div className="vrsvp-pills-row">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`vrsvp-pill-opt ${Number(formData.guestCount) === num ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, guestCount: num })}
                      >
                        {num} {num === 1 ? 'Person' : 'People'}
                      </button>
                    ))}
                    <div className="vrsvp-custom-count">
                      <span>More:</span>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        className="vrsvp-number-input"
                        value={formData.guestCount > 6 ? formData.guestCount : ''}
                        placeholder="7+"
                        onChange={(e) => {
                          const val = Math.max(1, parseInt(e.target.value, 10) || 1);
                          setFormData({ ...formData, guestCount: val });
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="vrsvp-submit-btn"
              >
                {loading ? 'Submitting...' : 'Submit RSVP · उपस्थिति दर्ज करें'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
