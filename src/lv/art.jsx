// Hand-built SVG / CSS artwork for the lantern-themed invitation.
// Everything here is original vector art — no external images.

/* ---------- deterministic random so lanterns don't jump on re-render ---------- */
export function seeded(seed = 7) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ---------- textures (data-URI SVG tiles) ---------- */
const uri = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

// Flowing bundles of fine strands, like combed silk — used on the purple sections.
export function strandTexture(line = '#3a2160', vein = '#6a4a9a', size = 520) {
  const r = seeded(11);
  // A wave whose period divides the tile width, drawn across three tiles,
  // so the pattern joins seamlessly left/right; copies at ±size join top/bottom.
  const wave = (y, amp, period, phase) => {
    let d = `M${-size - phase} ${y.toFixed(1)}`;
    d += ` Q ${(-size - phase + period / 4).toFixed(1)} ${(y - amp).toFixed(1)} ${(-size - phase + period / 2).toFixed(1)} ${y.toFixed(1)}`;
    for (let x = -size - phase + period; x <= 2 * size + period; x += period / 2) d += ` T ${x.toFixed(1)} ${y.toFixed(1)}`;
    return d;
  };
  let lines = '', veins = '';
  for (let b = 0; b < 9; b++) {
    const y0 = r() * size, amp = 30 + r() * 70, period = size / (r() < 0.5 ? 1 : 2), phase = r() * period, n = 10 + Math.floor(r() * 9);
    for (let i = 0; i < n; i++) lines += `<path d='${wave(y0 + i * 3.3, amp, period, phase)}'/>`;
    veins += `<path d='${wave(y0 + n * 1.65, amp, period, phase)}'/>`;
  }
  const layer = (dy) => `<g transform='translate(0 ${dy})'><g stroke='${vein}' stroke-width='16' opacity='.28' stroke-linecap='round'>${veins}</g><g stroke='${line}' stroke-width='1.35' opacity='.9'>${lines}</g></g>`;
  return uri(`<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><g fill='none'>${layer(-size)}${layer(0)}${layer(size)}</g></svg>`);
}

// Large outlined leaves with veins — used on the teal and navy sections.
export function leafTexture(stroke = 'rgba(255,255,255,.18)', size = 460) {
  const r = seeded(29);
  let g = '';
  for (let i = 0; i < 7; i++) {
    const x = r() * size, y = r() * size, rot = r() * 360, L = 150 + r() * 120, W = L * (0.38 + r() * 0.12);
    let veins = `<path d='M0 0 L${L} 0' />`;
    for (let k = 1; k < 9; k++) {
      const px = (L * k) / 9, w = W * Math.sin((Math.PI * k) / 9) * 0.5;
      veins += `<path d='M${px} 0 Q ${px + 18} ${-w * 0.6} ${px + 30} ${-w}'/><path d='M${px} 0 Q ${px + 18} ${w * 0.6} ${px + 30} ${w}'/>`;
    }
    const leaf = `<g transform='translate(${x} ${y}) rotate(${rot})' fill='none' stroke='${stroke}' stroke-width='1.6' stroke-linecap='round'><path d='M0 0 Q ${L / 2} ${-W} ${L} 0 Q ${L / 2} ${W} 0 0Z'/>${veins}</g>`;
    for (const dx of [-size, 0, size]) for (const dy of [-size, 0, size]) g += `<g transform='translate(${dx} ${dy})'>${leaf}</g>`;
  }
  return uri(`<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>${g}</svg>`);
}

// Fine grain for sandy / papery surfaces.
export const grain = uri(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
);

