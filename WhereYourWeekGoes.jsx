// WhereYourWeekGoes: Capital Burn Rate split, now vs after the audit.

const WYWG_SEG = {
  busy: { bg: '#334155', fg: '#E2E8F0' },
  req: { bg: '#64748B', fg: '#F8FAFC' },
  skill: { bg: 'var(--accent)', fg: '#020817' },
};

const WYWG_ROWS = [
  {
    label: 'NOW · trading energy for a transcript',
    segs: [
      { k: 'busy', name: 'Low-liquidity busywork', w: 44 },
      { k: 'req', name: 'Required to pass', w: 30 },
      { k: 'skill', name: 'High-liquidity skills', w: 26 },
    ],
  },
  {
    label: 'AFTER THE AUDIT · building a Career Moat',
    segs: [
      { k: 'busy', name: 'Low-liquidity busywork', w: 20 },
      { k: 'req', name: 'Required to pass', w: 30 },
      { k: 'skill', name: 'High-liquidity skills + Career Moat', w: 50, glow: true },
    ],
  },
];

const useWYWGMobile = () => {
  const [m, setM] = React.useState(typeof window !== 'undefined' && window.innerWidth < 768);
  React.useEffect(() => {
    const f = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  return m;
};

const WYWGBar = ({ row, mobile }) => {
  const below = mobile ? row.segs.filter((s) => s.w < 30) : [];
  const monoLabel = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.35, padding: '0 10px', textAlign: 'center' };
  return (
    <div>
      <div style={{ display: 'flex', height: 64, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
        {row.segs.map((s) => {
          const inside = !(mobile && s.w < 30);
          const c = WYWG_SEG[s.k];
          return (
            <div key={s.name} className={s.glow ? 'chosen-glow' : ''} style={{ width: s.w + '%', background: c.bg, color: c.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, boxShadow: s.glow ? 'inset 0 0 0 1px var(--accent)' : 'none' }}>
              {inside && <span style={monoLabel}>{s.name}</span>}
            </div>
          );
        })}
      </div>
      {below.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: 8 }}>
          {below.map((s) => <span key={s.name} style={{ ...monoLabel, padding: 0, textAlign: 'left', color: 'var(--fg-muted)' }}>{s.name}</span>)}
        </div>
      )}
    </div>
  );
};

const WhereYourWeekGoes = () => {
  const mobile = useWYWGMobile();
  return (
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: '120px 32px 0' }}>
      <Reveal><SectionHead eyebrow="REINVESTING YOUR TIME" title="Where your week goes now, and after the audit." /></Reveal>
      <Reveal delay={100}>
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 40 }}>
          {WYWG_ROWS.map((row, i) => (
            <div key={row.label} style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: i === 1 ? 'var(--accent)' : 'var(--fg-muted)', lineHeight: '14px', marginBottom: 12 }}>{row.label}</div>
              <WYWGBar row={row} mobile={mobile} />
              {i === 0 && (
                <div aria-hidden="true" style={{ position: 'relative', height: 64, marginTop: 6 }}>
                  <svg viewBox="0 0 100 130" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 130, overflow: 'visible', pointerEvents: 'none' }}>
                    <path d="M22 0 C22 70, 75 50, 75 121" fill="none" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 5" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <span style={{ position: 'absolute', left: '22%', top: -3, width: 7, height: 7, marginLeft: -3.5, borderRadius: '50%', background: '#2DD4BF' }} />
                  <svg width="14" height="12" viewBox="0 0 14 12" style={{ position: 'absolute', left: '75%', top: 120, marginLeft: -7, pointerEvents: 'none' }}><path d="M1.5 1.5 L7 9.5 L12.5 1.5" fill="none" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
              {i === 0 && (
                <div style={{ position: 'absolute', left: 'calc(51% + 12px)', bottom: -4, whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>moved here</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', marginTop: 28, fontSize: 13, lineHeight: 1.5, color: 'var(--fg-muted)' }}>
          {[['busy', 'Busywork: tasks you could cut, batch or hand to AI'], ['req', 'Required to pass: the minimum work your grade floor needs (classes, assessed tasks, exam prep)'], ['skill', 'Skills: hours that build your Career Moat']].map(([k, t]) => (
            <span key={k} style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: WYWG_SEG[k].bg, flexShrink: 0, marginTop: 6 }}></span>{t}</span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={160}>
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '36px 0 0', maxWidth: '60ch' }}>Illustration. The Unit Navigator shows your own split, unit by unit.</p>
        <a onClick={() => window.PL_NAV && window.PL_NAV('tools')} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, marginTop: 12, color: 'var(--accent)', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Calculate your hours with The Busywork Calculator</a>
      </Reveal>
    </section>
  );
};

Object.assign(window, { WhereYourWeekGoes });
