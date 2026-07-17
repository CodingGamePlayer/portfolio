// Tweaks panel — toggle via toolbar
function Tweaks({ active, state, setState, onReset }) {
  if (!active) return null;
  const themes = ['classic', 'amber', 'modern'];
  const fonts = ['JetBrains Mono + Inter', 'IBM Plex Mono + Plex Sans', 'Fira Code + Geist', 'Space Mono + Space Grotesk'];
  const densities = ['compact', 'comfortable'];
  const langs = ['ko', 'en'];
  const sections = ['hero', 'projects'];

  const t = window.THEMES[state.theme];

  return (
    <div style={{
      position: 'fixed',
      right: 20,
      bottom: 20,
      width: 320,
      maxHeight: 'calc(100vh - 40px)',
      overflowY: 'auto',
      background: t.panel,
      border: `1px solid ${t.accent}`,
      color: t.text,
      fontFamily: t.fontMono,
      fontSize: 12,
      zIndex: 200,
      boxShadow: `0 20px 60px rgba(0,0,0,0.6), ${t.glow}`,
    }}>
      <div style={{
        padding: '10px 14px',
        borderBottom: `1px solid ${t.border}`,
        background: t.panelSoft,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ color: t.accent, fontWeight: 700, letterSpacing: 1 }}>$ tweaks --live</span>
        <span style={{ color: t.textDim, fontSize: 10 }}>esc to close</span>
      </div>

      <Group t={t} label="// aesthetic">
        <Pills t={t} options={themes} value={state.theme}
          labels={themes.map(k => window.THEMES[k].label)}
          onChange={v => setState({ ...state, theme: v })} />
      </Group>

      <Group t={t} label="// font pairing">
        <Pills t={t} options={[0,1,2,3]} value={state.fontIdx}
          labels={fonts}
          vertical
          onChange={v => setState({ ...state, fontIdx: v })} />
      </Group>

      <Group t={t} label="// density">
        <Pills t={t} options={densities} value={state.density}
          onChange={v => setState({ ...state, density: v })} />
      </Group>

      <Group t={t} label="// language">
        <Pills t={t} options={langs} value={state.lang}
          labels={['한국어', 'English']}
          onChange={v => setState({ ...state, lang: v })} />
      </Group>

      <Group t={t} label="// section order (drag or click arrows)">
        {state.sectionOrder.map((s, i) => (
          <div key={s} style={{
            display: 'flex', alignItems: 'center',
            padding: '6px 8px',
            border: `1px solid ${t.border}`,
            marginBottom: 4,
            background: t.panelSoft,
          }}>
            <span style={{ color: t.textDim, marginRight: 8 }}>{i+1}.</span>
            <span style={{ color: t.textBright, flex: 1 }}>{s}</span>
            <button disabled={i === 0}
              onClick={() => {
                const o = [...state.sectionOrder];
                [o[i-1], o[i]] = [o[i], o[i-1]];
                setState({ ...state, sectionOrder: o });
              }}
              style={btnStyle(t, i === 0)}>↑</button>
            <button disabled={i === state.sectionOrder.length - 1}
              onClick={() => {
                const o = [...state.sectionOrder];
                [o[i+1], o[i]] = [o[i], o[i+1]];
                setState({ ...state, sectionOrder: o });
              }}
              style={btnStyle(t, i === state.sectionOrder.length - 1)}>↓</button>
          </div>
        ))}
      </Group>

      <Group t={t} label="// effects">
        <Toggle t={t} label="scanlines overlay"
          value={state.scanlines}
          onChange={v => setState({ ...state, scanlines: v })} />
        <Toggle t={t} label="cursor glow"
          value={state.glow}
          onChange={v => setState({ ...state, glow: v })} />
      </Group>

      <div style={{ padding: '10px 14px', borderTop: `1px solid ${t.border}` }}>
        <button onClick={onReset} style={{
          width: '100%',
          padding: '8px 10px',
          background: 'transparent',
          border: `1px solid ${t.border}`,
          color: t.textDim,
          fontFamily: 'inherit',
          fontSize: 11,
          cursor: 'pointer',
        }}>rm -rf ./tweaks  # reset</button>
      </div>
    </div>
  );
}

function btnStyle(t, disabled) {
  return {
    width: 22, height: 22,
    background: 'transparent',
    border: `1px solid ${t.border}`,
    color: disabled ? t.muted : t.text,
    marginLeft: 4,
    cursor: disabled ? 'default' : 'pointer',
    fontFamily: 'inherit',
  };
}

function Group({ t, label, children }) {
  return (
    <div style={{ padding: '12px 14px', borderBottom: `1px solid ${t.border}` }}>
      <div style={{ color: t.textDim, marginBottom: 8, fontSize: 10, letterSpacing: 0.5 }}>{label}</div>
      {children}
    </div>
  );
}

function Pills({ t, options, value, onChange, labels, vertical }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, flexDirection: vertical ? 'column' : 'row' }}>
      {options.map((o, i) => (
        <button key={o}
          onClick={() => onChange(o)}
          style={{
            padding: '5px 10px',
            border: `1px solid ${value === o ? t.accent : t.border}`,
            background: value === o ? t.panelSoft : 'transparent',
            color: value === o ? t.accent : t.text,
            fontFamily: 'inherit',
            fontSize: 11,
            cursor: 'pointer',
            textAlign: 'left',
            flex: vertical ? '0 0 auto' : '0 0 auto',
          }}
        >
          {labels ? labels[i] : o}
        </button>
      ))}
    </div>
  );
}

function Toggle({ t, label, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '4px 0' }}>
      <span style={{ flex: 1, color: t.text }}>{label}</span>
      <button onClick={() => onChange(!value)} style={{
        width: 42, height: 20,
        background: value ? t.accent : t.border,
        border: 'none',
        position: 'relative',
        cursor: 'pointer',
        padding: 0,
      }}>
        <span style={{
          position: 'absolute',
          top: 2,
          left: value ? 24 : 2,
          width: 16, height: 16,
          background: value ? t.bg : t.text,
          transition: 'left 120ms',
        }} />
      </button>
    </div>
  );
}

window.Tweaks = Tweaks;
