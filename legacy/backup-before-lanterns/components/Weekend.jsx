import { couple, invocation, photos } from '../content.js';
import ArtPanel from './ArtPanel.jsx';
import { KalashSparkle, MapPinIcon, StarSparkle } from './Icons.jsx';

function PersonCard({ p, photo, color, pattern, role }) {
  return (
    <article className="person">
      <div className="person-frame-wrap" data-clip>
        <div className="person-jharokha-frame">
          <ArtPanel photo={photo} color={color} pattern={pattern} className="person-art">
            {!photo && <div className="arch-frame"><b>{p.initial}</b></div>}
          </ArtPanel>
          <div className="person-role-tag">{role}</div>
        </div>
      </div>
      <div className="person-info" data-reveal>
        <p className="person-hi">{p.hindiTitle}</p>
        <h3 className="h-card">{p.name}</h3>
        <p className="person-title-sub">{p.title}</p>
        <div className="gold-ornament-line" aria-hidden="true"><StarSparkle className="gold-ornament-svg" /></div>
        <p className="person-sub">
          {p.lines.map(([rel, a, b]) => (
            <span key={rel}>
              <strong className="rel-label">{rel}</strong> {a} &amp; {b}<br />
            </span>
          ))}
          <span className="person-residence">
            <MapPinIcon className="residence-pin-svg" />
            <span>{p.place}</span>
          </span>
        </p>
      </div>
    </article>
  );
}

// "The Wedding Weekend" band + two cards that straddle the colour edge
export default function Weekend() {
  return (
    <>
      <section className="weekend" id="weekend">
        <div className="weekend-grid">
          <div data-reveal>
            <h2 className="h-sec">Shubh Vivah<br />Celebrations</h2>
            <p className="weekend-dates">Tuesday, 1 December, to<br />Friday, 4 December 2026</p>
          </div>
          <div className="weekend-icon" data-reveal><KalashSparkle /></div>
          <div data-reveal>
            <p className="lead-serif">We are delighted to invite you to the celebration of our marriage</p>
            <p className="weekend-copy">
              <span className="deva">{invocation.doha[0]}<br />{invocation.doha[1]}</span>
              <br /><br />{invocation.dohaEn}
            </p>
          </div>
        </div>
      </section>

      <section className="couple">
        <div className="couple-grid">
          <PersonCard p={couple.groom} photo={photos.groom} color="var(--marigold)" pattern="jaali" role="वर · The Groom" />
          <PersonCard p={couple.bride} photo={photos.bride} color="var(--mehendi)" pattern="bandhani" role="वधू · The Bride" />
        </div>
        <div className="center-btn" data-reveal>
          <a className="pill" href="#ceremonies">Ceremonies &amp; Directions</a>
        </div>
      </section>
    </>
  );
}
