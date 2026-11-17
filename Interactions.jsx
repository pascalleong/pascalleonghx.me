// Interactions — scroll reveal, image lightbox, draggable auto-scroll gallery.

/* ---- Scroll reveal (fade-up) ----
   Robust against sandboxed iframes where IntersectionObserver may not fire:
   uses getBoundingClientRect + scroll/resize listeners, with IO as an enhancement. */
const Reveal = ({ children, delay = 0, as = 'div', className = '', style = {} }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      el.classList.add('is-visible');
      window.removeEventListener('scroll', check, true);
      window.removeEventListener('resize', check);
      if (io) io.disconnect();
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.92 && r.bottom > 0) reveal();
    };
    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) reveal(); }, { threshold: 0.08 });
      io.observe(el);
    }
    window.addEventListener('scroll', check, true);
    window.addEventListener('resize', check);
    // initial checks across a few frames (covers late layout / fonts)
    requestAnimationFrame(check);
    const t1 = setTimeout(check, 120);
    const t2 = setTimeout(check, 400);
    return () => {
      window.removeEventListener('scroll', check, true);
      window.removeEventListener('resize', check);
      if (io) io.disconnect();
      clearTimeout(t1); clearTimeout(t2);
    };
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`fade-up ${className}`} style={{ '--reveal-delay': `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
};

/* ---- Lightbox (blurred backdrop + zoom) ---- */
const LightboxContext = React.createContext(null);
const useLightbox = () => React.useContext(LightboxContext);

const LightboxProvider = ({ children }) => {
  const [item, setItem] = React.useState(null); // { src, caption }
  const [zoom, setZoom] = React.useState(1);

  const open = React.useCallback((it) => { setItem(it); setZoom(1); }, []);
  const close = React.useCallback(() => setItem(null), []);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(3, z + 0.25));
      if (e.key === '-') setZoom((z) => Math.max(1, z - 0.25));
    };
    if (item) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, close]);

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      {item && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(2,8,23,0.78)',
            backdropFilter: 'blur(18px) saturate(140%)',
            WebkitBackdropFilter: 'blur(18px) saturate(140%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 48,
            animation: 'pl-fade-in 220ms var(--ease-out) both',
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: '92vw', maxHeight: '88vh' }}>
            <img
              src={item.src}
              alt={item.caption || ''}
              style={{
                display: 'block',
                maxWidth: '92vw', maxHeight: '82vh',
                width: 'auto', height: 'auto',
                transform: `scale(${zoom})`,
                transformOrigin: 'center',
                transition: 'transform 220ms var(--ease-out)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-strong)',
                cursor: zoom < 3 ? 'zoom-in' : 'zoom-out',
                boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
              }}
              onClick={() => setZoom((z) => (z >= 3 ? 1 : z + 0.5))}
            />
            {/* controls */}
            <div style={{
              position: 'absolute', top: -44, right: 0,
              display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <button onClick={() => setZoom((z) => Math.max(1, z - 0.5))} style={lbBtn}>
                <iconify-icon icon="ph:minus-bold" width="16"></iconify-icon>
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)', minWidth: 44, textAlign: 'center' }}>
                {Math.round(zoom * 100)}%
              </span>
              <button onClick={() => setZoom((z) => Math.min(3, z + 0.5))} style={lbBtn}>
                <iconify-icon icon="ph:plus-bold" width="16"></iconify-icon>
              </button>
              <button onClick={close} style={{ ...lbBtn, marginLeft: 8 }}>
                <iconify-icon icon="ph:x-bold" width="16"></iconify-icon>
              </button>
            </div>
            {item.caption && (
              <div style={{
                position: 'absolute', bottom: -40, left: 0, right: 0,
                textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12,
                color: 'var(--fg-muted)', letterSpacing: '0.08em',
              }}>
                {item.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
};

const lbBtn = {
  width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  background: 'var(--bg-card)', border: '1px solid var(--border-strong)', color: 'var(--fg)',
  borderRadius: 'var(--radius-sm)', cursor: 'pointer',
};

/* A zoomable thumbnail that opens the lightbox */
const ZoomImage = ({ src, caption, style, className }) => {
  const lb = useLightbox();
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={() => lb.open({ src, caption })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden', ...style }}
    >
      <img src={src} alt={caption || ''} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 400ms var(--ease-out)', transform: hover ? 'scale(1.03)' : 'none' }} />
      <div style={{
        position: 'absolute', bottom: 12, right: 12,
        width: 34, height: 34, borderRadius: 'var(--radius-sm)',
        background: 'rgba(2,8,23,0.7)', backdropFilter: 'blur(8px)',
        border: '1px solid var(--border-strong)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)', opacity: hover ? 1 : 0.6, transition: 'opacity 200ms',
      }}>
        <iconify-icon icon="ph:magnifying-glass-plus-bold" width="16"></iconify-icon>
      </div>
    </div>
  );
};

/* ---- Draggable auto-scrolling gallery ---- */
const DraggableMarquee = ({ children, speed = 0.5, gap = 18 }) => {
  const scrollerRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const state = React.useRef({ dragging: false, startX: 0, startScroll: 0, paused: false, raf: 0 });

  React.useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const half = () => track.scrollWidth / 2;

    const tick = () => {
      const s = state.current;
      if (!s.paused && !s.dragging) {
        scroller.scrollLeft += speed;
        if (scroller.scrollLeft >= half()) scroller.scrollLeft -= half();
      }
      s.raf = requestAnimationFrame(tick);
    };
    state.current.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(state.current.raf);
  }, [speed]);

  const onPointerDown = (e) => {
    const s = state.current;
    s.dragging = true;
    s.startX = e.clientX;
    s.startScroll = scrollerRef.current.scrollLeft;
    scrollerRef.current.style.cursor = 'grabbing';
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    const s = state.current;
    if (!s.dragging) return;
    const half = trackRef.current.scrollWidth / 2;
    let next = s.startScroll - (e.clientX - s.startX);
    if (next < 0) next += half;
    if (next >= half) next -= half;
    scrollerRef.current.scrollLeft = next;
  };
  const endDrag = () => {
    state.current.dragging = false;
    if (scrollerRef.current) scrollerRef.current.style.cursor = 'grab';
  };

  return (
    <div
      ref={scrollerRef}
      onMouseEnter={() => (state.current.paused = true)}
      onMouseLeave={() => { state.current.paused = false; endDrag(); }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      style={{ overflowX: 'hidden', cursor: 'grab', userSelect: 'none', WebkitUserSelect: 'none', maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)' }}
    >
      <div ref={trackRef} style={{ display: 'flex', gap, width: 'max-content', paddingBlock: 4 }}>
        {children}
        {children}
      </div>
    </div>
  );
};

Object.assign(window, { Reveal, LightboxProvider, useLightbox, ZoomImage, DraggableMarquee });
