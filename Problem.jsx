// Shared conversion sections: ProblemSection, SectionHead, FAQBlock, CTAPanel.

const SectionHead = ({ eyebrow, title, maxWidth = 820, children }) => (
  <Reveal>
    {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.035em', lineHeight: 1.08, margin: eyebrow ? '20px 0 0' : '0', color: 'var(--fg)', maxWidth, textWrap: 'balance' }}>{title}</h2>
    {children}
  </Reveal>
);

const PStat = ({ n, label, text, src, wide, still }) => (
  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 24px', display: 'flex', flexDirection: wide ? 'row' : 'column', flexWrap: 'wrap', alignItems: wide ? 'center' : 'flex-start', gap: wide ? 28 : 8, height: '100%', boxSizing: 'border-box' }}>
    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(40px, 6vw, 56px)', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--accent)' }}>{still ? n : <CountUp value={n} />}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: wide ? '1 1 260px' : undefined, minWidth: 0 }}>
      {label && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{label}</div>}
      <div style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--fg)' }}>{text}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fg-muted)' }}>{src}</div>
    </div>
  </div>
);

const ProblemSection = ({ variant }) => {
  const short = variant === 'short';
  const p = { fontSize: 17, lineHeight: 1.7, color: 'var(--fg-muted)', margin: 0, textWrap: 'pretty' };
  const lead = { ...p, color: 'var(--fg)', fontWeight: 600 };
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 16 };
  const grid2 = { ...grid, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' };
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 1000, margin: '0 auto' }}>
      <style>{'@media (max-width: 767px){.pl-stat-grid{grid-template-columns:1fr !important}}'}</style>
      <SectionHead eyebrow="Ground Truth · 1-min read" title="Most students see the problem when no semesters are left to fix it." />
      <Reveal delay={100}>
        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {!short && <p style={{ ...p, maxWidth: '62ch' }}>You go to university because it is what comes next (the "default path"). Three or four years of clubs, friends, food, travel and industry talks between assignments. Then you graduate, and the bill arrives in three places at once.</p>}
          <p style={{ ...lead, maxWidth: '62ch' }}>Say your CV goes out to 100 companies. It comes back as a number:</p>
          <div className="pl-stat-grid" style={grid2}>
            <PStat n="35.2%" label="MALAYSIA" text="of graduates work below their skill level" src="DOSM, Q2 2026" />
            <PStat n="67%" label="INDIA" text="of unemployed people aged 20 to 29 are graduates" src="State of Working India 2026" />
            <PStat n="42%" label="UNITED STATES" text="of recent graduates are underemployed" src="New York Fed, Q2 2026" />
            <PStat n="12.4%" label="WORLDWIDE" text="of young people have no job" src="ILO, 2025" />
          </div>
          {!short && <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 28px)', lineHeight: 1.3, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '12px 0 0', maxWidth: '40ch', textWrap: 'balance' }}>Then you notice you never chose a direction. The degree chose it for you.</p>}
          <p style={{ ...lead, maxWidth: '62ch' }}>And the job you do land is often the entry-level task work AI absorbs first.</p>
          <PStat wide n="16%" text="relative drop in employment for US workers aged 22 to 25 in the most AI-exposed jobs" src="Stanford Digital Economy Lab, Nov 2025" />
          {!short && <>
            <p style={{ ...lead, maxWidth: '62ch' }}>The gap was visible long before graduation.</p>
            <div className="pl-stat-grid" style={grid2}>
              <PStat n="93%" text="of Indian graduates aged 18 to 25 say they have the skills to succeed" src="CFA Institute, 2026" />
              <PStat still n="Under 7%" text="of male graduates hold a permanent salaried job within a year" src="State of Working India 2026" />
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, lineHeight: 1.45, color: 'var(--fg)', margin: '20px 0 0', paddingLeft: 20, borderLeft: '3px solid var(--accent)', maxWidth: '48ch', textWrap: 'pretty' }}>So start while you still have semesters left, and while everything the university sold you, <span style={{ color: 'var(--accent)' }}>The 4 Hidden Assets</span>, is still within reach.</p>
          </>}
        </div>
      </Reveal>
    </section>
  );
};

const FAQBlock = ({ items }) => {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 820, margin: '0 auto' }}>
      <SectionHead eyebrow="Questions" title="The honest answers." />
      <Reveal delay={100}>
        <div style={{ marginTop: 28 }}>
          {items.map((it, i) => <FAQItem key={i} q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
        </div>
      </Reveal>
    </section>
  );
};

const CTAPanel = ({ children }) => (
  <section style={{ padding: '130px 32px 0', maxWidth: 900, margin: '0 auto' }}>
    <Reveal>
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 48px)', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, var(--mint-500-a10), transparent 60%)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.045em', lineHeight: 1.02, margin: '0 0 32px', color: 'var(--fg)' }}>
          Don't just get a degree.<br /><span style={{ color: 'var(--accent)' }}>Architect a moat.</span>
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>{children}</div>
      </div>
    </Reveal>
  </section>
);

Object.assign(window, { SectionHead, ProblemSection, FAQBlock, CTAPanel });
