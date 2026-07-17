// Main app
const { useState, useEffect, useMemo } = React;

const FONT_STACKS = [
  { mono: "'JetBrains Mono', ui-monospace, monospace", sans: "'Inter', system-ui, sans-serif" },
  { mono: "'IBM Plex Mono', ui-monospace, monospace", sans: "'IBM Plex Sans', system-ui, sans-serif" },
  { mono: "'Fira Code', ui-monospace, monospace", sans: "'Geist', system-ui, sans-serif" },
  { mono: "'Space Mono', ui-monospace, monospace", sans: "'Space Grotesk', system-ui, sans-serif" },
];

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "classic",
  "fontIdx": 0,
  "density": "comfortable",
  "lang": "ko",
  "sectionOrder": ["hero", "projects"],
  "scanlines": true,
  "glow": true
}/*EDITMODE-END*/;

function App() {
  const [state, setState] = useState(DEFAULTS);
  const [tweaksActive, setTweaksActive] = useState(false);
  const [selectedId, setSelectedId] = useState(window.PROJECTS[0].id);

  const strings = window.STRINGS[state.lang];

  // Compose theme with font override
  const baseTheme = window.THEMES[state.theme];
  const fonts = FONT_STACKS[state.fontIdx];
  const theme = {
    ...baseTheme,
    fontMono: fonts.mono,
    fontSans: state.theme === 'modern' ? fonts.sans : fonts.mono, // CLI vibe: mono everywhere except modern
    glow: state.glow ? baseTheme.glow : 'none',
  };

  // Tweaks wiring
  useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksActive(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksActive(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: state,
    }, '*');
  }, [state]);

  // Esc closes tweaks
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape' && tweaksActive) setTweaksActive(false); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [tweaksActive]);

  const reset = () => setState(DEFAULTS);

  const sections = {
    hero: <Hero key="hero" theme={theme} strings={strings} density={state.density} />,
    projects: <ProjectsSection key="projects" theme={theme} strings={strings} lang={state.lang}
                density={state.density} projects={window.PROJECTS}
                selectedId={selectedId} setSelectedId={setSelectedId} />,
  };

  return (
    <div style={{
      background: theme.bg,
      color: theme.text,
      fontFamily: theme.fontMono,
      minHeight: '100vh',
      position: 'relative',
    }}>
      <TopBar theme={theme} state={state} />
      {state.sectionOrder.map(k => sections[k])}
      <Footer theme={theme} strings={strings} density={state.density} />

      {state.scanlines && theme.scanlines && <Scanlines />}
      <CRTVignette theme={theme} />

      <Tweaks
        active={tweaksActive}
        state={state}
        setState={setState}
        onReset={reset}
      />
    </div>
  );
}

function TopBar({ theme, state }) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: `${theme.bg}ee`,
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      borderBottom: `1px solid ${theme.border}`,
      padding: '8px 16px',
      fontFamily: theme.fontMono,
      fontSize: 11,
      color: theme.textDim,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <Dot c={theme.danger} /><Dot c={theme.warn} /><Dot c={theme.accent} />
      </div>
      <span style={{ color: theme.text }}>~/portfolio</span>
      <span style={{ color: theme.accent }}>main</span>
      <span>·</span>
      <span>{state.lang === 'ko' ? 'TPM 포트폴리오 · 김종식' : 'TPM portfolio · Kim Jongsik'}</span>
      <span style={{ marginLeft: 'auto' }}>
        <Blinker c={theme.accent} /> online
      </span>
    </div>
  );
}

function Dot({ c }) {
  return <span style={{ width: 9, height: 9, background: c, borderRadius: '50%', display: 'inline-block', opacity: 0.85 }} />;
}

function Blinker({ c }) {
  const [on, setOn] = useState(true);
  useEffect(() => { const t = setInterval(() => setOn(o => !o), 900); return () => clearInterval(t); }, []);
  return <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: c, marginRight: 6, opacity: on ? 1 : 0.2, boxShadow: `0 0 6px ${c}` }} />;
}

function Footer({ theme, strings, density }) {
  return (
    <section style={{
      padding: density === 'compact' ? '36px 28px' : '64px 48px',
      fontFamily: theme.fontMono,
    }}>
      <div style={{ color: theme.textDim, fontSize: 12, marginBottom: 8 }}># contact</div>
      <div style={{ color: theme.textBright, fontSize: density === 'compact' ? 22 : 28, fontWeight: 700, textShadow: theme.glow, textWrap: 'pretty' }}>
        {strings.contactCTA}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
        <a href="https://github.com/CodingGamePlayer" target="_blank" rel="noopener noreferrer" style={{
          color: theme.textBright, border: `1px solid ${theme.accent}`,
          padding: '10px 18px', textDecoration: 'none', fontSize: 13, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.89.88 2.35.67.07-.52.28-.88.51-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          {strings.githubButton}
        </a>
      </div>
      <div style={{ color: theme.textDim, fontSize: 11, marginTop: 40, borderTop: `1px solid ${theme.border}`, paddingTop: 16 }}>
        built with html + care · 김종식 · otw1917.work@gmail.com · <span style={{ color: theme.accent }}>EOF</span>
      </div>
    </section>
  );
}

function Scanlines() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 150,
      backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0) 4px)',
      mixBlendMode: 'multiply',
    }} />
  );
}

function CRTVignette({ theme }) {
  if (theme.id === 'modern') return null;
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 140,
      background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)',
    }} />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
