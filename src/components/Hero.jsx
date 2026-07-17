// Hero + boot banner
const { useEffect, useState, useRef } = React;

function Caret() {
  const [on, setOn] = useState(true);
  useEffect(() => { const t = setInterval(() => setOn(o => !o), 520); return () => clearInterval(t); }, []);
  return <span style={{ opacity: on ? 1 : 0 }}>▊</span>;
}

function BootBanner({ theme, strings, density }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    const interval = setInterval(() => {
      setShown(s => {
        if (s >= strings.bootLines.length) { clearInterval(interval); return s; }
        return s + 1;
      });
    }, 260);
    return () => clearInterval(interval);
  }, [strings]);

  return (
    <div style={{
      fontFamily: theme.fontMono,
      color: theme.textDim,
      fontSize: density === 'compact' ? 11 : 12,
      lineHeight: 1.65,
      padding: density === 'compact' ? '12px 0 4px' : '20px 0 10px',
    }}>
      {strings.bootLines.slice(0, shown).map((l, i) => (
        <div key={i}>
          <span style={{ color: theme.accent }}>$</span>{' '}
          <span>{l}</span>
          {i === shown - 1 && shown < strings.bootLines.length + 1 && <Caret />}
        </div>
      ))}
    </div>
  );
}

function Hero({ theme, strings, density }) {
  const pad = density === 'compact' ? '20px 28px' : '40px 48px';
  return (
    <section data-screen-label="hero" style={{
      borderBottom: `1px solid ${theme.border}`,
      padding: pad,
      position: 'relative',
    }}>
      <BootBanner theme={theme} strings={strings} density={density} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 380px)',
        gap: density === 'compact' ? 32 : 56,
        alignItems: 'start',
        marginTop: density === 'compact' ? 12 : 24,
      }}>
        <div>
          <div style={{
            fontFamily: theme.fontMono,
            color: theme.textDim,
            fontSize: 12,
            marginBottom: 10,
            letterSpacing: 1,
          }}>
            ~/portfolio <span style={{ color: theme.accent }}>main</span> $ whoami
          </div>
          <h1 style={{
            fontFamily: theme.fontMono,
            color: theme.textBright,
            fontSize: density === 'compact' ? 42 : 64,
            margin: 0,
            fontWeight: 700,
            letterSpacing: -1,
            textShadow: theme.glow,
            lineHeight: 1.0,
          }}>
            {strings.heroName}<span style={{ color: theme.accent }}>_</span>
          </h1>
          <div style={{
            fontFamily: theme.fontMono,
            color: theme.text,
            fontSize: density === 'compact' ? 14 : 17,
            marginTop: 10,
            opacity: 0.9,
          }}>
            &gt; {strings.heroRole}
          </div>
          <p style={{
            fontFamily: theme.fontSans,
            color: theme.text,
            fontSize: density === 'compact' ? 13 : 15,
            lineHeight: 1.7,
            maxWidth: 620,
            marginTop: 24,
            textWrap: 'pretty',
          }}>
            {strings.heroBio}
          </p>
        </div>
        <div style={{
          border: `1px solid ${theme.border}`,
          background: theme.panelSoft,
          fontFamily: theme.fontMono,
          fontSize: 12,
        }}>
          <div style={{
            padding: '8px 12px',
            borderBottom: `1px solid ${theme.border}`,
            color: theme.textDim,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span>~/identity.toml</span>
            <span style={{ color: theme.accent }}>●</span>
          </div>
          <div style={{ padding: '14px 16px' }}>
            {strings.heroMeta.map((m, i) => (
              <div key={i} style={{ display: 'flex', padding: '5px 0' }}>
                <span style={{ color: theme.textDim, width: 84, flexShrink: 0 }}>{m.k}</span>
                <span style={{ color: theme.textDim }}>=&nbsp;</span>
                <span style={{ color: theme.textBright }}>"{m.v}"</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
