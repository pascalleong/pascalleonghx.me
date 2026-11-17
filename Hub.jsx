// Hub — Linktree-style entry point .

const HubRow = ({ icon, label, sublabel, external, num, primary, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={external ? '#' : undefined} onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: 'grid', gridTemplateColumns: '30px 30px 1fr 18px', gap: 14, alignItems: 'center',
      background: primary ? 'var(--accent)' : (hover ? 'var(--bg-card)' : 'transparent'),
      border: `1px solid ${primary ? 'var(--accent)' : (hover ? 'var(--accent)' : 'var(--border)')}`,
      borderRadius: 'var(--radius-md)', padding: '17px 20px',
      color: primary ? 'var(--accent-on)' : 'var(--fg)', textDecoration: 'none', backgroundImage: 'none',
      transition: 'all var(--dur-base) var(--ease-snap)',
      boxShadow: hover && !primary ? '0 0 0 1px var(--accent)' : (primary ? 'var(--glow-mint)' : 'none'),
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: primary ? 'var(--accent-on)' : 'var(--fg-muted)', letterSpacing: '0.14em', opacity: 0.7 }}>{num}</span>
      <iconify-icon icon={`ph:${icon}-bold`} width="22" style={{ color: primary ? 'var(--accent-on)' : 'var(--accent)' }}></iconify-icon>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontWeight: 700, fontSize: 14.5, letterSpacing: '0.02em' }}>{label}</span>
        {sublabel && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: primary ? 'var(--accent-on)' : 'var(--fg-muted)', letterSpacing: '0.04em', opacity: 0.85 }}>{sublabel}</span>}
      </span>
      <iconify-icon icon={external ? 'ph:arrow-up-right-bold' : 'ph:arrow-right-bold'} width="17" style={{ color: primary ? 'var(--accent-on)' : 'var(--accent)', transform: hover ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-base)' }}></iconify-icon>
    </a>
  );
};

const Hub = ({ theme, onNav, onSpace }) => (
  <section style={{ maxWidth: 520, margin: '0 auto', padding: '72px 32px 0' }}>
    <Reveal>
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <span className="spin-slow icon-glow" style={{ display: 'inline-flex', margin: '0 auto 22px' }}>
          <iconify-icon icon="ph:compass-thin" width="72" style={{ color: 'var(--accent)' }}></iconify-icon>
        </span>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><LogoName height={20} theme={theme} /></div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          <span style={{ width: 18, height: 1, background: 'currentColor', opacity: 0.5 }}></span>
          Strategic Architect
          <span style={{ width: 18, height: 1, background: 'currentColor', opacity: 0.5 }}></span>
        </div>
        <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--fg-muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Building the top 1% of undergrads
        </div>
      </div>
    </Reveal>
    <Reveal delay={100}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <HubRow num="01" icon="seal-check" label="Apply For 1-on-1 With Pascal" sublabel="The Architect's Table · 8 weeks" primary onClick={() => onNav && onNav('table')} />
        <HubRow num="02" icon="compass" label="Get The Unit Navigator Free" sublabel="Free duplicable Notion system" onClick={() => onNav && onNav('navigator')} />
        <HubRow num="03" icon="envelope-simple" label="Project 12, the Tuesday newsletter" sublabel="3 updates, 2 mental models, 1 move" onClick={() => onNav && onNav('kit')} />
        <HubRow num="04" icon="users-three" label="Join The Sprint Waitlist" sublabel="The 28-Day Career Moat Sprint" onClick={() => onNav && onNav('sprint')} />
        <HubRow num="05" icon="book-open-text" label="Library" sublabel="Ground Truth, long-form" onClick={() => onSpace && onSpace('essays')} />
      </div>
    </Reveal>
  </section>
);

Object.assign(window, { PLHub: Hub });
