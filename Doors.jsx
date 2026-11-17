
const doorMono = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' };
const doorLink = { background: 'none', border: 'none', padding: 0, minHeight: 44, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--accent)', textAlign: 'left' };

const ThreeDoors = ({ onNav }) => {
  const Card = ({ label, title, body, btn, to, link, linkTo, glow, i }) => (
    <Reveal delay={i * 80}>
      <div className={glow ? 'chosen-glow' : ''} style={{ height: '100%', boxSizing: 'border-box', background: 'var(--bg-card)', border: '1px solid ' + (glow ? 'var(--accent)' : 'var(--border)'), borderRadius: 'var(--radius-lg)', padding: '30px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ ...doorMono, color: 'var(--accent)' }}>{label}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', color: 'var(--fg)', margin: 0, lineHeight: 1.15 }}>{title}</h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0, flex: 1 }}>{body}</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, marginTop: 'auto' }}>
          <PLButton onClick={() => onNav(to)}>{btn}</PLButton>
          {link ? <button type="button" onClick={() => onNav(linkTo)} style={doorLink}>{link}</button> : <div style={{ height: 44 }}></div>}
        </div>
      </div>
    </Reveal>
  );
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
      <SectionHead eyebrow="Where to start" title="3 ways in. Start free, or start with me." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginTop: 44 }}>
        <Card i={0} label="Free" title="The Unit Navigator" body="Audit your degree in one Notion system. Free." btn="Get The Unit Navigator Free" to="navigator" link="Or try the free tools" linkTo="tools" />
        <Card i={1} label="Every Tuesday" title="The Project 12 newsletter" body="3 Education × AI Updates, 2 Mental Models, 1 Execution. Free." btn="Get The Tuesday Issue Free" to="kit" />
        <Card i={2} glow label="1-on-1" title="The Architect's Table" body="8 weeks, 1-on-1. 5 pieces of work built on your own degree." btn="Apply For 1-on-1 With Pascal" to="table" link="Prefer a live group? Join The Sprint Waitlist" linkTo="sprint" />
      </div>
    </section>
  );
};

const SubscribeForm = ({ onDone }) => {
  const [email, setEmail] = React.useState('');
  return (
    <form action={window.PL_LINKS.subscribeAction} method="post" onSubmit={(e) => { e.preventDefault(); if (email) { window.plSubscribe(email); window.plTrack && window.plTrack('newsletter_submit', { location: window.plLoc ? window.plLoc(e.currentTarget) : '' }); onDone && onDone(email); } }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', maxWidth: 520 }}>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your best email" aria-label="Your best email"
        style={{ flex: '1 1 220px', minWidth: 0, minHeight: 48, boxSizing: 'border-box', background: 'var(--bg-input)', color: 'var(--fg)', border: '1px solid var(--fg-subtle)', borderRadius: 'var(--radius-md)', padding: '14px 16px', fontSize: 15, fontFamily: 'var(--font-body)' }} />
      <PLButton type="submit">Get The Tuesday Issue Free</PLButton>
    </form>
  );
};

const SubscribeBand = ({ onNav }) => {
  const [done, setDone] = React.useState(false);
  return (
    <section style={{ padding: '48px 32px 0', maxWidth: 1000, margin: '0 auto' }}>
      <Reveal>
        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'clamp(28px, 5vw, 48px)', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 36, alignItems: 'center' }}>
          <div>
            <div style={{ ...doorMono, color: 'var(--accent)', marginBottom: 14 }}>Every Tuesday</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.03em', lineHeight: 1.12, margin: 0, color: 'var(--fg)', textWrap: 'balance' }}>Know what changed for graduates this week, and the 1 move to make.</h2>
          </div>
          {done ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
              <iconify-icon icon="ph:check-circle-bold" width="22" style={{ color: 'var(--accent)' }}></iconify-icon>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>You're in. Your first issue lands on Tuesday.</span>
            </div>
          ) : <SubscribeForm onDone={() => setDone(true)} />}
        </div>
      </Reveal>
    </section>
  );
};

Object.assign(window, { ThreeDoors, SubscribeForm, SubscribeBand });
