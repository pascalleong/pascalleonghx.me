// MechanismSection: The 4 Hidden Assets and the 4 pillars of Degree Arbitrage.

const MECH_ASSETS = [
  { asset: 'Credential', pillar: 'Brand Arbitrage', icon: 'seal-check', d: "Borrowing the trust of your university's name, or anything that carries it (a club, a title, an event), so people take you seriously before you have your own proof." },
  { asset: 'Knowledge', pillar: 'Academic Arbitrage', icon: 'books', d: 'Optimizing your unit and curriculum choices to maximize the hard skills and proof of work the market pays for, not the grades the rubric rewards.' },
  { asset: 'Status', pillar: 'Identity Arbitrage', icon: 'door-open', d: 'Using your low-credentialed identity to access high-status networks. Getting in the room with decision-makers drastically increases the likelihood of landing your Dream Outcome.' },
  { asset: 'Infrastructure', pillar: 'Resource Arbitrage', icon: 'buildings', d: 'Using what your university gives you access to (money, facilities, software, clubs, events, speakers, the alumni network) for your own goals, at little or no extra cost.' },
];

const MOAT_TERMS = [['Asymmetric Capability', 'can you do the rare thing'], ['Calibrated Judgment', 'do you point it at the right thing'], ['Relational Equity', 'do people trust you to do it']];

const MechanismSection = ({ hideEyebrow }) => (
  <section style={{ padding: '120px 32px 0', maxWidth: 1100, margin: '0 auto' }}>
    <SectionHead eyebrow={hideEyebrow ? '' : 'The System'} title="Your degree bundles 4 assets at one price.">
      <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--fg-muted)', margin: '22px 0 0', maxWidth: '62ch', textWrap: 'pretty' }}>
        <span style={{ color: 'var(--fg)', fontWeight: 600 }}>The 4 Hidden Assets:</span> the 4 separable assets bundled into every degree at a single price: Credential, Knowledge, Status, and Infrastructure. Each is extracted by exactly one pillar of Degree Arbitrage.
      </p>
    </SectionHead>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, marginTop: 44 }}>
      {MECH_ASSETS.map((a, i) => (
        <Reveal key={a.asset} delay={i * 70}>
          <div style={{ height: '100%', boxSizing: 'border-box', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', color: 'var(--fg)', margin: 0 }}>{a.asset}</h3>
              <iconify-icon icon={`ph:${a.icon}-thin`} width="28" style={{ color: 'var(--accent)' }}></iconify-icon>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
              Extracted by <span style={{ color: 'var(--accent)' }}>{a.pillar}</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0 }}>{a.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
    <Reveal delay={120}>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19, lineHeight: 1.5, letterSpacing: '-0.01em', color: 'var(--fg)', margin: '36px 0 0', maxWidth: '62ch', textWrap: 'pretty' }}>
        The result is a <span style={{ color: 'var(--accent)' }}>Career Moat</span>: your un-replicable advantage, built from Asymmetric Capability, Calibrated Judgment and Relational Equity.
      </p>
    </Reveal>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 12, marginTop: 24 }}>
      {MOAT_TERMS.map(([t, m]) => (
        <div key={t} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontWeight: 700, fontSize: 15.5, color: 'var(--fg)' }}>{t}</div>
          <div style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--fg-muted)' }}>{m}</div>
        </div>
      ))}
    </div>
  </section>
);

Object.assign(window, { MechanismSection });
