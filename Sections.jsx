/* ---- Ground Truth manifesto ---- */
const TruthSection = () => (
  <section style={{ padding: '120px 32px 0', maxWidth: 1000, margin: '0 auto' }}>
    <Reveal><Eyebrow>Ground Truth</Eyebrow></Reveal>
    <Reveal delay={80}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(30px, 4.4vw, 50px)', letterSpacing: '-0.04em', lineHeight: 1.08, margin: '24px 0 28px', color: 'var(--fg)', maxWidth: 900 }}>
        "Studying hard" is the most dangerous form of <span style={{ color: 'var(--accent)' }}>procrastination.</span>
      </h2>
    </Reveal>
    <Reveal delay={140}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 820 }}>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg-muted)', margin: 0 }}>
          It protects your ego today but guarantees you'll be begging for an entry-level interview tomorrow. A confused mind always says no, and the market is confused by generic graduates.
        </p>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg-muted)', margin: 0 }}>
          Want a preview of your next two years? Look at the graduates from two years ago.
        </p>
      </div>
    </Reveal>
  </section>
);

/* ---- Three pillars (the custom icons) ---- */
const Pillars = ({ theme }) => {
  const items = [
    { icon: 'compass', title: 'Navigate the game', body: 'Outsmart the university game. Map where the market is actually going against Macro-Trends, not where the syllabus points you.' },
    { icon: 'hourglass', title: 'Reclaim your time', body: 'Calculate your Capital Burn Rate. The 3-Phase Syllabus Audit reclaims roughly 20 hours a week from low-liquidity busywork.' },
    { icon: 'lightbulb', title: 'Compound your edge', body: 'Reinvest that time into high-liquidity skills and mental models. Use AI to break the university\'s Information Asymmetry.' },
  ];
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
      <Reveal><Eyebrow>The operating system</Eyebrow></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.035em', margin: '20px 0 48px', color: 'var(--fg)', maxWidth: 760, lineHeight: 1.05 }}>
          Three moves. One unfair advantage.
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {items.map((it, i) => (
          <Reveal key={it.icon} delay={i * 90}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '30px 28px', height: '100%', boxSizing: 'border-box' }}>
              <div style={{ height: 56, display: 'flex', alignItems: 'center', marginBottom: 22 }}>
                <PillarIcon name={it.icon} size={46} theme={theme} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.16em', marginBottom: 10 }}>
                0{i + 1}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 12px' }}>
                {it.title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0 }}>{it.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

/* ---- The Unit Navigator product showcase ---- */
const ProductShowcase = ({ onCTA }) => {
  const features = [
    'Interactive, fully duplicable Notion template',
    'The 3-Phase Syllabus Audit',
    'Capital Burn Rate worksheet',
    'Ikigai map: find your highest-leverage direction',
    'High-liquidity skills mapped against Macro-Trends',
    'The exact AI prompt to break Information Asymmetry',
  ];
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <Reveal>
          <Eyebrow>The Unit Navigator</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '20px 0 22px', color: 'var(--fg)' }}>
            Your degree is the default.<br />This is the edge.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--fg-muted)', margin: '0 0 28px', maxWidth: '46ch' }}>
            A single Notion system that audits where your hours actually go, then redirects them toward the skills the market will pay for. Built to reclaim ~20 hours a week.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {features.map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: 'var(--fg)', lineHeight: 1.45 }}>
                <iconify-icon icon="ph:check-bold" width="18" style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }}></iconify-icon>
                {f}
              </li>
            ))}
          </ul>
          <PLButton onClick={onCTA}>Get The Unit Navigator Free</PLButton>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ZoomImage
              src="assets/framework-syllabus-audit.png"
              caption="The 3-Phase Syllabus Audit. Click to zoom"
              style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', aspectRatio: '16 / 10' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <ZoomImage
                src="assets/framework-capital-burn.png"
                caption="Capital Burn Rate"
                style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', aspectRatio: '4 / 3' }}
              />
              <ZoomImage
                src="assets/magazine-final.png"
                caption="The manifesto"
                style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', aspectRatio: '4 / 3' }}
              />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.1em', textAlign: 'center' }}>
              <iconify-icon icon="ph:magnifying-glass-plus-bold" width="12"></iconify-icon> &nbsp;Tap any graphic to open full-screen
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ---- Closing CTA ---- */
const ClosingCTA = ({ onCTA }) => (
  <section style={{ padding: '130px 32px 0', maxWidth: 900, margin: '0 auto' }}>
    <Reveal>
      <div style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '64px 48px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(45,212,191,0.10), transparent 60%)', overflow: 'hidden' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(34px, 5vw, 56px)', letterSpacing: '-0.045em', lineHeight: 1.0, margin: '0 0 20px', color: 'var(--fg)' }}>
          Don't just get a degree.<br /><span style={{ color: 'var(--accent)' }} className="text-glow">Architect a moat.</span>
        </h2>
        <p style={{ fontSize: 16.5, color: 'var(--fg-muted)', margin: '0 auto 32px', maxWidth: 460, lineHeight: 1.6 }}>
          Duplicate the Notion system, run the audit, and reclaim your time this week.
        </p>
        <PLButton onClick={onCTA}>Get The Unit Navigator Free</PLButton>
      </div>
    </Reveal>
  </section>
);

Object.assign(window, { TruthSection, Pillars, ProductShowcase, ClosingCTA });
