import { family } from '../content.js';

// Two-column block, like "You Must Have Some Questions" + "Wedding Colors".
export default function Family() {
  const swatches = ['var(--peach)', 'var(--rust)', 'var(--marigold)', 'var(--maroon)', 'var(--mehendi)'];
  return (
    <section className="family" id="family">
      {[family.hosts, family.regards].map((g, i) => (
        <div key={g.hi} data-reveal>
          <p className="hi-kicker">{g.hi}</p>
          <h2 className="h-mid">{g.en}</h2>
          <ul className="names">
            {g.names.map((n) => <li key={n}>{n}</li>)}
          </ul>
          {i === 0 ? (
            <p className="muted">आपके आगमन की प्रतीक्षा में हमारा परिवार… <br />Our family eagerly awaits your arrival.</p>
          ) : (
            <div className="swatches" aria-hidden="true">{swatches.map((c) => <span key={c} style={{ background: c }} />)}</div>
          )}
        </div>
      ))}
    </section>
  );
}
