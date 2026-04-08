'use client';
import { useState } from 'react';
import { useTheme, THEMES } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const { themeKey, setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 60 }}>
      {/* Palette popup */}
      {open && (
        <div style={{
          position: 'absolute', bottom: 60, right: 0,
          background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.primary}33`, borderRadius: 12,
          padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 8,
          animation: 'fadeUp 0.3s',
        }}>
          <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: theme.light, marginBottom: 4, textAlign: 'center' }}>
            Choose Theme
          </div>
          {Object.entries(THEMES).map(([key, t]) => (
            <button key={key} onClick={() => { setTheme(key); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: themeKey === key ? `${t.primary}22` : 'transparent',
                border: `1px solid ${themeKey === key ? t.primary : 'transparent'}`,
                borderRadius: 8, padding: '8px 14px', cursor: 'pointer',
                transition: 'all 0.3s', minWidth: 160,
              }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: `linear-gradient(135deg, ${t.dark}, ${t.primary}, ${t.light})`,
                border: '2px solid rgba(255,255,255,0.1)',
                boxShadow: themeKey === key ? `0 0 12px ${t.glow}` : 'none',
              }} />
              <span style={{
                fontFamily: "'Raleway',sans-serif", fontSize: 11, fontWeight: 300,
                color: themeKey === key ? t.light : 'rgba(255,255,255,0.5)',
                letterSpacing: 1,
              }}>{t.name}</span>
              {themeKey === key && <span style={{ marginLeft: 'auto', color: t.light, fontSize: 10 }}>♥</span>}
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button onClick={() => setOpen(!open)} style={{
        width: 50, height: 50, borderRadius: '50%',
        background: `linear-gradient(135deg, ${theme.dark}, ${theme.primary}, ${theme.light})`,
        border: `1.5px solid ${theme.light}55`,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 24px ${theme.glow}, inset 0 1px 0 ${theme.light}33`,
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: open ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1)',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transition: 'all 0.3s' }}>
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <>
              <path d="M12 2L4 10l8 12 8-12L12 2z" fill={`${theme.light}33`} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M4 10h16M12 2l-3 8 3 12 3-12-3-8z" stroke="#fff" strokeWidth="0.8" strokeLinejoin="round" opacity="0.6" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
