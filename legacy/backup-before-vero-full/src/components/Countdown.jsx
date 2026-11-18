import { useEffect, useState } from 'react';
import { countdownTarget, photos } from '../content.js';
import { downloadCalendar, googleCalendarUrl } from '../lib.js';
import ArtPanel from './ArtPanel.jsx';
import { Mandala } from './Hero.jsx';
import { CalendarIcon, Diya, StarSparkle } from './Icons.jsx';

function useCountdown(target) {
  const calc = () => Math.max(0, Math.floor((new Date(target).getTime() - Date.now()) / 1000));
  const [s, setS] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setS(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return { s, d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), sec: s % 60 };
}

const pad = (n) => String(n).padStart(2, '0');

export default function Countdown() {
  const t = useCountdown(countdownTarget);
  return (
    <section className="countdown" id="countdown">
      <ArtPanel photo={photos.countdown} color="var(--maroon)" pattern="jaali" className="cd-art" data-clip>
        {!photos.countdown && <Mandala layers={8} className="cd-mandala" />}
        <div className="cd-art-badge">
          <div className="cd-art-icon-wrap">
            <Diya className="cd-diya-svg" />
          </div>
          <div>
            <p className="cd-art-text">पवित्र मण्डप एवं यज्ञवेदी</p>
            <span className="cd-art-sub">The Sacred Wedding Mandap</span>
          </div>
        </div>
      </ArtPanel>

      <div className="cd-text" data-reveal>
        <div className="cd-kicker-wrap">
          <StarSparkle className="gold-sparkle-svg" />
          <p className="hi-kicker">शुभ घड़ी का इंतज़ार</p>
          <StarSparkle className="gold-sparkle-svg" />
        </div>
        <h2 className="h-sec ink">The Auspicious Hour</h2>
        <p className="muted cd-lead-text">
          Counting down every moment until the Baraat sets out from Fatehpur for Varanasi on <strong>Thursday, 3 December 2026</strong>.
        </p>

        {t.s > 0 ? (
          <div className="cd-grid" aria-live="polite">
            {[
              [t.d, 'Days', 'दिन'],
              [t.h, 'Hours', 'घंटे'],
              [t.m, 'Minutes', 'मिनट'],
              [t.sec, 'Seconds', 'सेकंड'],
            ].map(([v, en, hi]) => (
              <div key={en} className="cd-unit-box">
                <div className="cd-box-inner">
                  <b className="cd-num">{pad(v)}</b>
                  <span className="cd-label-en">{en}</span>
                  <span className="cd-label-hi">{hi}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cd-celebrating">
            <p className="lead-serif">The celebrations have begun — thank you for your sacred presence and blessings.</p>
          </div>
        )}

        <div className="cd-calendar-actions">
          <a
            className="pill gold-solid"
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarIcon className="btn-svg" />
            <span>Add to Google Calendar</span>
          </a>
          <button className="pill" onClick={downloadCalendar}>
            <CalendarIcon className="btn-svg" />
            <span>Download .ICS (Apple / Outlook)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
