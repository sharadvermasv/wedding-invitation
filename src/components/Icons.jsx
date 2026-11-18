// Line-art & vector icons in single-ink royal Indian style (SVG, zero emoji dependencies)
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const Kalash = (p) => (
  <svg viewBox="0 0 64 84" {...p}><g {...S}>
    <ellipse cx="32" cy="16" rx="8" ry="10" /><path d="M28 7c2-3 6-3 8 0" />
    <path d="M24 30c-6-2-12-6-15-12 6 0 12 4 15 12zM40 30c6-2 12-6 15-12-6 0-12 4-15 12zM27 30c-3-6-3-12 0-16M37 30c3-6 3-12 0-16" />
    <path d="M18 30h28M20 34h24" />
    <path d="M22 34c0 3-3 4-3 6-8 4-11 11-11 18 0 12 11 18 24 18s24-6 24-18c0-7-3-14-11-18 0-2-3-3-3-6" />
    <path d="M12 52h40M11 60h42" opacity=".6" /><circle cx="32" cy="56" r="3" /><path d="M24 82h16" />
  </g></svg>
);

export const KalashSparkle = (p) => (
  <svg viewBox="0 0 140 120" {...p}>
    <g transform="translate(38 18)"><g {...S} strokeWidth="1.2">
      <ellipse cx="32" cy="16" rx="8" ry="10" /><path d="M28 7c2-3 6-3 8 0" />
      <path d="M24 30c-6-2-12-6-15-12 6 0 12 4 15 12zM40 30c6-2 12-6 15-12-6 0-12 4-15 12zM27 30c-3-6-3-12 0-16M37 30c3-6 3-12 0-16" />
      <path d="M18 30h28M20 34h24" />
      <path d="M22 34c0 3-3 4-3 6-8 4-11 11-11 18 0 12 11 18 24 18s24-6 24-18c0-7-3-14-11-18 0-2-3-3-3-6" />
      <circle cx="32" cy="56" r="3" />
    </g></g>
    <g fill="currentColor" className="sparkle">
      <path d="M112 14l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" />
      <path d="M124 40l1.2 4 4 1.2-4 1.2-1.2 4-1.2-4-4-1.2 4-1.2z" />
      <path d="M24 92l1.4 4.6 4.6 1.4-4.6 1.4-1.4 4.6-1.4-4.6-4.6-1.4 4.6-1.4z" />
    </g>
  </svg>
);

export const Diya = (p) => (
  <svg viewBox="0 0 66 66" {...p}><g {...S}>
    <path d="M10 40c0 9 10 14 23 14s23-5 23-14H10z" /><path d="M56 40c3-1 6-3 7-6-4 0-7 2-9 4" />
    <path d="M33 36c-5-4-5-10 0-18 5 8 5 14 0 18z" /><path d="M33 31c-2-2-2-5 0-8 2 3 2 6 0 8z" /><path d="M24 58h18" />
  </g></svg>
);

export const Lotus = (p) => (
  <svg viewBox="0 0 66 66" {...p}><g {...S}>
    <path d="M33 48c-6-6-6-20 0-30 6 10 6 24 0 30z" /><path d="M33 48c-10-2-16-12-16-24 9 3 15 12 16 24z" />
    <path d="M33 48c10-2 16-12 16-24-9 3-15 12-16 24z" /><path d="M33 48c-12 2-22-4-26-12 9-2 20 2 26 12z" />
    <path d="M33 48c12 2 22-4 26-12-9-2-20 2-26 12z" /><path d="M14 54c6 3 32 3 38 0" /><circle cx="33" cy="10" r="2" />
  </g></svg>
);

export const Havan = (p) => (
  <svg viewBox="0 0 66 66" {...p}><g {...S}>
    <path d="M14 44h38l-5 12H19z" /><path d="M10 44h46" />
    <path d="M33 40c-8-4-8-12-2-22 1 6 5 6 5 12 3-2 3-5 3-7 5 7 4 14-6 17z" /><path d="M33 40c-3-2-3-6 0-10 3 4 3 8 0 10z" />
  </g></svg>
);

export const Doli = (p) => (
  <svg viewBox="0 0 66 66" {...p}><g {...S}>
    <path d="M2 26h62" /><path d="M18 26c0-8 7-14 15-14s15 6 15 14" /><path d="M33 12V7" /><circle cx="33" cy="5.5" r="1.6" />
    <path d="M18 26v24h30V26" /><path d="M26 50V36a7 7 0 0 1 14 0v14" /><path d="M16 50h34" />
  </g></svg>
);

export const Car = (p) => (
  <svg viewBox="0 0 64 40" {...p}><g {...S} strokeWidth="1.6">
    <path d="M4 28V20l8-2 8-10h22l10 10 8 2v8h-6" /><path d="M14 28h26" />
    <circle cx="17" cy="29" r="5" /><circle cx="47" cy="29" r="5" /><path d="M22 18h22l-6-7H26z" />
  </g></svg>
);

