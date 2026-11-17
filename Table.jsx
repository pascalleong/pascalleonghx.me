// TablePage: The Architect's Table, 1-on-1 application page.
// Update by hand when a round's 3 seats fill. Never show a round as open that is not.
// No exact price anywhere on the site (Pascal, 2026-11-08). The exact rate shows only on the Tally form after applying.
const CURRENT_ROUND = 1;

const TABLE_OBJECTIONS = [
  { icon: 'fingerprint', q: 'Is this personalized, or a template?', a: 'Personalized. Every audit, plan and project is built on your own units, fees, goals and target market. That market includes employers, clients, and a business of your own.' },
  { icon: 'arrows-clockwise', q: 'What if I fall behind?', a: 'If a piece is missing at the end and you did your part, we keep working 1-on-1 until it exists.' },
  { icon: 'user-circle', q: 'Do I work with Pascal himself?', a: 'Yes. Every session, check-in and review is 1-on-1 with me, never an assistant.' },
];
const TABLE_PIECES = [
  ['Your Capital Burn Rate and Hurdle Rate', "See what each class hour costs you, and drop the hours that don't pay it back."],
  ['A scored Degree Arbitrage audit', 'Know which of The 4 Hidden Assets you are leaving unused.'],
  ['A scored Career Moat audit', 'See your weakest layers, and fix all of them, in priority order.'],
  ['One shipped proof-of-work project on a page you own', 'Send the employer you want a real link to your own work, the work that shows who you are, so you hold a clear spot in their mind that no other applicant holds.'],
  ['Your 90-Day Map', 'Know your next 90 days of moves, and keep the momentum going. You keep my full student toolkit (first-principles methods, mental models, scorecards, templates, prompts, calculators and AI workflows), plus every new tool I build during your 90 days, so you can run it all without me. I stay on call the whole time.'],
];

// Sample timetable. Real days are set with each student in Session 1.
// Each week: [touchpoint on the session day, what is due at the end of the week]
const TABLE_WEEKS = [
  ['Session 1: we map your degree, fees and goals', 'Due: 01 Capital Burn Rate and Hurdle Rate'],
  ['Weekly check-in', 'Due: 02 Degree Arbitrage audit, and your first win'],
  ['Weekly check-in', 'Due: 03 Career Moat audit'],
  ['Zoom review of your progress', 'Project scoped and started'],
  ['Weekly check-in', 'Build week'],
  ['Weekly check-in', 'Build week'],
  ['Weekly check-in', 'Due: 04 Proof-of-work project, shipped'],
  ['Session 2: your 90-Day Map, built together', 'Due: 05 Your 90-Day Map'],
];
const TABLE_AFTER = [
  ['Day 30', '30-Day Progress Review: early wins, obstacles and next steps'],
  ['Day 60', '60-Day Progress Review: refine the strategy and keep the momentum'],
  ['Day 90', '90-Day Progress Review: check the outcomes and plan your next phase'],
];
const TABLE_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TABLE_PERKS = [
  '30-Day, 60-Day and 90-Day Progress Reviews after the 8 weeks',
  'Priority access to founding cohort seats, before the public waitlist',
  'The recording of every Zoom call we have, yours to keep',
  'My full student toolkit, plus every new tool I build during your 90 days',
];

