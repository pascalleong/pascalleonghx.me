
window.PL_LINKS = {
  substack: "https://pascalleonghx.substack.com",
  subscribeAction: "https://pascalleonghx.substack.com/subscribe",
  essay1: "https://pascalleonghx.substack.com/p/is-your-degree-worth-rm50000-to-rm500000",
  issue1: "https://pascalleonghx.substack.com/p/ai-job-market-graduates-2026-degree-leverage",
  issue2: "https://pascalleonghx.substack.com/p/ai-skills-students-2026-basic-literacy-no-longer-advantage",
  issue3: "https://pascalleonghx.substack.com/p/gpt6-astra-foundation-debt-signal-collapse-entry-level-jobs-2026",
  instagram: "https://www.instagram.com/pascalleonghx",
  apply: "https://tally.so/r/LDD7p2",
  navigatorDuplicate: "https://pascalleonghx.notion.site/The-Unit-Navigator-v4-updated-Sept-18-2f5d22b726a980669066d03fa223f161",
  terms: "terms.html", refund: "refund.html", privacy: "privacy.html", contact: "contact.html",
  ga4Id: "G-PV2KYCSX74",
  clarityId: "CLARITY_ID_HERE"
};

const NavMenu = ({ label, items, active, onNav }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc); document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  const on = items.some((i) => i.id === active);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 44, padding: 0, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, letterSpacing: '0.02em', color: on || open ? 'var(--accent)' : 'var(--fg-muted)' }}>
        {label}<iconify-icon icon="ph:caret-down-bold" width="11" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-base)' }}></iconify-icon>
      </button>
      {open && (
        <div role="menu" style={{ position: 'absolute', top: '100%', left: -16, minWidth: 280, background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', padding: 6, boxShadow: '0 16px 40px var(--black-a50)', display: 'flex', flexDirection: 'column' }}>
          {items.map((it) => (
            <button key={it.id} role="menuitem" type="button" onClick={() => { setOpen(false); onNav(it.id); }} style={{ textAlign: 'left', background: active === it.id ? 'var(--accent-soft)' : 'none', border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)', minHeight: 44, padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 500, color: active === it.id ? 'var(--accent)' : 'var(--fg)' }}>{it.label}</button>
          ))}
        </div>
      )}
    </div>
  );
};

const NAV_FREE = [{ id: 'navigator', label: 'The Unit Navigator' }, { id: 'tools', label: 'The Busywork Calculator' }, { id: 'library', label: 'Library' }];
const NAV_WORK = [{ id: 'table', label: "1-on-1 · The Architect's Table" }, { id: 'sprint', label: 'Live cohort · The 28-Day Career Moat Sprint' }];

const ThemeToggle = ({ theme, onToggle }) => {
  const next = theme === 'light' ? 'dark' : 'light';
  return (
    <button type="button" data-no-track="" aria-label={next === 'light' ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => onToggle && onToggle(next)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--fg)', flexShrink: 0 }}>
      <iconify-icon icon={next === 'light' ? 'ph:sun-bold' : 'ph:moon-bold'} width="18"></iconify-icon>
    </button>
  );
};

const Header = ({ active, onNav, theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [sheet, setSheet] = React.useState(false);
  const [mobile, setMobile] = React.useState(() => window.matchMedia('(max-width: 1023px)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const on = () => { setMobile(mq.matches); if (!mq.matches) setSheet(false); };
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => {
    if (!sheet) return;
    const onKey = (e) => { if (e.key === 'Escape') setSheet(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sheet]);
  const go = (id) => { setSheet(false); onNav(id); };
  const headerBg = theme === 'light'
    ? (scrolled ? 'var(--gray-50-a85)' : 'var(--gray-50-a50)')
    : (scrolled ? 'var(--slate-950-a85)' : 'var(--slate-950-a40)');
  const linkStyle = (id) => ({ cursor: 'pointer', fontSize: 13, fontWeight: 500, letterSpacing: '0.02em', color: active === id ? 'var(--accent)' : 'var(--fg-muted)', background: 'none', display: 'inline-flex', alignItems: 'center', minHeight: 44 });
  const sheetGroup = (t) => <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', padding: '18px 0 6px' }}>{t}</div>;
  const sheetLink = (id, label) => <button key={id} type="button" onClick={() => go(id)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', minHeight: 48, padding: '12px 0', fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, color: active === id ? 'var(--accent)' : 'var(--fg)', cursor: 'pointer' }}>{label}</button>;
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: sheet ? 'var(--bg-canvas)' : headerBg, backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)', borderBottom: `1px solid ${scrolled || sheet ? 'var(--border)' : 'transparent'}`, transition: 'background var(--dur-base), border-color var(--dur-base)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: mobile ? '8px 16px' : scrolled ? '10px 32px' : '16px 32px', display: 'flex', alignItems: 'center', gap: mobile ? 8 : 16, transition: 'padding var(--dur-base)' }}>
        <a href="#/home" onClick={(e) => { e.preventDefault(); go('home'); }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', background: 'none' }}>
          {mobile ? <span style={{ color: theme === 'light' ? 'var(--fg)' : 'var(--accent)', display: 'inline-flex', alignItems: 'center', minHeight: 44, minWidth: 32 }}><CompassMark size={28} /></span> : <LogoFull height={scrolled ? 26 : 30} theme={theme} />}
        </a>
        <div style={{ flex: 1 }}></div>
        {!mobile && (
          <nav aria-label="Main" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <NavMenu label="Free" items={NAV_FREE} active={active} onNav={onNav} />
            <a href="#/kit" onClick={(e) => { e.preventDefault(); onNav('kit'); }} style={linkStyle('kit')}>Newsletter</a>
            <NavMenu label="Programs" items={NAV_WORK} active={active} onNav={onNav} />
            <a href="#/about" onClick={(e) => { e.preventDefault(); onNav('about'); }} style={linkStyle('about')}>About</a>
          </nav>
        )}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <PLButton onClick={() => go('table')} style={{ padding: mobile ? '10px 12px' : '11px 18px', fontSize: mobile ? 12 : 13 }} icon={mobile ? null : 'arrow-right'}>{mobile ? 'Apply For 1-on-1' : 'Apply For 1-on-1 With Pascal'}</PLButton>
        {mobile && (
          <button type="button" aria-label="Open menu" aria-expanded={sheet} onClick={() => setSheet(!sheet)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--fg)', flexShrink: 0 }}>
            <iconify-icon icon={sheet ? 'ph:x-bold' : 'ph:list-bold'} width="20"></iconify-icon>
          </button>
        )}
      </div>
      {mobile && sheet && (
        <nav aria-label="Menu" style={{ position: 'absolute', left: 0, right: 0, top: '100%', background: 'var(--bg-canvas)', borderBottom: '1px solid var(--border)', padding: '0 20px 24px', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto', boxSizing: 'border-box' }}>
          {sheetLink('home', 'Home')}
          {NAV_FREE.map((i) => sheetLink(i.id, i.label))}
          {sheetLink('kit', 'Newsletter')}
          {sheetGroup('Programs')}
          {NAV_WORK.map((i) => sheetLink(i.id, i.label))}
          {sheetLink('about', 'About')}
        </nav>
      )}
    </header>
  );
};

const Footer = ({ onNav }) => {
  const fl = { fontSize: 12.5, color: 'var(--fg-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', minHeight: 44 };
  const L = PL_LINKS;
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 32px 36px', marginTop: 140 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <LogoFull height={22} theme="dark" />
        <span style={{ flex: 1 }}></span>
        <span style={{ display: 'flex', gap: '4px 22px', flexWrap: 'wrap' }}>
          <a href="#/about" onClick={(e) => { e.preventDefault(); onNav && onNav('about'); }} style={fl}>About</a>
          <a href={L.terms} style={fl}>Terms</a>
          <a href={L.refund} style={fl}>Refund Policy</a>
          <a href={L.privacy} style={fl}>Privacy</a>
          <a href={L.contact} style={fl}>Contact</a>
          <a href={L.instagram} target="_blank" rel="noopener" style={fl}>Instagram <iconify-icon icon="ph:arrow-up-right-bold" width="11" style={{ marginLeft: 4 }}></iconify-icon></a>
        </span>
      </div>
    </footer>
  );
};

Object.assign(window, { PLHeader: Header, PLFooter: Footer });
