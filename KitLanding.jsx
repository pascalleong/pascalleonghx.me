
// KitLanding: Project 12 newsletter page (Light System).
const KIT_ISSUES = [
  { t: 'GPT-6 Astra and Entry-Level Jobs 2026: Foundation Debt Explained', dt: '16 Sep 2026', href: PL_LINKS.issue3 },
  { t: 'AI Skills for Students 2026: Why Basic AI Literacy Is No Longer a Competitive Advantage', dt: '9 Sep 2026', href: PL_LINKS.issue2 },
  { t: 'AI Job Market for Graduates 2026: Your Degree Is Leverage', dt: '26 Aug 2026', href: PL_LINKS.issue1 },
];

const KitLanding = ({ onNav }) => {
  const [done, setDone] = React.useState(false);
  const mono = { fontFamily: 'var(--font-mono)', letterSpacing: '0.16em', textTransform: 'uppercase' };
  return (
    <div style={{ background: 'var(--bg-canvas)' }}>
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px 0', textAlign: 'center' }}>
        {done ? (
          <Reveal>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(34px, 5.4vw, 52px)', letterSpacing: '-0.04em', lineHeight: 1.06, margin: '0 0 18px', color: 'var(--fg)', textWrap: 'balance' }}>You're in. Your first issue lands on Tuesday.</h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 30px' }}>While you wait, get your gift.</p>
            <PLButton onClick={() => onNav('navigator')}>Get The Unit Navigator Free</PLButton>
            <div style={{ marginTop: 28, fontSize: 14.5, lineHeight: 1.8, color: 'var(--fg-muted)' }}>
              <a href={PL_LINKS.substack} target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>Read every issue on Substack</a> · Daily frameworks on Instagram: <a href={PL_LINKS.instagram} target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>@pascalleonghx</a>
            </div>
            <div style={{ marginTop: 22, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--fg)' }}>Pascal</div>
          </Reveal>
        ) : (
          <>
            <Reveal delay={60}><div style={{ ...mono, fontSize: 12, color: 'var(--accent)', marginBottom: 22 }}>Project 12 · Every Tuesday</div></Reveal>
            <Reveal delay={120}><h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(34px, 5.4vw, 56px)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 22px', color: 'var(--fg)', textWrap: 'balance' }}>Know what changed for graduates this week, and the 1 move to make.</h1></Reveal>
            <Reveal delay={180}><p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 auto 16px', maxWidth: '52ch' }}>3 Education × AI Updates, 2 Mental Models, 1 Execution on the AI-era job market for graduates. Under 10 minutes. Free.</p></Reveal>
            <Reveal delay={210}><p style={{ fontSize: 15.5, fontWeight: 600, color: 'var(--fg)', margin: '0 0 30px' }}>Bonus: Every subscriber gets The Unit Navigator. Free.</p></Reveal>
            <Reveal delay={240}><div style={{ display: 'flex', justifyContent: 'center' }}><SubscribeForm onDone={() => setDone(true)} /></div></Reveal>
            <Reveal delay={300}><div style={{ marginTop: 18, fontStyle: 'italic', fontSize: 14, color: 'var(--fg-muted)' }}>P.S. It takes under 10 minutes a week, it's free, and every issue hands you 1 move to make that same day. Unsubscribe in one click.</div></Reveal>
          </>
        )}
      </section>
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '96px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
          {[
            { icon: 'chart-line-up', t: '3 Education × AI Updates', d: 'What changed this week where education meets AI, with the source.' },
            { icon: 'brain', t: '2 Mental Models', d: 'Thinking tools you can apply the same day, in plain words.' },
            { icon: 'wrench', t: '1 Execution', d: 'One action you can take today to build your Career Moat.' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 26px', height: '100%', boxSizing: 'border-box', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', borderRadius: 'var(--radius-md)', marginBottom: 18 }}><iconify-icon icon={'ph:' + c.icon + '-thin'} width="24" style={{ color: 'var(--accent)' }}></iconify-icon></span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', color: 'var(--fg)', margin: '0 0 10px' }}>{c.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0 }}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '96px 24px 120px' }}>
        <Reveal><div style={{ ...mono, fontSize: 12, color: 'var(--accent)', marginBottom: 24 }}>Latest issues</div></Reveal>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {KIT_ISSUES.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '22px 4px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontWeight: 600, fontSize: 16, color: 'var(--fg)', lineHeight: 1.4 }}>{it.t}</span>
                <span style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-muted)' }}>{it.dt}</span>
                  <a href={it.href} target="_blank" rel="noopener" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 44 }}>Read on Substack <iconify-icon icon="ph:arrow-up-right-bold" width="12"></iconify-icon></a>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal><a href={PL_LINKS.substack} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, marginTop: 20, fontSize: 14.5, fontWeight: 600, color: 'var(--accent)' }}>Read every issue on Substack</a></Reveal>
      </section>
    </div>
  );
};

Object.assign(window, { KitLanding, KIT_ISSUES });
