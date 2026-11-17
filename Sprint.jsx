// SprintPage: The 28-Day Career Moat Sprint waitlist.

const SPRINT_WEEKS = [
  'Capital Burn Rate and Hurdle Rate, built live. You leave with your own numbers.',
  'The 4 pillars of Degree Arbitrage, run live on two volunteer degrees. You leave with your own 4-pillar audit.',
  'Scope a proof-of-work project with AI as the execution layer. You ship it in public.',
  'Career Moat synthesis and your next 90 days. You leave with your Career Moat one-pager.',
];
const SPRINT_FAQ = [
  { q: 'When does it start?', a: 'The founding cohort is planned for late 2026. Waitlist members get the exact date first.' },
  { q: 'How much does it cost?', a: 'The waitlist hears the price first.' },
  { q: 'Do I need to be good with AI?', a: 'No. Week 3 shows you how to use AI as the execution layer for your own project.' },
];

const SprintPage = () => {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const toForm = () => { const el = document.getElementById('sprint-form'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' }); };
  return (
    <>
      <section className="dot-bg" style={{ padding: '90px 32px 0' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Reveal>
            <Eyebrow>The 28-Day Career Moat Sprint · Live cohort</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(38px, 5.4vw, 64px)', letterSpacing: '-0.045em', lineHeight: 1.0, margin: '24px 0 24px', color: 'var(--fg)', textWrap: 'balance' }}>
              28 days. 4 pieces of proof. <span style={{ color: 'var(--accent)' }}>Built on the degree you already paid for.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 36px', maxWidth: '56ch' }}>
              A live cohort: one 90-minute session a week, peer review, and one project shipped in public by Week 3.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div id="sprint-form" style={{ maxWidth: 560 }}>
              {done ? (
                <div className="chosen-glow" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
                  <iconify-icon icon="ph:check-circle-bold" width="22" style={{ color: 'var(--accent)' }}></iconify-icon>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>You're on the waitlist.</span>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email) { window.plSubscribe(email); window.plTrack && window.plTrack('sprint_waitlist_submit', { location: window.plLoc ? window.plLoc(e.currentTarget) : '' }); setDone(true); } }}>
                  <label htmlFor="sprint-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--fg-muted)', marginBottom: 10 }}>Your email</label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <input id="sprint-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@gmail.com"
                      style={{ flex: '1 1 220px', minWidth: 0, minHeight: 48, boxSizing: 'border-box', background: 'var(--bg-input)', color: 'var(--fg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '14px 16px', fontSize: 15, fontFamily: 'var(--font-body)' }} />
                    <PLButton type="submit">Join The Sprint Waitlist</PLButton>
                  </div>
                </form>
              )}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginTop: 14 }}>Waitlist members hear first when seats open.</div>
            </div>
          </Reveal>
        </div>
        <div style={{ maxWidth: 1200, margin: '80px auto 0', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
          {SPRINT_WEEKS.map((w, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ height: '100%', boxSizing: 'border-box', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>Week {i + 1}</div>
                <p style={{ fontSize: 15, lineHeight: 1.58, color: 'var(--fg)', margin: 0 }}>{w}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <FAQBlock items={SPRINT_FAQ} />
      <CTAPanel><PLButton onClick={toForm}>Join The Sprint Waitlist</PLButton></CTAPanel>
    </>
  );
};

Object.assign(window, { SprintPage });
