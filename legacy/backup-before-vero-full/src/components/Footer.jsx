import { contact, travel } from '../content.js';
import { CompassIcon, LotusIcon, PhoneIcon, StarSparkle } from './Icons.jsx';

export default function Footer({ onOpenBlessings }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <p className="footer-logo">S &amp; P</p>
          <p className="footer-hi-tag">॥ शुभ विवाह ॥</p>
          <div className="footer-btns">
            <a className="pill cream" href={travel.venue.map} target="_blank" rel="noopener noreferrer">
              <CompassIcon className="btn-svg" />
              <span>Venue Directions</span>
            </a>
            {onOpenBlessings && (
              <button className="pill light footer-bless-btn" onClick={onOpenBlessings}>
                <LotusIcon className="btn-svg" />
                <span>Send Blessings</span>
              </button>
            )}
          </div>
        </div>
        <div>
          <h4>Contact &amp; Hosts</h4>
          <p className="footer-host-title">{contact.sender}</p>
          {contact.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="footer-phone-link">
              <PhoneIcon className="phone-svg" />
              <span>{p}</span>
            </a>
          ))}
        </div>
        <div>
          <h4>Wedding Guide</h4>
          <a href="#weekend">The Couple</a>
          <a href="#story">Our Invitation</a>
          <a href="#ceremonies">Ceremonies &amp; Itinerary</a>
          <a href="#travel">Getting to Varanasi</a>
          <a href="#countdown">Auspicious Countdown</a>
        </div>
        <div>
          <h4>Wedding Residence</h4>
          <p>{contact.address}</p>
          <p className="footer-venue-meta" style={{ marginTop: 14 }}>
            <strong>Ceremony Venue:</strong><br />
            Hotel Regency, Andhrapul, Varanasi
          </p>
        </div>
      </div>
      <div className="footer-divider-ornament">
        <StarSparkle className="divider-star-svg" />
      </div>
      <p className="footer-copy">
        शुभ विवाह · ०३ · १२ · २०२६ &nbsp;—&nbsp; With warmest regards and love, the Verma Family
      </p>
    </footer>
  );
}
