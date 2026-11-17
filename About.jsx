
const useAboutScroll = (ref, onP) => {
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onP(1, true); return; }
    let raf = 0;
    const run = () => { raf = 0; const r = el.getBoundingClientRect(), vh = window.innerHeight; onP(Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.3))), false); };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, []);
};
const MISSION_TEXT = 'Help 1 million students extract Maximum Value from the 4 Hidden Assets in their college/university degree, and build them an un-automatable Career Moat.';
const VISION_ROWS = ['name what they are truly buying,', 'measure what it truly costs,', 'prove what they truly built,', 'and ultimately graduate with a Career Moat that makes them truly un-automatable.'];
const MissionBlock = () => {
  const ref = React.useRef(null), words = MISSION_TEXT.split(' ');
  useAboutScroll(ref, (p, still) => { const n = words.length; ref.current.querySelectorAll('[data-w]').forEach((s, i) => { s.style.opacity = still ? 1 : 0.2 + 0.8 * Math.max(0, Math.min(1, p * 1.15 * n - i)); }); });
  return (
    <div ref={ref} style={{ padding: '40px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>MISSION</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(64px, 12vw, 160px)', letterSpacing: '-0.045em', lineHeight: 1, color: 'var(--accent)' }}>1,000,000</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', margin: '10px 0 28px' }}>STUDENTS</div>
      <p style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.4, color: 'var(--fg)', margin: 0, maxWidth: '34ch', fontWeight: 600 }}>{words.map((w, i) => <span key={i} data-w style={{ opacity: 0.2 }}>{w}{i < words.length - 1 ? ' ' : ''}</span>)}</p>
    </div>
  );
};
const VisionBlock = () => {
  const ref = React.useRef(null);
  useAboutScroll(ref, (p, still) => { const act = Math.min(3, Math.floor(p * 1.15 * 4)); ref.current.querySelectorAll('[data-r]').forEach((r, i) => { const on = still || i <= act; r.style.opacity = on ? 1 : 0.25; r.style.transform = on ? 'translateY(0)' : 'translateY(16px)'; const n = r.firstChild; if (n) n.style.color = (!still && i === act) || still ? 'var(--accent)' : 'var(--fg-subtle)'; }); });
  return (
    <div ref={ref} style={{ padding: '40px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>VISION</div>
      <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--fg-muted)', margin: '0 0 28px', maxWidth: '60ch' }}>A generation that treats college/university as infrastructure to be intentionally architected, where every student can</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {VISION_ROWS.map((x, i) => (
          <div key={i} data-r style={{ display: 'flex', gap: 20, alignItems: 'baseline', opacity: 0.25, transform: 'translateY(16px)', transition: 'opacity 0.4s, transform 0.4s' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--fg-muted)', flexShrink: 0 }}>{'0' + (i + 1)}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1.25, color: 'var(--fg)' }}>{x}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
// Placing style (Pascal, 2026-11-08): Gold and Silver as on the award; every other placing as a numeral ordinal (1st, 3rd, 4th). Levels and placings exactly as in pascal-story 04-proof.md.
const RECORD = [
  ['COMPETITIONS', 'trophy', [
    ['Gold', 'International Digital Innovation and Invention Challenge', 'International · 2021'],
    ['Silver', 'Darulaman International Innovation, Competition and Exhibition', 'International · 2021'],
    ['Silver', 'Three Kingdoms Online Quiz, secondary school category', 'National · 2021'],
    ['4th', 'MSSM Basketball U18 (team)', 'National · 2021'],
    ['1st', 'MSSWPKL Basketball U18, Kuala Lumpur (team)', 'State · 2021'],
    ['Silver', 'Short Case, 33rd Wilayah First Aid and Care Competition, St John Ambulance', 'State · 2021'],
    ['Outstanding Award', 'Mathematical Olympiad', 'School years'],
  ]],
  ['ACADEMICS', 'graduation-cap', [
    ['1st', 'Business cohort, Monash University Foundation Year', '2023'],
    ['10 A\'s', "SPM, Malaysia's national exam (like India's Class 12 boards)", '2022'],
    ['1st', 'Pure Science cohort, SPM trial exams', '2021'],
    ['Scholarship', 'Monash High Achiever Scholarship', '2023 to 2026'],
    ['Graduate', 'Monash University Malaysia, Digital Marketing and Finance', '2026'],
  ]],
  ['UNIVERSITY AND WORK', 'briefcase', [
    ['First Head of PR', 'Monash Blockchain Club: led the team that secured 10+ leading Web3 and blockchain companies and organizations', '2025'],
    ['Organizing Committee', 'Monash Startup Bootcamp, 2 consecutive years', 'Monash'],
    ['3rd overall', 'Personal sales, agent ranking at a real estate agency, as a part-timer against full-time agents', 'Real estate'],
  ]],
  ['CO-CURRICULAR', 'users-three', [
    ['Tokoh Kokurikulum', 'Top co-curricular student of the whole cohort', '2021'],
    ['9+ out of 10', 'Co-curricular marks, the only student in the cohort at 9 or above', '2021'],
    ['President', 'Chess Club, 2 consecutive terms', '2020 and 2021'],
    ['Head of Training', 'St John Ambulance unit', '2021'],
  ]],
];
const RecordSection = () => {
  const [open, setOpen] = React.useState(() => new Set(['COMPETITIONS']));
  const toggle = (g) => setOpen((o) => { const n = new Set(o); n.has(g) ? n.delete(g) : n.add(g); return n; });
  const total = RECORD.reduce((t, [, , rows]) => t + rows.length, 0);
  return (
    <section id="record" style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 32px 0' }}>
      <Reveal>
        <Eyebrow>PROOF</Eyebrow>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.035em', lineHeight: 1.06, margin: '20px 0 12px', color: 'var(--fg)' }}>Some of My Past Records</h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 28px', maxWidth: '60ch' }}>{total} records in 4 groups. Tap a group to open it.</p>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {RECORD.map(([g, icon, rows], gi) => {
          const isOpen = open.has(g);
          return (
            <Reveal key={g} delay={gi * 50}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid ' + (isOpen ? 'var(--accent)' : 'var(--border)'), borderRadius: 'var(--radius-lg)' }}>
                <button type="button" aria-expanded={isOpen} onClick={() => toggle(g)} style={{ width: '100%', minHeight: 56, display: 'flex', alignItems: 'center', gap: 12, padding: '16px 22px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg)', textAlign: 'left' }}>
                  <iconify-icon icon={'ph:' + icon} width="22" style={{ color: 'var(--accent)', flexShrink: 0 }}></iconify-icon>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', flex: 1 }}>{g}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)' }}>{rows.length}</span>
                  <iconify-icon icon="ph:caret-down-bold" width="16" style={{ color: 'var(--accent)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-base) var(--ease-snap)' }}></iconify-icon>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 22px 10px' }}>
                    {rows.map(([a, b, c], ri) => (
                      <div key={ri} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px 14px', padding: '12px 0', borderTop: '1px solid var(--border)', fontSize: 15.5, lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--accent)', fontWeight: 700, minWidth: 96 }}>{a}</span>
                        <span style={{ color: 'var(--fg)', flex: '1 1 260px', minWidth: 0 }}>{b}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)', whiteSpace: 'nowrap' }}>{c}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
const AboutPage = ({ onNav }) => {
  const [wide, setWide] = React.useState(() => window.matchMedia('(min-width: 768px)').matches);
  React.useEffect(() => { const m = window.matchMedia('(min-width: 768px)'), f = () => setWide(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f); }, []);
  const lab = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 };
  const blk = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 28px 30px' };
  return (
    <>
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '90px 32px 0' }}>
        <Reveal>
          <Eyebrow>About</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(30px, 4.2vw, 56px)', letterSpacing: '-0.045em', lineHeight: 1.0, margin: '24px 0 40px', color: 'var(--fg)', textWrap: 'balance', whiteSpace: wide ? 'nowrap' : 'normal' }}>Pascal Leong | Strategic Architect</h1>
        </Reveal>
        <MissionBlock />
        <VisionBlock />
      </section>
      <About />
      <RecordSection />
      <CTAPanel><PLButton onClick={() => onNav('table')}>Apply For 1-on-1 With Pascal</PLButton></CTAPanel>
    </>
  );
};
Object.assign(window, { AboutPage });
