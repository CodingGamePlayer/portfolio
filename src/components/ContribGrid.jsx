// 52-week × 7-day GitHub contribution grid
const MONTH_LABELS_KO = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
const MONTH_LABELS_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS_KO = ['','월','','수','','금',''];
const DAY_LABELS_EN = ['','Mon','','Wed','','Fri',''];

function ContribGrid({ theme, strings, lang, palette, density, data }) {
  const [hover, setHover] = React.useState(null);
  const cell = density === 'compact' ? 10 : 12;
  const gap = density === 'compact' ? 2 : 3;
  const months = lang === 'ko' ? MONTH_LABELS_KO : MONTH_LABELS_EN;
  const days = lang === 'ko' ? DAY_LABELS_KO : DAY_LABELS_EN;

  // Month label positions — show label when the first Sunday of a new month appears
  const monthLabels = [];
  let lastMonth = -1;
  data.grid.forEach((col, wi) => {
    const d = new Date(col[0].date);
    const m = d.getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ wi, label: months[m] });
      lastMonth = m;
    }
  });

  return (
    <section data-screen-label="contributions" style={{
      borderBottom: `1px solid ${theme.border}`,
      padding: density === 'compact' ? '24px 28px' : '40px 48px',
    }}>
      <SectionHeader theme={theme} density={density}
        n="02"
        title={strings.contribTitle}
        sub={strings.contribSub} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 240px',
        gap: 40,
        alignItems: 'start',
        marginTop: 24,
      }}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'inline-block', minWidth: '100%' }}>
            {/* Month row */}
            <div style={{ display: 'flex', marginLeft: 30, height: 14, position: 'relative', fontFamily: theme.fontMono, fontSize: 10, color: theme.textDim }}>
              {monthLabels.map((ml, i) => (
                <div key={i} style={{ position: 'absolute', left: ml.wi * (cell + gap) }}>{ml.label}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {/* Day labels */}
              <div style={{ display: 'grid', gridTemplateRows: `repeat(7, ${cell}px)`, rowGap: gap, fontFamily: theme.fontMono, fontSize: 10, color: theme.textDim, width: 26, paddingTop: 2 }}>
                {days.map((d, i) => <div key={i} style={{ lineHeight: `${cell}px` }}>{d}</div>)}
              </div>
              {/* Grid */}
              <div style={{ display: 'flex', gap, paddingTop: 2 }}>
                {data.grid.map((col, wi) => (
                  <div key={wi} style={{ display: 'grid', gridTemplateRows: `repeat(7, ${cell}px)`, rowGap: gap }}>
                    {col.map((c, di) => {
                      const bg = c.isFuture ? 'transparent' : palette[c.level];
                      const border = c.isFuture ? 'transparent' : (c.level === 0 ? `1px solid ${theme.border}` : 'none');
                      return (
                        <div
                          key={di}
                          onMouseEnter={() => !c.isFuture && setHover({ ...c, wi, di })}
                          onMouseLeave={() => setHover(null)}
                          style={{
                            width: cell, height: cell,
                            background: bg,
                            outline: border !== 'none' ? undefined : 'none',
                            border: border === 'none' ? 'none' : border,
                            borderRadius: theme.id === 'modern' ? 2 : 0,
                            cursor: c.isFuture ? 'default' : 'pointer',
                            boxShadow: c.level >= 3 ? theme.glow : 'none',
                            transition: 'transform 120ms',
                            transform: hover && hover.wi === wi && hover.di === di ? 'scale(1.4)' : 'scale(1)',
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, marginLeft: 30, fontFamily: theme.fontMono, fontSize: 10, color: theme.textDim }}>
              <span>{strings.contribLegend[0]}</span>
              {palette.map((c, i) => (
                <div key={i} style={{
                  width: cell, height: cell, background: c,
                  border: i === 0 ? `1px solid ${theme.border}` : 'none',
                  borderRadius: theme.id === 'modern' ? 2 : 0,
                }} />
              ))}
              <span>{strings.contribLegend[1]}</span>
              <span style={{ marginLeft: 'auto', minHeight: 12 }}>
                {hover && (
                  <span style={{ color: theme.textBright }}>
                    {hover.count} {lang === 'ko' ? '커밋' : 'commits'} · {hover.date}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
        {/* Stats card */}
        <div style={{
          border: `1px solid ${theme.border}`,
          background: theme.panelSoft,
          fontFamily: theme.fontMono,
          fontSize: 12,
        }}>
          <div style={{ padding: '8px 12px', borderBottom: `1px solid ${theme.border}`, color: theme.textDim }}>
            ~/stats.json
          </div>
          <div style={{ padding: '14px 16px', color: theme.text }}>
            <div style={{ display: 'flex', padding: '4px 0' }}>
              <span style={{ color: theme.textDim, width: 100 }}>total</span>
              <span style={{ color: theme.textBright }}>{data.total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', padding: '4px 0' }}>
              <span style={{ color: theme.textDim, width: 100 }}>current</span>
              <span style={{ color: theme.accent }}>{data.streak}d</span>
            </div>
            <div style={{ display: 'flex', padding: '4px 0' }}>
              <span style={{ color: theme.textDim, width: 100 }}>longest</span>
              <span style={{ color: theme.textBright }}>{data.longest}d</span>
            </div>
            <div style={{ display: 'flex', padding: '4px 0' }}>
              <span style={{ color: theme.textDim, width: 100 }}>avg/week</span>
              <span style={{ color: theme.textBright }}>{(data.total / 52).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ theme, density, n, title, sub }) {
  return (
    <div style={{ fontFamily: theme.fontMono }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span style={{ color: theme.textDim, fontSize: 12 }}>[{n}]</span>
        <h2 style={{
          color: theme.textBright,
          fontSize: density === 'compact' ? 22 : 28,
          margin: 0,
          fontWeight: 700,
          textShadow: theme.glow,
        }}>
          <span style={{ color: theme.accent }}>$ </span>{title}
        </h2>
      </div>
      <div style={{ color: theme.textDim, fontSize: 12, marginTop: 6 }}>
        # {sub}
      </div>
    </div>
  );
}

window.ContribGrid = ContribGrid;
window.SectionHeader = SectionHeader;
