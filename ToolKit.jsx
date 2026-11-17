// Shared pieces for the two tools: role data helpers, exposure block, email result, notices.
const tkMono = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' };
const tkField = { width: '100%', boxSizing: 'border-box', minHeight: 48, background: 'var(--bg-input)', color: 'var(--fg)', border: '1px solid var(--fg-subtle)', borderRadius: 'var(--radius-md)', padding: '12px 14px', fontSize: 15, fontFamily: 'var(--font-body)', colorScheme: 'dark' };
const EXPOSURE_NAME = { 'Gradient 4': 'Highest exposure', 'Gradient 3': 'Significant exposure', 'Gradient 2': 'Moderate exposure', 'Gradient 1': 'Low exposure', 'Minimal Exposure': 'Minimal exposure', 'Not Exposed': 'Not exposed' };
const tkClean = (s) => s.replace(/\u201A\u00C4\u00F4/g, "'").replace(/‚Äô/g, "'");
const tkSource = (r) => 'Source: ILO Working Paper 140, Generative AI and Jobs (May 2025). Average task score for this role: ' + r.meanScore.toFixed(2) + ' on a 0 to 1 scale.';
const tkRole = (id) => (window.ILO_DATA || []).find((r) => r.isco === id);
const tkRecord = (rec) => { window.PL_RUNS = (window.PL_RUNS || []).concat([rec]); };

const TkField = ({ label, children }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <span style={{ ...tkMono, color: 'var(--fg-muted)' }}>{label}</span>
    {children}
  </label>
);

const RoleSelect = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} style={tkField}>
    <option value="">Choose a role</option>
    {(window.ILO_DATA || []).map((r) => <option key={r.isco} value={r.isco}>{r.title}</option>)}
  </select>
);

const TkNotice = () => (
  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--fg-muted)', margin: '0 0 14px', maxWidth: '60ch' }}>Your answers are saved anonymously to improve this tool. Nothing links them to you unless you choose to email yourself the result.</p>
);

const ExposureBlock = ({ role }) => (
  <div>
    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(30px, 5vw, 44px)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--accent)' }}>{EXPOSURE_NAME[role.gradient]}</div>
    <div style={{ ...tkMono, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'none', lineHeight: 1.6, color: 'var(--fg-muted)', marginTop: 12, maxWidth: '64ch' }}>{tkSource(role)}</div>
  </div>
);

const TkPanel = ({ children, glow, style }) => (
  <div className={glow ? 'chosen-glow' : ''} style={{ background: 'var(--bg-card)', border: '1px solid ' + (glow ? 'var(--accent)' : 'var(--border)'), borderRadius: 'var(--radius-lg)', padding: 'clamp(20px, 3vw, 28px)', ...style }}>{children}</div>
);

const ResultEmail = ({ tool, summary }) => {
  const [email, setEmail] = React.useState('');
  const [tue, setTue] = React.useState(false);
  const [done, setDone] = React.useState(false);
  return (
    <TkPanel>
      {done ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <iconify-icon icon="ph:check-circle-bold" width="22" style={{ color: 'var(--accent)', flexShrink: 0 }}></iconify-icon>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.45 }}>Check your inbox. Your result is on its way.</span>
        </div>
      ) : (
        <form action={window.PL_LINKS.subscribeAction} method="post" onSubmit={(e) => { e.preventDefault(); if (!email) return; window.plSubscribe(email); tkRecord({ tool, summary, emailed: true, tuesday: tue }); if (tue && window.plTrack) window.plTrack('newsletter_submit', { location: window.plLoc ? window.plLoc(e.currentTarget) : '' }); setDone(true); }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your best email" aria-label="Your best email" style={{ ...tkField, flex: '1 1 220px', width: 'auto', minWidth: 0 }} />
            <PLButton type="submit">Email Me My Result</PLButton>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, fontSize: 14.5, color: 'var(--fg-muted)', cursor: 'pointer', minHeight: 44 }}>
            <input type="checkbox" checked={tue} onChange={(e) => setTue(e.target.checked)} style={{ width: 20, height: 20, accentColor: 'var(--accent)', flexShrink: 0 }} />
            Also send me the Tuesday issue.
          </label>
        </form>
      )}
      <div style={{ marginTop: 12, fontSize: 14.5, color: 'var(--fg-muted)' }}>Want it built with you? <a onClick={() => window.PL_NAV && window.PL_NAV('table')} style={{ color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>Apply For The Architect's Table</a></div>
    </TkPanel>
  );
};

Object.assign(window, { tkMono, tkField, tkClean, tkRole, tkRecord, tkSource, EXPOSURE_NAME, TkField, RoleSelect, TkNotice, ExposureBlock, TkPanel, ResultEmail });
