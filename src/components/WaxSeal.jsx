// Hand-poured wax seal: irregular dripped edge, raised inner disc,
// beaded rim, and an S & P monogram pressed into the wax.
function dripPath(r = 54, bumps = 22, seed = 7) {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const pts = Array.from({ length: bumps }, (_, i) => {
    const a = (i / bumps) * Math.PI * 2;
    const rr = r + (rnd() - 0.35) * 6;
    return [Math.cos(a) * rr, Math.sin(a) * rr];
  });
  // smooth closed curve through the points
  let d = '';
  pts.forEach((p, i) => {
    const n = pts[(i + 1) % pts.length];
    const mx = (p[0] + n[0]) / 2, my = (p[1] + n[1]) / 2;
    d += i === 0 ? `M${mx.toFixed(2)} ${my.toFixed(2)}` : '';
    const nn = pts[(i + 2) % pts.length];
    const mx2 = (n[0] + nn[0]) / 2, my2 = (n[1] + nn[1]) / 2;
    d += ` Q${n[0].toFixed(2)} ${n[1].toFixed(2)} ${mx2.toFixed(2)} ${my2.toFixed(2)}`;
  });
  return `${d}Z`;
}

const OUTER = dripPath();

export default function WaxSeal({ id = 'ws' }) {
  const beads = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    return <circle key={i} cx={Math.cos(a) * 35.5} cy={Math.sin(a) * 35.5} r="1.35" />;
  });
  return (
    <svg className="wax-seal" viewBox="-62 -62 124 124" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-wax`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#c2453f" />
          <stop offset="38%" stopColor="#8e2430" />
          <stop offset="75%" stopColor="#5e1420" />
          <stop offset="100%" stopColor="#3a0a12" />
        </radialGradient>
        <radialGradient id={`${id}-disc`} cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#a83238" />
          <stop offset="70%" stopColor="#7a1c27" />
          <stop offset="100%" stopColor="#5a1219" />
        </radialGradient>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* dripped wax body */}
      <path d={OUTER} fill={`url(#${id}-wax)`} />
      <path d={OUTER} fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="1.2" transform="translate(0.6 1)" filter={`url(#${id}-soft)`} />

      {/* pressed ring around the raised disc */}
      <circle r="43" fill="rgba(0,0,0,.28)" filter={`url(#${id}-soft)`} transform="translate(0.8 1.2)" />
      <circle r="42" fill={`url(#${id}-disc)`} />
      <circle r="42" fill="none" stroke="rgba(255,190,170,.28)" strokeWidth=".8" transform="translate(-.5 -.6)" />

      {/* beaded rim and fine rings */}
      <circle r="39" fill="none" stroke="rgba(40,4,10,.55)" strokeWidth=".7" />
      <g fill="rgba(255,200,180,.42)">{beads}</g>
      <circle r="31.5" fill="none" stroke="rgba(40,4,10,.5)" strokeWidth=".7" />
      <circle r="31.5" fill="none" stroke="rgba(255,190,170,.25)" strokeWidth=".6" transform="translate(-.4 -.5)" />

      {/* monogram pressed into the wax: highlight, shadow, then the recess */}
      <g fontFamily="Cormorant, Georgia, serif" fontWeight="500" fontSize="27" textAnchor="middle">
        <text y="9.6" x="-.6" fill="rgba(255,200,180,.35)">S<tspan fontStyle="italic" fontWeight="400">&amp;</tspan>P</text>
        <text y="10.8" x=".7" fill="rgba(30,2,6,.6)">S<tspan fontStyle="italic" fontWeight="400">&amp;</tspan>P</text>
        <text y="10.2" fill="#6a1520">S<tspan fontStyle="italic" fontWeight="400">&amp;</tspan>P</text>
      </g>
      {/* small diamonds above and below the monogram */}
      <g fill="rgba(255,200,180,.4)">
        <path d="M0 -24 l2.2 2.2 -2.2 2.2 -2.2 -2.2z" />
        <path d="M0 19.6 l2.2 2.2 -2.2 2.2 -2.2 -2.2z" />
      </g>

      {/* glossy highlight */}
      <ellipse cx="-18" cy="-24" rx="16" ry="8" transform="rotate(-30 -18 -24)" fill="rgba(255,255,255,.14)" />
    </svg>
  );
}