// Bell / tent curve used to mask the top of the purple blessings section.
export const tentMask = uri(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='M0 100 C 16 100, 28 66, 35 34 C 40 12, 45 0, 50 0 C 55 0, 60 12, 65 34 C 72 66, 84 100, 100 100 Z'/></svg>`
);

/* ---------- floating sky lanterns ---------- */
export function Lanterns({ count = 22, seed = 3, className = '' }) {
  const r = seeded(seed);
  const items = Array.from({ length: count }, (_, i) => {
    const depth = r(); // 0 far … 1 near
    const size = 18 + depth * depth * 110;
    return {
      i,
      left: r() * 100,
      size,
      dur: 26 - depth * 12 + r() * 8,
      delay: -r() * 30,
      tilt: (r() - 0.5) * 18,
      sway: 2 + r() * 4,
      blur: depth < 0.25 ? 1.2 : 0,
      z: Math.round(depth * 10),
    };
  });
  return (
    <div className={`lv-lanterns ${className}`} aria-hidden="true">
      {items.map((l) => (
        <span
          key={l.i}
          className="lv-lantern-track"
          style={{
            left: `${l.left}%`,
            zIndex: l.z,
            animationDuration: `${l.dur}s`,
            animationDelay: `${l.delay}s`,
            filter: l.blur ? `blur(${l.blur}px)` : undefined,
          }}
        >
          <span
            className="lv-lantern"
            style={{ '--s': l.size.toFixed(1), '--tilt': `${l.tilt}deg`, animationDuration: `${l.sway}s` }}
          />
        </span>
      ))}
    </div>
  );
}

/* ---------- mandap dome silhouette for the hero ---------- */
export function MandapDome({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 600 330" aria-hidden="true">
      <defs>
        <linearGradient id="dmG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d79a" />
          <stop offset=".55" stopColor="#d9a45a" />
          <stop offset="1" stopColor="#a8702f" />
        </linearGradient>
        <linearGradient id="dmC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e2357e" />
          <stop offset="1" stopColor="#9c1450" />
        </linearGradient>
      </defs>
      {/* finial */}
      <path d="M300 0 l5 26 h-10z" fill="url(#dmG)" />
      <circle cx="300" cy="34" r="8" fill="url(#dmG)" />
      <ellipse cx="300" cy="50" rx="16" ry="7" fill="url(#dmG)" />
      {/* dome */}
      <path d="M300 56 C 230 60, 168 120, 160 196 H 440 C 432 120, 370 60, 300 56Z" fill="url(#dmG)" />
      {Array.from({ length: 13 }, (_, i) => {
        const x = 172 + i * 21.3;
        return <path key={i} d={`M300 60 Q ${(x + 300) / 2} 110 ${x} 196`} stroke="#9c6a2c" strokeOpacity=".45" strokeWidth="1.4" fill="none" />;
      })}
      <path d="M150 196 H450 v14 H150z" fill="#c38a45" />
      {/* side kiosks */}
      {[92, 508].map((cx) => (
        <g key={cx}>
          <path d={`M${cx} 150 c -26 4 -34 30 -34 52 h68 c0 -22 -8 -48 -34 -52z`} fill="url(#dmG)" />
          <path d={`M${cx} 128 l3 22 h-6z`} fill="url(#dmG)" />
          <path d={`M${cx - 44} 202 h88 v10 h-88z`} fill="#c38a45" />
        </g>
      ))}
      {/* cornice + scallops */}
      <path d="M40 212 H560 v22 H40z" fill="url(#dmG)" />
      {Array.from({ length: 26 }, (_, i) => (
        <circle key={i} cx={50 + i * 20} cy="236" r="8" fill="#b77d3a" />
      ))}
      {/* pillars + curtain arch */}
      <path d="M80 240 h40 v90 h-40z M480 240 h40 v90 h-40z" fill="url(#dmG)" />
      <path d="M120 244 H480 V330 H120Z" fill="url(#dmC)" />
      <path d="M120 244 Q 300 330 480 244" fill="#f4c0d4" fillOpacity=".18" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${140 + i * 40} 244 q 20 30 40 0`} fill="none" stroke="#ffd1e3" strokeOpacity=".5" strokeWidth="2" />
      ))}
    </svg>
  );
}

