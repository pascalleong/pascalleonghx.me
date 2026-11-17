// Primitives — Button, Eyebrow, Tag, Input, PillarIcon, Logo components. Sharp, confident, brand-tuned.

/* ---- Crisp SVG Compass Mark (replaces blurry PNG) ---- */
const CompassMark = ({ size = 18, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0, ...style }} className={className}>
    <circle cx="24" cy="24" r="21.5" stroke="currentColor" strokeWidth="2.2" fill="none"></circle>
    <g transform="rotate(35, 24, 24)">
      <path d="M24 6L21 24L27 24Z" fill="currentColor"></path>
      <path d="M24 42L21 24L27 24Z" fill="currentColor" fillOpacity="0.4"></path>
    </g>
  </svg>
);

/* ---- Logo — Full (wordmark + superscript compass mark) ----
   Compass sits as a true superscript: ~50% of cap height, center aligned
   at the cap line (top of letters), positioned just above the last letter. */
const LogoFull = ({ height = 30, theme = 'dark' }) => {
  const fontSize = height;
  const compassSize = Math.round(fontSize * 0.5);
  const compassLift = Math.round(compassSize * 0.45);  // pull compass up so its center sits ~at cap line
  const gap = Math.round(fontSize * 0.1);
  const color = theme === 'light' ? 'var(--fg)' : 'var(--accent)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'flex-start',
      color, lineHeight: 1, userSelect: 'none',
      paddingTop: compassLift,  // reserve room for the lifted compass
    }}>
      <span className="wordmark" style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize, letterSpacing: 'var(--ls-wordmark)', textTransform: 'uppercase',
        lineHeight: 1, whiteSpace: 'nowrap',
        marginRight: gap,
      }}>Pascal Leong</span>
      <CompassMark size={compassSize} style={{ marginTop: -compassLift }} />
    </span>
  );
};

/* ---- Logo — Name only (wordmark, no compass) ---- */
const LogoName = ({ height = 20, theme = 'dark' }) => {
  const fontSize = height * 0.9;
  const color = theme === 'light' ? 'var(--fg)' : 'var(--accent)';
  return (
    <span className="wordmark" style={{
      fontFamily: 'var(--font-display)', fontWeight: 700,
      fontSize, letterSpacing: 'var(--ls-wordmark)', textTransform: 'uppercase',
      color, lineHeight: 1, whiteSpace: 'nowrap', display: 'block', userSelect: 'none',
    }}>Pascal Leong</span>
  );
};

const Eyebrow = ({ children, style }) => (
  <div data-eyebrow="" style={{
    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
    textTransform: 'uppercase', letterSpacing: '0.2em',
    color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 10,
    ...style,
  }}>
    <span style={{ width: 22, height: 1, background: 'currentColor' }}></span>
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', onClick, style, type = 'button', icon = 'arrow-right', iconRight = true, href, target }) => {
  const El = href ? 'a' : 'button';
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const base = {
    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15,
    letterSpacing: '-0.01em', padding: '15px 26px', borderRadius: 'var(--radius-md)',
    border: '1px solid transparent', cursor: 'pointer', lineHeight: 1,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, whiteSpace: 'nowrap', textDecoration: 'none', boxSizing: 'border-box', minHeight: 44,
    transition: 'background var(--dur-fast) var(--ease-snap), box-shadow var(--dur-base) var(--ease-snap), transform 80ms var(--ease-snap), color var(--dur-fast), border-color var(--dur-fast)',
  };
  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--accent-on)', borderColor: 'var(--accent)' },
    secondary: { background: 'transparent', color: 'var(--fg)', borderColor: 'var(--border-strong)' },
    ghost: { background: 'transparent', color: 'var(--link)', padding: '15px 6px', borderColor: 'transparent' },
  };
  const hoverStyle = !hover ? {} : variant === 'primary'
    ? { background: 'var(--accent-hover)', boxShadow: 'var(--glow-mint-lg)' }
    : variant === 'secondary'
    ? { borderColor: 'var(--accent)', color: 'var(--accent)' }
    : { color: 'var(--accent)' };
  return (
    <El
      data-cta=""
      type={href ? undefined : type} href={href} target={target || (href && /^https?:/.test(href) ? '_blank' : undefined)} rel={href && /^https?:/.test(href) ? 'noopener' : undefined} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...(press ? { transform: 'translateY(1px) scale(0.99)' } : {}), ...style }}
    >
      {children}
      {icon && iconRight && (
        <iconify-icon icon={`ph:${icon}-bold`} width="18" style={{ transform: hover ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-base) var(--ease-snap)' }}></iconify-icon>
      )}
    </El>
  );
};

