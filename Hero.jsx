// Hero: the "chosen one" metaphor, dialed to maximum drama.
// Cinematic 3D render: 10,000 identical applicants recede into the dark; ONE glows mint.

const ChosenCrowd = () => {
  return (
    <div style={{ position: 'relative', height: 500, overflow: 'hidden', borderRadius: 'var(--radius-lg)', background: 'var(--slate-950)' }}>
      {/* cinematic 3D crowd render: the one who escaped the default */}
      <img
        src="assets/hero-chosen-3d-centered.png"
        alt="One glowing figure standing out from a vast 3D crowd of identical grey figures"
        className="pl-hero-zoom"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: '50% 48%',
          transform: 'scale(1.02)',
        }}
      />

      {/* breathing mint halo over the chosen one to deepen the glow */}
      <div aria-hidden className="pl-halo" style={{
        position: 'absolute', left: '50%', top: '57%', width: 130, height: 130,
        background: 'radial-gradient(circle, var(--mint-500-a28), transparent 66%)',
        filter: 'blur(10px)', mixBlendMode: 'screen', pointerEvents: 'none',
        transform: 'translate(-50%, -50%)', opacity: 0.6,
      }}></div>

      {/* readability scrim so the corner labels stay legible over the render */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, var(--slate-950-a62) 0%, var(--slate-950-a00) 26%, var(--slate-950-a00) 72%, var(--slate-950-a70) 100%)',
      }}></div>

      {/* the verdict labels */}
      <div style={{ position: 'absolute', top: 22, left: 22, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', lineHeight: 1.7 }}>
        10,000 identical<br />applicants
      </div>
      <div style={{ position: 'absolute', top: 22, right: 22, textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 30, letterSpacing: '-0.04em', color: 'var(--accent)', lineHeight: 1 }} className="text-glow">1%</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginTop: 5, textShadow: '0 1px 8px var(--slate-950-a95)' }}>build the moat</div>
      </div>
      <div style={{ position: 'absolute', left: '50%', bottom: 18, transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>
        ↑ The one who escaped the default
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="dot-bg" style={{ position: 'relative', overflow: 'hidden', padding: '110px 32px 40px' }}>
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 42%, var(--mint-500-a10), transparent 50%)' }}></div>
    <style>{'@media (max-width: 767px){.pl-hero-br{display:none}}'}</style>
    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)', columnGap: 56, rowGap: 28, alignItems: 'center' }}>
      <div>
        <Reveal><Eyebrow><span style={{ letterSpacing: '2.4px' }}>FOR YEAR 2, 3, 4, 5 AND FINAL-SEMESTER STUDENTS</span></Eyebrow></Reveal>
        <Reveal delay={80}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(34px, 5.6vw, 68px)', letterSpacing: '-0.045em', lineHeight: 1.0, margin: '24px 0 0', color: 'var(--fg)', textWrap: 'balance' }}>
            You paid for the degree.
            <br className="pl-hero-br" /> <span style={{ color: 'var(--accent)' }} className="text-glow">Now make it pay you back.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '24px 0 28px', maxWidth: '50ch' }}>
            A free Notion page that prices every class hour of your degree and gives you a take, audit or skip call on every unit, before you enroll.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <NavigatorOptin id="hero-form" micro="1 email. Free forever. You also get my Tuesday issue, and you can unsubscribe in one click." />
        </Reveal>
      </div>
      <Reveal delay={200}>
        <div className="chosen-glow" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}><ChosenCrowd /></div>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="assets/framework-capital-burn.png" alt="" style={{ height: 64, width: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'block', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>WHAT YOU GET</div>
            <div style={{ fontSize: 15, lineHeight: 1.4, color: 'var(--fg)' }}>The 3-Phase Syllabus Audit in 1 Notion page</div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

Object.assign(window, { PLHero: Hero, ChosenCrowd });
