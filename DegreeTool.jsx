const { useState, useEffect, useRef } = React;

/* ─── BRAND TOKENS (from pascal_brand.js / colors_and_type(3).css) ─── */
const DPL = {
  bg:"#020817", bgElevated:"#0A1325", bgCard:"#0F1A30",
  bgInput:"rgba(241,245,249,0.04)", bgInputHover:"rgba(241,245,249,0.07)",
  fg:"#F1F5F9", fgMuted:"#8A9BB5", fgSubtle:"#5B6B85", fgInverse:"#020817",
  accent:"#2DD4BF", accentHover:"#14B8A6", accentPress:"#0D9488",
  accentSoft:"rgba(45,212,191,0.10)", accentOn:"#020817", link:"#5EEAD4",
  border:"#1B2942", borderStrong:"#2C3E5C", divider:"rgba(94,234,212,0.10)",
  red:"#EF4444", redSoft:"rgba(239,68,68,0.10)",
  amber:"#F59E0B", amberSoft:"rgba(245,158,11,0.10)",
  green:"#10B981", greenSoft:"rgba(16,185,129,0.10)",
  shadowMd:"0 12px 32px rgba(0,0,0,0.5)",
  glowMint:"0 0 0 1px #5EEAD4, 0 0 24px rgba(45,212,191,0.35)",
  glowMintLg:"0 0 0 1px #5EEAD4, 0 0 32px rgba(45,212,191,0.45), 0 16px 48px rgba(45,212,191,0.18)",
  glowSoft:"0 0 24px rgba(45,212,191,0.25)",
  chosenGlow:"0 0 0 1px rgba(45,212,191,0.55), 0 0 28px rgba(45,212,191,0.45), 0 0 80px rgba(45,212,191,0.30)",
  textGlow:"0 0 18px rgba(45,212,191,0.55), 0 0 48px rgba(45,212,191,0.30)",
  ringFocus:"0 0 0 2px rgba(94,234,212,0.55)",
  gridBg:"linear-gradient(rgba(94,234,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.05) 1px, transparent 1px)",
  fD:"'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif",
  fM:"'JetBrains Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace",
  easeOut:"cubic-bezier(0.16,1,0.3,1)",
  easeSnap:"cubic-bezier(0.2,0,0,1)",
};

