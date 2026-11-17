// LibrarySpaces — the AI Prompt House + Mental Models Library, and the Library shell
// that switches between the three spaces (Insights / Prompts / Models).
// Seeded with the frameworks already named across the insights + Navigator. Pascal can paste
// the full Notion contents to expand each space; structure + styling are production-ready.

/* ---------- mental models ---------- */
const MENTAL_MODELS = [
  { name: 'Career capital', thinker: 'Cal Newport', body: 'You build a career by trading rare, valuable skill for control over your work.', term: 'Foundation Debt' },
  { name: 'Signaling', thinker: 'Michael Spence', body: 'A degree is partly a costly signal: employers pay for it because they cannot cheaply check your real skill.', term: 'Signal Collapse' },
  { name: 'Comparative advantage', thinker: 'David Ricardo', body: 'Specialise in what you are relatively best at, because commodity work goes to whoever does it cheapest.', term: 'Career Moat' },
  { name: 'Barbell strategy', thinker: 'Nassim Taleb', body: 'Keep one end very safe, put the other end in small bets with big upside, and avoid the fragile middle.', term: 'Cognitive Sovereignty' },
];

/* ---------- seed data: prompts ---------- */
const PROMPTS = [
  {
    id: 'syllabus-extraction-email', cat: 'Choose units', icon: 'list-checks', name: 'The Syllabus Extraction Email', tag: 'Recon',
    purpose: "Get the real week-by-week breakdown of a unit from the lecturer before you enroll, so you decide on Ground Truth instead of the brochure.",
    prompt: `You are helping me write an email to a university lecturer.

Context: I'm a [YEAR] student in [DEGREE] at [UNIVERSITY], deciding whether to take [UNIT CODE + NAME] next semester. I have [NUMBER] elective slots, and the public unit outline is too general to decide.

Task: Draft one email asking the lecturer for a detailed week-by-week breakdown (Week 1 to Week 12): topics, assessments with their weighting, tools or software taught, and the learning outcomes.

Rules:
- Under 150 words, warm, respectful and specific. No flattery.
- Make it easy to answer in one reply: say a past outline or a list of weekly slides is enough.
- Include a subject line.
- Sign off with my name and student ID: [NAME, ID].

Output:
1. Subject line
2. Email body
3. One line on when to send it (before enrollment opens)
4. A polite follow-up under 60 words to send after 5 working days with no reply`,
  },
  {
    id: 'check-real-job-ads', cat: 'Test your career path', icon: 'target', name: 'Check Real Job Ads', tag: 'Liquidity test',
    purpose: "Test whether a unit's skills are ones the market still pays for, using real job ads you collect, not guesses.",
    prompt: `Act as a hiring-market analyst. I'm deciding whether a unit's skills are worth my hours.

Inputs:
- The unit's top 3 learning outcomes: [PASTE]
- My target role and city: [ROLE, CITY]
- The number of results LinkedIn shows for each skill in my city, posted in the last 30 days: [NUMBERS]
- 10 to 20 job ads for my target role, posted in the last 30 days (LinkedIn, Jobstreet, Naukri, Indeed or similar): [PASTE]

Use only what I pasted. Do not invent counts, salaries or ads. If something is missing, say "not stated".

For each learning outcome:
1. How many of the pasted ads ask for it (count and %), with one quoted line as evidence.
2. The seniority and pay those ads show, if stated.
3. Liquidity verdict using this rule: high-liquidity if 30 or more active, mid-to-high-paying roles asked for it in the last month; low-liquidity if it appears in very few ads; credential-only if the degree requires it but no ad asks for it.
4. Whether current AI tools already do the core task: yes, partly or no, with one line why. Mark it [uncertain] if you are not sure.

Then name:
- The 1 skill to double down on
- The 1 skill the ads ask for that this unit does not teach

Output: a table for the 3 outcomes, then 3 short takeaways.`,
  },
  {
    id: 'costar-unit-audit', cat: 'Choose units', icon: 'list-checks', name: 'The CO-STAR Unit Audit', tag: 'Decision',
    purpose: 'Run any unit through Context, Objective, Style, Tone, Audience, Response to get a clear take/drop verdict.',
    prompt: `Step 1: The Context Pre-Load Keep a saved document of your Career North Star (your lifelong passion/Ikigai) and your 3-Year Execution Map (the specific role/industry you want to enter immediately after university). Paste both into the AI so it evaluates the syllabus not just for who you want to be forever, but for who you need to be next.

Step 2: Copy and paste this exact prompt (with your syllabus attached):

SYSTEM: You are an expert Tier-1 management consultant and recruiter who evaluates university syllabi for career ROI. Be concise, factual, and cite exact syllabus lines.

USER: [C - CONTEXT]

Year/Sem: {Year/Sem}
Career North Star: {paste}
3-Year Execution Map (role, city, seniority target): {paste}

[O - OBJECTIVE]

Task: Analyze the attached unit syllabus and:
Identify the top 3 hard skills the student will possess after finishing this unit (define "hard skill" as a concrete, demonstrable technical or professional capability).
For each skill, provide the exact syllabus line(s) that support it (quote verbatim, include page/section if available).
Give a 0-10 Alignment Score for how well the unit supports the user's 3-Year Map.
Recommend one immediate action (take, audit, or skip).

[S - STYLE]

Write like a Tier-1 management consultant recruiter: crisp, evidence-based, and direct.

[T - TONE]

Brutally honest, analytical, direct. No fluff.

[A - AUDIENCE]

Speak to a motivated undergraduate who wants career liquidity.

[R - RESPONSE FORMAT]

Output exactly in JSON with these keys: { "unit_name": "...", "top_skills": [ {"skill":"...","evidence":["exact quoted line 1"],"confidence":0-100} ], "alignment_score":0-100, "recommendation":"Take | Audit | Reconsider", "assumptions":["..."], "time_estimate_minutes_to_learn_skill":"..." }
If the syllabus exceeds token limits, reply only: "READY FOR CHUNKS" and wait for the user to paste the syllabus in numbered chunks.
Max summary length per skill: 60 words.
Provide no more than 3 evidence quotes per skill.`,
    note: 'This is the same prompt as Tactic 4 in The Unit Navigator.',
  },
  {
    id: 'displacement-check', cat: 'Test your career path', icon: 'target', name: 'The Displacement Check', tag: 'Forecast',
    purpose: "Stress-test a skill against AI before you spend semesters building it, and find the human layer that keeps it valuable.",
    prompt: `Act as a labor-market analyst who studies AI automation. Evaluate one skill for me.

Skill: [SKILL]
Role where I'd use it: [ROLE]
Country: [COUNTRY]

Do this:
1. Break the skill into 4 to 6 concrete tasks a fresh graduate does with it.
2. For each task: can current AI tools do it at a fresh-graduate level today? Answer yes, partly or no, with one line why. Name the type of tool, not a brand.
3. For tasks marked partly or no: what would have to change for AI to do them (capability, regulation, trust or data access)? Give a range of years only if you can justify it; otherwise write [uncertain].
4. The human layer: which parts still need judgment, relationships or accountability? Map each to Asymmetric Capability, Calibrated Judgment or Relational Equity.
5. 3 leading indicators I can check every quarter (for example, job ads dropping this task, or a tool shipping this feature).
6. Verdict: build it, build it with a human layer on top, or avoid it as a core skill. One sentence why.

Rules: keep what is known today separate from forecasts, label every forecast as a forecast, and use no invented statistics.

Output: a table for steps 1 to 3, then short bullets for steps 4 to 6.`,
  },
  {
    id: 'semester-architect', cat: 'Plan the semester', icon: 'strategy', name: 'The Semester Architect', tag: 'Planning',
    purpose: 'Turn a list of available units into a full semester plan optimized for your moat, not your GPA.',
    prompt: `Act as my semester strategist. Here is my situation:

Units available next semester: [PASTE LIST, with each unit's assessment types and weighting]
My GPA floor (the lowest grade I'm willing to accept): [X]
The role I'm aiming for, and the 3 hard skills it needs most: [ROLE + 3 SKILLS]
My weekly hours for uni, work and life: [HOURS]
My constraints (prerequisites, scholarship minimums, visa rules, part-time job): [LIST]

Definitions:

Credential-only unit: a unit I must pass for the degree, where the content builds none of my 3 target skills and no assessment can be reused as proof of work.
Leverage unit: a unit whose content or assessments overlap with at least one of my 3 target skills.

Do this:

Sort every unit into credential-only or leverage, with a one-line reason.
For each credential-only unit: the minimum weekly hours that still clear my GPA floor, and how I can use AI to study faster (summaries, practice questions) without breaking my university's academic-integrity rules.
For each leverage unit: turn one assessment into a portfolio asset. Either (a) aim it at a real company in my target industry, so the same work becomes a case study I can send them, or (b) apply the lecture concepts to a real small business or problem as a mini project.
Chain the projects so each one feeds the next (project A's output becomes project B's input), ending in one portfolio piece by week 12.
Output a table: unit | type | effort (floor / lean-in) | hours per week | portfolio asset | reason. Then a week-by-week plan and the total hours I reclaim per week.
Ask me for anything missing before you start.`,
  },
];

