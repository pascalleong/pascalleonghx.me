// Tools: launcher page hosting the three live interactive tools inside the site chrome.

const TOOLS = [
  {
    id: 'clock',
    icon: 'clock-countdown',
    title: 'AI Displacement Clock',
    body: 'Pick a target role and see how exposed its tasks are to AI, using the ILO 2025 index.',
    tag: '20 roles',
    render: (onOpen) => <AIDisplacementClock onOpen={onOpen} />,
  },
  {
    id: 'scorecard',
    icon: 'gauge',
    title: 'Career Moat Scorecard',
    body: 'A 7-question diagnostic that scores your Career Moat and names your weakest layer.',
    tag: '7 questions',
    render: () => <CareerMoatScorecard />,
  },
  {
    id: 'degree',
    icon: 'calculator',
    title: 'Degree ROI Calculator',
    body: 'Run your tuition through the Capital Burn Rate framework against the AI displacement timeline.',
    tag: 'Ground Truth',
    soon: true,
    // DegreeCalculator (DegreeTool.jsx) is fully built and retained. Swap this back to
    // `render: () => <DegreeCalculator />` to relaunch. Kept behind a coming-soon gate for now.
    render: () => <DegreeComingSoon />,
  },
];

/* Coming-soon panel for the Degree ROI Calculator. The live tool lives in DegreeTool.jsx
   and stays loaded on window.DegreeCalculator, ready to relaunch. */