const TABLE_FAQ = [
  { q: 'How much does it cost?', a: "Round 1 is the founding round: 80% off the full rate. Each round has only 3 seats. When a round fills, the next one opens at 60% off, then 40%, then 20%, then the full rate. You see your exact rate right after you apply, and nothing is charged on the form. Whatever round you join in, your rate stays locked for any renewal." },
  { q: 'How long does it take?', a: '8 weeks of 1-on-1 work, plus 90 days of follow-up support, with progress reviews at day 30, 60 and 90.' },
  { q: 'Why choose me?', a: [
    'Each of the 5 pieces rests on something I studied, used on myself, or did with real people.',
    "Capital Burn Rate and Hurdle Rate: I majored in Finance at Monash. My units covered financial modelling, corporate valuation, and investments and portfolio management. My economics electives covered how people and firms make decisions. I've run these numbers on my own degree for a few years.",
    'Degree Arbitrage audit: I priced my own degree (RM120k+ without scholarships) and learned to pull value from all 4 Hidden Assets. I also study how education works in the countries I serve. Monash\'s motto, Ancora Imparo ("I am still learning"), is how I live.',
    'Career Moat audit: as the first Head of PR at the Monash Blockchain Club, I worked with founders and C-suite executives and heard what they look for when they hire. I follow AI and Web3 almost every day, and every Tuesday my newsletter shares 3 education and AI insights, 2 mental models and 1 execution framework. I also just graduated, so you learn from a peer who sat where you sit.',
    'Proof-of-work project: I majored in Digital Marketing. My focus is strategy: how anyone, in any field, gets their work seen by the right people.',
    'Your 90-Day Map: we build it together, and I stay with you through 3 progress reviews over the next 90 days.',
    "Goals come first. We start from what you want your life to look like, using your strengths, the job market and your university, then work backward to this semester. Grades count as 1 asset out of 4. I won't push you to chase marks, or money at any cost.",
  ] },
];
const tableMono = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' };

const useWide = (q = '(min-width: 768px)') => {
  const [wide, setWide] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => { const m = window.matchMedia(q), f = () => setWide(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f); }, []);
  return wide;
};

const TableChip = ({ kind, children }) => {
  const due = kind === 'due';
  return <div style={{ fontSize: 12.5, lineHeight: 1.35, fontWeight: due ? 600 : 500, color: due ? 'var(--accent)' : 'var(--fg)', background: due ? 'var(--accent-soft)' : 'var(--bg-elevated, var(--bg-card))', border: '1px solid ' + (due ? 'var(--accent)' : 'var(--border-strong)'), borderRadius: 'var(--radius-md)', padding: '8px 9px' }}>{children}</div>;
};