/* ---------- mental model card ---------- */
const ModelCard = ({ m, onTerm }) => (
  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '26px 24px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: 'var(--shadow-sm)' }}>
    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, letterSpacing: '-0.015em', color: 'var(--fg)', margin: 0, lineHeight: 1.15 }}>{m.name}</h3>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>{m.thinker}</div>
    <p style={{ fontSize: 15, lineHeight: 1.62, color: 'var(--fg-muted)', margin: 0, flex: 1 }}>{m.body}</p>
    <div style={{ fontSize: 14, color: 'var(--fg-muted)' }}>Powers: <a href={'#' + m.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')} onClick={(e) => { e.preventDefault(); onTerm(m.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')); }} style={{ color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>{m.term}</a></div>
  </div>
);

/* ---------- prompt card (expand + copy) ---------- */
const PromptCard = ({ p }) => {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const copy = (e) => {
    e.stopPropagation();
    try { navigator.clipboard.writeText(p.prompt); } catch (_) {}
    window.plTrack('prompt_copy', { prompt_id: p.id });
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
    <div className="lib-card" style={{ background: 'var(--bg-card)', border: `1px solid ${open ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', padding: '24px 24px', boxShadow: open ? 'var(--glow-mint-soft)' : 'var(--shadow-sm)', transition: 'border-color var(--dur-base), box-shadow var(--dur-base)' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <span style={{ width: 46, height: 46, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)' }}>
          <iconify-icon icon={`ph:${p.icon}-thin`} width="26" style={{ color: 'var(--accent)' }}></iconify-icon>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.015em', color: 'var(--fg)', margin: 0 }}>{p.name}</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-pill)', padding: '3px 9px' }}>{p.tag}</span>
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0 }}>{p.purpose}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
        <button onClick={() => setOpen((o) => !o)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'transparent', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', color: 'var(--fg)', padding: '9px 15px', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}>
          <iconify-icon icon={open ? 'ph:caret-up-bold' : 'ph:caret-down-bold'} width="13"></iconify-icon>{open ? 'Hide prompt' : 'View prompt'}
        </button>
        <button onClick={copy} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: copied ? 'var(--accent)' : 'transparent', border: `1px solid ${copied ? 'var(--accent)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius-md)', color: copied ? 'var(--accent-on)' : 'var(--accent)', padding: '9px 15px', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, transition: 'all var(--dur-fast)' }}>
          <iconify-icon icon={copied ? 'ph:check-bold' : 'ph:copy-bold'} width="13"></iconify-icon>{copied ? 'Copied' : 'Copy Prompt'}
        </button>
      </div>
      <div style={{ maxHeight: open ? 4000 : 0, overflow: 'hidden', transition: 'max-height var(--dur-slow) var(--ease-out)' }}>
        <pre style={{ margin: '16px 0 0', background: 'var(--gray-100)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '18px 20px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.65, color: 'var(--fg)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{p.prompt}</pre>
      </div>
    </div>
    {p.note && <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--fg-muted)', margin: '10px 4px 0' }}>{p.note}</p>}
    </div>
  );
};

/* ---------- a small "your Notion lives here now" note ---------- */
const SeedNote = ({ children }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--accent-soft)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', borderRadius: 'var(--radius-md)', padding: '14px 18px', marginBottom: 28 }}>
    <iconify-icon icon="ph:info-bold" width="18" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}></iconify-icon>
    <span style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--fg-muted)' }}>{children}</span>
  </div>
);

const SpaceHeader = ({ title, sub }) => (
  <Reveal>
    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.4vw, 38px)', letterSpacing: '-0.035em', color: 'var(--fg)', margin: '0 0 12px', lineHeight: 1.05 }}>{title}</h2>
    <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 30px', maxWidth: '60ch' }}>{sub}</p>
  </Reveal>
);

