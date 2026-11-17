// Home landing parts: Navigator opt-in form, objection rows, Work With Me card, closing panel.
const homeMono = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' };

const NavigatorOptin = ({ id, micro }) => {
  const [done, setDone] = React.useState(false);
  const [email, setEmail] = React.useState('');
  if (done) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, maxWidth: 520 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
        <iconify-icon icon="ph:check-circle-bold" width="22" style={{ color: 'var(--accent)', flexShrink: 0 }}></iconify-icon>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.45 }}>Check your inbox. Your Unit Navigator is on its way.</span>
      </div>
      <PLButton href={window.PL_LINKS.navigatorDuplicate}>Open The Unit Navigator</PLButton>
    </div>
  );
  return (
    <div style={{ maxWidth: 520 }}>
      <form id={id} action={window.PL_LINKS.subscribeAction} method="post" onSubmit={(e) => { e.preventDefault(); if (!email) return; window.plSubscribe(email); window.plTrack && window.plTrack('navigator_optin_submit', { location: window.plLoc ? window.plLoc(e.currentTarget) : '' }); setDone(true); }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your best email" aria-label="Your best email"
          style={{ flex: '1 1 220px', minWidth: 0, minHeight: 48, boxSizing: 'border-box', background: 'var(--bg-input)', color: 'var(--fg)', border: '1px solid var(--fg-subtle)', borderRadius: 'var(--radius-md)', padding: '14px 16px', fontSize: 15, fontFamily: 'var(--font-body)' }} />
        <PLButton type="submit">Get The Unit Navigator Free</PLButton>
      </form>
      <div style={{ marginTop: 12, fontSize: 13.5, lineHeight: 1.5, color: 'var(--fg-muted)' }}>{micro}</div>
    </div>
  );
};

const HOME_OBJECTIONS = [
  { icon: 'gift', q: 'Is it really free?', a: 'Yes. Your email gets The Unit Navigator and one issue a week.' },
  { icon: 'graduation-cap', q: 'Will it fit my degree?', a: 'It runs on your own units, fees and hours, for any degree.' },
  { icon: 'notion-logo', q: 'Do I need to know Notion?', a: 'No. You duplicate it into your own free Notion account in one click.' },
];

const HomeObjections = () => (
  <section style={{ padding: '56px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
      {HOME_OBJECTIONS.map((o, i) => (
        <Reveal key={o.q} delay={i * 70}>
          <div style={{ height: '100%', boxSizing: 'border-box', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <iconify-icon icon={'ph:' + o.icon + '-bold'} width="22" style={{ color: 'var(--accent)' }}></iconify-icon>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)' }}>{o.q}</div>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--fg-muted)' }}>{o.a}</div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const WorkWithMe = ({ onNav }) => (
  <section style={{ padding: '120px 32px 0', maxWidth: 760, margin: '0 auto' }}>
    <SectionHead title="Want it built with you, 1-on-1?" />
    <Reveal delay={100}>
      <div style={{ marginTop: 36, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '30px 26px', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', color: 'var(--fg)', margin: 0, lineHeight: 1.15 }}>The Architect's Table</h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0 }}>8 weeks, 1-on-1. 5 pieces of work built on your own degree, each one checked by me.</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--accent)', background: 'var(--accent-soft)', fontSize: 14.5, fontWeight: 600, color: 'var(--fg)' }}><span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--accent)', flexShrink: 0 }}></span><span>Founding round open: <span style={{ color: 'var(--accent)', fontWeight: 800 }}>80% off</span> · only 3 seats per round</span></div>
        <PLButton onClick={() => onNav('table')}>Apply For 1-on-1 With Pascal</PLButton>
      </div>
    </Reveal>
  </section>
);

const HomeClosing = () => (
  <section style={{ padding: '130px 32px 0', maxWidth: 900, margin: '0 auto' }}>
    <Reveal>
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 48px)', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, var(--mint-500-a10), transparent 60%)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.045em', lineHeight: 1.02, margin: '0 0 32px', color: 'var(--fg)' }}>Don't just get a degree.<br /><span style={{ color: 'var(--accent)' }}>Architect a moat.</span></h2>
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'left' }}><NavigatorOptin id="closing-form" micro="1 email. Free forever. You also get my Tuesday issue, and you can unsubscribe in one click." /></div>
      </div>
    </Reveal>
  </section>
);

Object.assign(window, { NavigatorOptin, HomeObjections, WorkWithMe, HomeClosing });