export const Flower = (p) => (
  <svg viewBox="0 0 24 24" {...p}><g fill="currentColor">
    <circle cx="12" cy="12" r="2.6" /><ellipse cx="12" cy="5" rx="2.6" ry="4" /><ellipse cx="12" cy="19" rx="2.6" ry="4" />
    <ellipse cx="5" cy="12" rx="4" ry="2.6" /><ellipse cx="19" cy="12" rx="4" ry="2.6" />
  </g></svg>
);

export const Agni = (p) => (
  <svg viewBox="0 0 74 74" {...p}>
    <path d="M14 56h46l-6 12H20z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 56h54" stroke="currentColor" strokeWidth="1.5" />
    <path className="flame f1" d="M37 52c-11-4-12-14-4-28 1 8 7 8 7 16 4-3 4-6 4-9 7 9 5 18-7 21z" fill="var(--marigold)" />
    <path className="flame f2" d="M37 52c-5-2-5-8 0-14 5 6 5 12 0 14z" fill="var(--haldi)" />
  </svg>
);

/* ---------- Audio Mute / Unmute Icons ---------- */
export const SpeakerWave = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.15" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

export const SpeakerXMark = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.15" />
    <line x1="22" y1="9" x2="16" y2="15" />
    <line x1="16" y1="9" x2="22" y2="15" />
  </svg>
);

/* ---------- Navigation & Calendar Icons ---------- */
export const CalendarIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="8" cy="14" r="1" fill="currentColor" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
    <circle cx="16" cy="14" r="1" fill="currentColor" />
    <circle cx="8" cy="18" r="1" fill="currentColor" />
    <circle cx="12" cy="18" r="1" fill="currentColor" />
  </svg>
);

export const MapPinIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const CompassIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const PlaneIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.8-.2-1.6.3-1.8 1.1l-.3 1.2 5.5 3.3-3.2 3.2-2.3-.5c-.4-.1-.8.1-1 .5l-.7 1 3.3 2 2 3.3 1-.7c.4-.2.6-.6.5-1l-.5-2.3 3.2-3.2 3.3 5.5 1.2-.3c.8-.2 1.3-1 1.1-1.8Z" />
  </svg>
);

export const TrainIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="4" y="3" width="16" height="15" rx="3" />
    <line x1="4" y1="10" x2="20" y2="10" />
    <circle cx="8" cy="14" r="1.5" fill="currentColor" />
    <circle cx="16" cy="14" r="1.5" fill="currentColor" />
    <path d="m16 18 2 3M8 18l-2 3M8 21h8" />
  </svg>
);

export const ClockIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const PhoneIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const StarSparkle = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2L13.8 8.8L20.6 10.6L13.8 12.4L12 19.2L10.2 12.4L3.4 10.6L10.2 8.8L12 2Z" />
  </svg>
);

export const LotusIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3c-2 4-2 9 0 14 2-5 2-10 0-14Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 17c-4-1-7-5-7-10 4 1 6 5 7 10Z" />
    <path d="M12 17c4-1 7-5 7-10-4 1-6 5-7 10Z" />
    <path d="M4 19c5 2 11 2 16 0" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ceremonyIcon = { tail: Diya, matri: Lotus, vivah: Havan, vidai: Doli };

export const DownloadIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3v12" />
    <path d="M7 10l5 5 5-5" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);

export const ArrowDownIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 4v16" />
    <path d="M6 14l6 6 6-6" />
  </svg>
);

export const GoogleCalendarIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="17" rx="3" />
    <path d="M8 2v4M16 2v4M3 9h18" />
    <path d="M12 12v6M9 15h6" />
  </svg>
);

export const TempleIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 2v3M4 10h16M2 21h20M5 10v11M19 10v11M9 10v11M15 10v11M12 5l-8 5h16l-8-5Z" />
    <path d="M12 15a2 2 0 0 1 2 2v4h-4v-4a2 2 0 0 1 2-2Z" />
  </svg>
);

export const PaletteIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H16c3.3 0 6-2.7 6-6 0-5.5-4.5-10-10-10Z" />
  </svg>
);

export const SparklesIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
  </svg>
);

export const HeartHandshakeIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
    <path d="m18 15-2-2" />
    <path d="m15 18-2-2" />
  </svg>
);

export const UsersIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M15.5 13.5c-.2-.1-1.3-.6-1.5-.7s-.3-.1-.5.1-.6.7-.7.9-.3.2-.5.1a6.3 6.3 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5s-.5-1.2-.7-1.6-.4-.4-.5-.4h-.4c-.2 0-.5.1-.7.3s-1 1-1 2.4 1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.9 1.2 2.9.8 3.4.8s1.6-.7 1.8-1.3.2-1.2.2-1.3-.2-.2-.4-.3z" fill="currentColor" stroke="none" />
  </svg>
);

export const HotelIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M18 2H6a2 2 0 0 0-2 2v18h16V4a2 2 0 0 0-2-2Z" />
    <path d="M9 16v6M15 16v6M9 6h.01M15 6h.01M9 10h.01M15 10h.01" />
  </svg>
);

export const FileSpreadsheetIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13h8M8 17h8M12 13v8" />
  </svg>
);

export const CopyIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

