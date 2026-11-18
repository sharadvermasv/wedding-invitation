import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { travel, photos } from '../content.js';
import { prefersReducedMotion } from '../lib.js';
import { Car, PlaneIcon, TrainIcon, MapPinIcon, CompassIcon, ClockIcon, StarSparkle } from './Icons.jsx';

function Haveli() {
  return (
    <svg className="haveli" viewBox="0 0 400 360" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 340H390" /><path d="M40 340V300H360V340" /><path d="M52 320H348" /><path d="M80 300V170H320V300" />
        <path d="M70 170H330M74 160H326M70 170V160M330 170V160" />
        <path d="M170 300V235C170 215 185 200 200 192C215 200 230 215 230 235V300" />
        <path d="M180 300V240C180 226 190 216 200 210C210 216 220 226 220 240V300" />
        <path d="M100 285V250C100 240 107 233 115 229C123 233 130 240 130 250V285Z" />
        <path d="M270 285V250C270 240 277 233 285 229C293 233 300 240 300 250V285Z" />
        <path d="M100 210H130V190H100ZM270 210H300V190H270Z" /><path d="M95 212H135M265 212H305" />
        <path d="M150 160V140H250V160" /><path d="M155 140C155 105 185 90 200 72C215 90 245 105 245 140" />
        <path d="M200 72V52M194 60H206" /><circle cx="200" cy="47" r="4" />
        <path d="M86 160V128M114 160V128M78 128H122" /><path d="M82 128C82 110 95 102 100 94C105 102 118 110 118 128" /><path d="M100 94V84" />
        <path d="M286 160V128M314 160V128M278 128H322" /><path d="M282 128C282 110 295 102 300 94C305 102 318 110 318 128" /><path d="M300 94V84" />
        <path d="M60 340V300M340 340V300" />
      </g>
      <path className="bunting" d="M80 182Q140 198 200 182Q260 198 320 182" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 5" />
    </svg>
  );
}

const TRANSIT_HUBS = [
  {
    type: 'rail',
    icon: TrainIcon,
    name: 'Varanasi Junction (BSB) / Cantt',
    dist: '1.2 km',
    time: '5 – 7 min drive',
    note: 'Closest major junction, autos & cabs 24/7'
  },
  {
    type: 'rail',
    icon: TrainIcon,
    name: 'Banaras Railway Station (BSBS)',
    dist: '4.5 km',
    time: '15 min drive',
    note: 'Modern station with express train connectivity'
  },
  {
    type: 'rail',
    icon: TrainIcon,
    name: 'Pt. Deen Dayal Upadhyaya Jn (DDU)',
    dist: '18 km',
    time: '40 min drive',
    note: 'Major national railway junction (Mughalsarai)'
  },
  {
    type: 'air',
    icon: PlaneIcon,
    name: 'Lal Bahadur Shastri Airport (VNS)',
    dist: '22 km',
    time: '35 – 45 min drive',
    note: 'Babatpur Airport via 4-lane Highway'
  }
];

