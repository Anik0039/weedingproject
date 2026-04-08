'use client';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Navbar from './Navbar';
import Lightbox from './Lightbox';
import ThemeSwitcher from './ThemeSwitcher';
import { Card3D, Reveal, RosePetals, FloatingRings, SectionDivider, LoveTransition } from './UIComponents';

const PHOTOS = [
  { id:1, src:'/images/Image__10_.jfif', cat:'wedding', title:'Bengali Bride', sub:'Traditional Elegance' },
  { id:2, src:'/images/Image__9_.jfif', cat:'wedding', title:'Crimson Veil', sub:'Dramatic Portraits' },
  { id:3, src:'/images/Image__8_.jfif', cat:'wedding', title:'Enchanted Lights', sub:'Cinematic Frames' },
  { id:4, src:'/images/Image__7_.jfif', cat:'portrait', title:'Heritage Soul', sub:'Timeless Beauty' },
  { id:5, src:'/images/Image__6_.jfif', cat:'couple', title:'Kolkata Love', sub:'Street Romance' },
  { id:6, src:'/images/Image__5_.jfif', cat:'couple', title:'Urban Embrace', sub:'City Stories' },
  { id:7, src:'/images/Image__4_.jfif', cat:'couple', title:'Howrah Dreams', sub:'Iconic Moments' },
  { id:8, src:'/images/Image__3_.jfif', cat:'wedding', title:'Royal Union', sub:'Grand Celebrations' },
  { id:9, src:'/images/Image__2_.jfif', cat:'wedding', title:'Sacred Arch', sub:'Heritage Venues' },
  { id:10, src:'/images/Image__1_.jfif', cat:'couple', title:'Forest Light', sub:"Nature's Blessing" },
  { id:11, src:'/images/Image.jfif', cat:'portrait', title:'Golden Hour', sub:'Window Light' },
];

const TIMELINE = [
  { icon:'💌', title:'Inquiry', desc:'Share your love story and wedding vision with us' },
  { icon:'☕', title:'Meet & Plan', desc:'We craft a personalized photography plan together' },
  { icon:'📸', title:'The Big Day', desc:'We capture every magical, fleeting moment' },
  { icon:'🎞️', title:'Editing', desc:'Artistic post-processing & cinematic color grading' },
  { icon:'🖼️', title:'Delivery', desc:'Premium albums, fine prints & your digital gallery' },
];

const SERVICES = [
  { icon:'💍', title:'Wedding Day', price:'From ৳45,000', features:['Full day coverage','2 photographers','500+ edited photos','Online gallery'] },
  { icon:'📸', title:'Pre-Wedding', price:'From ৳25,000', features:['3-4 hour session','Multiple locations','150+ edited photos','Outfit changes'] },
  { icon:'🎬', title:'Cinematography', price:'From ৳60,000', features:['Cinematic film','Highlight reel','Drone footage','4K delivery'] },
  { icon:'👑', title:'Premium Package', price:'From ৳1,20,000', features:['Everything above','Luxury album','Canvas prints','Same-day edit'] },
];

const heroImages = ['/images/Image__10_.jfif','/images/Image__9_.jfif','/images/Image__1_.jfif','/images/Image__2_.jfif'];

