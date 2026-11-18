import { useEffect, useRef, useState } from 'react';
import { ceremonies, couple, travel, invocation, family, contact, countdownTarget, invite } from '../content.js';
import { shehnaiAudio } from '../components/AudioPlayer.jsx';
import {
  Lanterns, OmMedallion, GoldFrame, Sunburst, Shell, Icon,
  strandTexture, leafTexture, grain, tentMask,
} from './art.jsx';

const purpleTex = strandTexture('#2e1750', '#7c5cad');
const tealTex = leafTexture('rgba(255,255,255,.16)');
const navyTex = leafTexture('rgba(150,170,255,.16)');

/* ---------------- fixed controls (top-right) ---------------- */
export function TopBar({ onRsvp }) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => shehnaiAudio.subscribe(setPlaying), []);
  return (
    <div className="lv-top">
      <button type="button" className="lv-pill" onClick={onRsvp}>
        <span>RSVP</span>
        <b>3 Dec 2026</b>
      </button>
      <button
        type="button"
        className="lv-music"
        onClick={() => shehnaiAudio.toggle()}
        aria-pressed={playing}
        aria-label={playing ? 'Pause shehnai' : 'Play shehnai'}
      >
        {playing ? <Icon.pause /> : <Icon.play />}
      </button>
    </div>
  );
}