const Tag = ({ children, variant = 'mint', pulse }) => {
  const variants = {
    mint: { background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid transparent' },
    outline: { background: 'transparent', color: 'var(--fg-muted)', border: '1px solid var(--border-strong)' },
    solid: { background: 'var(--accent)', color: 'var(--accent-on)', border: '1px solid var(--accent)' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      padding: '6px 12px', borderRadius: 'var(--radius-pill)', ...variants[variant],
    }}>
      {pulse && <span className="pulse-ring" style={{ width: 7, height: 7, borderRadius: 999, background: 'currentColor' }}></span>}
      {children}
    </span>
  );
};

const Input = ({ label, hint, error, value, onChange, placeholder, type = 'text', as = 'input' }) => {
  const [focused, setFocused] = React.useState(false);
  const Tag2 = as;
  return (
    <label style={{ display: 'block', marginBottom: 22 }}>
      {label && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--fg-muted)', marginBottom: 10 }}>
          {label}
        </div>
      )}
      <Tag2
        type={type} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder={placeholder} rows={as === 'textarea' ? 4 : undefined}
        style={{
          width: '100%', background: 'var(--bg-input)', color: 'var(--fg)',
          border: `1px solid ${error ? '#F87171' : focused ? 'var(--border-focus)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-md)', padding: '14px 16px',
          fontFamily: 'var(--font-body)', fontSize: 15,
          resize: as === 'textarea' ? 'vertical' : undefined,
          boxShadow: focused ? '0 0 0 2px rgba(94,234,212,0.20)' : 'none',
          transition: 'border var(--dur-fast), box-shadow var(--dur-fast)',
        }}
      />
      {error ? <div style={{ marginTop: 8, fontSize: 12, color: '#F87171', fontFamily: 'var(--font-mono)' }}>{error}</div>
        : hint ? <div style={{ marginTop: 8, fontSize: 12, color: 'var(--fg-muted)' }}>{hint}</div> : null}
    </label>
  );
};

// Brand pillar icon — Phosphor UI iconography in a sharp brand tile.
// (compass / hourglass / lightbulb) rendered as thin geometric line icons.
const PillarIcon = ({ name, size = 46, glow = true, theme = 'dark' }) => {
  const icon = { compass: 'compass', hourglass: 'hourglass-medium', lightbulb: 'lightbulb' }[name] || name;
  const tile = Math.round(size * 1.18);
  return (
    <span
      className={glow && theme === 'dark' ? 'icon-glow' : ''}
      style={{
        width: tile, height: tile, flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--accent-soft)', border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <iconify-icon icon={`ph:${icon}-thin`} width={Math.round(size * 0.74)} style={{ color: 'var(--accent)' }}></iconify-icon>
    </span>
  );
};

// UNTESTED until the site is hosted: confirm with a real email that it reaches the Substack subscriber list.
const plSubscribe = (email) => {
  try { window.plTrack && window.plTrack('substack_subscribe', { location: (window.PL_ROUTE || 'home') }); } catch (_) {}
  try {
    const name = 'pl-sub-' + Date.now();
    const ifr = document.createElement('iframe');
    ifr.name = name; ifr.style.display = 'none'; ifr.setAttribute('aria-hidden', 'true'); ifr.tabIndex = -1;
    const f = document.createElement('form');
    f.method = 'POST'; f.action = window.PL_LINKS.substack + '/api/v1/free'; f.target = name; f.style.display = 'none';
    const i = document.createElement('input');
    i.type = 'hidden'; i.name = 'email'; i.value = email;
    f.appendChild(i);
    document.body.appendChild(ifr); document.body.appendChild(f);
    f.submit();
    setTimeout(() => { f.remove(); ifr.remove(); }, 10000);
  } catch (err) {}
};

const CountUp = ({ value, duration = 600 }) => {
  const s = String(value), m = s.match(/^(\D*)([\d,]*\.?\d+)(.*)$/);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [p, setP] = React.useState(m && !reduced ? 0 : 1);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!m || reduced || !ref.current) return;
    let raf = 0, io;
    const go = () => { const t0 = performance.now(); const tick = (t) => { const k = Math.min(1, (t - t0) / duration); setP(1 - Math.pow(1 - k, 3)); if (k < 1) raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); };
    io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { io.disconnect(); go(); } }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  if (!m) return s;
  const dec = (m[2].split('.')[1] || '').length, comma = m[2].includes(',');
  const cur = parseFloat(m[2].replace(/,/g, '')) * p;
  const txt = m[1] + (comma ? cur.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) : cur.toFixed(dec)) + m[3];
  return <span ref={ref} role="text" aria-label={s} style={{ display: 'inline-grid', fontVariantNumeric: 'tabular-nums' }}><span aria-hidden="true" style={{ gridArea: '1 / 1', visibility: 'hidden' }}>{s}</span><span aria-hidden="true" style={{ gridArea: '1 / 1' }}>{txt}</span></span>;
};
Object.assign(window, { CountUp, plSubscribe, Eyebrow, PLButton: Button, PLTag: Tag, PLInput: Input, PillarIcon, CompassMark, LogoFull, LogoName });