export default function HomePage() {
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [section, setSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [mp, setMp] = useState({ x:.5, y:.5 });
  const [lightbox, setLightbox] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);
  const [filter, setFilter] = useState('all');
  const [heroImg, setHeroImg] = useState(0);
  const [activeTL, setActiveTL] = useState(0);
  const [hovSvc, setHovSvc] = useState(null);
  const [loveTr, setLoveTr] = useState(false);
  const [pendingNav, setPendingNav] = useState(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 250); }, []);
  useEffect(() => { const iv = setInterval(() => setHeroImg(i => (i+1)%heroImages.length), 5500); return () => clearInterval(iv); }, []);
  useEffect(() => { const iv = setInterval(() => setActiveTL(i => (i+1)%TIMELINE.length), 3500); return () => clearInterval(iv); }, []);

  const onScroll = useCallback((e) => {
    setScrollY(e.target.scrollTop);
    ['home','portfolio','journey','services','contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { const r = el.getBoundingClientRect(); if (r.top < 350 && r.bottom > 350) setSection(id); }
    });
  }, []);

  const onMouse = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMp({ x:(e.clientX-r.left)/r.width, y:(e.clientY-r.top)/r.height });
  }, []);

  const nav = (id) => { setPendingNav(id); setLoveTr(true); };
  const onTrDone = () => { if (pendingNav) { document.getElementById(pendingNav)?.scrollIntoView({ behavior:'smooth' }); setPendingNav(null); } setLoveTr(false); };

  const filtered = filter === 'all' ? PHOTOS : PHOTOS.filter(p => p.cat === filter);
  const openLb = (i) => { setLbIdx(i); setLightbox(true); };
  const lbNav = (d) => setLbIdx(i => (i+d+filtered.length)%filtered.length);

  const cssVars = {
    '--bg': theme.bg, '--primary': theme.primary, '--light': theme.light, '--dark': theme.dark,
    '--glow': theme.glow, '--cream': theme.cream, '--cream-dim': theme.creamDim,
    '--scroll-thumb': theme.scrollThumb,
  };

  return (
    <div onScroll={onScroll} onMouseMove={onMouse} style={{
      ...cssVars, height:'100vh', overflowY:'auto', overflowX:'hidden',
      background: theme.bg, color: theme.cream, fontFamily:"'Marcellus', Georgia, serif",
      transition: 'background 0.6s, color 0.6s',
    }}>
      <LoveTransition active={loveTr} onDone={onTrDone} />
      {lightbox && <Lightbox photos={filtered} index={lbIdx} onClose={() => setLightbox(false)} onNav={(d) => lbNav(d)} />}
      <Navbar scrollY={scrollY} section={section} onNav={nav} />
      <ThemeSwitcher />

      {/* ═══════ HERO ═══════ */}
      <section id="home" style={{ height:'100vh', position:'relative', overflow:'hidden' }}>
        {heroImages.map((img,i) => (
          <div key={i} style={{ position:'absolute', inset:0, opacity:heroImg===i?1:0, transform:heroImg===i?'scale(1)':'scale(1.06)', transition:'opacity 1.8s cubic-bezier(0.16,1,0.3,1), transform 1.8s cubic-bezier(0.16,1,0.3,1)' }}>
            <img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', animation:'heroPan 22s ease-in-out infinite' }} />
            <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom, ${theme.bg}73 0%, ${theme.bg}40 35%, ${theme.bg}e0 100%)` }} />
            <div style={{ position:'absolute', inset:0, background:theme.tint, mixBlendMode:'multiply' }} />
          </div>
        ))}
        <FloatingRings mp={mp} />
        <RosePetals />
        <div style={{ position:'absolute', top:'18%', left:'8%', fontSize:48, color:theme.primary, opacity:0.07, pointerEvents:'none', animation:'heartbeat 3s ease-in-out infinite' }}>♥</div>
        <div style={{ position:'absolute', top:'72%', right:'10%', fontSize:32, color:theme.primary, opacity:0.07, pointerEvents:'none', animation:'heartbeat 3s ease-in-out infinite 1.5s' }}>♥</div>

        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'0 20px', zIndex:2 }}>
          <div style={{ fontFamily:"'Great Vibes', cursive", fontSize:'clamp(18px,3vw,28px)', color:theme.light, opacity:loaded?1:0, transform:`translateY(${loaded?0:20}px)`, transition:'all 1s cubic-bezier(0.16,1,0.3,1) 0.1s', marginBottom:8 }}>
            Where love becomes art
          </div>
          <h1 style={{ fontFamily:"'Lora', serif", fontWeight:500, fontSize:'clamp(2.6rem,7.5vw,5.8rem)', lineHeight:1.08, opacity:loaded?1:0, transform:`translateY(${loaded?0:50}px)`, transition:'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s' }}>
            Capturing<br/><em style={{ color:theme.light, fontStyle:'italic', fontWeight:400 }}>Forever</em> in<br/>Every Frame
          </h1>
          <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:200, fontSize:13.5, color:theme.creamDim, maxWidth:460, lineHeight:2, margin:'28px auto 38px', opacity:loaded?1:0, transform:`translateY(${loaded?0:25}px)`, transition:'all 1s cubic-bezier(0.16,1,0.3,1) 0.65s' }}>
            We weave emotion, light, and love into visual poetry — crafting wedding memories that last generations across Bengal and beyond.
          </p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap', justifyContent:'center', opacity:loaded?1:0, transform:`translateY(${loaded?0:20}px)`, transition:'all 1s cubic-bezier(0.16,1,0.3,1) 0.95s' }}>
            <button onClick={() => nav('portfolio')} style={{ padding:'15px 42px', border:`1px solid ${theme.primary}`, color:theme.light, fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:10.5, letterSpacing:3.5, textTransform:'uppercase', cursor:'pointer', background:'none', borderRadius:3, transition:'all 0.4s' }}
              onMouseEnter={e => { e.target.style.background=theme.primary; e.target.style.color='#fff'; }}
              onMouseLeave={e => { e.target.style.background='none'; e.target.style.color=theme.light; }}>
              View Our Work
            </button>
            <button onClick={() => nav('contact')} style={{ padding:'15px 42px', border:`1px solid ${theme.primary}`, color:'#fff', fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:10.5, letterSpacing:3.5, textTransform:'uppercase', cursor:'pointer', background:theme.primary, borderRadius:3, transition:'all 0.4s' }}>
              Book Your Date
            </button>
          </div>
          <div style={{ display:'flex', gap:12, marginTop:48, opacity:loaded?.5:0, transition:'opacity 1s 1.6s' }}>
            {heroImages.map((_,i) => (
              <div key={i} onClick={() => setHeroImg(i)} style={{ width:heroImg===i?30:8, height:3, borderRadius:2, background:heroImg===i?theme.light:`${theme.cream}33`, cursor:'pointer', transition:'all 0.5s' }} />
            ))}
          </div>
        </div>
        <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, opacity:loaded?.3:0, transition:'opacity 1s 2s' }}>
          <div style={{ fontFamily:"'Raleway'", fontSize:8, letterSpacing:4, textTransform:'uppercase', color:theme.light }}>scroll</div>
          <div style={{ width:1, height:35, background:`linear-gradient(${theme.light}, transparent)` }} />
        </div>
      </section>

      {/* Marquee */}
      <div style={{ overflow:'hidden', padding:'18px 0', borderTop:`1px solid ${theme.primary}14`, borderBottom:`1px solid ${theme.primary}14` }}>
        <div style={{ display:'flex', animation:'marquee 35s linear infinite', whiteSpace:'nowrap' }}>
          {[...Array(2)].map((_,j) => (
            <div key={j} style={{ display:'flex', alignItems:'center' }}>
              {['Wedding','Pre-Wedding','Cinematography','Bridal','Couple Portraits','Haldi','Mehendi','Reception','Sangeet','Bidai'].map((t,i) => (
                <span key={i} style={{ fontFamily:"'Lora'", fontSize:13, fontStyle:'italic', color:`${theme.cream}1f`, padding:'0 28px', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:28 }}>
                  {t} <span style={{ color:`${theme.primary}40`, fontSize:10 }}>♥</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ 3D EXPERIENCE ═══════ */}
      <section style={{ padding:'100px 5%', position:'relative', overflow:'hidden' }}>
        <Reveal>
          <div style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:10, letterSpacing:6, textTransform:'uppercase', color:theme.light, textAlign:'center', marginBottom:10 }}>Interactive Experience</div>
          <h2 style={{ fontFamily:"'Lora'", fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:500, textAlign:'center', marginBottom:8 }}>
            Feel The <em style={{ color:theme.light, fontStyle:'italic', fontWeight:400 }}>Romance</em>
          </h2>
          <p style={{ fontFamily:"'Great Vibes'", fontSize:20, textAlign:'center', color:theme.light, opacity:0.6, marginBottom:50 }}>move your mouse to explore</p>
        </Reveal>

        {/* Mouse glow trail */}
        <div style={{
          position:'absolute', left:`${mp.x*100}%`, top:`${mp.y*100}%`, width:280, height:280,
          borderRadius:'50%', pointerEvents:'none', zIndex:0,
          background:`radial-gradient(circle, ${theme.primary}15 0%, ${theme.primary}08 30%, transparent 70%)`,
          transform:'translate(-50%,-50%)', transition:'left 0.3s ease-out, top 0.3s ease-out',
        }} />

        <div style={{ perspective:1200, width:'100%', height:550, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>

          {/* Photos orbiting in a circle driven by mouse */}
          {(() => {
            const mouseAngle = Math.atan2(mp.y - 0.5, mp.x - 0.5);
            const mouseDist = Math.sqrt((mp.x-0.5)**2 + (mp.y-0.5)**2);
            const photos = [
              { src:'/images/Image__10_.jfif', w:150, h:210 },
              { src:'/images/Image__9_.jfif', w:135, h:190 },
              { src:'/images/Image__1_.jfif', w:140, h:195 },
              { src:'/images/Image__2_.jfif', w:130, h:185 },
              { src:'/images/Image__8_.jfif', w:125, h:175 },
              { src:'/images/Image__7_.jfif', w:138, h:192 },
            ];
            const count = photos.length;
            const radius = 220;
            return photos.map((p, i) => {
              const baseAngle = (i / count) * Math.PI * 2;
              const angle = baseAngle + mouseAngle * 0.6;
              const stretch = 1 + mouseDist * 0.8;
              const x = Math.cos(angle) * radius * stretch;
              const y = Math.sin(angle) * radius * 0.55 * stretch;
              const z = Math.sin(angle) * 180;
              const scale = 0.75 + (z + 180) / 360 * 0.5;
              const zIdx = Math.round(z + 200);
              const tiltY = (mp.x - 0.5) * 25;
              const tiltX = (mp.y - 0.5) * -15;
              return (
                <div key={`orbit-photo-${i}`} style={{
                  position:'absolute', left:'50%', top:'50%', width:p.w, height:p.h,
                  borderRadius:12, overflow:'hidden', cursor:'pointer',
                  transform:`translate(-50%,-50%) translate(${x}px, ${y}px) scale(${scale}) perspective(800px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
                  transition:'transform 0.45s cubic-bezier(0.03,0.98,0.52,0.99), box-shadow 0.4s, opacity 0.4s',
                  boxShadow:`0 ${15+z*0.1}px ${40+z*0.2}px -10px rgba(0,0,0,0.8), 0 0 ${20+z*0.1}px ${theme.primary}20`,
                  border:`1px solid ${theme.primary}${z > 0 ? '40' : '18'}`,
                  zIndex:zIdx, opacity:0.5 + (z+180)/360*0.5,
                  filter:`brightness(${0.6 + (z+180)/360*0.5}) saturate(${0.8 + (z+180)/360*0.4})`,
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 30px 80px -10px rgba(0,0,0,0.9), 0 0 50px ${theme.primary}50`;
                    e.currentTarget.style.filter = 'brightness(1.15) saturate(1.4)';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.12)';
                    e.currentTarget.querySelector('.orb-glow').style.opacity = '1';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = `0 ${15+z*0.1}px ${40+z*0.2}px -10px rgba(0,0,0,0.8), 0 0 ${20+z*0.1}px ${theme.primary}20`;
                    e.currentTarget.style.filter = `brightness(${0.6 + (z+180)/360*0.5}) saturate(${0.8 + (z+180)/360*0.4})`;
                    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                    e.currentTarget.querySelector('.orb-glow').style.opacity = '0';
                  }}
                >
                  <img src={p.src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} />
                  <div className="orb-glow" style={{
                    position:'absolute', inset:0, opacity:0, transition:'opacity 0.5s',
                    background:`linear-gradient(to top, ${theme.primary}44 0%, transparent 60%)`,
                  }} />
                  <div style={{
                    position:'absolute', bottom:8, right:10, fontSize:14, color:theme.light, opacity:0.5,
                    filter:`drop-shadow(0 0 6px ${theme.glow})`, animation:'heartbeat 3s ease-in-out infinite',
                  }}>♥</div>
                </div>
              );
            });
          })()}

          {/* Center heart with pulsing aura */}
          <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', zIndex:500, pointerEvents:'none', textAlign:'center' }}>
            {/* Aura rings */}
            {[0,1,2,3].map(i => (
              <div key={`aura-${i}`} style={{
                position:'absolute', left:'50%', top:'50%', width:80+i*55, height:80+i*55,
                borderRadius:'50%', border:`1px solid ${theme.primary}`,
                transform:'translate(-50%,-50%)', opacity:0.1-i*0.02,
                animation:`auraExpand ${3.5+i*1.2}s ease-in-out infinite ${i*0.4}s`,
              }} />
            ))}
            {/* Orbiting decorative icons */}
            {['♥','✦','✧','❋','◇','♥'].map((icon,i) => (
              <div key={`dec-${i}`} style={{
                position:'absolute', left:'50%', top:'50%', width:0, height:0,
                animation:`orbitSpin ${8+i*3}s linear infinite ${i*1.2}s`,
              }}>
                <span style={{
                  position:'absolute', left:55+i*18, fontSize:8+i*2, color:theme.light,
                  opacity:0.2+i*0.03, filter:`drop-shadow(0 0 4px ${theme.glow})`,
                  transform:'translate(-50%,-50%)',
                }}>{icon}</span>
              </div>
            ))}
            {/* Central heart */}
            <div style={{
              fontSize:48, color:theme.light, animation:'heartbeat 2.5s ease-in-out infinite',
              filter:`drop-shadow(0 0 25px ${theme.glow}) drop-shadow(0 0 50px ${theme.primary}40)`,
              textShadow:`0 0 30px ${theme.glow}`,
            }}>♥</div>
            <div style={{ fontFamily:"'Great Vibes'", fontSize:16, color:theme.light, opacity:0.5, marginTop:8, whiteSpace:'nowrap' }}>move to feel the magic</div>
          </div>
        </div>

        {/* Section romance CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes orbitSpin { 0% { transform: translate(-50%,-50%) rotate(0deg); } 100% { transform: translate(-50%,-50%) rotate(360deg); } }
          @keyframes auraExpand { 0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.08; } 50% { transform: translate(-50%,-50%) scale(1.2); opacity: 0.15; } }
        ` }} />
      </section>

      <SectionDivider />

      {/* ═══════ PORTFOLIO ═══════ */}
      <section id="portfolio" style={{ padding:'80px 5% 100px', background:theme.bgCard, transition:'background 0.6s' }}>
        <Reveal>
          <div style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:10, letterSpacing:6, textTransform:'uppercase', color:theme.light, textAlign:'center', marginBottom:10 }}>Selected Works</div>
          <h2 style={{ fontFamily:"'Lora'", fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:500, textAlign:'center', marginBottom:12 }}>
            Our <em style={{ color:theme.light, fontStyle:'italic', fontWeight:400 }}>Portfolio</em>
          </h2>
          <div style={{ width:50, height:1, background:`linear-gradient(90deg, transparent, ${theme.primary}, transparent)`, margin:'0 auto 36px' }} />
        </Reveal>

        {/* Filter pills */}
        <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:44, flexWrap:'wrap' }}>
          {['all','wedding','couple','portrait'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                background:filter===f?`linear-gradient(135deg, ${theme.primary}, ${theme.light})`:'transparent',
                border:`1px solid ${filter===f?'transparent':`${theme.cream}15`}`,
                color:filter===f?'#fff':theme.creamDim,
                fontFamily:"'Raleway',sans-serif", fontWeight:filter===f?400:300, fontSize:10,
                letterSpacing:3, textTransform:'uppercase', cursor:'pointer',
                padding:'10px 24px', borderRadius:30, transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Featured hero + grid layout */}
        <div style={{ maxWidth:1260, margin:'0 auto' }}>
          {/* Hero featured image - first item */}
          {filtered.length > 0 && (
            <Reveal>
              <div onClick={() => openLb(0)} className="pf-item" style={{
                position:'relative', overflow:'hidden', cursor:'pointer', borderRadius:10,
                height:'clamp(350px, 50vw, 520px)', marginBottom:14,
                background:theme.bgCard2,
              }}>
                <img src={filtered[0].src} alt={filtered[0].title} loading="lazy" style={{
                  width:'100%', height:'100%', objectFit:'cover',
                  transition:'transform 1.4s cubic-bezier(0.16,1,0.3,1), filter 0.8s',
                }} />
                <div style={{
                  position:'absolute', inset:0,
                  background:`linear-gradient(to top, ${theme.bg}ee 0%, ${theme.bg}60 30%, transparent 60%)`,
                }} />
                <div className="pf-info" style={{
                  position:'absolute', bottom:0, left:0, right:0, padding:'40px 44px',
                  transform:'translateY(10px)', opacity:0,
                  transition:'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                    <div style={{ width:28, height:1, background:theme.primary }} />
                    <div style={{ fontFamily:"'Raleway'", fontSize:9, letterSpacing:5, textTransform:'uppercase', color:theme.primary }}>{filtered[0].cat}</div>
                  </div>
                  <div style={{ fontFamily:"'Lora'", fontSize:'clamp(26px,3vw,38px)', fontWeight:500, fontStyle:'italic', lineHeight:1.2 }}>{filtered[0].title}</div>
                  <div style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:13, color:theme.creamDim, marginTop:8 }}>{filtered[0].sub}</div>
                </div>
                <div className="pf-line" style={{ position:'absolute', bottom:0, left:0, width:0, height:3, background:`linear-gradient(90deg, ${theme.primary}, ${theme.light})`, transition:'width 0.8s 0.1s' }} />
              </div>
            </Reveal>
          )}

          {/* Two-column staggered masonry grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:14 }}>
            {filtered.slice(1).map((p,i) => {
              const isLeft = i % 2 === 0;
              const heights = [380, 300, 340, 420, 280, 360, 320, 400, 290, 350];
              const h = heights[i % heights.length];
              return (
                <Reveal key={p.id} delay={i*0.05} dir={isLeft?'left':'right'}>
                  <Card3D>
                    <div onClick={() => openLb(i+1)} className="pf-item" style={{
                      position:'relative', overflow:'hidden', cursor:'pointer', borderRadius:8,
                      height:h, background:theme.bgCard2,
                      marginTop: isLeft ? 0 : (i === 0 ? 40 : 0),
                    }}>
                      <img src={p.src} alt={p.title} loading="lazy" style={{
                        width:'100%', height:'100%', objectFit:'cover',
                        transition:'transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 0.6s',
                      }} />
                      {/* Gradient overlay */}
                      <div style={{
                        position:'absolute', inset:0,
                        background:`linear-gradient(to top, ${theme.bg}dd 0%, transparent 50%)`,
                        opacity:0, transition:'opacity 0.5s',
                      }} className="pf-grad" />
                      {/* Info overlay */}
                      <div className="pf-info" style={{
                        position:'absolute', bottom:0, left:0, right:0, padding:'24px 22px',
                        transform:'translateY(10px)', opacity:0,
                        transition:'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                      }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                          <div style={{ fontSize:8, color:theme.primary }}>♥</div>
                          <div style={{ fontFamily:"'Raleway'", fontSize:8, letterSpacing:4, textTransform:'uppercase', color:theme.primary }}>{p.cat}</div>
                        </div>
                        <div style={{ fontFamily:"'Lora'", fontSize:20, fontWeight:500, fontStyle:'italic' }}>{p.title}</div>
                        <div style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:11, color:theme.creamDim, marginTop:4 }}>{p.sub}</div>
                      </div>
                      {/* Bottom accent line */}
                      <div className="pf-line" style={{
                        position:'absolute', bottom:0, left:0, width:0, height:2,
                        background:`linear-gradient(90deg, ${theme.primary}, ${theme.light})`,
                        transition:'width 0.6s 0.15s',
                      }} />
                      {/* Corner number */}
                      <div style={{
                        position:'absolute', top:16, left:18, fontFamily:"'Lora'", fontSize:11,
                        color:theme.light, opacity:0, transition:'opacity 0.4s 0.1s',
                      }} className="pf-num">{String(i+2).padStart(2,'0')}</div>
                    </div>
                  </Card3D>
                </Reveal>
              );
            })}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .pf-item:hover img { transform: scale(1.08) !important; filter: brightness(0.5) saturate(1.3) !important; }
          .pf-item:hover .pf-info { opacity: 1 !important; transform: translateY(0) !important; }
          .pf-item:hover .pf-grad { opacity: 1 !important; }
          .pf-item:hover .pf-line { width: 100% !important; }
          .pf-item:hover .pf-num { opacity: 0.4 !important; }
          @media (max-width: 680px) {
            .pf-item { height: auto !important; min-height: 250px; }
          }
        ` }} />
      </section>

      <SectionDivider />

      {/* ═══════ JOURNEY ═══════ */}
      <section id="journey" style={{ padding:'60px 5% 100px' }}>
        <Reveal>
          <div style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:10, letterSpacing:6, textTransform:'uppercase', color:theme.light, textAlign:'center', marginBottom:10 }}>How It Works</div>
          <h2 style={{ fontFamily:"'Lora'", fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:500, textAlign:'center', marginBottom:8 }}>
            Your Wedding <em style={{ color:theme.light, fontStyle:'italic', fontWeight:400 }}>Journey</em>
          </h2>
          <p style={{ fontFamily:"'Great Vibes'", fontSize:20, textAlign:'center', color:theme.light, opacity:0.5, marginBottom:55 }}>from first hello to forever</p>
        </Reveal>
        <div style={{ display:'flex', maxWidth:880, margin:'0 auto', position:'relative' }}>
          {TIMELINE.map((t,i) => (
            <div key={i} onClick={() => setActiveTL(i)}
              style={{ textAlign:'center', cursor:'pointer', transition:'all 0.5s', flex:1, padding:'18px 8px', position:'relative', opacity:activeTL===i?1:0.3, transform:activeTL===i?'scale(1)':'scale(0.9)' }}>
              <div style={{
                width:60, height:60, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 12px', fontSize:24, transition:'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                background:activeTL===i?`${theme.primary}25`:`${theme.cream}08`,
                border:`1px solid ${activeTL===i?theme.primary:`${theme.cream}10`}`,
                transform:activeTL===i?'scale(1.18)':'scale(1)',
                boxShadow:activeTL===i?`0 0 30px ${theme.glow}`:'none',
              }}>{t.icon}</div>
              {i < TIMELINE.length-1 && (
                <div style={{ position:'absolute', top:30, left:'calc(50% + 38px)', width:'calc(100% - 76px)', height:1, background:`${theme.cream}08` }}>
                  <div style={{ height:'100%', background:theme.primary, transition:'width 0.8s cubic-bezier(0.16,1,0.3,1)', width:activeTL>i?'100%':'0%' }} />
                </div>
              )}
              <div style={{ fontFamily:"'Lora'", fontSize:14, fontWeight:500, marginBottom:5, fontStyle:'italic' }}>{t.title}</div>
              <div style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:10.5, color:theme.creamDim, lineHeight:1.6, maxWidth:130, margin:'0 auto', maxHeight:activeTL===i?55:0, overflow:'hidden', transition:'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" style={{ padding:'60px 5% 100px', background:theme.bgCard, transition:'background 0.6s' }}>
        <Reveal>
          <div style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:10, letterSpacing:6, textTransform:'uppercase', color:theme.light, textAlign:'center', marginBottom:10 }}>Packages</div>
          <h2 style={{ fontFamily:"'Lora'", fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:500, textAlign:'center', marginBottom:50 }}>
            Our <em style={{ color:theme.light, fontStyle:'italic', fontWeight:400 }}>Services</em>
          </h2>
        </Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(245px,1fr))', gap:14, maxWidth:1100, margin:'0 auto' }}>
          {SERVICES.map((s,i) => (
            <Reveal key={i} delay={i*0.1} dir="scale">
              <Card3D>
                <div onMouseEnter={() => setHovSvc(i)} onMouseLeave={() => setHovSvc(null)}
                  style={{
                    background:`linear-gradient(145deg, ${theme.bgCard}, ${theme.bgCard2})`,
                    border:`1px solid ${theme.cream}0a`, overflow:'hidden', borderRadius:8, padding:'38px 26px',
                    transition:'all 0.6s cubic-bezier(0.16,1,0.3,1)', position:'relative',
                    transform: hovSvc===i?'translateY(-12px)':'none',
                    borderColor: hovSvc===i?`${theme.primary}40`:`${theme.cream}0a`,
                    boxShadow: hovSvc===i?`0 30px 80px -20px ${theme.glow}`:'none',
                  }}>
                  <div style={{ fontSize:36, marginBottom:16, position:'relative', zIndex:1 }}>{s.icon}</div>
                  <h3 style={{ fontFamily:"'Lora'", fontSize:20, fontWeight:500, fontStyle:'italic', marginBottom:7, position:'relative', zIndex:1 }}>{s.title}</h3>
                  <div style={{ fontFamily:"'Raleway'", fontWeight:300, fontSize:13, color:theme.light, marginBottom:18, position:'relative', zIndex:1, letterSpacing:1 }}>{s.price}</div>
                  <div style={{ maxHeight:hovSvc===i?200:0, overflow:'hidden', transition:'max-height 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
                    {s.features.map((f,fi) => (
                      <div key={fi} style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:11.5, color:theme.creamDim, padding:'5px 0', borderTop:fi>0?`1px solid ${theme.cream}0a`:'none', display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ color:theme.primary, fontSize:7 }}>♥</span> {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:9.5, color:`${theme.primary}55`, marginTop:12, letterSpacing:2, textTransform:'uppercase', opacity:hovSvc===i?0:1, transition:'opacity 0.3s', position:'relative', zIndex:1 }}>Hover for details</div>
                </div>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" style={{ padding:'80px 5% 120px', position:'relative', background:`radial-gradient(ellipse at 50% 0%, ${theme.primary}0f, transparent 50%), ${theme.bg}`, transition:'background 0.6s' }}>
        <RosePetals />
        <Reveal>
          <div style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:10, letterSpacing:6, textTransform:'uppercase', color:theme.light, textAlign:'center', marginBottom:10, position:'relative' }}>Let's Connect</div>
          <h2 style={{ fontFamily:"'Lora'", fontSize:'clamp(2rem,4.5vw,3.5rem)', fontWeight:500, textAlign:'center', marginBottom:8, position:'relative' }}>
            Begin Your <em style={{ color:theme.light, fontStyle:'italic', fontWeight:400 }}>Love Story</em>
          </h2>
          <p style={{ fontFamily:"'Great Vibes'", fontSize:22, textAlign:'center', color:theme.light, opacity:0.5, marginBottom:12, position:'relative' }}>every love deserves a beautiful beginning</p>
          <p style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:13.5, color:theme.creamDim, textAlign:'center', maxWidth:420, margin:'0 auto 45px', lineHeight:1.9, position:'relative' }}>
            Your love story is unique — let us capture its beauty with artistry and heart.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ maxWidth:480, margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', gap:26, position:'relative' }}>
            <Card3D style={{ width:'100%', background:theme.bgCard, border:`1px solid ${theme.primary}1a`, borderRadius:10, padding:'34px 28px' }}>
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                {[
                  { icon:'📞', label:'Call or WhatsApp', value:'+880 1684 232 834', href:'tel:+8801684232834', link:true },
                  { icon:'📍', label:'Based In', value:'Dhaka, Bangladesh' },
                  { icon:'🌐', label:'Facebook', value:'dreamintimaciesbd', href:'https://www.facebook.com/dreamintimaciesbd/', link:true },
                ].map((item,i) => (
                  <div key={i}>
                    {i > 0 && <div style={{ height:1, background:`${theme.primary}14`, marginBottom:20 }} />}
                    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{ width:44, height:44, borderRadius:'50%', flexShrink:0, background:`${theme.primary}1a`, border:`1px solid ${theme.primary}2e`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, animation:'rosePulse 4s ease-in-out infinite', animationDelay:`${i*1.3}s` }}>{item.icon}</div>
                      <div>
                        <div style={{ fontFamily:"'Raleway'", fontSize:9, letterSpacing:3, color:theme.light, textTransform:'uppercase', marginBottom:3 }}>{item.label}</div>
                        {item.link ? (
                          <a href={item.href} target={item.href?.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" style={{ color:theme.cream, textDecoration:'none', fontFamily:"'Lora'", fontWeight:400, fontSize:15, fontStyle:'italic' }}>{item.value}</a>
                        ) : (
                          <div style={{ fontFamily:"'Lora'", fontWeight:400, fontSize:15, color:`${theme.cream}cc`, fontStyle:'italic' }}>{item.value}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>
            <button onClick={() => window.open('https://www.facebook.com/dreamintimaciesbd/','_blank')}
              style={{ padding:'15px 42px', border:`1px solid ${theme.primary}`, color:'#fff', fontFamily:"'Raleway',sans-serif", fontWeight:300, fontSize:10.5, letterSpacing:3.5, textTransform:'uppercase', cursor:'pointer', background:theme.primary, borderRadius:3, transition:'all 0.4s' }}>
              ♥ &nbsp; Message Us on Facebook
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{ padding:'36px 5%', textAlign:'center', borderTop:`1px solid ${theme.primary}14`, background:`${theme.bg}`, transition:'background 0.6s' }}>
        <img src="/images/Dream_Intimacies_Rajan_D_K_White_without_no.png" alt="Dream Intimacies" style={{ height:35, objectFit:'contain', filter:'brightness(1.05)', marginBottom:10 }} />
        <p style={{ fontFamily:"'Raleway'", fontWeight:200, fontSize:9, letterSpacing:3, color:`${theme.cream}33`, textTransform:'uppercase' }}>
          © 2026 Dream Intimacies · All Rights Reserved · Dhaka, Bangladesh
        </p>
      </footer>

      <style>{`
        @media(max-width:768px) {
          .float-card { display: none !important; }
          .scene-3d { height: 220px !important; }
        }
      `}</style>
    </div>
  );
}