export default function Travel() {
  const root = useRef(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const paths = gsap.utils.toArray('.haveli g path, .haveli g circle');
    paths.forEach((p) => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }); });
    gsap.to(paths, { strokeDashoffset: 0, duration: 2.4, stagger: 0.05, ease: 'power2.inOut', scrollTrigger: { trigger: '.haveli', start: 'top 80%' } });
    gsap.timeline({ scrollTrigger: { trigger: '.route', start: 'top 85%', end: 'top 40%', scrub: 1 } })
      .to('.route-fill', { scaleX: 1, ease: 'none' }, 0)
      .fromTo('.route-car', { left: '0%' }, { left: '100%', ease: 'none' }, 0);
  }, { scope: root });

  return (
    <section className="travel" id="travel" ref={root}>
      <div className="travel-info">
        <div data-reveal>
          <div className="travel-kicker-row">
            <StarSparkle className="gold-sparkle-svg" />
            <p className="hi-kicker">यात्रा एवं आवागमन मार्गदर्शिका</p>
          </div>
          <h2 className="h-sec">Getting to the Celebrations</h2>

          <div className="travel-cols">
            <div className="travel-col-card">
              <div className="travel-col-header">
                <MapPinIcon className="travel-svg-icon" />
                <h4>{travel.baraat.title}</h4>
              </div>
              <p>{travel.baraat.text}</p>
              <div className="travel-badge-time">
                <ClockIcon className="clock-svg" />
                <span>{travel.baraat.time}</span>
              </div>
            </div>

            <div className="travel-col-card highlight">
              <div className="travel-col-header">
                <MapPinIcon className="travel-svg-icon gold" />
                <h4>{travel.venue.title}</h4>
              </div>
              <p className="venue-name-bold">{travel.venue.name}</p>
              <p>{travel.venue.text}</p>
              <div className="travel-badge-time">
                <span>विवाह स्थल · Wedding Reception</span>
              </div>
            </div>
          </div>
        </div>

        {/* Baraat Highway Route Visual */}
        <div className="route" data-reveal>
          <div className="route-stats">
            <span className="route-stat-item">
              <Car className="inline-svg" />
              <span>Baraat Highway: ~210 km via NH 19</span>
            </span>
            <span className="route-stat-item">
              <ClockIcon className="inline-svg" />
              <span>~4.5 Hours Scenic Journey</span>
            </span>
          </div>
          <div className="route-line">
            <i className="route-fill" />
            <span className="route-dot a" />
            <span className="route-dot b" />
            <Car className="route-car" />
          </div>
          <div className="route-ends">
            <span>Fatehpur (Groom's Home)</span>
            <span>Varanasi (Grand Venue)</span>
          </div>
        </div>

        {/* Airport & Railway Station Connectivity Hub */}
        <div className="transit-section" data-reveal>
          <h3 className="transit-title">Airport &amp; Station Connectivity</h3>
          <p className="transit-desc">For outstation guests arriving in Varanasi, Hotel Regency at Andhrapul is conveniently connected:</p>
          <div className="transit-grid">
            {TRANSIT_HUBS.map((hub) => {
              const Icon = hub.icon;
              return (
                <div key={hub.name} className="transit-card">
                  <div className="transit-top">
                    <div className="transit-icon-box">
                      <Icon className="transit-svg" />
                    </div>
                    <div>
                      <h5 className="transit-hub-name">{hub.name}</h5>
                      <span className="transit-hub-note">{hub.note}</span>
                    </div>
                  </div>
                  <div className="transit-bottom">
                    <span className="transit-dist">{hub.dist}</span>
                    <span className="transit-dot">•</span>
                    <span className="transit-time">{hub.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div data-reveal className="travel-action-block">
          <div className="travel-btns">
            <a className="pill gold-solid" href={travel.venue.map} target="_blank" rel="noopener noreferrer">
              <CompassIcon className="btn-svg" />
              <span>Navigate to Venue in Maps</span>
            </a>
            <a className="pill light" href={travel.baraat.map} target="_blank" rel="noopener noreferrer">
              <MapPinIcon className="btn-svg" />
              <span>Baraat Starting Point</span>
            </a>
          </div>
        </div>
      </div>

      <div className="travel-art" data-clip>
        {photos.venueFacade ? (
          <div className="travel-photo-wrap">
            <img src={photos.venueFacade} alt={travel.venue.name} loading="lazy" className="travel-venue-img" />
            <div className="travel-photo-overlay">
              <p className="travel-art-cap">{travel.venue.name}</p>
              <span className="travel-art-sub">Andhrapul, G.T. Road, Varanasi</span>
            </div>
          </div>
        ) : (
          <>
            <Haveli />
            <p className="travel-art-cap">{travel.venue.name}</p>
            <span className="travel-art-sub">Varanasi, Uttar Pradesh</span>
          </>
        )}
      </div>
    </section>
  );
}