const LibChips = ({ items, value, onChange, label }) => (
  <div role="group" aria-label={label} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
    {items.map((c) => { const on = c === value; return (
      <button key={c} aria-pressed={on} onClick={() => onChange(c)} style={{ cursor: 'pointer', minHeight: 44, background: on ? 'var(--accent)' : 'transparent', color: on ? 'var(--accent-on)' : 'var(--fg-muted)', border: `1px solid ${on ? 'var(--accent)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius-pill)', padding: '10px 16px', fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600 }}>{c}</button>
    ); })}
  </div>
);
const LibEmpty = ({ children }) => (
  <div role="status" style={{ fontSize: 15, color: 'var(--fg-muted)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 24px' }}>{children}</div>
);

const PromptHouse = () => {
  const [q, setQ] = React.useState('');
  const [cat, setCat] = React.useState('All');
  const qq = q.trim().toLowerCase();
  const list = PROMPTS.filter((p) => (cat === 'All' || p.cat === cat) && (!qq || (p.name + ' ' + p.purpose + ' ' + p.prompt).toLowerCase().includes(qq)));
  return (
  <div>
    <SpaceHeader title="The AI Prompt House" sub="Prompts I've tested on my own degree and work, built to multiply the speed and quality of your output. Use them to choose units, plan semesters, test career paths and build proof. If you want to think like a Strategic Architect at university and after it, start here." />
    <label htmlFor="pr-search" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--fg-muted)', marginBottom: 10 }}>Search prompts</label>
    <input id="pr-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a prompt"
      style={{ width: '100%', maxWidth: 440, minHeight: 48, boxSizing: 'border-box', background: 'var(--bg-input)', color: 'var(--fg)', border: '1px solid var(--fg-subtle)', borderRadius: 'var(--radius-md)', padding: '12px 16px', fontSize: 15, fontFamily: 'var(--font-body)', marginBottom: 20 }} />
    <LibChips items={['All', 'Choose units', 'Plan the semester', 'Test your career path']} value={cat} onChange={setCat} label="Filter prompts by category" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {list.map((p, i) => <Reveal key={p.name} delay={i * 60}><PromptCard p={p} /></Reveal>)}
    </div>
    {list.length === 0 && <LibEmpty>No prompt matches that yet.</LibEmpty>}
  </div>
  );
};

const ModelLibrary = ({ onTerm }) => (
  <div>
    <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 28px', maxWidth: '60ch' }}>Borrowed thinking tools from the newsletter, each tied to the Project 12 term it powers.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 290px), 1fr))', gap: 18 }}>
      {MENTAL_MODELS.map((m, i) => <Reveal key={m.name} delay={i * 50}><ModelCard m={m} onTerm={onTerm} /></Reveal>)}
    </div>
  </div>
);

/* ===================== LIBRARY SHELL ===================== */
const SPACES = [
  { id: 'glossary', label: 'Dictionary', icon: 'book-bookmark' },
  { id: 'prompts', label: 'Prompts', icon: 'sparkle' },
  { id: 'essays', label: 'Insights', icon: 'book-open-text' },
  { id: 'kit', label: 'Newsletter', icon: 'envelope-simple' },
];

const NewsletterTab = () => {
  const [done, setDone] = React.useState(false);
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>Latest issues</div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 720 }}>
        {(window.KIT_ISSUES || []).map((it, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '20px 4px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontWeight: 600, fontSize: 16, color: 'var(--fg)', lineHeight: 1.4 }}>{it.t}</span>
            <span style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-muted)' }}>{it.dt}</span>
              <a href={it.href} target="_blank" rel="noopener" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 44 }}>Read on Substack <iconify-icon icon="ph:arrow-up-right-bold" width="12"></iconify-icon></a>
            </span>
          </div>
        ))}
      </div>
      <a href={PL_LINKS.substack} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, marginTop: 16, fontSize: 14.5, fontWeight: 600, color: 'var(--accent)' }}>Read every issue on Substack</a>
      <div style={{ marginTop: 28 }}>
        {done ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
            <iconify-icon icon="ph:check-circle-bold" width="22" style={{ color: 'var(--accent)' }}></iconify-icon>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>You're in. Your first issue lands on Tuesday.</span>
          </div>
        ) : <SubscribeForm onDone={() => setDone(true)} />}
      </div>
    </div>
  );
};

const Library = ({ initialSpace = 'glossary', onNewsletter, onNav }) => {
  const essays = (window.ESSAYS || []).filter(e => !e.hidden);
  const [space, setSpace] = React.useState(initialSpace);
  const [openId, setOpenId] = React.useState(null);
  const [anchor, setAnchor] = React.useState(null);
  const open = (id) => setOpenId(id);
  const goTerm = (id) => { window.plTrack('dictionary_term_open', { term: id, location: 'library-models' }); setAnchor(id); setSpace('glossary'); };
  React.useEffect(() => {
    if (space === 'glossary' && anchor) {
      const t = setTimeout(() => { const el = document.getElementById(anchor); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' }); setAnchor(null); }, 60);
      return () => clearTimeout(t);
    }
  }, [space, anchor]);

  if (openId) {
    const essay = essays.find((e) => e.id === openId);
    if (essay) return <EssayReader essay={essay} all={essays} onOpen={open} onBack={() => setOpenId(null)} onNewsletter={onNewsletter} />;
  }

  return (
    <div style={{ background: 'var(--bg-canvas)' }}>
      <style>{'.lib-card{transition:transform 200ms ease-out}.lib-card:hover{transform:translateY(-2px);border-color:var(--accent)!important}@media (prefers-reduced-motion:reduce){.lib-card{transition:none}.lib-card:hover{transform:none}}'}</style>
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 24px 0' }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>The Library · Ground Truth</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(38px, 6vw, 62px)', letterSpacing: '-0.04em', lineHeight: 1.02, margin: '0 0 18px', color: 'var(--fg)', maxWidth: '20ch', textWrap: 'balance' }}>
            Know what each hour of your degree costs, and turn it into proof an employer can see.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.58, color: 'var(--fg-muted)', margin: '0 0 40px', maxWidth: '56ch' }}>
            Your fees buy 4 Hidden Assets: Credential, Knowledge, Status and Infrastructure. Most students cash in only the grade and pay full price for the other 3. Every term, prompt and Tuesday issue I use to collect all 4 is here, in one place. Free, for students who want Asymmetric ROI from every remaining semester they have.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ maxWidth: '100%', overflowX: 'auto', marginBottom: 48 }}>
            <div role="tablist" style={{ display: 'inline-flex', gap: 4, padding: 4, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-pill)' }}>
              {SPACES.map((sp) => {
                const active = space === sp.id;
                return (
                  <button key={sp.id} role="tab" aria-selected={active} onClick={() => setSpace(sp.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, cursor: 'pointer', whiteSpace: 'nowrap', minHeight: 44, background: active ? 'var(--accent)' : 'transparent', color: active ? 'var(--accent-on)' : 'var(--fg-muted)', border: 'none', borderRadius: 'var(--radius-pill)', padding: '11px 18px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, transition: 'all var(--dur-base) var(--ease-snap)' }}>
                    <iconify-icon icon={'ph:' + sp.icon + '-bold'} width="16"></iconify-icon>{sp.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 24px' }}>
        <div key={space}>
          {space === 'glossary' && <GlossaryTab />}
          {space === 'models' && <ModelLibrary onTerm={goTerm} />}
          {space === 'prompts' && <PromptHouse />}
          {space === 'essays' && <EssayIndex essays={essays} onOpen={open} />}
          {space === 'kit' && <NewsletterTab />}
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { LibChips, LibEmpty, Library, PromptHouse, ModelLibrary });