const TableTimetable = () => {
  const wide = useWide('(min-width: 900px)');
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 1100, margin: '0 auto' }}>
      <SectionHead eyebrow="THE TIMETABLE" title="Your 8 weeks, then 90 days, week by week." />
      <Reveal delay={80}>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '20px 0 0', maxWidth: '62ch' }}>A sample layout. In Session 1 we pick your real days around your classes. Each week has one call or one short written update (about 5 minutes on your side), and my full toolkit is open to you from day 1.</p>
      </Reveal>
      {wide ? (
        <Reveal delay={120}>
          <div role="table" aria-label="8-week timetable" style={{ marginTop: 32, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div role="row" style={{ display: 'grid', gridTemplateColumns: '72px minmax(0, 0.5fr) minmax(0, 2.2fr) minmax(0, 0.5fr) minmax(0, 0.5fr) minmax(0, 0.5fr) minmax(0, 2.2fr) minmax(0, 0.5fr)', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }} data-mobile-layout="">
              <div role="columnheader" style={{ ...tableMono, fontSize: 10.5, color: 'var(--fg-muted)', padding: '12px 12px' }}>Week</div>
              {TABLE_DAYS.map((d) => <div key={d} role="columnheader" style={{ ...tableMono, fontSize: 10.5, color: 'var(--fg-muted)', padding: '12px 8px' }}>{d}</div>)}
            </div>
            {TABLE_WEEKS.map(([touch, due], i) => (
              <div key={i} role="row" data-mobile-layout="" style={{ display: 'grid', gridTemplateColumns: '72px minmax(0, 0.5fr) minmax(0, 2.2fr) minmax(0, 0.5fr) minmax(0, 0.5fr) minmax(0, 0.5fr) minmax(0, 2.2fr) minmax(0, 0.5fr)', borderTop: i ? '1px solid var(--border)' : 'none', alignItems: 'stretch' }}>
                <div role="rowheader" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--fg)', padding: '14px 12px' }}>W{i + 1}</div>
                {TABLE_DAYS.map((d, j) => (
                  <div key={d} role="cell" style={{ padding: 6, borderLeft: '1px solid var(--border)', minHeight: 64 }}>
                    {j === 1 && <TableChip>{touch}</TableChip>}
                    {j === 5 && <TableChip kind={/^Due/.test(due) ? 'due' : 'build'}>{due}</TableChip>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      ) : (
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TABLE_WEEKS.map(([touch, due], i) => (
            <Reveal key={i} delay={i * 30}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px 16px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--fg)', marginBottom: 10 }}>Week {i + 1}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><span style={{ ...tableMono, fontSize: 10.5, color: 'var(--fg-muted)', paddingTop: 9, width: 34, flexShrink: 0 }}>Mon</span><div style={{ flex: 1, minWidth: 0 }}><TableChip>{touch}</TableChip></div></div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><span style={{ ...tableMono, fontSize: 10.5, color: 'var(--fg-muted)', paddingTop: 9, width: 34, flexShrink: 0 }}>Fri</span><div style={{ flex: 1, minWidth: 0 }}><TableChip kind={/^Due/.test(due) ? 'due' : 'build'}>{due}</TableChip></div></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
      <Reveal delay={160}>
        <div style={{ marginTop: 20, background: 'var(--bg-card)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-lg)', padding: '22px 22px' }}>
          <div style={{ ...tableMono, color: 'var(--accent)', marginBottom: 14 }}>Week 9 onward · your 90 days</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TABLE_AFTER.map(([d, t], i) => (
              <div key={d} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '12px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', flexShrink: 0, minWidth: 56 }}>{d}</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.5, color: 'var(--fg)' }}>{t}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '12px 0 0', maxWidth: '62ch' }}>You run your 90-Day Map on your own, with my toolkit, and I stay on call between reviews.</p>
        </div>
      </Reveal>
    </section>
  );
};

const TableFounding = () => (
  <section id="founding-rate" style={{ padding: '120px 32px 0', maxWidth: 1000, margin: '0 auto' }}>
    <Reveal>
      <div className="chosen-glow" style={{ background: 'var(--bg-card)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-xl)', padding: 'clamp(26px, 4vw, 44px)' }}>
        <style>{'.pl-ladder{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}@media (max-width: 767px){.pl-ladder{grid-template-columns:1fr}}'}</style>
        <div style={{ ...tableMono, color: 'var(--accent)', marginBottom: 14 }}>How the founding rate works</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
          <span className="text-glow" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(56px, 9vw, 104px)', letterSpacing: '-0.05em', lineHeight: 0.95, color: 'var(--accent)' }}>80% off</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(18px, 2.2vw, 24px)', color: 'var(--fg)', lineHeight: 1.2 }}>the full rate, in the founding round</span>
        </div>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg)', margin: '0 0 14px', maxWidth: '62ch' }}>The Architect's Table is new, and I want to build it with my first students. You get the full 8 weeks and every piece of work at the lowest rate it will ever have. In return, I ask for honest feedback and, if it helped you, your story. Your feedback tells me what to keep and what to fix, so the next student gets a better version because of you.</p>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg)', fontWeight: 700, margin: 0 }}>Each round has only 3 seats.</p>
        <div className="pl-ladder" style={{ margin: '24px 0 24px' }}>
          {['Round 1 · 80% off', 'Round 2 · 60% off', 'Round 3 · 40% off', 'Round 4 · 20% off', 'Then · Full rate'].map((l, i) => {
            const n = i + 1, open = n === CURRENT_ROUND, filled = n < CURRENT_ROUND;
            return (
              <div key={l} style={{ border: '1px solid ' + (open ? 'var(--accent)' : 'var(--border)'), background: open ? 'var(--accent-soft)' : 'transparent', borderRadius: 'var(--radius-md)', padding: '14px 14px', opacity: open || filled ? 1 : 0.55 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: open ? 'var(--fg)' : 'var(--fg-muted)', lineHeight: 1.35 }}>{l}</div>
                <div style={{ ...tableMono, fontSize: 10, marginTop: 8, minHeight: 14, color: open ? 'var(--accent)' : 'var(--fg-muted)' }}>{open ? 'Open now' : filled ? 'Filled' : ''}</div>
              </div>
            );
          })}
        </div>
        <div style={{ ...tableMono, color: 'var(--fg)', marginBottom: 12 }}>On top of the founding rate, you also get</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
          {TABLE_PERKS.map((p) => (
            <div key={p} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <iconify-icon icon="ph:gift-bold" width="18" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}></iconify-icon>
              <span style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--fg)' }}>{p}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-muted)', margin: '0 0 26px', maxWidth: '62ch' }}>A round opens only when the one before it fills, and the rate you join at stays locked for any renewal. The form charges nothing. You see your exact rate right after you apply, and you pay only after we both agree it fits.</p>
        <PLButton href={PL_LINKS.apply}>Apply For 1-on-1 With Pascal</PLButton>
      </div>
    </Reveal>
  </section>
);

