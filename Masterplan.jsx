// Masterplan + funnel layer.
// Implements a classic Value Ladder (free newsletter -> free Notion system -> flagship blueprint)
// and inserts the new flagship product: The 2027 Degree Arbitrage Masterplan.
// Also exports a persistent StickyCTA conversion bar.

/* ---- The Value Ladder: three rungs, one compounding ascent ---- */
const ValueLadder = ({ onCTA, onNewsletter }) => {
  const rungs = [
    {
      n: '01', tag: 'Free · every Tuesday', icon: 'envelope-simple',
      title: 'Project 12',
      body: 'The weekly Tuesday newsletter. One mental model, one Ground Truth read on the AI market, one move to make this week.',
      cta: 'Read The Newsletter', onClick: onNewsletter, lift: 0,
    },
    {
      n: '02', tag: 'Free for students', icon: 'compass',
      title: 'The Unit Navigator',
      body: 'The duplicable Notion system. Audit your degree, calculate your Capital Burn Rate, and reclaim ~20 hours a week.',
      cta: 'Get The Unit Navigator Free', onClick: onCTA, lift: 0,
    },
    {
      n: '03', tag: 'The flagship', icon: 'blueprint',
      title: 'The Degree Arbitrage Masterplan',
      body: 'The complete tactical blueprint. Everything below, integrated into one operating system for your 2027 competitive edge.',
      cta: 'See The Masterplan', onClick: () => { const el = document.getElementById('masterplan'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }, lift: 1, apex: true,
    },
  ];
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
      <Reveal><Eyebrow>The arbitrage stack</Eyebrow></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.035em', margin: '20px 0 14px', color: 'var(--fg)', maxWidth: 820, lineHeight: 1.05 }}>
          Three rungs. One compounding edge.
        </h2>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 48px', maxWidth: '58ch' }}>
          Start free at the bottom and climb. Each rung makes the next one sharper, until the whole system is working for you instead of the university.
        </p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, alignItems: 'end' }}>
        {rungs.map((r, i) => (
          <Reveal key={r.n} delay={i * 90}>
            <div style={{
              position: 'relative', height: '100%', boxSizing: 'border-box',
              background: r.apex ? 'linear-gradient(180deg, rgba(45,212,191,0.10), var(--bg-card))' : 'var(--bg-card)',
              border: `1px solid ${r.apex ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-lg)', padding: r.apex ? '34px 28px' : '28px 26px',
              boxShadow: r.apex ? '0 0 0 1px var(--accent), var(--glow-mint-soft)' : 'none',
              marginBottom: r.apex ? 0 : 14,
            }}>
              {r.apex && (
                <span style={{ position: 'absolute', top: -11, left: 28, fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent-on)', background: 'var(--accent)', borderRadius: 'var(--radius-pill)', padding: '4px 12px' }}>You are climbing to this</span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)' }}>
                  <iconify-icon icon={`ph:${r.icon}-thin`} width="24" style={{ color: 'var(--accent)' }}></iconify-icon>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 500, color: r.apex ? 'var(--accent)' : 'var(--fg-muted)', letterSpacing: '0.04em' }}>{r.n}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>{r.tag}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.015em', color: 'var(--fg)', margin: '0 0 10px', lineHeight: 1.15 }}>{r.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.58, color: 'var(--fg-muted)', margin: '0 0 18px' }}>{r.body}</p>
              <button onClick={r.onClick} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none', padding: 0,
                fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, color: 'var(--accent)',
              }}>
                {r.cta}<iconify-icon icon="ph:arrow-right-bold" width="14"></iconify-icon>
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

/* ---- The flagship: The 2027 Degree Arbitrage Masterplan ---- */
const MasterplanShowcase = ({ onCTA, onSprint }) => {
  const pillars = [
    { icon: 'strategy', t: 'Asymmetric Career Strategy', d: 'Place small bets the market hasn\'t priced in yet. Position for the roles that exist in 18 months, not the ones drying up today.' },
    { icon: 'brain', t: 'Performance Psychology', d: 'Run yourself like a system that lasts. Protect output, kill the grind-as-anaesthetic loop, and compound on purpose.' },
    { icon: 'share-network', t: 'High-Value Network Arbitrage', d: 'Turn your campus into trust capital. Build the relationships and public proof that no AI and no transcript can replicate.' },
  ];
  return (
    <section id="masterplan" style={{ padding: '120px 32px 0', maxWidth: 1200, margin: '0 auto', scrollMarginTop: 80 }}>
      <div style={{ position: 'relative', border: '1px solid var(--accent)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'radial-gradient(circle at 18% 0%, rgba(45,212,191,0.12), transparent 55%), var(--bg-card)', boxShadow: 'var(--glow-mint-soft)' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(94,234,212,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.045) 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 0 }}>
          {/* left: the pitch */}
          <div style={{ padding: 'clamp(36px, 4vw, 56px)' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-pill)', padding: '6px 13px', background: 'var(--accent-soft)', marginBottom: 22 }}>
                <span className="pulse-ring" style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }}></span>New · The flagship blueprint
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.04em', lineHeight: 1.02, margin: '0 0 20px', color: 'var(--fg)' }}>
                The 2027 Degree<br />Arbitrage <span style={{ color: 'var(--accent)' }} className="text-glow">Masterplan.</span>
              </h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg-muted)', margin: '0 0 26px', maxWidth: '50ch' }}>
                The tactical blueprint to hack the university ecosystem. It integrates three disciplines into a single operating system, so you stop sleepwalking through the most consequential economic shift of your lifetime and start architecting through it.
              </p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: 22 }}>
                <PLButton onClick={onSprint}>Join The Sprint Waitlist</PLButton>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 18, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', color: 'var(--fg)' }}>
                Don't just get a degree. <span style={{ color: 'var(--accent)' }}>Architect a moat.</span>
              </div>
            </Reveal>
          </div>
          {/* right: the three integrated pillars */}
          <div style={{ padding: 'clamp(28px, 3vw, 40px)', borderLeft: '1px solid var(--border)', background: 'rgba(2,8,23,0.35)', display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
            <Reveal delay={120}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 4 }}>Three disciplines, one edge</div>
            </Reveal>
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={160 + i * 80}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 18px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ width: 40, height: 40, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', borderRadius: 'var(--radius-md)' }}>
                    <iconify-icon icon={`ph:${p.icon}-thin`} width="22" style={{ color: 'var(--accent)' }}></iconify-icon>
                  </span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15.5, letterSpacing: '-0.01em', color: 'var(--fg)', margin: '2px 0 5px' }}>{p.t}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--fg-muted)', margin: 0 }}>{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---- Persistent conversion bar (funnel booster): single CTA, appears after the hero ---- */
const StickyCTA = ({ onCTA, route }) => {
  const [show, setShow] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false);
  const barRef = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 760);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => {
    if (dismissed) return;
    const root = document.documentElement;
    document.body.classList.add('pl-has-sticky');
    const ro = new ResizeObserver(() => { if (barRef.current) root.style.setProperty('--pl-sticky-h', barRef.current.offsetHeight + 'px'); });
    if (barRef.current) ro.observe(barRef.current);
    const seen = new Set();
    const io = new IntersectionObserver((ents) => { ents.forEach((en) => en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)); setBlocked(seen.size > 0); });
    const watch = () => {
      io.disconnect(); seen.clear();
      document.querySelectorAll('footer').forEach((el) => io.observe(el));
      if (route === 'table') document.querySelectorAll('main a[href*="tally.so"]').forEach((el) => io.observe(el));
    };
    watch();
    const t = setTimeout(watch, 600);
    return () => { clearTimeout(t); io.disconnect(); ro.disconnect(); document.body.classList.remove('pl-has-sticky'); };
  }, [dismissed, route]);
  if (dismissed) return null;
  const visible = show && !blocked;
  return (
    <div ref={barRef} data-sticky-cta="" aria-hidden={!visible} style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 60,
      display: 'flex', justifyContent: 'center', padding: '0 16px 18px',
      pointerEvents: 'none',
      transform: visible ? 'translateY(0)' : 'translateY(140%)',
      opacity: visible ? 1 : 0,
      transition: 'transform var(--dur-slow) var(--ease-out), opacity var(--dur-base) var(--ease-out)',
    }}>
      <div style={{
        pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', justifyContent: 'center',
        background: 'var(--slate-900-a92)', backdropFilter: 'blur(16px) saturate(160%)', WebkitBackdropFilter: 'blur(16px) saturate(160%)',
        border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-pill)', boxShadow: '0 12px 40px var(--black-a50)',
        padding: '10px 12px 10px 22px', maxWidth: 720,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--fg)', fontWeight: 500 }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--accent)', flexShrink: 0 }}></span>
          <span>The Unit Navigator <span style={{ color: 'var(--fg-muted)' }}>· Free</span></span>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <PLButton onClick={onCTA} style={{ padding: '11px 18px', fontSize: 13.5 }} icon="arrow-right">Get The Unit Navigator Free</PLButton>
          <button onClick={() => setDismissed(true)} aria-label="Dismiss" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 44, minHeight: 44, padding: 6 }}>
            <iconify-icon icon="ph:x-bold" width="15"></iconify-icon>
          </button>
        </span>
      </div>
    </div>
  );
};

Object.assign(window, { ValueLadder, MasterplanShowcase, StickyCTA });
