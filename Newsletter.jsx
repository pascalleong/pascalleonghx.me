// Newsletter — rendered in the LIGHT SYSTEM (deep-work reading context) even on the dark page,
// demonstrating both systems coexisting. Soft Black on White, Deep Teal CTA.

const Newsletter = () => {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  return (
    <section style={{ padding: '120px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
      <Reveal>
        <div data-theme="light" style={{
          background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: 'var(--radius-xl)',
          padding: 'clamp(36px, 5vw, 64px)', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center',
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0F766E', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ width: 22, height: 1, background: 'currentColor' }}></span>Project 12 · The weekly newsletter
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.6vw, 40px)', letterSpacing: '-0.035em', lineHeight: 1.08, margin: '0 0 16px', color: '#111111' }}>
              Frameworks, not motivation.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: '#4A4A4A', margin: 0, maxWidth: '44ch' }}>
              Every Tuesday: 3 Education × AI updates, 2 mental models, 1 move. Free.
            </p>
          </div>
          <div>
            {done ? (
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 'var(--radius-lg)', padding: 28, textAlign: 'center' }}>
                <iconify-icon icon="ph:check-circle-bold" width="34" style={{ color: '#0F766E' }}></iconify-icon>
                <p style={{ fontSize: 15, color: '#111', margin: '12px 0 0', fontWeight: 600 }}>You're in. Check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); window.plSubscribe(email); window.plTrack && window.plTrack('newsletter_submit', { location: window.plLoc ? window.plLoc(e.currentTarget) : '' }); setDone(true); }} style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 'var(--radius-lg)', padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#888', marginBottom: 10 }}>Your email</div>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  style={{ width: '100%', boxSizing: 'border-box', background: '#F8FAFC', color: '#111', border: '1px solid #E5E7EB', borderRadius: 'var(--radius-md)', padding: '14px 16px', fontSize: 15, fontFamily: 'var(--font-body)', marginBottom: 14 }}
                  onFocus={(e) => { e.target.style.borderColor = '#0F766E'; e.target.style.boxShadow = '0 0 0 2px rgba(15,118,110,0.18)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="submit" style={{
                  width: '100%', background: '#0F766E', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)',
                  padding: '14px 18px', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  Subscribe <iconify-icon icon="ph:arrow-right-bold" width="16"></iconify-icon>
                </button>
                <div style={{ fontSize: 12, color: '#888', marginTop: 12, textAlign: 'center' }}>Every Tuesday. Unsubscribe anytime.</div>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

Object.assign(window, { Newsletter });