const TableFor = () => {
  const card = { height: '100%', boxSizing: 'border-box', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 26px' };
  const li = { display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 16.5, lineHeight: 1.6, color: 'var(--fg)' };
  const FOR = [
    "You're doing everything right on paper (good grades, full timetable), and you still can't answer one question: why would an employer pick you over the next 10,000 applicants?",
    "Your grades are average, or slipping, and you're not sure where your degree is taking you.",
    'Internship or job applications start within 6 months, and you have no proof of work to show yet.',
  ];
  const NOT = [
    'Anyone who wants a job guaranteed (nobody can honestly promise one).',
    "Anyone who wants me to do the work for them (we work as a team: I run the audits, build the plan and set up the systems with you, and you carry them out between sessions. If you skip that part, progress stops, and no plan can do it for you).",
    'Graduates who have already finished (you need at least one semester left for me to deliver max value to you).',
  ];
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 1100, margin: '0 auto' }}>
      <SectionHead eyebrow="WHO IT'S FOR" title="Built for Year 2 to 5 and final-semester students." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, marginTop: 32 }}>
        <Reveal>
          <div style={card}>
            <div style={{ ...tableMono, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><iconify-icon icon="ph:check-bold" width="16"></iconify-icon>For you if any of these fit</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {FOR.map((t) => <div key={t} style={li}><span aria-hidden style={{ color: 'var(--accent)', flexShrink: 0 }}>•</span><span>{t}</span></div>)}
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg)', fontWeight: 600, margin: '20px 0 10px' }}>Every semester without an answer costs you not only a full semester of fees, but also your time, effort, opportunity cost and everything else that semester could have built.</p>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0 }}>In 8 weeks you leave with 5 pieces of work that answer it, built on your own degree.</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div style={card}>
            <div style={{ ...tableMono, color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><iconify-icon icon="ph:x-bold" width="16"></iconify-icon>Not for</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {NOT.map((t) => <div key={t} style={li}><span aria-hidden style={{ color: 'var(--fg-muted)', flexShrink: 0 }}>•</span><span>{t}</span></div>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const TablePage = () => (
  <>
    <section className="dot-bg" style={{ padding: '90px 32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)', gap: 56, alignItems: 'center' }}>
        <Reveal>
          <Eyebrow><span style={{ letterSpacing: '2.4px' }}>THE ARCHITECT'S TABLE · 1-ON-1 WITH PASCAL</span></Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(38px, 5.2vw, 64px)', letterSpacing: '-0.045em', lineHeight: 1.0, margin: '24px 0 22px', color: 'var(--fg)', textWrap: 'balance' }}>
            Turn your degree into an edge no other graduate can copy.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 14px', maxWidth: '46ch' }}>
            8 weeks of 1-on-1 work, built around your units, your goals and your market.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 28px', maxWidth: '46ch' }}>
            Then 90 days of follow-up support, so the plan keeps moving after we finish.
          </p>
          <a href="#founding-rate" onClick={(e) => { e.preventDefault(); const el = document.getElementById('founding-rate'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 44, marginBottom: 22, padding: '8px 16px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--accent)', background: 'var(--accent-soft)', color: 'var(--fg)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--accent)', flexShrink: 0 }}></span>
            <span>Founding round open: <span style={{ color: 'var(--accent)', fontWeight: 800 }}>80% off</span> the full rate</span>
          </a>
          <div><PLButton href={PL_LINKS.apply}>Apply For 1-on-1 With Pascal</PLButton></div>
          <div style={{ ...tableMono, fontSize: 10.5, color: 'var(--fg-muted)', marginTop: 16, lineHeight: 1.6 }}>By application only · Each round has only 3 seats</div>
        </Reveal>
        <Reveal delay={120}>
          <div className="chosen-glow" style={{ background: 'var(--bg-card)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-xl)', padding: 'clamp(24px, 3vw, 34px)' }}>
            <img src="assets/framework-capital-burn.png" alt="Capital Burn Rate framework" style={{ display: 'block', width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
            <div style={{ ...tableMono, fontSize: 10.5, color: 'var(--fg-muted)', marginTop: 14, lineHeight: 1.6 }}>Inside piece 01: your Capital Burn Rate</div>
          </div>
        </Reveal>
      </div>
      <div style={{ maxWidth: 1200, margin: '56px auto 0', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
        {TABLE_OBJECTIONS.map((o, i) => (
          <Reveal key={o.q} delay={i * 70}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '20px 0', borderTop: '1px solid var(--border)' }}>
              <iconify-icon icon={`ph:${o.icon}-bold`} width="20" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}></iconify-icon>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15.5, color: 'var(--fg)', marginBottom: 6 }}>{o.q}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--fg-muted)' }}>{o.a}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
    <ProblemSection variant="short" />
    <TableFor />
    <section style={{ padding: '120px 32px 0', maxWidth: 1000, margin: '0 auto' }}>
      <SectionHead eyebrow="THE 5 PIECES" title="8 weeks. 5 pieces of work. All built on your degree." />
      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column' }}>
        {TABLE_PIECES.map(([n, s], i) => (
          <Reveal key={n} delay={i * 60}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'baseline', padding: '22px 0', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)', flexShrink: 0 }}>0{i + 1}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.015em', color: 'var(--fg)', lineHeight: 1.25 }}>{n}</div>
                <div style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--fg-muted)', marginTop: 6, maxWidth: '68ch' }}><span style={{ color: 'var(--fg)', fontWeight: 600 }}>So you can:</span> {s}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
    <TableTimetable />
    {/* Proof section hidden for now; restore later, with written consent:
    <section style={{ padding: '120px 32px 0', maxWidth: 1100, margin: '0 auto' }}>
      <SectionHead eyebrow="Proof" title="Results from the first students." />
    </section>
    */}
    <TableFounding />
    <section style={{ padding: '80px 32px 0', maxWidth: 820, margin: '0 auto' }}>
      <Reveal>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 26px' }}>
          <div style={{ ...tableMono, color: 'var(--accent)', marginBottom: 14 }}>THE GUARANTEE</div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--fg)', margin: 0 }}>If a piece is missing at the end and you did your part, we keep working 1-on-1 until it exists.</p>
        </div>
      </Reveal>
    </section>
    <FAQBlock items={TABLE_FAQ} />
    <CTAPanel><PLButton href={PL_LINKS.apply}>Apply For 1-on-1 With Pascal</PLButton></CTAPanel>
  </>
);

Object.assign(window, { TablePage });