/* ─── DATA ─── */
const DEGREES = {
  "Computer Science":       { autoYear:2026.5, risk:"CRITICAL", sal:{MY:48000,SG:60000,US:85000,UK:45000,AU:70000}, phase:"Agent-1 automates coding (Early 2026). Agent-3 is a superhuman coder by March 2027. Junior dev roles collapse.", moat:"Shift to AI orchestration, research taste, or human-AI interface design." },
  "Software Engineering":   { autoYear:2026.5, risk:"CRITICAL", sal:{MY:50000,SG:65000,US:95000,UK:48000,AU:75000}, phase:"200K AI copies replace 50K top coders by mid-2027. 'Substantial code changes on their own' by 2025.", moat:"Pure coding is a losing trade. Pivot to AI architecture, domain engineering, or embodied systems." },
  "Data Science":           { autoYear:2027.0, risk:"CRITICAL", sal:{MY:45000,SG:55000,US:90000,UK:42000,AU:68000}, phase:"Agent-2 produces and filters synthetic data at scale (Jan 2027). Agent-3 automates research engineering.", moat:"Statistical modeling is commoditized. Build domain expertise + causal reasoning AI can't replicate." },
  "Business Administration":{ autoYear:2027.5, risk:"SEVERE",   sal:{MY:36000,SG:48000,US:65000,UK:35000,AU:55000}, phase:"Agent-3-mini disrupts every white-collar profession by July 2027. B2B SaaS startups automate management layers.", moat:"Generic 'business' degrees have near-zero moat. Specialize in AI integration consulting or trust-based client work." },
  "Accounting & Finance":   { autoYear:2027.0, risk:"SEVERE",   sal:{MY:40000,SG:52000,US:72000,UK:38000,AU:60000}, phase:"Routine financial analysis automated by Agent-1 (2026). Complex modeling by Agent-2 (2027).", moat:"Find the High-Human side: regulatory judgment, client trust, cross-border compliance." },
  "Marketing":              { autoYear:2027.0, risk:"SEVERE",   sal:{MY:34000,SG:45000,US:62000,UK:32000,AU:52000}, phase:"AI generates content, manages campaigns, personalizes at scale by 2026.", moat:"Content creation is commoditized. Build personal brand (Meta-Liquidity) and strategic positioning." },
  "Law":                    { autoYear:2028.0, risk:"MODERATE", sal:{MY:42000,SG:60000,US:80000,UK:40000,AU:65000}, phase:"Legal research automated early. Courtroom presence, judgment, and trust remain human.", moat:"Locked-Door Degree. The credential still matters, supplement with AI literacy." },
  "Medicine":               { autoYear:2029.0, risk:"LOW",      sal:{MY:55000,SG:80000,US:120000,UK:55000,AU:90000}, phase:"Embodied presence is AI-irreplaceable. Diagnostics augmented but human trust and physical care endure.", moat:"Locked-Door Degree with maximum moat. AI becomes your tool, not your replacement." },
  "Engineering (Civil/Mech)":{ autoYear:2028.5, risk:"MODERATE", sal:{MY:42000,SG:55000,US:78000,UK:40000,AU:65000}, phase:"Design automation accelerates but physical-world constraints slow full displacement.", moat:"Physical domain expertise + regulatory knowledge create moat. Supplement with AI-assisted design tools." },
  "Psychology":             { autoYear:2028.0, risk:"MODERATE", sal:{MY:30000,SG:42000,US:55000,UK:30000,AU:50000}, phase:"10% of Americans consider AI 'a close friend' by 2027. Embodied therapeutic presence remains irreplaceable.", moat:"Mental Health is a Period 9 sector. Human therapeutic presence can't be replicated." },
  "Education":              { autoYear:2027.5, risk:"SEVERE",   sal:{MY:28000,SG:40000,US:50000,UK:28000,AU:48000}, phase:"AI tutoring at scale disrupts traditional instruction. EdTech is Period 9, but for builders, not teachers.", moat:"Traditional teaching compresses. Pivot to EdTech architecture, AI-curriculum design, or embodied mentorship." },
  "Communications / Media": { autoYear:2027.0, risk:"SEVERE",   sal:{MY:30000,SG:40000,US:52000,UK:30000,AU:48000}, phase:"AI content + propaganda bots flood information space by 2027. Trusted human voices become scarce.", moat:"Personal Branding becomes Meta-Liquidity. Build trust capital NOW, scarcest resource by 2027." },
  "Design / Creative Arts": { autoYear:2027.5, risk:"SEVERE",   sal:{MY:28000,SG:38000,US:55000,UK:28000,AU:45000}, phase:"AI generates polished games in a month. Aesthetic production commoditized. But Aesthetics is Period 9.", moat:"Execution is automated. Taste and creative direction remain human. Become a creative strategist." },
  "Nursing / Allied Health": { autoYear:2029.0, risk:"LOW",     sal:{MY:32000,SG:45000,US:65000,UK:32000,AU:55000}, phase:"Embodied care + physical presence = AI-irreplaceable. Holistic Wellness is Period 9 sector.", moat:"Maximum survivability. Human touch is the moat. AI augments but cannot replace bedside care." },
  "Other / Undecided":      { autoYear:2027.5, risk:"SEVERE",   sal:{MY:32000,SG:42000,US:55000,UK:32000,AU:50000}, phase:"Generic degrees face displacement across the board. Exploration + Liquidity strategy is your lifeline.", moat:"If you're undecided, you're burning Capital at maximum rate. Run the Ikigai Engine immediately." },
};

const COUNTRIES = {
  MY:{ label:"Malaysia",       cur:"RM",  tuitionRange:[15000,120000],  avg:45000  },
  SG:{ label:"Singapore",      cur:"S$",  tuitionRange:[20000,150000],  avg:60000  },
  US:{ label:"United States",  cur:"$",   tuitionRange:[40000,300000],  avg:160000 },
  UK:{ label:"United Kingdom", cur:"£",   tuitionRange:[27000,150000],  avg:55000  },
  AU:{ label:"Australia",      cur:"A$",  tuitionRange:[30000,200000],  avg:90000  },
};

const UNIVERSITIES = {
  MY:["Monash University Malaysia","University of Malaya","Taylor's University","Sunway University","HELP University","UCSI University","Asia Pacific University","Other"],
  SG:["NUS","NTU","SMU","SUTD","SIT","Other"],
  US:["State University","Private University","Ivy League / T20","Community College Transfer","Other"],
  UK:["Russell Group","Other UK University","Other"],
  AU:["Monash University","University of Melbourne","UNSW","University of Sydney","Other"],
};

