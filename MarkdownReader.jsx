// MarkdownReader — renders the essay markdown corpus as branded Light-System reading pages.
// Handles headings, paragraphs, blockquotes, lists, tables, code blocks, dividers, inline emphasis.

/* ---- inline emphasis: **bold**  *italic*  `code` ---- */
const renderInline = (text, keyBase) => {
  const out = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*)/g;
  let last = 0, m, i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) {
      out.push(<strong key={keyBase + '-' + i++} style={{ fontWeight: 700, color: 'var(--fg)' }}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('`')) {
      out.push(<code key={keyBase + '-' + i++} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88em', background: 'var(--accent-soft)', color: 'var(--accent)', padding: '2px 6px', borderRadius: 'var(--radius-xs)' }}>{tok.slice(1, -1)}</code>);
    } else {
      out.push(<em key={keyBase + '-' + i++} style={{ fontStyle: 'italic', color: 'var(--fg-muted)' }}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

const MD = {
  P: ({ children }) => <p style={{ fontSize: 18.5, lineHeight: 1.78, color: 'var(--fg-muted)', margin: '0 0 26px', fontWeight: 400, textWrap: 'pretty' }}>{children}</p>,
  H2: ({ children }) => <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3.4vw, 33px)', letterSpacing: '-0.03em', color: 'var(--fg)', margin: '56px 0 20px', lineHeight: 1.14, textWrap: 'balance' }}>{children}</h2>,
  H3: ({ children }) => <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 2.4vw, 24px)', letterSpacing: '-0.02em', color: 'var(--fg)', margin: '44px 0 16px', lineHeight: 1.2 }}>{children}</h3>,
  H4: ({ children }) => <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', color: 'var(--accent)', margin: '32px 0 12px', lineHeight: 1.3 }}>{children}</h4>,
};

const MDBlockquote = ({ lines }) => {
  const text = lines.join(' ').trim();
  // Long quotes (the Ground-Truth intros) become a pull-quote; short ones a callout.
  const big = text.length > 150;
  if (big) {
    return (
      <blockquote style={{ margin: '40px 0', padding: '8px 0 8px 30px', borderLeft: '3px solid var(--accent)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(20px, 2.6vw, 25px)', lineHeight: 1.4, letterSpacing: '-0.015em', color: 'var(--fg)', margin: 0, textWrap: 'pretty' }}>
          {renderInline(text, 'bq')}
        </p>
      </blockquote>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--accent-soft)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', borderRadius: 'var(--radius-md)', padding: '18px 22px', margin: '32px 0' }}>
      <iconify-icon icon="ph:compass-bold" width="20" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 3 }}></iconify-icon>
      <div style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--fg)' }}>{renderInline(text, 'cal')}</div>
    </div>
  );
};

