import { invocation, photos } from '../content.js';
import ArtPanel from './ArtPanel.jsx';
import { Agni, Kalash } from './Icons.jsx';

// "Our Invitation & Sacred Story" section with authentic ritual photography.
export default function Story({ guest }) {
  return (
    <section className="story" id="story">
      <div className="story-col cream">
        <div className="story-text" data-reveal>
          <div className="story-kicker-row">
            <span className="gold-sparkle-dot">❖</span>
            <p className="hi-kicker">सादर आमंत्रण</p>
          </div>
          <h2 className="h-sec ink">Our Wedding Invitation</h2>
          <p className="story-lead">
            {guest ? `Dear ${guest},` : 'Dear family and friends,'} by the boundless grace of the Almighty and our ancestors,
            we joyfully invite you to bless the sacred union of our beloved Shubham with Preeti — <span className="deva">संग</span>, together, as one.
          </p>
        </div>

        {/* Panigrahan Sanskar Ritual Photo Card */}
        <ArtPanel
          photo={photos.storyPanigrahan}
          color="var(--maroon)"
          pattern="bandhani"
          className="story-art a2 story-photo-card"
          data-clip
        >
          {photos.storyPanigrahan ? (
            <div className="story-photo-caption">
              <p className="art-cap">शुभ पाणिग्रहण संस्कार</p>
              <span className="story-photo-sub">Hastamelap · Sacred Vows by the Holy Fire</span>
            </div>
          ) : (
            <>
              <Agni className="agni" style={{ color: '#F4E6D0' }} />
              <p className="art-cap">शुभ पाणिग्रहण संस्कार</p>
            </>
          )}
        </ArtPanel>
      </div>

      <div className="story-col peach">
        {/* Lord Ganesha & Sacred Kalash Invocation Photo Card */}
        <ArtPanel
          photo={photos.storyGanesh}
          color="var(--rust)"
          pattern="butti"
          className="story-art a1 story-photo-card"
          data-clip
        >
          {photos.storyGanesh ? (
            <div className="story-photo-caption">
              <p className="art-cap deva">॥ {invocation.ganesh} ॥</p>
              <span className="story-photo-sub">Vighnaharta Ganesha &amp; Sacred Kalash</span>
            </div>
          ) : (
            <>
              <Kalash className="kalash-lg" style={{ color: '#F4E6D0' }} />
              <p className="art-cap deva">॥ {invocation.ganesh} ॥</p>
            </>
          )}
        </ArtPanel>

        <div className="story-text" data-reveal>
          <p className="shloka">{invocation.shloka[0]}<br />{invocation.shloka[1]}</p>
          <p className="muted">{invocation.shlokaEn}</p>
          <p className="muted" style={{ marginTop: 18 }}>
            On the auspicious occasion of their <em>Shubh Panigrahan Sanskar</em> — the sacred wedding ceremony — kindly grace us with your
            affectionate presence and shower the newlyweds with your blessings. Your gracious arrival will be our greatest good fortune.
          </p>
        </div>
      </div>
    </section>
  );
}
