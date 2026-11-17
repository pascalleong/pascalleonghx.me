// Testimonials — auto-scrolling, draggable gallery. (Placeholder copy — replace with real cohort quotes.)

const QUOTES = [];

const TCard = ({ q, n, t }) => (
  <div style={{
    width: 360, flexShrink: 0, boxSizing: 'border-box',
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)', padding: 26,
    display: 'flex', flexDirection: 'column', gap: 16,
  }}>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>{t}</div>
    <p style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--fg)', margin: 0, flex: 1 }}>"{q}"</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
      <div style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <iconify-icon icon="ph:student-bold" width="16" style={{ color: 'var(--accent)' }}></iconify-icon>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>{n}</span>
    </div>
  </div>
);

const Testimonials = () => (
  <section style={{ padding: '120px 0 0', display: 'none' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 36px' }}>
      <Reveal><Eyebrow>From the cohort</Eyebrow></Reveal>
      <Reveal delay={60}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.035em', margin: '20px 0 0', color: 'var(--fg)', maxWidth: 640, lineHeight: 1.05 }}>
            High-achievers who stopped studying hard.
          </h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <iconify-icon icon="ph:hand-grabbing-bold" width="14"></iconify-icon> Drag to explore
          </span>
        </div>
      </Reveal>
    </div>
    <Reveal delay={120}>
      <DraggableMarquee speed={0.4} gap={18}>
        {QUOTES.map((qu, i) => <TCard key={i} {...qu} />)}
      </DraggableMarquee>
    </Reveal>
  </section>
);

Object.assign(window, { Testimonials });
