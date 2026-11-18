import { couple, photos } from '../content.js';
import { ArrowDownIcon } from './Icons.jsx';

// "the ESSENCE of VERO / where INNOVATION meets CRAFTSMANSHIP" → the couple.
function Portrait({ p, photo, label, offset }) {
  return (
    <article className={`vc-person ${offset ? 'offset' : ''}`}>
      <div className="vc-photo" data-clip>
        <img src={photo} alt={p.name} loading="lazy" />
      </div>
      <div className="vc-cap" data-reveal>
        <p className="v-kicker"><span className="deva">{p.hindiTitle}</span> · <em>{label}</em></p>
        <h3 className="vc-name">{p.name.split(' ')[0].toUpperCase()} <em>{p.name.split(' ').slice(1).join(' ')}</em></h3>
        <p className="vc-title"><em>{p.title}</em></p>
        <p className="vc-lines">
          {p.lines.map(([rel, a, b]) => <span key={rel}>{rel} {a} &amp; {b}<br /></span>)}
          {p.place}
        </p>
      </div>
    </article>
  );
}

export default function Couple() {
  return (
    <section className="vcouple" id="weekend">
      <p className="v-kicker center" data-reveal><em>the</em> HEART <em>of our</em> FAMILY</p>
      <h2 className="v-display center">
        <span className="v-mask"><span><em>where</em> SHUBHAM</span></span>
        <span className="v-mask"><span><em>meets</em> PREETI</span></span>
      </h2>

      <div className="vc-grid">
        <Portrait p={couple.groom} photo={photos.groom} label="the groom" />
        <Portrait p={couple.bride} photo={photos.bride} label="the bride" offset />
      </div>

      <div className="v-center-btn" data-reveal>
        <a className="v-btn" href="#ceremonies"><span className="v-btn-ico" aria-hidden="true"><ArrowDownIcon /></span><span><em>View the</em> CEREMONIES</span></a>
      </div>
    </section>
  );
}