/* ---------------- 1 · Section 1 (Continuous Mandap & Royal Tapestry Canvas) ---------------- */
export function Section1({ guest }) {
  const [a, w, b] = invite.heroNames;
  return (
    <section className="lv-sec-1">
      <div className="lv-sec-1-bg" aria-hidden="true">
        <picture>
          <source media="(max-width: 809px)" srcSet="/photos/laavan_bg_mobile.jpg" />
          <img
            src="/photos/laavan_bg_desktop.jpg"
            alt="Royal Wedding Backdrop"
            className="lv-bg-img"
          />
        </picture>
      </div>

      {/* Hero Viewport (100svh) */}
      <header className="lv-hero-viewport">
        <Lanterns count={24} seed={3} />
        <div className="lv-hero-content">
          <h1 className="lv-hero-names" data-hero-names>
            <span className="lv-hn-a">{a}</span>
            <span className="lv-hn-w">{w.split('').join(' ')}</span>
            <span className="lv-hn-b">{b}</span>
          </h1>
        </div>
      </header>

      {/* Blessings & Events */}
      <div className="lv-blessings-content">
        <Lanterns count={12} seed={21} className="is-sparse" />
        <div className="lv-bless-inner">
          <p className="lv-deva lv-sm" data-rv>
            {invocation.ganesh}
            <br />
            {invocation.doha[0]}
          </p>
          <OmMedallion className="lv-om" />
          <p className="lv-lead" data-rv>With the heavenly blessings of</p>
          {invite.blessingsOf.map((n) => (
            <p className="lv-lead" key={n} data-rv>{n}</p>
          ))}
          <span className="lv-rule" />
          {invite.hosts.map((n) => (
            <p className="lv-lead" key={n} data-rv>{n}</p>
          ))}
          {guest && (
            <p className="lv-guest" data-rv>
              Dear <em>{guest}</em>,
            </p>
          )}
          <h2 className="lv-invite" data-rv>{invite.bigWord}</h2>
          <p className="lv-lead" data-rv>{invite.joinLine}</p>
          <p className="lv-script lv-name" data-rv>{invite.groomFirst}</p>
          <p className="lv-script lv-amp" data-rv>&amp;</p>
          <p className="lv-script lv-name" data-rv>{invite.brideFirst}</p>
          <div className="lv-parents" data-rv>
            {invite.brideParents.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <p className="lv-lead lv-events-line" data-rv>{invite.eventsLine}</p>
        </div>

        <Events />
        <Route />
      </div>
    </section>
  );
}

export const Hero = Section1;
export const Blessings = () => null;

/* ---------------- 3 · events in gold frames ---------------- */
function Events() {
  return (
    <div className="lv-events">
      {ceremonies.map((c) => {
        const place = invite.eventPlace[c.key];
        const map = travel[place?.map]?.map;
        return (
          <article className="lv-event" key={c.key} data-rv>
            <GoldFrame src={c.photo} alt={`${c.name} illustration`} />
            <h3>{c.name}</h3>
            <p className="lv-event-hi lv-deva">{c.hi}</p>
            <p className="lv-event-meta">
              {c.day}, {c.date}
              <br />
              {place?.venue}
              <br />
              {c.time}
            </p>
            {map && (
              <a className="lv-event-link" href={map} target="_blank" rel="noreferrer">
                See the route
              </a>
            )}
          </article>
        );
      })}
    </div>
  );
}

/* ---------------- 4 · see-the-route sunburst ---------------- */
function Route() {
  return (
    <div className="lv-route">
      <a className="lv-burst" href={travel.venue.map} target="_blank" rel="noreferrer" aria-label="Open Google Maps route to Hotel Regency">
        <Sunburst className="lv-burst-svg" />
        <span className="lv-burst-txt">
          <strong>See The Route</strong>
          <small>{travel.venue.name}, Varanasi</small>
          <span className="lv-burst-pill">
            <Icon.pin className="lv-burst-pin" />
            <span>Open Google Maps</span>
          </span>
        </span>
      </a>
    </div>
  );
}

/* ---------------- 5 · meet the couple (teal room) ---------------- */
export function Couple() {
  const g = couple.groom, b = couple.bride;
  return (
    <section className="lv-couple-section" id="couple">
      <div className="lv-couple-inner">
        <div className="lv-meet" data-rv>
          <span className="lv-meet-kicker">MEET THE</span>
          <div className="lv-meet-heading">
            <span className="lv-meet-a">Bride</span>
            <span className="lv-meet-amp">&amp;</span>
            <span className="lv-meet-b">Groom</span>
          </div>
        </div>

        <div className="lv-couple-cards" data-rv>
          <div className="lv-person-card">
            <div className="lv-person-frame">
              <img src={b.photo || '/photos/bride.jpg'} alt={b.name} />
            </div>
            <div className="lv-person-info">
              <h3>{b.name}</h3>
              <p>The Bride</p>
            </div>
          </div>

          <div className="lv-person-card">
            <div className="lv-person-frame">
              <img src={g.photo || '/photos/groom.jpg'} alt={g.name} />
            </div>
            <div className="lv-person-info">
              <h3>{g.name}</h3>
              <p>The Groom</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6 · message + gallery + RSVP shell (teal) ---------------- */
export function Message({ onRsvp }) {
  const g = couple.groom, b = couple.bride;
  return (
    <section className="lv-teal" style={{ '--tex': tealTex }}>
      <div className="lv-message">
        <h2 className="lv-h2" data-rv>A message from the couple</h2>
        <p data-rv>{invite.message}</p>
        <div className="lv-lineage" data-rv>
          <div>
            <h4>{g.name}</h4>
            {g.lines.map(([k, ...v]) => (
              <p key={k}><em>{k}</em> {v.join(' & ')}</p>
            ))}
          </div>
          <div>
            <h4>{b.name}</h4>
            {b.lines.map(([k, ...v]) => (
              <p key={k}><em>{k}</em> {v.join(' & ')}</p>
            ))}
          </div>
        </div>
      </div>
      <Gallery />
      <div className="lv-rsvp" data-rv>
        <Shell className="lv-shell" />
        <div className="lv-rsvp-txt">
          <h2>Looking<br />forward to<br />see you</h2>
          <p>Tap the pearl to RSVP</p>
        </div>
        <button type="button" className="lv-pearl" onClick={onRsvp} aria-label="Open the RSVP form">
          RSVP
        </button>
      </div>
    </section>
  );
}

function Gallery() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const items = invite.gallery;
  const go = (i) => {
    const el = track.current;
    if (!el) return;
    const n = (i + items.length) % items.length;
    const card = el.children[n];
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: 'smooth' });
  };
  const onScroll = () => {
    const el = track.current;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0, dist = Infinity;
    [...el.children].forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid);
      if (d < dist) { dist = d; best = i; }
    });
    setActive(best);
  };
  return (
    <div className="lv-gallery" data-rv>
      <div className="lv-gal-track" ref={track} onScroll={onScroll}>
        {items.map((p) => (
          <figure key={p.src} className="lv-gal-card">
            <img src={p.src} alt={p.alt} loading="lazy" />
          </figure>
        ))}
      </div>
      <button type="button" className="lv-gal-btn prev" onClick={() => go(active - 1)} aria-label="Previous photo">
        <Icon.chevron />
      </button>
      <button type="button" className="lv-gal-btn next" onClick={() => go(active + 1)} aria-label="Next photo">
        <Icon.chevron />
      </button>
      <div className="lv-dots">
        {items.map((p, i) => (
          <button key={p.src} type="button" className={i === active ? 'on' : ''} onClick={() => go(i)} aria-label={`Photo ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- 7 · things to know + moon (purple) ---------------- */
export function Things({ onBlessings }) {
  return (
    <section className="lv-purple lv-things" style={{ '--tex': purpleTex }}>
      <p className="lv-things-tag">॥ आवश्यक जानकारी ॥</p>
      <h2 className="lv-big">Things to know</h2>
      <p className="lv-intro">{invite.thingsIntro}</p>
      <div className="lv-things-grid">
        {invite.things.map((t) => (
          <div className="lv-thing-card" key={t.title} data-rv>
            <div className="lv-thing-art">
              <img src={t.icon} alt={t.title} />
            </div>
            <h3>{t.title}</h3>
            <p className="lv-thing-desc">{t.text}</p>
          </div>
        ))}
      </div>
      <button type="button" className="lv-moon" onClick={onBlessings} aria-label="Write and shower blessings">
        <img src="/photos/icons/moon.png" alt="" className="lv-moon-bg" />
        <span className="lv-moon-content">
          <span className="lv-moon-t">Send your<br /><em>blessings</em></span>
          <span className="lv-moon-s">Click to write a wish for the couple</span>
        </span>
      </button>
    </section>
  );
}

/* ---------------- 8 · night room ---------------- */
export function Night() {
  return (
    <section className="lv-room lv-room-night">
      <div className="lv-room-ceil" />
      <div className="lv-room-floor" />
      <div className="lv-room-back">
        <img src="/photos/venue_facade.jpg" alt="Hotel Regency, Varanasi, lit up at night" />
        <div className="lv-stars" />
        <div className="lv-night-names" data-rv>
          <span>{invite.groomFirst}</span>
          <i>&amp;</i>
          <span>{invite.brideFirst}</span>
        </div>
      </div>
      <div className="lv-night-plaque" data-rv>
        <p>Shubh Vivah</p>
        <strong>Thursday, 3 December 2026</strong>
        <p>{travel.venue.name} · {travel.venue.text}</p>
      </div>
    </section>
  );
}

/* ---------------- 9 · countdown + family + footer ---------------- */
function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  const s = Math.floor(diff / 1000);
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

export function Closing() {
  const parts = useCountdown(countdownTarget);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <footer className="lv-navy" style={{ '--tex': navyTex }}>
      <h2 className="lv-h2" data-rv>The countdown begins</h2>
      <div className="lv-count" data-rv aria-label="Time until the baraat departs">
        {parts.map((n, i) => (
          <span key={i}>
            <b>{pad(n)}</b>
            <small>{['days', 'hours', 'mins', 'secs'][i]}</small>
          </span>
        ))}
      </div>
      <p className="lv-closing" data-rv>{invite.closingLine}</p>

      <div className="lv-family" data-rv>
        {[family.hosts, family.regards].map((f) => (
          <div key={f.en}>
            <p className="lv-deva">{f.hi}</p>
            <h4>{f.en}</h4>
            {f.names.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        ))}
      </div>
      <p className="lv-contact" data-rv>
        {contact.address}
        <br />
        {contact.phones.map((p, i) => (
          <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>{p}{i < contact.phones.length - 1 ? ' · ' : ''}</a>
        ))}
      </p>
      <p className="lv-copy">Shubham &amp; Preeti · 2026 · With love, the Verma family</p>
    </footer>
  );
}
