// AI Displacement Clock: ILO 2025 exposure index plus dated AI forecasts for coding-driven roles.
const CLOCK_COUNTRIES = ['Malaysia', 'India', 'United States', 'Singapore', 'Other'];
const CLOCK_YEARS = [2026, 2027, 2028, 2029, 2030, 2031, 2032];
const CLOCK_ROWS = [
  ['Fast', 'AI 2027 scenario (April 2025): a superhuman coder around 2027.', 1.5],
  ['Middle', "Kokotajlo's median for an automated coder: mid-2028 (AI Futures Project, April 2026 update).", 2.5],
  ['Slow', "Lifland's median for an automated coder: mid-2030 (same update).", 4.5],
];

const ClockTasks = ({ title, tasks }) => (
  <div>
    <div style={{ ...tkMono, color: 'var(--accent)', marginBottom: 14, lineHeight: 1.5 }}>{title}</div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {tasks.map((t, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', flexShrink: 0, minWidth: 34 }}>{t.score.toFixed(2)}</span>
          <span style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--fg)' }}>{tkClean(t.text)}</span>
        </div>
      ))}
    </div>
  </div>
);

const ClockTimeline = ({ year }) => {
  const col = 100 / 7;
  return (
    <div style={{ position: 'relative' }}>
      <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: ((year - 2026) * col) + '%', width: col + '%', background: 'var(--accent-soft)', borderLeft: '1px solid var(--accent)', borderRight: '1px solid var(--accent)', pointerEvents: 'none' }}></div>
      {CLOCK_ROWS.map(([name, copy, pos]) => (
        <div key={name} style={{ padding: '14px 0 12px', borderTop: '1px solid var(--border)', position: 'relative' }}>
          <div style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--fg)', marginBottom: 12 }}><span style={{ ...tkMono, color: 'var(--accent)', marginRight: 10 }}>{name}</span>{copy}</div>
          <div style={{ position: 'relative', height: 14 }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 6, height: 2, background: 'var(--border-strong)' }}></div>
            <span style={{ position: 'absolute', top: 0, left: 'calc(' + (pos * col) + '% - 7px)', width: 14, height: 14, borderRadius: 999, background: 'var(--accent)', boxShadow: '0 0 12px rgba(45,212,191,0.6)' }}></span>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', borderTop: '1px solid var(--border)', paddingTop: 8 }}>
        {CLOCK_YEARS.map((y) => <span key={y} style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: y === year ? 'var(--accent)' : 'var(--fg-muted)', fontWeight: y === year ? 700 : 400 }}>{y}</span>)}
      </div>
    </div>
  );
};

function AIDisplacementClock({ onOpen }) {
  const [roleId, setRoleId] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [year, setYear] = React.useState('');
  const [shown, setShown] = React.useState(false);
  const role = tkRole(roleId);
  const ready = role && country && year;
  const show = () => { tkRecord({ tool: 'clock', role: role.title, country, year: Number(year), exposure: EXPOSURE_NAME[role.gradient] }); setShown(true); window.scrollTo({ top: 0 }); };
  const summary = role ? role.title + ': ' + EXPOSURE_NAME[role.gradient] : '';
  if (!shown || !role) return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '8px 0 0' }}>
      <Eyebrow>AI Displacement Clock</Eyebrow>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(30px, 5vw, 44px)', letterSpacing: '-0.04em', lineHeight: 1.04, margin: '18px 0 28px', color: 'var(--fg)' }}>How exposed is the role you are aiming for?</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
        <TkField label="Target role"><RoleSelect value={roleId} onChange={setRoleId} /></TkField>
        <TkField label="Country">
          <select value={country} onChange={(e) => setCountry(e.target.value)} style={tkField}>
            <option value="">Choose a country</option>
            {CLOCK_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </TkField>
        <TkField label="Graduation year">
          <select value={year} onChange={(e) => setYear(e.target.value)} style={tkField}>
            <option value="">Choose a year</option>
            {CLOCK_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </TkField>
      </div>
      <TkNotice />
      <PLButton onClick={ready ? show : undefined} style={ready ? {} : { opacity: 0.45, cursor: 'not-allowed' }}>Show My Result</PLButton>
    </div>
  );
  const y = Number(year);
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ ...tkMono, color: 'var(--fg-muted)' }}>{role.title} · {country} · Class of {y}</span>
        <PLButton variant="secondary" icon={null} onClick={() => setShown(false)} style={{ padding: '10px 16px', fontSize: 13 }}>Start Over</PLButton>
      </div>
      <TkPanel glow><ExposureBlock role={role} /></TkPanel>
      <TkPanel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 32 }}>
          <ClockTasks title="Most exposed tasks in this role" tasks={role.top} />
          <ClockTasks title="Least exposed tasks in this role" tasks={role.low} />
        </div>
        <div style={{ ...tkMono, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'none', lineHeight: 1.6, color: 'var(--fg-muted)', marginTop: 20 }}>Task scores from the ILO 2025 index. A higher score means more of the task is exposed.</div>
      </TkPanel>
      <TkPanel>
        {role.codingDriver ? (
          <>
            <ClockTimeline year={y} />
            <div style={{ fontSize: 12.5, color: 'var(--fg-muted)', marginTop: 12 }}>The shaded column is your graduation year.</div>
          </>
        ) : <div style={{ fontSize: 15.5, color: 'var(--fg)' }}>No dated forecast exists for this role.</div>}
      </TkPanel>
      <TkPanel>
        <div style={{ ...tkMono, color: 'var(--accent)', marginBottom: 12 }}>One move</div>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--fg)', margin: '0 0 18px', maxWidth: '58ch' }}>Before you choose units, check real job ads for this role, and ask whether employers will still hire people for it by the time you graduate.</p>
        <PLButton onClick={() => onOpen && onOpen('scorecard')}>Check My Career Moat</PLButton>
      </TkPanel>
      <div style={{ border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: 'clamp(20px, 3vw, 28px)' }}>
        <div style={{ ...tkMono, color: 'var(--fg-muted)', marginBottom: 12 }}>WHAT THIS TOOL CAN'T TELL YOU</div>
        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--fg-muted)', margin: 0 }}>AI 2027 is a scenario written in April 2025 by Daniel Kokotajlo and co-authors. It describes one possible path to superhuman AI by 2027. In April 2026 its authors moved their medians for the key coding milestone to mid-2028 and mid-2030. The ILO index measures exposure, not job loss, and the ILO expects most exposed jobs to change rather than disappear. Your country, your employer and your own skills move the result. Use this as a thinking aid, not a prediction.</p>
      </div>
      <ResultEmail tool="clock" summary={summary} />
    </div>
  );
}

Object.assign(window, { AIDisplacementClock });