const MDTable = ({ rows }) => {
  const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const header = cells(rows[0]);
  const body = rows.slice(2).map(cells); // rows[1] is the |---| separator
  return (
    <div style={{ margin: '32px 0', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14.5, lineHeight: 1.55 }}>
        <thead>
          <tr style={{ background: 'var(--gray-100)' }}>
            {header.map((h, i) => (
              <th key={i} style={{ textAlign: 'left', padding: '13px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg)', fontWeight: 600, borderBottom: '1px solid var(--border-strong)', verticalAlign: 'top' }}>{renderInline(h, 'th' + i)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, ri) => (
            <tr key={ri} style={{ borderTop: '1px solid var(--border)', background: ri % 2 ? 'var(--bg-canvas)' : 'transparent' }}>
              {r.map((c, ci) => (
                <td key={ci} style={{ padding: '13px 16px', color: ci === 0 ? 'var(--fg)' : 'var(--fg-muted)', fontWeight: ci === 0 ? 600 : 400, verticalAlign: 'top' }}>{renderInline(c, `td${ri}-${ci}`)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ---- the parser ---- */
const Markdown = ({ source }) => {
  const lines = source.split('\n');
  const blocks = [];
  let i = 0;
  const n = lines.length;
  while (i < n) {
    let line = lines[i];
    const t = line.trim();
    if (t === '') { i++; continue; }

    if (t === '---') { blocks.push({ type: 'hr' }); i++; continue; }

    if (t.startsWith('#### ')) { blocks.push({ type: 'h4', text: t.slice(5) }); i++; continue; }
    if (t.startsWith('### ')) { blocks.push({ type: 'h3', text: t.slice(4) }); i++; continue; }
    if (t.startsWith('## ')) { blocks.push({ type: 'h2', text: t.slice(3) }); i++; continue; }
    if (t.startsWith('# ')) { blocks.push({ type: 'h2', text: t.slice(2) }); i++; continue; }

    if (t.startsWith('```')) {
      const buf = []; i++;
      while (i < n && !lines[i].trim().startsWith('```')) { buf.push(lines[i]); i++; }
      i++;
      blocks.push({ type: 'code', text: buf.join('\n') });
      continue;
    }

    if (t.startsWith('|')) {
      const buf = [];
      while (i < n && lines[i].trim().startsWith('|')) { buf.push(lines[i].trim()); i++; }
      blocks.push({ type: 'table', rows: buf });
      continue;
    }

    if (t.startsWith('> ')) {
      const buf = [];
      while (i < n && lines[i].trim().startsWith('>')) { buf.push(lines[i].trim().replace(/^>\s?/, '')); i++; }
      blocks.push({ type: 'quote', lines: buf.filter((x) => x !== '') });
      continue;
    }

    if (/^[-*]\s/.test(t)) {
      const buf = [];
      while (i < n && /^[-*]\s/.test(lines[i].trim())) { buf.push(lines[i].trim().replace(/^[-*]\s/, '')); i++; }
      blocks.push({ type: 'ul', items: buf });
      continue;
    }

    if (/^\d+\.\s/.test(t)) {
      const buf = [];
      while (i < n && /^\d+\.\s/.test(lines[i].trim())) { buf.push(lines[i].trim().replace(/^\d+\.\s/, '')); i++; }
      blocks.push({ type: 'ol', items: buf });
      continue;
    }

    // paragraph — gather until blank or a block starter
    const buf = [line.trim()];
    i++;
    while (i < n) {
      const nt = lines[i].trim();
      if (nt === '' || nt === '---' || nt.startsWith('#') || nt.startsWith('>') || nt.startsWith('|') || nt.startsWith('```') || /^[-*]\s/.test(nt) || /^\d+\.\s/.test(nt)) break;
      buf.push(nt); i++;
    }
    blocks.push({ type: 'p', text: buf.join(' ') });
  }

  return (
    <div>
      {blocks.map((b, idx) => {
        switch (b.type) {
          case 'hr': return <hr key={idx} style={{ border: 0, borderTop: '1px solid var(--border)', margin: '48px 0' }} />;
          case 'h2': return <MD.H2 key={idx}>{renderInline(b.text, 'h2' + idx)}</MD.H2>;
          case 'h3': return <MD.H3 key={idx}>{renderInline(b.text, 'h3' + idx)}</MD.H3>;
          case 'h4': return <MD.H4 key={idx}>{renderInline(b.text, 'h4' + idx)}</MD.H4>;
          case 'quote': return <MDBlockquote key={idx} lines={b.lines} />;
          case 'table': return <MDTable key={idx} rows={b.rows} />;
          case 'code': return (
            <pre key={idx} style={{ margin: '32px 0', background: 'var(--gray-950)', color: 'var(--mint-300)', borderRadius: 'var(--radius-lg)', padding: '22px 24px', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.6, border: '1px solid var(--border-strong)' }}>{b.text}</pre>
          );
          case 'ul': return (
            <ul key={idx} style={{ margin: '0 0 26px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {b.items.map((it, j) => (
                <li key={j} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', fontSize: 17.5, lineHeight: 1.6, color: 'var(--fg-muted)' }}>
                  <iconify-icon icon="ph:arrow-right-bold" width="16" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 5 }}></iconify-icon>
                  <span>{renderInline(it, 'ul' + idx + '-' + j)}</span>
                </li>
              ))}
            </ul>
          );
          case 'ol': return (
            <ol key={idx} style={{ margin: '0 0 26px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, counterReset: 'li' }}>
              {b.items.map((it, j) => (
                <li key={j} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', fontSize: 17.5, lineHeight: 1.62, color: 'var(--fg-muted)' }}>
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'var(--accent-soft)', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{j + 1}</span>
                  <span>{renderInline(it, 'ol' + idx + '-' + j)}</span>
                </li>
              ))}
            </ol>
          );
          default: return <MD.P key={idx}>{renderInline(b.text, 'p' + idx)}</MD.P>;
        }
      })}
    </div>
  );
};

Object.assign(window, { Markdown, renderInline });
