// Career Moat Scorecard: 3 layers plus a multiplier, scored from 7 behavior questions.
const SC_ANSWERS = [{ k: 0, label: '0' }, { k: 1, label: '1' }, { k: 2, label: '2 to 3' }, { k: 3, label: '4 or more' }];
const SC_VALUE = [0, 40, 70, 100];
const SC_QUESTIONS = [
  { layer: 'Asymmetric Capability', q: 'In the last 90 days, how many things did you build or ship that someone outside your course could see? (a project, a tool, a piece of writing, a portfolio page)' },
  { layer: 'Asymmetric Capability', q: 'In the last 90 days, how many times did you use a skill on a real problem outside an assignment?' },
  { layer: 'Calibrated Judgment', q: 'In the last 90 days, how many times did you check real job ads or talk to someone in your target role before choosing a unit, project or internship?' },
  { layer: 'Calibrated Judgment', q: 'In the last 90 days, how many times did you change a plan because the evidence said so?' },
  { layer: 'Relational Equity', q: 'In the last 90 days, how many people working in your target field did you talk to 1-on-1?' },
  { layer: 'Relational Equity', q: 'In the last 90 days, how many people outside your course asked you for help or sent you an opportunity?' },
  { layer: 'Scalable Architecture (multiplier)', q: 'Of the things you built, how many keep working for you without your time? (a page that gets found, a template others use, a post that still brings messages)' },
];
const SC_LAYERS = [
  { name: 'Asymmetric Capability', qs: [0, 1], move: 'Ship one small project on a page you own in the next 14 days.' },
  { name: 'Calibrated Judgment', qs: [2, 3], move: "Before you pick next semester's units, check real job ads for your target role." },
  { name: 'Relational Equity', qs: [4, 5], move: 'Message 3 people in your target role this week and ask each one specific question.' },
];
const scShuffle = () => { const a = [0, 1, 2, 3]; for (let i = 3; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const scCompute = (ans) => {
  const layers = SC_LAYERS.map((l) => ({ ...l, score: (SC_VALUE[ans[l.qs[0]]] + SC_VALUE[ans[l.qs[1]]]) / 2 }));
  const level = ans[6];
  const mult = 1 + 0.1 * level;
  const score = Math.round(Math.min(100, (layers.reduce((s, l) => s + l.score, 0) / 3) * mult));
  let weak = layers[0];
  layers.forEach((l) => { if (l.score < weak.score) weak = l; });
  return { layers, mult, score, weak };
};

const ScBar = ({ label, value, note }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8, fontSize: 14.5 }}>
      <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{note}</span>
    </div>
    <div style={{ height: 10, borderRadius: 999, background: 'var(--border)', overflow: 'hidden' }}><div style={{ width: value + '%', height: '100%', background: 'var(--accent)', borderRadius: 999 }}></div></div>
  </div>
);

function CareerMoatScorecard() {
  const [roleId, setRoleId] = React.useState('');
  const [sems, setSems] = React.useState('');
  const [ans, setAns] = React.useState({});
  const [order] = React.useState(() => SC_QUESTIONS.map(scShuffle));
  const [shown, setShown] = React.useState(false);
  const role = tkRole(roleId);
  const ready = role && sems && SC_QUESTIONS.every((_, i) => ans[i] !== undefined);
  const res = ready && shown ? scCompute(ans) : null;
  const show = () => { const r = scCompute(ans); tkRecord({ tool: 'scorecard', field: role.title, semesters: Number(sems), score: r.score, weakest: r.weak.name }); setShown(true); window.scrollTo({ top: 0 }); };
  if (!res) return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '8px 0 0' }}>
      <Eyebrow>Career Moat Scorecard</Eyebrow>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(30px, 5vw, 44px)', letterSpacing: '-0.04em', lineHeight: 1.04, margin: '18px 0 28px', color: 'var(--fg)' }}>How defensible is your skill stack?</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
        <TkField label="Your field"><RoleSelect value={roleId} onChange={setRoleId} /></TkField>
        <TkField label="How many semesters do you have left?">
          <select value={sems} onChange={(e) => setSems(e.target.value)} style={tkField}>
            <option value="">Choose a number</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </TkField>
      </div>
      {SC_QUESTIONS.map((q, i) => (
        <fieldset key={i} style={{ border: 'none', padding: 0, margin: '0 0 30px' }}>
          {(i === 0 || SC_QUESTIONS[i - 1].layer !== q.layer) && <div style={{ ...tkMono, color: 'var(--accent)', marginBottom: 12 }}>{q.layer}</div>}
          <legend style={{ fontSize: 16.5, lineHeight: 1.5, fontWeight: 600, color: 'var(--fg)', padding: 0, marginBottom: 14 }}>{q.q}</legend>
          <div role="radiogroup" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {order[i].map((k) => {
              const on = ans[i] === k;
              return <button key={k} type="button" role="radio" aria-checked={on} onClick={() => setAns({ ...ans, [i]: k })} style={{ flex: '1 1 120px', minHeight: 48, cursor: 'pointer', background: on ? 'var(--accent)' : 'var(--bg-input)', color: on ? 'var(--accent-on)' : 'var(--fg)', border: '1px solid ' + (on ? 'var(--accent)' : 'var(--border-strong)'), borderRadius: 'var(--radius-md)', padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600 }}>{SC_ANSWERS[k].label}</button>;
            })}
          </div>
        </fieldset>
      ))}
      <TkNotice />
      <PLButton onClick={ready ? show : undefined} style={ready ? {} : { opacity: 0.45, cursor: 'not-allowed' }}>Show My Score</PLButton>
    </div>
  );
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ ...tkMono, color: 'var(--fg-muted)' }}>{role.title} · {sems} {Number(sems) === 1 ? 'semester' : 'semesters'} left</span>
        <PLButton variant="secondary" icon={null} onClick={() => { setShown(false); }} style={{ padding: '10px 16px', fontSize: 13 }}>Start Over</PLButton>
      </div>
      <TkPanel glow>
        <div style={{ ...tkMono, color: 'var(--accent)', marginBottom: 10 }}>Your Career Moat score</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(64px, 14vw, 104px)', letterSpacing: '-0.05em', lineHeight: 1, color: 'var(--accent)' }} className="text-glow">{res.score}</div>
      </TkPanel>
      <TkPanel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {res.layers.map((l) => <ScBar key={l.name} label={l.name} value={l.score} note={String(l.score)} />)}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 16, fontSize: 14.5 }}>
            <span style={{ color: 'var(--fg)', fontWeight: 600 }}>Scalable Architecture (multiplier)</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>× {res.mult.toFixed(1)}</span>
          </div>
        </div>
      </TkPanel>
      <TkPanel>
        <div style={{ ...tkMono, color: 'var(--accent)', marginBottom: 12 }}>Your weakest layer</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 10 }}>{res.weak.name}</div>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--fg)', margin: 0, maxWidth: '58ch' }}>{res.weak.move}</p>
      </TkPanel>
      <TkPanel>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg)', margin: '0 0 20px' }}>You have about {sems} semesters left to build this.</p>
        <ExposureBlock role={role} />
      </TkPanel>
      <ResultEmail tool="scorecard" summary={'Career Moat ' + res.score + ', weakest: ' + res.weak.name} />
    </div>
  );
}

Object.assign(window, { CareerMoatScorecard });
