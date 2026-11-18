// Shared helpers: textile patterns, calendar file, guest name.

const PATTERNS = {
  butti: (c) => `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><g fill='${c}'><circle cx='28' cy='28' r='2.6'/><ellipse cx='28' cy='19.5' rx='3' ry='5.5'/><ellipse cx='28' cy='36.5' rx='3' ry='5.5'/><ellipse cx='19.5' cy='28' rx='5.5' ry='3'/><ellipse cx='36.5' cy='28' rx='5.5' ry='3'/><circle cx='0' cy='0' r='2'/><circle cx='56' cy='0' r='2'/><circle cx='0' cy='56' r='2'/><circle cx='56' cy='56' r='2'/></g></svg>`,
  bandhani: (c) => `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><circle cx='10' cy='10' r='3.2' fill='none' stroke='${c}' stroke-width='1.2'/><circle cx='10' cy='10' r='.9' fill='${c}'/></svg>`,
  jaali: (c) => `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><g fill='none' stroke='${c}' stroke-width='1.2'><path d='M0 24Q12 0 24 24T48 24'/><path d='M0 24Q12 48 24 24T48 24'/><circle cx='24' cy='24' r='2' fill='${c}'/><circle cx='0' cy='24' r='2' fill='${c}'/><circle cx='48' cy='24' r='2' fill='${c}'/></g></svg>`,
};

export function patternStyle(type = 'butti', color = 'rgba(255,255,255,.2)', size = 56) {
  const svg = PATTERNS[type](color);
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundSize: `${size}px`,
  };
}

export function guestName() {
  const g = new URLSearchParams(window.location.search).get('to');
  return g ? g.slice(0, 60) : null;
}

export function downloadCalendar() {
  const ev = (uid, a, b, t, l) =>
    ['BEGIN:VEVENT', `UID:${uid}@shubham-preeti`, 'DTSTAMP:20261101T000000Z', a, b, `SUMMARY:${t}`, `LOCATION:${l}`, 'END:VEVENT'].join('\r\n');
  const fat = 'Saket Nagar Colony\\, Hariharganj\\, Fatehpur';
  const vns = 'Hotel Regency\\, Andhrapul\\, G.T. Road\\, Varanasi';
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Shubham-Preeti//Shubh Vivah//EN',
    ev('tail', 'DTSTART;VALUE=DATE:20261201', 'DTEND;VALUE=DATE:20261202', 'Tail Poojan — Shubham & Preeti', fat),
    ev('matri', 'DTSTART;VALUE=DATE:20261202', 'DTEND;VALUE=DATE:20261203', 'Matri Poojan — Shubham & Preeti', fat),
    ev('baraat', 'DTSTART:20261203T023000Z', 'DTEND:20261203T053000Z', 'Baraat departs for Varanasi (8:00 AM)', fat),
    ev('vivah', 'DTSTART;VALUE=DATE:20261203', 'DTEND;VALUE=DATE:20261204', 'Shubh Vivah — Shubham & Preeti', vns),
    ev('vidai', 'DTSTART;VALUE=DATE:20261204', 'DTEND;VALUE=DATE:20261205', 'Vidaai — Shubham & Preeti', vns),
    'END:VCALENDAR',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'Shubham-Preeti-Wedding.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function googleCalendarUrl() {
  const title = encodeURIComponent('Shubh Vivah — Shubham & Preeti');
  const details = encodeURIComponent('With the blessings of Lord Ganesha, the Verma family cordially invites you to the wedding celebrations of Shubham Verma and Preeti Kumari.\n\nKey Dates:\n• 1 Dec: Tail Poojan\n• 2 Dec: Matri Poojan\n• 3 Dec: Baraat & Shubh Vivah\n• 4 Dec: Vidaai');
  const location = encodeURIComponent('Hotel Regency, Andhrapul, G.T. Road, Varanasi');
  // 3 Dec 8:00 AM IST to 4 Dec 12:00 PM IST
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261203T023000Z/20261204T063000Z&details=${details}&location=${location}`;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
