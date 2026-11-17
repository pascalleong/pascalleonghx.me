// Library — the single long-form home (Light System). Replaces the lone Insight route.
// One nav destination, three spaces: Insights · AI Prompt House · Mental Models.
// Rationale: keeps the top nav lean (conversion stays pointed at the Navigator) while
// giving every body of work a branded, owned home instead of a generic Notion page.

const BYLINE = { name: 'Pascal Leong, with Vega', meta: 'Project 12 · weekly Tuesday', avatar: 'assets/pascal-square.jpg' };

/* ===================== ESSAY READER ===================== */
const EssayReader = ({ essay, all, onOpen, onBack, onNewsletter }) => {
  React.useEffect(() => { window.scrollTo(0, 0); }, [essay.id]);
  // series neighbours
  let prev = null, next = null;
  if (essay.series) {
    const sibs = all.filter((e) => e.series && e.series.name === essay.series.name).sort((a, b) => a.series.part - b.series.part);
    const idx = sibs.findIndex((e) => e.id === essay.id);
    prev = sibs[idx - 1] || null; next = sibs[idx + 1] || null;
  }
  return (
    <div style={{ background: 'var(--bg-canvas)' }}>
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 110px' }}>
        <Reveal>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, cursor: 'pointer', background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--fg-muted)', padding: '9px 15px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 36 }}>
            <iconify-icon icon="ph:arrow-left-bold" width="13"></iconify-icon> The Library
          </button>
        </Reveal>
        <Reveal delay={40}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <span>{essay.kicker}</span>
            {essay.series && <><span style={{ color: 'var(--gray-300)' }}>·</span><span>{essay.series.name} · Part {essay.series.part} of {essay.series.total}</span></>}
            <span style={{ color: 'var(--gray-300)' }}>·</span>
            <span style={{ color: 'var(--fg-muted)' }}>{essay.readMin} min read</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.038em', lineHeight: 1.06, margin: '0 0 20px', color: 'var(--fg)', textWrap: 'balance' }}>{essay.title}</h1>
        </Reveal>
        <Reveal delay={120}>
          {essay.dek && <p style={{ fontSize: 20.5, lineHeight: 1.56, color: 'var(--fg-muted)', margin: '0 0 32px', fontWeight: 400, textWrap: 'pretty' }}>{essay.dek}</p>}
          {essay.substackUrl && <p style={{ fontSize: 13.5, color: 'var(--fg-muted)', margin: '0 0 28px' }}><a href={essay.substackUrl} target="_blank" rel="noopener" style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>Also published on Substack</a></p>}
        </Reveal>
        <Reveal delay={160}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 44 }}>
            <img src={BYLINE.avatar} alt="Pascal Leong" style={{ width: 40, height: 40, borderRadius: 999, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 600, fontSize: 14.5, color: 'var(--fg)' }}>{essay.byline || BYLINE.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>{essay.date || BYLINE.meta}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <Markdown source={essay.body} />
        </Reveal>

        {/* series nav */}
        {(prev || next) && (
          <Reveal delay={60}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 56 }}>
              {[['Previous', prev], ['Next', next]].map(([label, e]) => e ? (
                <button key={label} onClick={() => onOpen(e.id)} style={{ textAlign: label === 'Next' ? 'right' : 'left', cursor: 'pointer', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{label} in the series</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.015em', color: 'var(--fg)', lineHeight: 1.25 }}>{e.title}</div>
                </button>
              ) : <span key={label}></span>)}
            </div>
          </Reveal>
        )}

        {/* end CTA */}
        <Reveal delay={80}>
          <div style={{ marginTop: 56, padding: '34px 30px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>Every Tuesday</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 23, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 8px' }}>Don't just get a degree. Architect a moat.</h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 18px', maxWidth: '46ch' }}>3 Education × AI updates, 2 mental models, 1 move. Free.</p>
            <button onClick={onNewsletter} style={{ background: 'var(--accent)', color: 'var(--accent-on)', border: 'none', borderRadius: 'var(--radius-md)', padding: '13px 22px', fontSize: 14.5, fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Get The Tuesday Issue Free <iconify-icon icon="ph:arrow-right-bold" width="16"></iconify-icon>
            </button>
          </div>
        </Reveal>
      </article>
    </div>
  );
};

/* ===================== ESSAY INDEX ===================== */
const EssayCard = ({ essay, onOpen, featured }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={() => onOpen(essay.id)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ textAlign: 'left', cursor: 'pointer', width: '100%', height: '100%', boxSizing: 'border-box', background: 'var(--bg-card)', border: `1px solid ${hover ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', padding: featured ? '34px 32px' : '26px 24px', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: hover ? 'var(--glow-mint-lg)' : 'var(--shadow-sm)', transform: hover ? 'translateY(-3px)' : 'none', transition: 'all var(--dur-base) var(--ease-snap)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-pill)', padding: '5px 11px' }}>{essay.kicker}</span>
        {essay.series && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Part {essay.series.part}/{essay.series.total}</span>}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: featured ? 'clamp(26px, 3vw, 34px)' : 20, letterSpacing: '-0.025em', color: 'var(--fg)', margin: 0, lineHeight: 1.12, textWrap: 'balance' }}>{essay.title}</h3>
      <p style={{ fontSize: featured ? 16.5 : 14.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0, flex: 1 }}>{essay.dek}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.06em' }}>{essay.readMin} min read</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 600, color: 'var(--accent)' }}>Read<iconify-icon icon="ph:arrow-right-bold" width="14" style={{ transform: hover ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-base) var(--ease-snap)' }}></iconify-icon></span>
      </div>
    </button>
  );
};

const SUBSTACK_ESSAYS = [
  { t: 'Is Your Degree Worth RM50,000 to RM500,000? The Purchase You Never Audited.', dt: '14 Aug 2026', href: PL_LINKS.essay1 },
];
const EssayIndex = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
    {SUBSTACK_ESSAYS.map((e, i) => (
      <Reveal key={e.href} delay={i * 70}>
        <a href={e.href} target="_blank" rel="noopener" style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '26px 24px', boxShadow: 'var(--shadow-sm)', textDecoration: 'none' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.025em', color: 'var(--fg)', margin: 0, lineHeight: 1.15, textWrap: 'balance' }}>{e.t}</h3>
          <span style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-muted)' }}>{e.dt}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 600, color: 'var(--accent)' }}>Read on Substack <iconify-icon icon="ph:arrow-up-right-bold" width="12"></iconify-icon></span>
          </span>
        </a>
      </Reveal>
    ))}
    <a href={PL_LINKS.substack} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 14.5, fontWeight: 600, color: 'var(--accent)' }}>Read every issue on Substack</a>
  </div>
);

Object.assign(window, { EssayReader, EssayIndex });
