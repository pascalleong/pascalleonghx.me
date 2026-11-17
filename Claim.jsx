
// Navigator route: free Unit Navigator, email opt-in.

const NavigatorClaim = () => {
  const [copied, setCopied] = React.useState(false);
  const [wide, setWide] = React.useState(typeof window !== 'undefined' && window.innerWidth >= 768);
  React.useEffect(() => {
    const f = () => setWide(window.innerWidth >= 768);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  const features = [
    ['Phase 1 · The Reality Check', 'So you can see your 2 Burn Rates (what 1 hour of your degree costs you, in ₹, RM or $) and your Hurdle Rate, the minimum return an hour must clear.'],
    ['Phase 2 · The Ikigai Engine', 'So you can set your Required Skill Stack: the 3 hard skills this year has to install, checked against where the market is still paying.'],
    ['Phase 3 · Execution', 'So you can get Ground Truth on any unit before you enroll, using 4 tactics: seniors, your future lecturer, live job ads and AI.'],
    ['The Best CO-STAR AI Prompt for unit selection', 'So you can get a take, audit or skip call on every unit, with the syllabus lines as evidence.'],
  ];
  const steps = [['01', 'Enter your email'], ['02', 'Open the link and duplicate it into your free Notion account'], ['03', 'Run Phase 1 tonight.']];
  return (
    <>
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '90px 32px 0' }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: wide ? 'minmax(0, 1.1fr) minmax(0, 0.9fr)' : 'minmax(0, 1fr)', gap: wide ? 56 : 40, alignItems: 'start' }}>
            <div>
              <Eyebrow>The Unit Navigator · Free</Eyebrow>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(34px, 4.4vw, 52px)', letterSpacing: '-0.045em', lineHeight: 1.04, margin: '22px 0 20px', color: 'var(--fg)', textWrap: 'balance' }}>
                See which units are worth your hours, and which ones are only costing you.
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 32px', maxWidth: '52ch' }}>
                The Unit Navigator is The 3-Phase Syllabus Audit in one free Notion page. Price every class hour, set the 3 hard skills this year must install, and get a take, audit or skip call on every unit, with evidence, before you enroll.
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--fg-muted)', marginBottom: 16 }}>WHAT'S INSIDE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                {features.map(([n, d]) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <iconify-icon icon="ph:check-bold" width="17" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 3 }}></iconify-icon>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.4 }}>{n}</div>
                      <div style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.5, marginTop: 2 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <NavigatorOptin id="navigator-form" micro="Free. You also get the Tuesday issue. Unsubscribe in one click." />
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-muted)', margin: '14px 0 0', maxWidth: '52ch' }}>Why your email: it's where I send your Notion link, plus one short issue every Tuesday with 1 move to make that week.</p>
            </div>
            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--bg-card)', padding: 'clamp(20px, 3vw, 32px)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>Capital Burn Rate</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(24px, 2.8vw, 32px)', letterSpacing: '-0.04em', color: 'var(--fg)', margin: '8px 0 28px', lineHeight: 1.1 }}>Where your 100% goes</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 10 }}>Now: trading energy for a transcript</div>
                  <div style={{ display: 'flex', gap: 4, height: 56, marginBottom: 28 }}><div style={{ width: '74%', background: '#334155', color: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 8px', minWidth: 0, fontSize: 'clamp(10px, 1.1vw, 13px)', fontWeight: 700, lineHeight: 1.25 }}>Busywork</div><div style={{ width: '26%', background: '#64748B', color: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 8px', minWidth: 0, fontSize: 'clamp(10px, 1.1vw, 13px)', fontWeight: 700, lineHeight: 1.25 }}>Skills</div></div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>After the audit: building a moat</div>
                  <div style={{ display: 'flex', gap: 4, height: 56, marginBottom: 28 }}><div style={{ width: '40%', background: '#334155', color: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 8px', minWidth: 0, fontSize: 'clamp(10px, 1.1vw, 13px)', fontWeight: 700, lineHeight: 1.25 }}>Required minimum</div><div style={{ width: '60%', background: 'var(--accent)', color: '#020817', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 8px', minWidth: 0, fontSize: 'clamp(10px, 1.1vw, 13px)', fontWeight: 700, lineHeight: 1.25, boxShadow: 'inset 0 0 0 1px var(--accent)' }}>Skills + moat</div></div>
                <div style={{ border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', padding: '18px 16px', textAlign: 'center', fontSize: 14, lineHeight: 1.4, color: 'var(--fg-muted)', background: 'var(--accent-soft)' }}><span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--accent)', marginRight: 8 }}>+20 hrs / week</span>redirected from busywork into a Career Moat</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginTop: 14, textAlign: 'center' }}>Inside Phase 1: your Capital Burn Rate. Illustration.</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(3, minmax(0, 1fr))' : 'minmax(0, 1fr)', gap: 20, marginTop: 56, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
            {steps.map(([n, t]) => (
              <div key={n} style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', letterSpacing: '0.1em' }}>{n}</span>
                <span style={{ fontSize: 15, color: 'var(--fg)', lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--fg-muted)', marginTop: 20 }}>A 20-minute read. Phase 4 is in progress, and your link gets every update.</div>
        </Reveal>
      </section>
      <HomeObjections />
      <WhereYourWeekGoes />
    </>
  );
};

Object.assign(window, { NavigatorClaim });