/* ---------- ornamental Om medallion for the blessings ---------- */
export function OmMedallion({ className = '' }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        {petals.map((a) => (
          <path key={a} transform={`rotate(${a} 100 100)`} d="M100 14 C 112 34, 112 46, 100 58 C 88 46, 88 34, 100 14Z" />
        ))}
        {petals.map((a) => (
          <circle key={`d${a}`} transform={`rotate(${a + 11.25} 100 100)`} cx="100" cy="26" r="2.2" fill="currentColor" />
        ))}
        <circle cx="100" cy="100" r="44" />
        <circle cx="100" cy="100" r="50" strokeDasharray="1 5" strokeLinecap="round" strokeWidth="2.4" />
      </g>
      <text x="100" y="124" textAnchor="middle" fontFamily="Gotu, serif" fontSize="66" fill="currentColor">ॐ</text>
    </svg>
  );
}

/* ---------- gold woven oval frame with curling leaf ---------- */
export function GoldFrame({ src, alt }) {
  return (
    <div className="lv-frame">
      <div className="lv-frame-rim">
        <div className="lv-frame-pic">
          <img src={src} alt={alt} loading="lazy" />
        </div>
      </div>
      <svg className="lv-frame-leaf" viewBox="0 0 100 130" aria-hidden="true">
        <defs>
          <linearGradient id="lfG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff2b0" />
            <stop offset=".35" stopColor="#f2c23c" />
            <stop offset=".7" stopColor="#c48a12" />
            <stop offset="1" stopColor="#ffe37a" />
          </linearGradient>
        </defs>
        {/* top-left curl */}
        <path d="M78 10 C 50 -2, 10 8, 4 50 C 2 66, 6 80, 12 88" stroke="url(#lfG)" strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M78 10 C 50 -2, 10 8, 4 50 C 2 66, 6 80, 12 88" stroke="#7a4d06" strokeWidth="13" fill="none" strokeDasharray=".55 2" opacity=".55" />
        <path d="M84 16 C 60 4, 24 12, 14 46" stroke="url(#lfG)" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* bottom-right curl */}
        <path d="M22 122 C 52 134, 92 120, 96 80 C 98 64, 94 52, 88 44" stroke="url(#lfG)" strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M22 122 C 52 134, 92 120, 96 80 C 98 64, 94 52, 88 44" stroke="#7a4d06" strokeWidth="13" fill="none" strokeDasharray=".55 2" opacity=".55" />
        <path d="M16 116 C 40 128, 76 118, 86 84" stroke="url(#lfG)" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ---------- gold sunburst ---------- */
export function Sunburst({ className = '' }) {
  const r = seeded(5);
  const n = 26;
  let d = '';
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n - Math.PI / 2;
    const rad = i % 2 === 0 ? 150 + r() * 95 : 108 + r() * 10;
    d += `${i ? 'L' : 'M'}${(250 + Math.cos(a) * rad).toFixed(1)} ${(250 + Math.sin(a) * rad).toFixed(1)} `;
  }
  return (
    <svg className={className} viewBox="0 0 500 500" aria-hidden="true">
      <defs>
        <radialGradient id="sbG" cx=".5" cy=".42" r=".6">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset=".55" stopColor="#f2b52a" />
          <stop offset="1" stopColor="#c7860e" />
        </radialGradient>
      </defs>
      <path d={`${d}Z`} fill="url(#sbG)" />
    </svg>
  );
}

