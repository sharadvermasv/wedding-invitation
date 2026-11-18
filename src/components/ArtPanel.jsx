import { patternStyle } from '../lib.js';

// Stand-in for the template's photography: a photo if one is provided,
// otherwise an Indian textile pattern on a solid colour.
export default function ArtPanel({ photo, color = 'var(--rust)', pattern = 'butti', patternColor, size, className = '', children, ...rest }) {
  if (photo) {
    return (
      <div className={`art art-photo ${className}`} {...rest}>
        <img src={photo} alt="" loading="lazy" />
        {children && <div className="art-c">{children}</div>}
      </div>
    );
  }
  return (
    <div className={`art ${className}`} style={{ background: color }} {...rest}>
      <div className="art-pat" style={patternStyle(pattern, patternColor || 'rgba(255,240,215,.22)', size || (pattern === 'bandhani' ? 20 : 52))} />
      <div className="art-c">{children}</div>
    </div>
  );
}