/* ─── RISK COLORS ─── */
function riskColor(r){ return r==="CRITICAL"?DPL.red:r==="SEVERE"?DPL.amber:r==="MODERATE"?DPL.link:DPL.green; }
function riskBg(r){    return r==="CRITICAL"?DPL.redSoft:r==="SEVERE"?DPL.amberSoft:r==="MODERATE"?"rgba(94,234,212,0.10)":DPL.greenSoft; }

/* ─── ANIMATED NUMBER ─── */
function AnimatedNumber({ value, prefix="", suffix="" }) {
  const [n, setN] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / 1200, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);
  return <>{prefix}{n.toLocaleString()}{suffix}</>;
}

/* ─── EYEBROW ─── */
function DEyebrow({ children, style={} }) {
  return (
    <div style={{ fontFamily:DPL.fM, fontSize:11, fontWeight:500, textTransform:"uppercase",
      letterSpacing:"0.18em", color:DPL.accent, display:"flex", alignItems:"center",
      gap:8, marginBottom:8, ...style }}>
      <span style={{ width:24, height:1, background:DPL.accent, flexShrink:0 }} />
      {children}
    </div>
  );
}

/* ─── SHARED STYLES ─── */
const DS = {
  btnPrimary:{ background:DPL.accent, color:DPL.accentOn, border:"none", borderRadius:6,
    fontFamily:DPL.fD, fontSize:14, fontWeight:600, letterSpacing:"-0.005em",
    padding:"12px 24px", cursor:"pointer", width:"100%",
    transition:`all 180ms ${DPL.easeSnap}` },
  btnGhost:{ background:"transparent", color:DPL.fg, border:`1px solid ${DPL.border}`,
    borderRadius:6, fontFamily:DPL.fD, fontSize:14, fontWeight:500,
    padding:"12px 24px", cursor:"pointer", width:"100%",
    transition:`all 180ms ${DPL.easeSnap}` },
  btnDanger:{ background:DPL.red, color:DPL.fg, border:"none", borderRadius:6,
    fontFamily:DPL.fD, fontSize:14, fontWeight:600, padding:"12px 24px",
    cursor:"pointer", width:"100%", boxShadow:"0 0 24px rgba(239,68,68,0.25)",
    transition:`all 180ms ${DPL.easeSnap}` },
  chip(active){ return active
    ? { background:DPL.accentSoft, color:DPL.accent, border:`1px solid ${DPL.accent}`,
        borderRadius:6, fontFamily:DPL.fD, fontSize:14, fontWeight:500,
        padding:"10px 16px", cursor:"pointer", boxShadow:DPL.ringFocus,
        transition:`all 100ms ${DPL.easeSnap}` }
    : { background:"transparent", color:DPL.fgMuted, border:`1px solid ${DPL.border}`,
        borderRadius:6, fontFamily:DPL.fD, fontSize:14, fontWeight:500,
        padding:"10px 16px", cursor:"pointer",
        transition:`all 100ms ${DPL.easeSnap}` }; },
  input:{ background:DPL.bgInput, border:`1px solid ${DPL.border}`, borderRadius:6,
    color:DPL.fg, fontFamily:DPL.fD, fontSize:16, padding:"12px 16px",
    width:"100%", boxSizing:"border-box",
    transition:`border-color 180ms ${DPL.easeSnap}` },
  card:{ background:DPL.bgCard, border:`1px solid ${DPL.border}`, borderRadius:10,
    padding:20, marginBottom:16 },
  miniCard:{ background:DPL.bgElevated, border:`1px solid ${DPL.border}`, borderRadius:6,
    padding:"14px 16px" },
};