const DegreeComingSoon = () => (
  <div style={{ maxWidth: 520, margin: '0 auto', padding: '8px 4px 0' }}>
    <div style={{ textAlign: 'center', padding: '32px 0 28px', borderBottom: '1px solid var(--border)', marginBottom: 28 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ width: 24, height: 1, background: 'var(--accent)' }}></span>Unit Navigator × AI-2027<span style={{ width: 24, height: 1, background: 'var(--accent)' }}></span>
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32, color: 'var(--fg)', letterSpacing: '-0.04em', lineHeight: 1.04, margin: '12px 0 8px' }}>
        What's your degree<br />actually worth?
      </h1>
      <p style={{ fontSize: 14, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.55 }}>Tuition ROI × AI displacement timeline</p>
    </div>

    <div style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '44px 28px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(45,212,191,0.10), transparent 70%)', overflow: 'hidden' }}>
      <span className="spin-slow" style={{ display: 'inline-flex', marginBottom: 20 }}>
        <iconify-icon icon="ph:calculator-thin" width="54" style={{ color: 'var(--accent)' }}></iconify-icon>
      </span>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-pill)', padding: '6px 14px', marginBottom: 22, background: 'var(--accent-soft)' }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }}></span>In the lab · Coming soon
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, letterSpacing: '-0.025em', color: 'var(--fg)', margin: '0 0 14px', lineHeight: 1.12 }}>
        The full audit is being calibrated.
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 auto 26px', maxWidth: '42ch' }}>
        I'm tightening the Capital Burn Rate model against the latest AI-2027 data so the number it hands you is Ground Truth. Get the newsletter and you'll be first through the door when it ships.
      </p>
      <a onClick={() => window.PL_NAV && window.PL_NAV('kit')} style={{ cursor: 'pointer', minHeight: 44, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 9, background: 'var(--accent)', color: 'var(--accent-on)', borderRadius: 'var(--radius-md)', padding: '13px 22px', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
        Get The Tuesday Issue Free <iconify-icon icon="ph:arrow-right-bold" width="15"></iconify-icon>
      </a>
    </div>

    <div style={{ textAlign: 'center', marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.06em', lineHeight: 1.6 }}>
      Meanwhile, the AI Displacement Clock and Career Moat Scorecard are live now.
    </div>
  </div>
);

const ToolCard = ({ tool, onOpen }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={() => onOpen(tool.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textAlign: 'left', cursor: 'pointer', height: '100%', width: '100%', boxSizing: 'border-box',
        background: 'var(--bg-card)',
        border: `1px solid ${hover ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)', padding: '26px 24px',
        display: 'flex', flexDirection: 'column', gap: 14,
        boxShadow: hover ? '0 0 0 1px var(--accent), var(--glow-mint-soft)' : 'none',
        transform: hover ? 'translateY(-3px)' : 'none',
        transition: 'all var(--dur-base) var(--ease-snap)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ width: 46, height: 46, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)' }}>
          <iconify-icon icon={`ph:${tool.icon}-thin`} width="26" style={{ color: 'var(--accent)' }}></iconify-icon>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: tool.soon ? 'var(--fg-muted)' : 'var(--accent)', border: '1px solid var(--border)', borderRadius: 'var(--radius-pill)', padding: '5px 11px' }}>
          {tool.soon
            ? <><span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--fg-subtle)' }}></span>Soon</>
            : <><span className="pulse-ring" style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }}></span>Live</>}
        </span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.015em', color: 'var(--fg)', margin: '6px 0 0' }}>{tool.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.58, color: 'var(--fg-muted)', margin: 0, flex: 1 }}>{tool.body}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{tool.tag}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, color: 'var(--accent)' }}>
          {tool.soon ? 'Preview' : 'Open tool'}
          <iconify-icon icon="ph:arrow-right-bold" width="15" style={{ transform: hover ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-base) var(--ease-snap)' }}></iconify-icon>
        </span>
      </div>
    </button>
  );
};

const ToolsPage = ({ tool = null, onOpen, onBack, onNav }) => {
  React.useEffect(() => { window.scrollTo(0, 0); }, [tool]);

  if (tool) {
    const t = TOOLS.find((x) => x.id === tool);
    if (!t) return null;
    return (
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <button onClick={onBack} style={{
            display: 'inline-flex', alignItems: 'center', gap: 9, cursor: 'pointer',
            background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            color: 'var(--fg-muted)', padding: '10px 16px', fontFamily: 'var(--font-mono)',
            fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            <iconify-icon icon="ph:arrow-left-bold" width="14"></iconify-icon>
            All tools
          </button>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
            {t.title}
          </span>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
          {t.render(onOpen)}
        </div>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '70px 32px 0' }}>
      <Reveal>
        <Eyebrow>Free tool</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.045em', lineHeight: 1.0, margin: '22px 0 20px', color: 'var(--fg)' }}>The Busywork Calculator</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 48px', maxWidth: '56ch' }}>Move 2 sliders. See how many hours a week you could take back from busywork, then decide where they go.</p>
      </Reveal>
      <Reveal delay={120}><BurnRateCalc onGetNavigator={() => onNav && onNav('navigator')} /></Reveal>
      <Reveal delay={160}>
        <div style={{ marginTop: 80 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--accent)', marginBottom: 14 }}>IN THE LAB · COMING SOON</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.03em', lineHeight: 1.12, margin: '0 0 28px', color: 'var(--fg)' }}>What I'm building next</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 18 }}>
            {TOOLS.map((t) => (
              <div key={t.id} style={{ cursor: 'default', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ width: 46, height: 46, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)' }}>
                    <iconify-icon icon={`ph:${t.icon}-thin`} width="26" style={{ color: 'var(--accent)' }}></iconify-icon>
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 'var(--radius-pill)', padding: '5px 11px' }}>In the lab</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.015em', color: 'var(--fg)', margin: '6px 0 0' }}>{t.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.58, color: 'var(--fg-muted)', margin: 0 }}>{t.body}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '20px 0 0' }}>Get the Tuesday issue and you'll hear first when each one ships.</p>
        </div>
      </Reveal>
      <Reveal delay={200}>
        <div style={{ marginTop: 40, padding: '20px 24px', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 14.5, color: 'var(--fg-muted)' }}>
            The full framework (The 3-Phase Syllabus Audit, Ikigai Engine, OST toolkit) lives inside The Unit Navigator.
          </span>
          <PLButton onClick={() => onNav && onNav('navigator')} style={{ padding: '12px 20px', fontSize: 13.5 }}>Get The Unit Navigator Free</PLButton>
        </div>
      </Reveal>
    </section>
  );
};

Object.assign(window, { ToolsPage });
