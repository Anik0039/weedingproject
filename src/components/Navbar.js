'use client';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const SECTIONS = ['home', 'portfolio', 'journey', 'services', 'contact'];

export default function Navbar({ scrollY, section, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const stuck = scrollY > 80;

  return (
    <>
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: `${theme.bg}f2`, backdropFilter: 'blur(30px)',
          zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26,
        }}>
          {SECTIONS.map(s => (
            <span key={s} onClick={() => { onNav(s); setMenuOpen(false); }}
              style={{
                color: section === s ? theme.light : theme.creamDim,
                fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 13,
                letterSpacing: 5, textTransform: 'uppercase', cursor: 'pointer',
                transition: 'color 0.3s', textDecoration: 'none',
              }}>{s}</span>
          ))}
        </div>
      )}

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '14px 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: stuck ? `${theme.bg}ea` : 'transparent',
        backdropFilter: stuck ? 'blur(20px)' : 'none',
        borderBottom: stuck ? `1px solid ${theme.primary}14` : 'none',
        transition: 'all 0.5s',
      }}>
        <img src="/images/Dream_Intimacies_Rajan_D_K_White_without_no.png" alt="Dream Intimacies"
          style={{ height: 40, objectFit: 'contain', filter: 'brightness(1.1)' }} />

        <div className="desk-nav" style={{ display: 'flex', gap: 26 }}>
          {SECTIONS.map(s => (
            <span key={s} onClick={() => onNav(s)}
              style={{
                color: section === s ? theme.light : theme.creamDim,
                fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 10.5,
                letterSpacing: 3.5, textTransform: 'uppercase', cursor: 'pointer',
                transition: 'color 0.3s', textDecoration: 'none', padding: '8px 0',
                position: 'relative',
              }}>
              {s}
              <span style={{
                position: 'absolute', bottom: 4, left: '50%', width: section === s ? '100%' : 0,
                height: 1, background: theme.light, transition: 'all 0.3s', transform: 'translateX(-50%)',
              }} />
            </span>
          ))}
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer', zIndex: 101 }}>
          <span style={{ width: 22, height: 1, background: theme.cream, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none', display: 'block' }} />
          <span style={{ width: 22, height: 1, background: theme.cream, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1, display: 'block' }} />
          <span style={{ width: 22, height: 1, background: theme.cream, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none', display: 'block' }} />
        </div>
      </nav>

      <style>{`
        @media(max-width:768px) {
          .desk-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
