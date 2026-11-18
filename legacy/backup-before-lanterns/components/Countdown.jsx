import { useEffect, useState } from 'react';
import { countdownTarget } from '../content.js';
import { downloadCalendar, googleCalendarUrl } from '../lib.js';
import { GoogleCalendarIcon, DownloadIcon } from './Icons.jsx';

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

// Vero's closing call to action ("Your story deserves to be sculpted"), as the countdown.
export default function Countdown() {
  const t = useCountdown(countdownTarget);
  return (
    <section className="vcountdown" id="countdown">
      <p className="v-kicker center" data-reveal><em>the</em> AUSPICIOUS HOUR · <span className="deva">शुभ घड़ी का इंतज़ार</span></p>

      {t.s > 0 ? (
        <div className="vcd-grid" aria-live="polite">
          {[[t.d, 'DAYS', 'दिन'], [t.h, 'HOURS', 'घंटे'], [t.m, 'MINUTES', 'मिनट'], [t.sec, 'SECONDS', 'सेकंड']].map(([v, en, hi]) => (
            <div className="vcd-unit" key={en}>
              <b>{pad(v)}</b>
              <span>{en} <em className="deva">{hi}</em></span>
            </div>
          ))}
        </div>
      ) : (
        <p className="v-display center"><em>the celebrations</em> HAVE BEGUN.</p>
      )}

      <div className="vcd-text" data-reveal>
        <p className="vcd-head">Counting every moment until the Baraat sets out.</p>
        <p className="vcd-sub">From Fatehpur for Varanasi, Thursday, 3 December 2026.</p>
        <div className="vcd-btns">
          <a className="v-btn" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer"><span className="v-btn-ico" aria-hidden="true"><GoogleCalendarIcon /></span><span><em>Add to</em> GOOGLE CALENDAR</span></a>
          <button className="v-btn" onClick={downloadCalendar}><span className="v-btn-ico" aria-hidden="true"><DownloadIcon /></span><span><em>Download</em> .ICS <small>Apple · Outlook</small></span></button>
        </div>
      </div>
    </section>
  );
}