/* ─── MAIN COMPONENT ─── */
function DegreeCalculator() {
  const [step, setStep] = useState(0);
  const [country, setCountry] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [tuition, setTuition] = useState("");
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState(3);
  const [results, setResults] = useState(null);
  const [visible, setVisible] = useState(false);

  function calc() {
    const d = DEGREES[degree], c = COUNTRIES[country];
    const total = parseFloat(tuition), annual = parseFloat(salary);
    const monthly = annual / 12;
    const living = {MY:1500,SG:2500,US:2000,UK:1500,AU:2000}[country];
    const savings = Math.max(monthly * 0.3, monthly - living);
    const beMonths = Math.ceil(total / Math.max(savings, 1));
    const beYears = beMonths / 12;
    const gradYear = 2026 + Math.max(0, years - (2026 - 2023));
    const beDate = gradYear + beYears;
    const autoYear = d.autoYear;
    const underwater = beDate > autoYear;
    const burnPerHour = total / (years * 14 * 40);
    const compression = beDate > 2027 ? Math.pow(2, beDate - 2027) : 1;
    const salaryBe = underwater ? annual * Math.max(0.2, 1 - (beDate - autoYear) * 0.3) : annual;
    const roi = ((salaryBe * beYears) - total) / total * 100;
    return { total, annual, beMonths, beYears, gradYear, beDate, autoYear,
             underwater, burnPerHour, compression, salaryBe, roi, c, d };
  }

  function goResults() {
    setResults(calc());
    setStep(4);
    setTimeout(() => setVisible(true), 80);
  }

  function reset() {
    setStep(0); setCountry(""); setUniversity(""); setDegree("");
    setTuition(""); setSalary(""); setYears(3);
    setResults(null); setVisible(false);
  }

  const c = COUNTRIES[country] || {};
  const d = DEGREES[degree] || {};

  /* ── STEP 0: Intro ── */
  const S0 = (
    <div style={{ animation:`pl-fade-in 0.6s ${DPL.easeOut} both` }}>
      <p style={{ color:DPL.fgMuted, fontSize:16, lineHeight:1.55, marginBottom:24 }}>
        This calculator uses the <strong style={{color:DPL.fg}}>Capital Burn Rate</strong> framework 
        from the Unit Navigator, overlaid against the AI-2027 displacement timeline. The result is 
        a number most career centers won't show you.
      </p>
      <p style={{ color:DPL.fgSubtle, fontSize:13, lineHeight:1.55, marginBottom:32,
        fontFamily:DPL.fM, fontStyle:"italic" }}>
        Not financial advice. Ground Truth reconnaissance.
      </p>
      <button onClick={() => setStep(1)} style={DS.btnPrimary}>Run the audit</button>
    </div>
  );

  /* ── STEP 1: Country + University ── */
  const S1 = (
    <div style={{ animation:`pl-fade-in 0.6s ${DPL.easeOut} both` }}>
      <DEyebrow>Location</DEyebrow>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
        {Object.entries(COUNTRIES).map(([k,v]) => (
          <button key={k} onClick={() => { setCountry(k); setUniversity(""); }}
            style={DS.chip(country===k)}>{v.label}</button>
        ))}
      </div>
      {country && <>
        <DEyebrow>University</DEyebrow>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
          {UNIVERSITIES[country].map(u => (
            <button key={u} onClick={() => setUniversity(u)}
              style={{ ...DS.chip(university===u), fontSize:13 }}>{u}</button>
          ))}
        </div>
      </>}
      {university && <button onClick={() => setStep(2)} style={DS.btnPrimary}>Next</button>}
    </div>
  );

  /* ── STEP 2: Degree + Duration ── */
  const S2 = (
    <div style={{ animation:`pl-fade-in 0.6s ${DPL.easeOut} both` }}>
      <DEyebrow>Degree</DEyebrow>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
        {Object.keys(DEGREES).map(k => (
          <button key={k} onClick={() => { setDegree(k); setSalary(DEGREES[k].sal[country]||""); }}
            style={{ ...DS.chip(degree===k), fontSize:13 }}>{k}</button>
        ))}
      </div>
      {degree && <>
        <DEyebrow>Duration</DEyebrow>
        <div style={{ display:"flex", gap:8, marginBottom:24 }}>
          {[3,3.5,4,5,6].map(y => (
            <button key={y} onClick={() => setYears(y)} style={DS.chip(years===y)}>{y}yr</button>
          ))}
        </div>
        <button onClick={() => setStep(3)} style={DS.btnPrimary}>Next</button>
      </>}
    </div>
  );

  /* ── STEP 3: Tuition + Salary ── */
  const defaultSal = d.sal?.[country] || 40000;
  const S3 = (
    <div style={{ animation:`pl-fade-in 0.6s ${DPL.easeOut} both` }}>
      <DEyebrow>Total tuition ({c.cur})</DEyebrow>
      <input type="number" placeholder={`e.g. ${(c.avg||45000).toLocaleString()}`}
        value={tuition} onChange={e => setTuition(e.target.value)} style={DS.input}
        onFocus={e => { e.target.style.borderColor=DPL.accent; e.target.style.boxShadow=DPL.ringFocus; }}
        onBlur={e  => { e.target.style.borderColor=DPL.border; e.target.style.boxShadow="none"; }} />
      <p style={{ fontFamily:DPL.fM, fontSize:12, color:DPL.fgSubtle, margin:"4px 0 20px" }}>
        Range: {c.cur}{(c.tuitionRange||[0,0])[0].toLocaleString()} to {c.cur}{(c.tuitionRange||[0,0])[1].toLocaleString()}
      </p>

      <DEyebrow>Target starting salary ({c.cur}/yr)</DEyebrow>
      <input type="number" placeholder={`e.g. ${defaultSal.toLocaleString()}`}
        value={salary} onChange={e => setSalary(e.target.value)} style={DS.input}
        onFocus={e => { e.target.style.borderColor=DPL.accent; e.target.style.boxShadow=DPL.ringFocus; }}
        onBlur={e  => { e.target.style.borderColor=DPL.border; e.target.style.boxShadow="none"; }} />
      <p style={{ fontFamily:DPL.fM, fontSize:12, color:DPL.fgSubtle, margin:"4px 0 24px" }}>
        Average for {degree}: ~{c.cur}{defaultSal.toLocaleString()}/yr
      </p>

      {tuition && salary && (
        <button onClick={goResults} style={DS.btnDanger}>
          Show me the Ground Truth
        </button>
      )}
    </div>
  );

  /* ── STEP 4: Results ── */
  const R = results;
  const S4 = R && (
    <div style={{ animation: visible ? `pl-fade-in 0.8s ${DPL.easeOut} both` : "none",
      opacity: visible ? 1 : 0 }}>

      {/* VERDICT */}
      <div style={{ textAlign:"center", marginBottom:32 }}>
        <DEyebrow style={{ justifyContent:"center" }}>AI-2027 displacement verdict</DEyebrow>
        <div style={{ fontFamily:DPL.fD, fontSize:56, fontWeight:900,
          letterSpacing:"-0.04em", lineHeight:1.04, color:riskColor(R.d.risk),
          textShadow: R.d.risk==="CRITICAL" ? "0 0 32px rgba(239,68,68,0.4)"
                    : R.d.risk==="SEVERE"   ? "0 0 32px rgba(245,158,11,0.3)"
                    : DPL.textGlow }}>
          {R.d.risk}
        </div>
        <div style={{ fontFamily:DPL.fM, fontSize:12, color:DPL.fgSubtle, marginTop:8,
          letterSpacing:"0.05em" }}>
          {degree} · {R.c.label}
        </div>
      </div>

      {/* BURN RATE */}
      <div style={{ ...DS.card, boxShadow:DPL.glowSoft }}>
        <DEyebrow>Capital Burn Rate</DEyebrow>
        <div style={{ fontFamily:DPL.fD, fontSize:40, fontWeight:900,
          letterSpacing:"-0.04em", color:DPL.fg, lineHeight:1 }}>
          {R.c.cur}<AnimatedNumber value={Math.round(R.burnPerHour)} />
          <span style={{ fontSize:16, fontWeight:500, color:DPL.fgMuted, letterSpacing:0 }}>/hr</span>
        </div>
        <p style={{ fontSize:14, color:DPL.fgMuted, lineHeight:1.55, margin:"8px 0 0" }}>
          Every hour in a lecture costs {R.c.cur}{Math.round(R.burnPerHour)}. 
          An AI agent costs {R.c.cur}{{MY:"2 to 8",SG:"5 to 20",US:"20 to 100",UK:"5 to 20",AU:"5 to 20"}[country]}/hr and works 24/7.
        </p>
      </div>

      {/* TIMELINE COLLISION */}
      <div style={{ ...DS.card, padding:0, overflow:"hidden" }}>
        <div style={{ padding:"20px 20px 12px" }}>
          <DEyebrow>Timeline collision map</DEyebrow>
        </div>
        {/* Dot grid background on timeline */}
        <div style={{ position:"relative", height:130, margin:"0 20px 0",
          background:DPL.bgElevated, borderRadius:6, border:`1px solid ${DPL.border}`,
          backgroundImage:DPL.gridBg, backgroundSize:"64px 64px" }}>
          <div style={{ position:"absolute", top:58, left:12, right:12, height:2,
            background:DPL.borderStrong }} />
          {[
            { year:2026,        label:"Now",         color:DPL.fg },
            { year:R.gradYear,  label:"Graduate",    color:DPL.link },
            { year:R.autoYear,  label:"AI displaces",color:DPL.red },
            { year:R.beDate,    label:"Breakeven",   color:R.underwater ? DPL.red : DPL.green },
          ].sort((a,b) => a.year-b.year).map((m,i) => {
            const minY=2025.5;
            const maxY=Math.max(R.beDate,R.autoYear,R.gradYear)+1;
            const pct=Math.min(90,Math.max(10,((m.year-minY)/(maxY-minY))*100));
            return (
              <div key={i} style={{ position:"absolute", left:`${pct}%`, top:14,
                transform:"translateX(-50%)", textAlign:"center", width:80 }}>
                <div style={{ fontFamily:DPL.fM, fontSize:9, fontWeight:600,
                  color:m.color, textTransform:"uppercase", letterSpacing:"0.08em",
                  whiteSpace:"nowrap" }}>{m.label}</div>
                <div style={{ fontFamily:DPL.fM, fontSize:11, color:m.color }}>
                  {m.year.toFixed(1)}
                </div>
                <div style={{ width:2, height:22, background:m.color, margin:"3px auto",
                  opacity:0.7, boxShadow:`0 0 8px ${m.color}` }} />
                <div style={{ width:10, height:10, borderRadius:"50%",
                  background:m.color, margin:"0 auto",
                  boxShadow:`0 0 12px ${m.color}80` }} />
              </div>
            );
          })}
        </div>
        <div style={{ padding:"14px 20px 20px", marginTop:16,
          background: R.underwater ? DPL.redSoft : DPL.greenSoft,
          borderTop:`1px solid ${DPL.border}` }}>
          <div style={{ fontFamily:DPL.fD, fontSize:14, fontWeight:600,
            color: R.underwater ? DPL.red : DPL.green }}>
            {R.underwater
              ? `You break even ${(R.beDate-R.autoYear).toFixed(1)} years AFTER AI displaces this role's salary.`
              : `You break even ${Math.abs(R.beDate-R.autoYear).toFixed(1)} years BEFORE peak AI displacement.`}
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, margin:"16px 0" }}>
        {[
          { l:"Breakeven",        v:<><AnimatedNumber value={R.beMonths}/> months</>,      s:`${R.beYears.toFixed(1)} years post-grad` },
          { l:"AI-adjusted ROI",  v:<><AnimatedNumber value={Math.round(R.roi)} suffix="%"/></>, s:R.roi<0?"Negative return":"Positive return", c:R.roi<0?DPL.red:DPL.green },
          { l:"Salary at breakeven", v:<>{R.c.cur}<AnimatedNumber value={Math.round(R.salaryBe)}/></>, s:R.salaryBe<R.annual?"AI-compressed":"Intact" },
          { l:"Time compression", v:<><AnimatedNumber value={Math.round(R.compression)} suffix="×"/></>, s:"AI progress multiplier" },
        ].map((m,i) => (
          <div key={i} style={DS.miniCard}>
            <div style={{ fontFamily:DPL.fM, fontSize:11, fontWeight:500, letterSpacing:"0.12em",
              textTransform:"uppercase", color:DPL.fgSubtle, marginBottom:4 }}>{m.l}</div>
            <div style={{ fontFamily:DPL.fD, fontSize:22, fontWeight:800,
              letterSpacing:"-0.02em", color:m.c||DPL.fg }}>{m.v}</div>
            <div style={{ fontSize:12, color:DPL.fgSubtle, marginTop:2 }}>{m.s}</div>
          </div>
        ))}
      </div>

      {/* AI-2027 DISPLACEMENT PHASE */}
      <div style={{ ...DS.card, borderLeft:`3px solid ${riskColor(R.d.risk)}` }}>
        <DEyebrow>Displacement phase: {degree}</DEyebrow>
        <p style={{ fontSize:14, color:DPL.fg, lineHeight:1.55, margin:"0 0 16px" }}>{R.d.phase}</p>
        <div style={{ width:"100%", height:1, background:DPL.divider, margin:"16px 0" }} />
        <DEyebrow>Career moat strategy</DEyebrow>
        <p style={{ fontSize:14, color:DPL.fg, lineHeight:1.55, margin:0 }}>{R.d.moat}</p>
      </div>

      {/* GROUND TRUTH, chosen-glow card */}
      <div style={{ background:DPL.accent, color:DPL.accentOn, padding:"24px 20px",
        borderRadius:14, marginBottom:16, boxShadow:DPL.chosenGlow }}>
        <div style={{ fontFamily:DPL.fM, fontSize:11, fontWeight:500, letterSpacing:"0.18em",
          textTransform:"uppercase", opacity:0.55, marginBottom:8 }}>The ground truth</div>
        <p style={{ fontSize:15, lineHeight:1.6, margin:0, fontWeight:500 }}>
          Your degree is a {R.c.cur}{R.total.toLocaleString()} bet that "{degree}" will still pay {R.c.cur}{R.annual.toLocaleString()}/yr by {R.beDate.toFixed(0)}.
          The AI-2027 scenario shows major displacement by {R.autoYear.toFixed(0)}.{" "}
          {R.underwater
            ? `You're investing in a depreciating asset. Your burn rate of ${R.c.cur}${Math.round(R.burnPerHour)}/hr buys credentials for a market that may not exist at graduation salary.`
            : `You have a narrow window. Use it to build a Career Moat, not just a transcript.`}
        </p>
      </div>

      {/* FOOTER CTA */}
      <div style={{ textAlign:"center", padding:"16px 0 8px" }}>
        <p style={{ fontFamily:DPL.fM, fontSize:11, color:DPL.fgSubtle,
          letterSpacing:"0.08em", lineHeight:1.55, marginBottom:12 }}>
          Unit Navigator by Pascal Leong · Strategic Architect
        </p>
        <button onClick={reset} style={DS.btnGhost}>↺ Run another audit</button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily:DPL.fD, maxWidth:520, margin:"0 auto", padding:"0 4px",
      color:DPL.fg, background:"transparent",
      WebkitFontSmoothing:"antialiased", MozOsxFontSmoothing:"grayscale" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes pl-fade-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pl-pulse-ring { 0%{box-shadow:0 0 0 0 rgba(45,212,191,0.45)} 100%{box-shadow:0 0 0 14px rgba(45,212,191,0)} }
        input::placeholder { color: ${DPL.fgSubtle}; font-family: ${DPL.fM}; font-size:13px; }
        button:hover  { opacity: 0.85; }
        button:active { transform: scale(0.97); }
        ::selection   { background: ${DPL.accent}; color: ${DPL.accentOn}; }
      `}</style>

      {/* HEADER */}
      <div style={{ textAlign:"center", padding:"32px 0 28px",
        borderBottom:`1px solid ${DPL.border}`, marginBottom:28 }}>
        <DEyebrow style={{ justifyContent:"center" }}>Unit Navigator × AI-2027</DEyebrow>
        <h1 style={{ fontFamily:DPL.fD, fontSize:32, fontWeight:900, color:DPL.fg,
          letterSpacing:"-0.04em", lineHeight:1.04, margin:"12px 0 8px" }}>
          What's your degree<br />actually worth?
        </h1>
        <p style={{ fontSize:14, color:DPL.fgMuted, margin:0, lineHeight:1.55 }}>
          Tuition ROI × AI displacement timeline
        </p>
      </div>

      {/* PROGRESS */}
      {step > 0 && step < 4 && (
        <div style={{ display:"flex", gap:4, marginBottom:24 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex:1, height:3, borderRadius:2,
              background: s<=step ? DPL.accent : DPL.border,
              boxShadow: s<=step ? DPL.glowSoft : "none",
              transition:`all 320ms ${DPL.easeOut}` }} />
          ))}
        </div>
      )}

      {step===0 && S0}
      {step===1 && S1}
      {step===2 && S2}
      {step===3 && S3}
      {step===4 && S4}

      {step > 0 && step < 4 && (
        <button onClick={() => setStep(step-1)}
          style={{ background:"none", border:"none", color:DPL.fgSubtle, fontSize:12,
            cursor:"pointer", marginTop:16, padding:0, fontFamily:DPL.fM }}>
          ← back
        </button>
      )}
    </div>
  );
}


Object.assign(window, { DegreeCalculator });
