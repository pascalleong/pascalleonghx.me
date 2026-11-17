// Extras — About, the interactive Career-Moat tools (live calculator + tool spaces), and FAQ.

/* ---- About Pascal ---- */
const PROOF = [['1st', 'Business cohort, Monash University Foundation Year'], ['Gold', 'International Digital Innovation and Invention Challenge 2021'], ['Silver', 'Darulaman International Innovation, Competition and Exhibition 2021'], ['10+', 'Web3 and blockchain partners secured as first Head of PR'], ['10 A\'s', "SPM, Malaysia's national exam (like India's Class 12 boards)"], ['Scholar', 'Monash High Achiever Scholarship recipient']];
const ProofGrid = ({ onMore }) => {
  const [narrow, setNarrow] = React.useState(() => window.matchMedia('(max-width: 639px)').matches);
  React.useEffect(() => { const m = window.matchMedia('(max-width: 639px)'), f = () => setNarrow(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f); }, []);
  return (
    <>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18, whiteSpace: 'nowrap' }}>INTERNATIONAL AWARD-WINNER · 1ST IN ACADEMICS · SCHOLARSHIP RECIPIENT</div>
      <div style={{ display: 'grid', gridTemplateColumns: narrow ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: '28px 32px' }}>
        {PROOF.map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 30, letterSpacing: '-0.03em', color: 'var(--fg)' }}>{n === 'RM5,000' ? <CountUp value={n} /> : n}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
      {onMore && <a href="#/about" onClick={(e) => { e.preventDefault(); onMore(); setTimeout(() => { const el = document.getElementById('record'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); }, 400); }} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, marginTop: 14, color: 'var(--accent)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>See my past records</a>}
    </>
  );
};
const About = ({ onMore, hideEyebrow }) => (
  <section style={{ padding: '120px 32px 0', maxWidth: 1100, margin: '0 auto' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 56, alignItems: 'center' }}>
      <Reveal>
        <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', overflow: 'hidden', aspectRatio: '4 / 5', background: 'var(--bg-card)' }}>
          <img src="assets/pascal-portrait.jpg" alt="Pascal Leong" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '60% 30%' }} />
          <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, var(--slate-950-a55))' }}></div>
        </div>
      </Reveal>
      <Reveal delay={120}>
        {hideEyebrow ? null : <Eyebrow>Who's behind this</Eyebrow>}
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.035em', lineHeight: 1.06, margin: hideEyebrow ? '0 0 22px' : '20px 0 22px', color: 'var(--fg)' }}>
          I ranked 1st in my cohort, and it bought me almost nothing.
        </h2>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg-muted)', margin: '0 0 18px', maxWidth: '52ch' }}>
          In my foundation year I ran on one formula: study hard, work hard, score well. 12+ hours a day, Sundays included. I finished 1st in my business cohort. People around me thought I was killing it. But deep down, I was the only one who knew something was missing.
        </p>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg-muted)', margin: '0 0 18px', maxWidth: '52ch' }}>
          So I priced my own degree. Without scholarships, 3 years at Monash cost RM120k+, and every tutorial hour cost RM208. I was paying for The 4 Hidden Assets (Credential, Knowledge, Status and Infrastructure) and cashing in only one: the grade.
        </p>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg-muted)', margin: '0 0 18px', maxWidth: '52ch' }}>
          So I started extracting maximum value from all 4. Grades stayed, as one asset out of 4 instead of the whole game. My goal was to get close to the people building Web3 and blockchain, one of the fields I'm most drawn to. The fastest route to them was a role that dealt with outside parties, and my club didn't have one. So I proposed it, and became the first Head of PR at the Monash Blockchain Club.
        </p>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg-muted)', margin: '0 0 18px', maxWidth: '52ch' }}>
          The title gave me a legitimate reason to reach C-suite executives and founders. The PR team I led secured 10+ leading Web3 and blockchain companies and organizations, including World, IOTA, Pudgy Penguins, KDX and the Blockchain for Good Alliance (BGA). For our members, it opened something bigger than a club event: real industry exposure and doors to internships in a space that runs nothing like a corporate ladder: open, creative and growing fast, built on technology that moves trust from middlemen to code. At one Web3 event at Monash, I met a builder in the Ethereum ecosystem, only a few years older than us, earning RM8k to RM10k a month. For me, it meant direct contact with founders and C-suite executives, and a shorter path to internships and graduate roles of my own. Every founder I met is one more door I can open for the students I work with.
        </p>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg-muted)', margin: '0 0 18px', maxWidth: '52ch' }}>
          Honestly, I'm a pretty normal person, around average in IQ and EQ. What changed my results was a set of thinking tools most students are never taught: start from first principles, follow each decision 2 to 5 moves down the line, and keep the big picture and the small detail in view at once. Those tools sit behind every result in my record. They can be learned. It takes agency and a new way of seeing your degree, as one whole system. Once you see the whole system, your choices change, and once your choices change, so do your results.
        </p>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg)', fontWeight: 600, margin: '0 0 30px', maxWidth: '52ch' }}>
          I'm curious about almost everything, so I've run more trials, made more errors and iterated more than most. What proved to work became one system of first principles, mental models, frameworks, templates and AI tools. You can use it totally free, and if you join a 1-on-1 or the live cohort, you get the chance to have me tailor it to you. I don't hand out advice randomly: I start from the ultimate goal you want and reverse-engineer the steps, using the first principles, mental models and systems thinking behind Degree Arbitrage and the Career Moat.
        </p>
        {onMore && <a href="#/about" onClick={(e) => { e.preventDefault(); onMore(); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, marginBottom: 22, color: 'var(--accent)', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>More about me <iconify-icon icon="ph:arrow-right-bold" width="14"></iconify-icon></a>}
        <ProofGrid onMore={onMore} />
      </Reveal>
    </div>
  </section>
);

/* ---- Live Capital Burn Rate calculator ---- */
const BurnRateCalc = ({ onGetNavigator }) => {
  const [hours, setHours] = React.useState(45);
  const [busywork, setBusywork] = React.useState(0);
  const reclaimWk = Math.round(hours * (busywork / 100));
  const Slider = ({ label, value, setValue, min, max, unit }) => (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--fg)' }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => { if (window.__plCalcPV !== window.PL_PV) { window.__plCalcPV = window.PL_PV; window.plTrack('calculator_use', { location: window.plLoc ? window.plLoc(e.currentTarget) : '' }); } setValue(Number(e.target.value)); }}
        style={{ width: '100%', minHeight: 44, accentColor: 'var(--accent)', cursor: 'pointer' }} />
    </div>
  );
  return (
    <div data-calc="" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'clamp(28px, 3vw, 40px)', display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 40, alignItems: 'center' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>The Busywork Calculator</div>
        <Slider label="Hours on uni work / week" value={hours} setValue={setHours} min={10} max={80} unit="h" />
        <Slider label={<>How much of your uni work feels like busywork?<br />(your estimate, 0 to 100%)</>} value={busywork} setValue={setBusywork} min={0} max={100} unit="%" />
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '4px 0 0', maxWidth: '40ch' }}>
          Drag the sliders to see how much of your week goes to low-liquidity busywork.
        </p>
      </div>
      <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', border: '1px solid var(--accent)', padding: '34px 28px', textAlign: 'center', background: 'var(--accent-soft)', boxShadow: 'var(--glow-mint-soft)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--accent)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>You could reclaim</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(48px, 6vw, 72px)', letterSpacing: '-0.045em', lineHeight: 1, color: 'var(--accent)', margin: '12px 0 2px' }} className="text-glow">{reclaimWk}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>hours / week</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--fg-muted)', letterSpacing: '0.04em', marginTop: 18, lineHeight: 1.5 }}>This uses your own estimate, not a study.</div>
        {onGetNavigator && <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-muted)' }}>{reclaimWk > 0 ? `You could reclaim ${reclaimWk} hours a week. Know where they should go instead.` : 'Know where those hours should go instead.'}</div>
          <PLButton onClick={onGetNavigator} style={{ padding: '12px 20px', fontSize: 13.5 }}>Get The Unit Navigator</PLButton>
        </div>}
      </div>
    </div>
  );
};

