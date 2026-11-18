import { invocation, photos, ceremonies } from '../content.js';
import { CompassIcon } from './Icons.jsx';

// Vero's "so THAT YOU BECOME ART." + "Worn once." split:
// a sticky large image on the left, small images, text, a quote on the right.
export default function Story({ guest }) {
  const vivah = ceremonies.find((c) => c.main)?.photo;
  return (
    <section className="vstory" id="story">
      <div className="vst-intro">
        <p className="v-kicker center" data-reveal><em>an</em> INVITATION <em>from the</em> HEART</p>
        <h2 className="v-display center">
          <span className="v-mask"><span><em>so that</em> YOU</span></span>
          <span className="v-mask"><span><em>may</em> BLESS THEM.</span></span>
        </h2>
      </div>

      <div className="vst-split">
        <div className="vst-left">
          <div className="vst-sticky" data-clip>
            <img src={photos.storyGanesh} alt="Lord Ganesha and the sacred kalash" loading="lazy" />
          </div>
        </div>

        <div className="vst-right">
          <div className="vst-pair">
            <div className="vst-small" data-clip><img src={photos.storyPanigrahan} alt="Hastamelap by the sacred fire" loading="lazy" /></div>
            <div className="vst-small" data-clip><img src={photos.countdown} alt="The wedding mandap" loading="lazy" /></div>
          </div>

          <div className="vst-text" data-reveal>
            <h3 className="vst-head">With joyful hearts.<br />With humble prayers.</h3>
            <p className="vst-italic">
              <em>{guest ? `Dear ${guest},` : 'Dear family and friends,'} by the boundless grace of the Almighty and our ancestors —</em>
            </p>
            <p className="vst-body">
              we joyfully invite you to bless the sacred union of our beloved Shubham with Preeti. On the auspicious occasion of their
              Shubh Panigrahan Sanskar, kindly grace us with your affectionate presence and shower the newlyweds with your blessings.
              Your gracious arrival will be our greatest good fortune.
            </p>
            <a className="v-btn" href="#travel"><span className="v-btn-ico" aria-hidden="true"><CompassIcon /></span><span><em>Getting</em> THERE</span></a>
          </div>

          <div className="vst-pair low">
            <div className="vst-small" data-clip><img src={vivah} alt="Shubh Vivah" loading="lazy" /></div>
            <div className="vst-small" data-clip><img src={photos.venueFacade} alt="Hotel Regency, Varanasi" loading="lazy" /></div>
          </div>

          <blockquote className="vst-quote" data-reveal>
            <p className="deva vst-quote-hi">“{invocation.doha[0]}<br />{invocation.doha[1]}”</p>
            <p className="vst-quote-en">“{invocation.dohaEn}”</p>
            <footer>SHRI GANESH VANDANA, <br /><em>our first invitation</em></footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
