// Timeline + sticky detail panel
function ProjectsSection({ theme, strings, lang, density, projects, selectedId, setSelectedId }) {
  return (
    <section data-screen-label="projects" style={{
      borderBottom: `1px solid ${theme.border}`,
      padding: density === 'compact' ? '24px 28px' : '40px 48px',
    }}>
      <SectionHeader theme={theme} density={density}
        n="03" title={strings.timelineTitle} sub={strings.timelineSub} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(340px, 440px) minmax(0, 1fr)',
        gap: 32,
        marginTop: 28,
        alignItems: 'start',
      }}>
        <Timeline theme={theme} density={density} lang={lang} projects={projects}
          selectedId={selectedId} setSelectedId={setSelectedId} />
        <DetailPanel theme={theme} density={density} lang={lang} strings={strings}
          project={projects.find(p => p.id === selectedId)} />
      </div>
    </section>
  );
}

function Timeline({ theme, density, lang, projects, selectedId, setSelectedId }) {
  // Group by year
  const years = {};
  projects.forEach(p => { (years[p.year] = years[p.year] || []).push(p); });
  const yearKeys = Object.keys(years).sort().reverse();

  return (
    <div style={{ fontFamily: theme.fontMono, position: 'relative' }}>
      {yearKeys.map(y => (
        <div key={y} style={{ marginBottom: 28 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: theme.textDim,
            fontSize: 11,
            marginBottom: 10,
            letterSpacing: 1,
          }}>
            <span style={{ color: theme.accent }}>▸</span>
            <span style={{ color: theme.textBright }}>{y}</span>
            <span style={{ flex: 1, height: 1, background: theme.border }} />
            <span>{years[y].length} projects</span>
          </div>
          <div style={{ position: 'relative', paddingLeft: 18 }}>
            <div style={{
              position: 'absolute', left: 4, top: 6, bottom: 6, width: 1,
              background: theme.border,
            }} />
            {years[y].map(p => {
              const active = p.id === selectedId;
              return (
                <button key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: active ? theme.panel : 'transparent',
                    border: `1px solid ${active ? theme.accent : 'transparent'}`,
                    borderLeft: `1px solid ${active ? theme.accent : 'transparent'}`,
                    padding: density === 'compact' ? '8px 12px' : '12px 14px',
                    margin: '4px 0',
                    cursor: 'pointer',
                    color: 'inherit',
                    fontFamily: 'inherit',
                    position: 'relative',
                    transition: 'background 120ms, border 120ms',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = theme.panelSoft; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  {/* node */}
                  <span style={{
                    position: 'absolute',
                    left: -18,
                    top: density === 'compact' ? 12 : 16,
                    width: 9, height: 9,
                    background: active ? theme.accent : theme.bg,
                    border: `1px solid ${active ? theme.accent : theme.muted}`,
                    borderRadius: theme.id === 'modern' ? '50%' : 0,
                    boxShadow: active ? theme.glow : 'none',
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: theme.textDim }}>
                    <span>{p.date}</span>
                    <Tag theme={theme} kind={p.tag} />
                    <Status theme={theme} status={p.status} />
                  </div>
                  <div style={{
                    fontSize: density === 'compact' ? 14 : 15,
                    color: active ? theme.textBright : theme.text,
                    marginTop: 4,
                    fontWeight: 600,
                  }}>
                    {p.name}
                  </div>
                  <div style={{ color: theme.textDim, fontSize: 12, marginTop: 3, textWrap: 'pretty' }}>
                    {p.oneliner}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function Tag({ theme, kind }) {
  const map = {
    WORK: { bg: theme.accent, fg: theme.bg },
    OSS:  { bg: 'transparent', fg: theme.accent, border: theme.accent },
    SIDE: { bg: 'transparent', fg: theme.textDim, border: theme.muted },
  };
  const s = map[kind] || map.WORK;
  return (
    <span style={{
      fontSize: 9,
      letterSpacing: 1,
      padding: '2px 6px',
      background: s.bg,
      color: s.fg,
      border: s.border ? `1px solid ${s.border}` : 'none',
      fontWeight: 700,
    }}>{kind}</span>
  );
}

function Status({ theme, status }) {
  const color = status === 'active' ? theme.accent
             : status === 'shipped' ? theme.text
             : status === 'maintained' ? theme.warn
             : theme.textDim;
  return (
    <span style={{ fontSize: 10, color, display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: status === 'active' ? `0 0 6px ${color}` : 'none' }} />
      {status}
    </span>
  );
}

function DetailPanel({ theme, density, lang, strings, project }) {
  const [tab, setTab] = React.useState(0);
  React.useEffect(() => { setTab(0); }, [project && project.id]);

  if (!project) return null;
  const tabKeys = ['problem', 'plan', 'design', 'build'];
  const content = project[tabKeys[tab]] || [];

  return (
    <div style={{
      position: 'sticky',
      top: 20,
      fontFamily: theme.fontMono,
      border: `1px solid ${theme.border}`,
      background: theme.panel,
      fontSize: 12,
    }}>
      {/* Window chrome */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '10px 14px',
        borderBottom: `1px solid ${theme.border}`,
        background: theme.panelSoft,
        gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <Dot c={theme.danger} /><Dot c={theme.warn} /><Dot c={theme.accent} />
        </div>
        <div style={{ color: theme.textDim, marginLeft: 6 }}>
          ~/projects/{project.name}.md
        </div>
        <div style={{ marginLeft: 'auto', color: theme.textDim, fontSize: 10 }}>
          {project.date}
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: density === 'compact' ? '18px 20px 8px' : '24px 28px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Tag theme={theme} kind={project.tag} />
          <Status theme={theme} status={project.status} />
          <span style={{ color: theme.textDim }}>· role: <span style={{ color: theme.text }}>{project.role}</span></span>
        </div>
        <h3 style={{
          margin: 0,
          color: theme.textBright,
          fontSize: density === 'compact' ? 22 : 28,
          fontWeight: 700,
          letterSpacing: -0.5,
          textShadow: theme.glow,
        }}>
          {project.name}
          <span style={{ color: theme.accent }}>()</span>
        </h3>
        <div style={{ color: theme.text, fontSize: 13, marginTop: 6, textWrap: 'pretty' }}>
          {project.oneliner}
        </div>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {project.stack.map(s => (
            <span key={s} style={{
              fontSize: 10,
              padding: '3px 7px',
              color: theme.text,
              background: theme.panelSoft,
              border: `1px solid ${theme.border}`,
            }}>{s}</span>
          ))}
        </div>

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
            gap: 0,
            marginTop: 18,
            border: `1px solid ${theme.border}`,
          }}>
            {project.metrics.map((m, i) => (
              <div key={i} style={{
                padding: '10px 12px',
                borderRight: i < project.metrics.length - 1 ? `1px solid ${theme.border}` : 'none',
                background: theme.panelSoft,
              }}>
                <div style={{ color: theme.textDim, fontSize: 10, letterSpacing: 0.5 }}>{m.k}</div>
                <div style={{ color: theme.accent, fontSize: 18, fontWeight: 700, marginTop: 2, textShadow: theme.glow }}>{m.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`, marginTop: 14 }}>
        {strings.detailTabs.map((t, i) => {
          const active = tab === i;
          return (
            <button key={i}
              onClick={() => setTab(i)}
              style={{
                flex: 1,
                padding: '10px 12px',
                background: active ? theme.bg : 'transparent',
                color: active ? theme.accent : theme.textDim,
                border: 'none',
                borderRight: i < strings.detailTabs.length - 1 ? `1px solid ${theme.border}` : 'none',
                borderBottom: active ? `2px solid ${theme.accent}` : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 12,
                textAlign: 'center',
                fontWeight: active ? 700 : 400,
              }}
            >
              <span style={{ color: theme.textDim, marginRight: 4 }}>0{i+1}.</span>{t}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ padding: density === 'compact' ? '18px 20px' : '24px 28px' }}>
        {tab === 2 && project.diagram && (
          <pre style={{
            margin: '0 0 16px',
            padding: '14px 16px',
            background: theme.bg,
            border: `1px solid ${theme.border}`,
            color: theme.textBright,
            fontFamily: theme.fontMono,
            fontSize: 11,
            lineHeight: 1.55,
            overflowX: 'auto',
            whiteSpace: 'pre',
            textShadow: theme.glow,
          }}>{project.diagram}</pre>
        )}
        {content.length === 0 && (
          <div style={{ color: theme.textDim }}>// no notes yet</div>
        )}
        {content.map((line, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: 12,
            padding: '6px 0',
            color: theme.text,
            fontSize: 13,
            lineHeight: 1.65,
            fontFamily: theme.fontSans,
          }}>
            <span style={{ color: theme.accent, fontFamily: theme.fontMono, flexShrink: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ textWrap: 'pretty' }}>{line}</span>
          </div>
        ))}
      </div>

      {/* Footer links */}
      {project.links.length > 0 && (
        <div style={{
          display: 'flex',
          gap: 14,
          padding: '14px 20px',
          borderTop: `1px solid ${theme.border}`,
          background: theme.panelSoft,
        }}>
          {project.links.map((l, i) => (
            <a key={i} href={l.href} style={{ color: theme.accent, textDecoration: 'none', fontSize: 12 }}>
              → {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Dot({ c }) {
  return <span style={{ width: 10, height: 10, background: c, borderRadius: '50%', display: 'inline-block', opacity: 0.85 }} />;
}

window.ProjectsSection = ProjectsSection;