/* ---- Tools / interactive apps: one live, spaces for the rest ---- */
const MoatTools = ({ onCTA, onTool, onAllTools }) => {
  const tools = [
    { id: 'clock', icon: 'clock-countdown', title: 'AI Displacement Clock', body: 'Map any target role against the AI-2027 timeline and watch automation pressure arrive.' },
    { id: 'scorecard', icon: 'gauge', title: 'Career Moat Scorecard', body: 'A 7-question, industry-calibrated diagnostic that grades how defensible your skill stack is.' },
    { id: 'degree', icon: 'calculator', title: 'Degree ROI Calculator', body: 'Run your tuition through the Capital Burn Rate framework against the displacement timeline.', soon: true },
  ];
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
      <Reveal><Eyebrow>Interactive tools</Eyebrow></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.035em', margin: '20px 0 14px', color: 'var(--fg)', maxWidth: 760, lineHeight: 1.05 }}>
          Stop guessing. Run the numbers on your moat.
        </h2>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 44px', maxWidth: '56ch' }}>
          Small calculators and diagnostics that turn the frameworks into something you can actually feel. Start with the live one below.
        </p>
      </Reveal>
      <Reveal delay={120}><BurnRateCalc /></Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
        {tools.map((t, i) => {
          const Card = () => {
            const [hover, setHover] = React.useState(false);
            return (
              <button onClick={() => onTool && onTool(t.id)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                style={{ textAlign: 'left', cursor: 'pointer', width: '100%', height: '100%', boxSizing: 'border-box',
                  background: 'var(--bg-card)', border: `1px solid ${hover ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-lg)', padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 12,
                  boxShadow: hover ? '0 0 0 1px var(--accent), var(--glow-mint-soft)' : 'none',
                  transform: hover ? 'translateY(-3px)' : 'none', transition: 'all var(--dur-base) var(--ease-snap)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)' }}>
                    <iconify-icon icon={`ph:${t.icon}-thin`} width="22" style={{ color: 'var(--accent)' }}></iconify-icon>
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.soon ? 'var(--fg-muted)' : 'var(--accent)', border: '1px solid var(--border)', borderRadius: 'var(--radius-pill)', padding: '4px 9px' }}>
                    {t.soon
                      ? <><span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--fg-subtle)' }}></span>Soon</>
                      : <><span className="pulse-ring" style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }}></span>Live</>}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em', color: 'var(--fg)', margin: '4px 0 0' }}>{t.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--fg-muted)', margin: 0, flex: 1 }}>{t.body}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginTop: 4 }}>
                  {t.soon ? 'Preview' : 'Open tool'}
                  <iconify-icon icon="ph:arrow-right-bold" width="14" style={{ transform: hover ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-base) var(--ease-snap)' }}></iconify-icon>
                </span>
              </button>
            );
          };
          return <Reveal key={t.id} delay={i * 70}><Card /></Reveal>;
        })}
      </div>
      <Reveal delay={160}>
        <div style={{ marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.06em', textAlign: 'center' }}>
          Two live now, one in the lab. <a onClick={onAllTools} style={{ color: 'var(--accent)', cursor: 'pointer' }}>Browse the tools →</a>
        </div>
      </Reveal>
    </section>
  );
};

/* ---- FAQ ---- */
const FaqLink = ({ to, children }) => {
  const ext = /^https?:/.test(to);
  const st = { color: 'var(--accent)', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', padding: '12px 0', margin: '-12px 0', minHeight: 44, boxSizing: 'border-box', verticalAlign: 'baseline' };
  const hv = (e, v) => { e.currentTarget.style.textDecoration = v; };
  const label = typeof children === 'string' ? children : '';
  return <a href={ext ? to : '#/' + to} {...(ext ? { target: '_blank', rel: 'noopener' } : {})} className="faq-link" style={st} onMouseEnter={(e) => hv(e, 'underline')} onMouseLeave={(e) => hv(e, 'none')}
    onClick={(e) => { window.plTrack('cta_click', { location: 'home-faq', label }); if (!ext) { e.preventDefault(); window.PL_NAV && window.PL_NAV(to); } }}>{children}</a>;
};
const FAQItem = ({ q, a, open, onToggle }) => (
  <div style={{ borderBottom: '1px solid var(--border)' }}>
    <button onClick={(e) => { if (!open) window.plTrack('faq_open', { q: typeof q === 'string' ? q : '', location: window.plLoc ? window.plLoc(e.currentTarget) : '' }); onToggle(); }} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, textAlign: 'left' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em', color: 'var(--fg)' }}>{q}</span>
      <iconify-icon icon="ph:plus-bold" width="18" style={{ color: 'var(--accent)', flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform var(--dur-base) var(--ease-snap)' }}></iconify-icon>
    </button>
    <div style={{ maxHeight: open ? 4000 : 0, overflow: 'hidden', transition: 'max-height var(--dur-slow) var(--ease-out)' }}>
      <div style={{ margin: '0 0 24px', maxWidth: '64ch' }}>{(Array.isArray(a) ? a : [a]).map((x, i, arr) => <p key={i} style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--fg-muted)', margin: i === arr.length - 1 ? 0 : '0 0 12px' }}>{x}</p>)}</div>
    </div>
  </div>
);

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: "Is everything here really free?", a: [
      "Yes, and it stays free. I built The Unit Navigator over 3 years at Monash because nobody handed me one.",
      <>If a 1-on-1 or a live cohort isn't possible for you right now, you are not locked out. The same system I run is free in 4 places: The Unit Navigator, my Tuesday newsletter on Substack, my socials (e.g., YouTube, Instagram), and the <FaqLink to="library">Library</FaqLink> (top menu, under Free), with my Dictionary, prompts and every past issue.</>,
      <>Money should never be the reason you graduate without a plan. You need time, agency and determination.</>,
      <>When you want more than the free system, there are 2 ways to work with me. <FaqLink to="sprint">The 28-Day Career Moat Sprint</FaqLink> is the live cohort: 4 weeks building your Career Moat with me and other students on the same path. <FaqLink to="table">The Architect's Table</FaqLink> is the done-for-you 1-on-1: I run the audits, build the plan and set up the systems with you and for you, personalized to your degree, so all you do is execute.</>,
    ] },
    { q: "Will this work at my university, in my country?", a: [
      "Yes. Every university sells you the same bundle at one price: The 4 Hidden Assets. The 4 Hidden Assets are the 4 separable assets bundled into every degree at a single price: Credential, Knowledge, Status, and Infrastructure. Only the fees, the units and the job market change by country.",
      "That is why the method travels. The Unit Navigator doesn't hand you a verdict from a template. It walks you through pricing your own syllabus in ₹, RM or $, and checking it against live job ads in your own city. The inputs are yours, so the decision fits your university.",
      "I built it at Monash in Malaysia, and the same logic holds in Mumbai, Bengaluru, New York, California, London, Melbourne or Toronto. Wherever you study, the real question is whether you're running Degree Arbitrage: extracting all 4 Hidden Assets for Asymmetric ROI, and turning them into something the market will pay for. That market includes employers, clients, and a business of your own.",
    ] },
    { q: "Do I need to be technical or good with AI?", a: [
      "No. If you've used ChatGPT or any AI chatbot at a basic level, you're ready. Every free resource comes with the exact prompts and step-by-step templates.",
      <>In <FaqLink to="table">The Architect's Table</FaqLink>, my 8-week 1-on-1, I go further: I set up my full toolkit around your degree and walk you through it live. That covers the Degree Arbitrage and Career Moat audits with scorecards, The 3/10/50 Filter, my AI workflows, a second brain, and the mental models I use to make decisions. You learn each one by using it on your own units, with me checking your work.</>,
    ] },
    { q: "I already have high grades (GPA, CGPA or %). Why would I need this?", a: [
      "Keep the grades. Then ask yourself 3 questions. Is there a straight line from your grades to the job you want: the pay, the work you'd actually do, the company and the city? If there is, how much of the hiring decision do grades decide, in this era and in your country? In the US, only 42% of employers plan to screen graduates by GPA in 2026, down from 73% in 2019 (NACE Job Outlook 2026). And what decides the rest?",
      "For most roles, the rest is your major, your internships and proof of what you can do. That rest is what I call your Career Moat.",
      "A Career Moat is your un-replicable advantage: The intersection of 3 variables neither AI nor another graduate can copy, Asymmetric Capability, Calibrated Judgment, and Relational Equity. A 4th element, Scalable Architecture, multiplies a moat that already exists but does not create one.",
      "In plain words: can you do the rare thing, do you point it at the right thing, do people trust you to do it, and does it work when you're not in the room? A transcript shows none of these 4.",
    ] },
  ];
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 820, margin: '0 auto' }}>
      <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.035em', margin: '20px 0 36px', color: 'var(--fg)', lineHeight: 1.05 }}>
          Questions students ask before they start.
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <div>
          {items.map((it, i) => (
            <FAQItem key={i} q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </Reveal>
    </section>
  );
};

Object.assign(window, { About, MoatTools, FAQ, FAQItem, BurnRateCalc });
