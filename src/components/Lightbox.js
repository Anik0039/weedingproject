'use client';
import { useTheme } from '@/context/ThemeContext';

export default function Lightbox({ photos, index, onClose, onNav }) {
  const { theme } = useTheme();
  if (!photos || index < 0) return null;
  const photo = photos[index];
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: `${theme.bg}f8`, backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeUp 0.4s',
    }}>
      <img src={photo.src} alt={photo.title} onClick={e => e.stopPropagation()}
        style={{ maxWidth: '85vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 5, boxShadow: '0 40px 100px -30px rgba(0,0,0,0.9)', animation: 'revealClip 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
      <button onClick={e => { e.stopPropagation(); onNav(-1); }}
        style={{ position: 'absolute', top: '50%', left: 20, transform: 'translateY(-50%)', background: `${theme.primary}25`, border: `1px solid ${theme.primary}50`, color: theme.light, width: 50, height: 50, borderRadius: '50%', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}>‹</button>
      <button onClick={e => { e.stopPropagation(); onNav(1); }}
        style={{ position: 'absolute', top: '50%', right: 20, transform: 'translateY(-50%)', background: `${theme.primary}25`, border: `1px solid ${theme.primary}50`, color: theme.light, width: 50, height: 50, borderRadius: '50%', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}>›</button>
      <div onClick={onClose} style={{ position: 'absolute', top: 24, right: 28, color: '#fff', fontSize: 24, cursor: 'pointer', fontWeight: 200, fontFamily: "'Raleway'" }}>✕</div>
      <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Lora'", fontSize: 20, fontWeight: 400, fontStyle: 'italic', color: theme.cream }}>{photo.title}</div>
        <div style={{ fontFamily: "'Raleway'", fontSize: 10, letterSpacing: 3, color: theme.light, marginTop: 4, textTransform: 'uppercase' }}>{photo.sub}</div>
      </div>
    </div>
  );
}
