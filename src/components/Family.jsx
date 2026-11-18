import { family } from '../content.js';

// Hosts, set in Vero's mixed caps on hairline rules.
export default function Family() {
  return (
    <section className="vfamily" id="family">
      <p className="v-kicker center" data-reveal><em>with</em> LOVE</p>
      <h2 className="v-display center">
        <span className="v-mask"><span><em>awaiting</em> YOUR</span></span>
        <span className="v-mask"><span>ARRIVAL.</span></span>
      </h2>
      <div className="vf-cols">
        {[family.hosts, family.regards].map((g) => (
          <div className="vf-col" key={g.hi} data-reveal>
            <p className="vf-label"><span className="deva">{g.hi}</span> · <em>{g.en}</em></p>
            <ul>{g.names.map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="vf-note deva" data-reveal>आपके आगमन की प्रतीक्षा में हमारा परिवार…</p>
    </section>
  );
}