/* ---------- seashell for RSVP ---------- */
export function Shell({ className = '' }) {
  const ribs = Array.from({ length: 15 }, (_, i) => -70 + i * 10);
  return (
    <svg className={className} viewBox="0 0 400 360" aria-hidden="true">
      <defs>
        <radialGradient id="shG" cx=".5" cy=".75" r=".8">
          <stop offset="0" stopColor="#14707a" />
          <stop offset="1" stopColor="#0a4a52" />
        </radialGradient>
      </defs>
      {/* upper shell */}
      <path d="M200 10 C 300 10, 372 92, 362 196 C 356 238, 330 262, 306 270 L 94 270 C 70 262, 44 238, 38 196 C 28 92, 100 10, 200 10Z" fill="url(#shG)" />
      {ribs.map((a) => (
        <path key={a} d={`M200 268 L ${200 + Math.sin((a * Math.PI) / 180) * 190} ${268 - Math.cos((a * Math.PI) / 180) * 250}`} stroke="#5fc6cc" strokeOpacity=".28" strokeWidth="1.4" />
      ))}
      {/* lower clam lip */}
      <path d="M10 262 C 70 250, 130 276, 200 276 C 270 276, 330 250, 390 262 C 360 330, 280 356, 200 356 C 120 356, 40 330, 10 262Z" fill="#0b5a62" />
      <path d="M22 268 C 80 262, 136 288, 200 288 C 264 288, 320 262, 378 268" stroke="#8fe0e2" strokeOpacity=".55" strokeWidth="2" fill="none" />
      {Array.from({ length: 11 }, (_, i) => (
        <path key={i} d={`M${60 + i * 28} 300 L ${80 + i * 24} 346`} stroke="#5fc6cc" strokeOpacity=".22" strokeWidth="1.2" />
      ))}
    </svg>
  );
}

/* ---------- small line icons ---------- */
const I = (p) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p} />
);
export const Icon = {
  baraat: (p) => (
    <I {...p}>
      <path d="M8 34h32M12 34V22l12-8 12 8v12" />
      <path d="M20 34v-7h8v7M24 8v6" />
      <circle cx="24" cy="7" r="1.6" fill="currentColor" />
      <path d="M6 40h36" />
    </I>
  ),
  train: (p) => (
    <I {...p}>
      <rect x="12" y="6" width="24" height="28" rx="6" />
      <path d="M12 20h24M18 13h12" />
      <circle cx="18" cy="27" r="1.8" />
      <circle cx="30" cy="27" r="1.8" />
      <path d="M16 34l-5 8M32 34l5 8M14 39h20" />
    </I>
  ),
  plane: (p) => (
    <I {...p}>
      <path d="M22 6c1.5-1.5 4.5-1.5 4.5 1.5V19l14 8v4l-14-4v9l4 3v3l-6.5-2-6.5 2v-3l4-3v-9l-14 4v-4l14-8V7.5c0-1.5 0.5-1.5 1-1.5z" />
    </I>
  ),
  weather: (p) => (
    <I {...p}>
      <circle cx="19" cy="18" r="6" />
      <path d="M19 6v3M19 27v3M7 18h3M28 18h3M10.5 9.5l2 2M25.5 24.5l2 2M10.5 26.5l2-2M25.5 11.5l2-2" />
      <path d="M22 38h16a6 6 0 0 0 0-12 8 8 0 0 0-15-1 5 5 0 0 0-1 13z" />
    </I>
  ),
  pin: (p) => (
    <svg viewBox="0 0 48 64" aria-hidden="true" {...p}>
      <path d="M24 2C12 2 4 11 4 22c0 15 20 38 20 38s20-23 20-38C44 11 36 2 24 2z" fill="currentColor" />
      <circle cx="24" cy="22" r="8" fill="#f3c34a" />
      <path d="M24 16c3 3 3 9 0 12-3-3-3-9 0-12z" fill="currentColor" />
    </svg>
  ),
  play: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
    </svg>
  ),
  pause: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
    </svg>
  ),
  lotus: (p) => (
    <I {...p}>
      <path d="M24 38c-6-4-9-10-9-17 4 2 7 5 9 9 2-4 5-7 9-9 0 7-3 13-9 17z" />
      <path d="M24 30c-2-6-2-12 0-18 2 6 2 12 0 18z" />
      <path d="M15 21c-4-1-8 0-11 2 3 7 10 13 20 15M33 21c4-1 8 0 11 2-3 7-10 13-20 15" />
    </I>
  ),
  chevron: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...p}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  ),
};
