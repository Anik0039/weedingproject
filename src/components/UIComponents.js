"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

/* ═══ 3D Tilt Card ═══ */
export function Card3D({ children, style, className }) {
  const ref = useRef(null);
  const [tf, setTf] = useState("");
  const [gl, setGl] = useState({ x: 50, y: 50, o: 0 });
  const { theme } = useTheme();
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width,
      y = (e.clientY - r.top) / r.height;
    setTf(
      `perspective(800px) rotateX(${(y - 0.5) * -16}deg) rotateY(${(x - 0.5) * 16}deg) scale3d(1.03,1.03,1.03)`,
    );
    setGl({ x: x * 100, y: y * 100, o: 0.18 });
  };
  const leave = () => {
    setTf("perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)");
    setGl({ x: 50, y: 50, o: 0 });
  };
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={className}
      style={{
        ...style,
        transform: tf,
        transition: "transform 0.45s cubic-bezier(0.03,0.98,0.52,0.99)",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(circle at ${gl.x}% ${gl.y}%, ${theme.primary}${Math.round(
            gl.o * 255,
          )
            .toString(16)
            .padStart(2, "0")}, transparent 55%)`,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}

/* ═══ Scroll Reveal ═══ */
export function Reveal({ children, delay = 0, dir = "up" }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setV(true);
      },
      { threshold: 0.13 },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  const d = {
    up: "translateY(60px)",
    down: "translateY(-60px)",
    left: "translateX(80px)",
    right: "translateX(-80px)",
    scale: "scale(0.85)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : d[dir],
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══ Rose Petals ═══ */
export function RosePetals() {
  const { theme } = useTheme();
  const [petals, setPetals] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 8 + Math.random() * 14,
      dur: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      rot: Math.random() * 360,
      drift: -30 + Math.random() * 60,
      r: 140 + Math.random() * 80,
      g: 20 + Math.random() * 50,
      b: 40 + Math.random() * 40,
      a: 0.2 + Math.random() * 0.25,
    }));
    setPetals(arr);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size * 0.7,
            background: `radial-gradient(ellipse, ${theme.primary}${Math.round(
              p.a * 255,
            )
              .toString(16)
              .padStart(2, "0")}, transparent)`,
            borderRadius: "50% 0 50% 50%",
            animation: `petalFall ${p.dur}s ease-in-out infinite ${p.delay}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══ Floating Rings ═══ */
export function FloatingRings({ mp }) {
  const { theme } = useTheme();
  return (
    <>
      {[380, 260, 160].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: s,
            height: s,
            borderRadius: "50%",
            border: `1px solid ${theme.primary}${Math.round(
              (0.08 + i * 0.04) * 255,
            )
              .toString(16)
              .padStart(2, "0")}`,
            top: `calc(${28 + i * 16}% + ${(mp.y - 0.5) * (10 + i * 8)}px)`,
            left: `calc(${48 + (i - 1) * 22}% + ${(mp.x - 0.5) * (10 + i * 8)}px)`,
            transform: "translate(-50%,-50%)",
            transition: "top 0.6s ease-out, left 0.6s ease-out",
            pointerEvents: "none",
            animation: `ringPulse ${6 + i * 2}s ease-in-out infinite ${i}s`,
          }}
        />
      ))}
    </>
  );
}

/* ═══ Section Divider ═══ */
export function SectionDivider() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        padding: "30px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to right, transparent, ${theme.primary}33)`,
          transform: vis ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "right",
          transition: "transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            fontSize: 10 + i * 3,
            color: theme.light,
            opacity: vis ? 0.2 + i * 0.15 : 0,
            transform: vis
              ? "scale(1) translateY(0)"
              : "scale(0) translateY(10px)",
            transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s`,
          }}
        >
          ♥
        </div>
      ))}
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to left, transparent, ${theme.primary}33)`,
          transform: vis ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}
      />
    </div>
  );
}

/* ═══ Love Transition ═══ */
export function LoveTransition({ active, onDone }) {
  const [phase, setPhase] = useState("idle");
  const [items, setItems] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      setItems([]);
      return;
    }
    // Only run on client
    const arr = [];
    arr.push({
      id: "c",
      type: "heart",
      x: 50,
      y: 50,
      tx: 50,
      ty: 50,
      size: 100,
      delay: 0,
      dur: 0.5,
      rot: 0,
    });
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * 360,
        d = 25 + Math.random() * 35;
      arr.push({
        id: `h${i}`,
        type: "heart",
        x: 50,
        y: 50,
        tx: 50 + Math.cos((a * Math.PI) / 180) * d,
        ty: 50 + Math.sin((a * Math.PI) / 180) * d,
        size: 12 + Math.random() * 22,
        delay: 0.02 + Math.random() * 0.15,
        dur: 0.35 + Math.random() * 0.25,
        rot: -30 + Math.random() * 60,
      });
    }
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * 360,
        d = 15 + Math.random() * 50;
      arr.push({
        id: `p${i}`,
        type: "petal",
        x: 50,
        y: 50,
        tx: 50 + Math.cos((a * Math.PI) / 180) * d,
        ty: 50 + Math.sin((a * Math.PI) / 180) * d,
        size: 6 + Math.random() * 14,
        delay: 0.05 + Math.random() * 0.2,
        dur: 0.4 + Math.random() * 0.3,
        rot: Math.random() * 360,
      });
    }
    for (let i = 0; i < 10; i++) {
      arr.push({
        id: `b${i}`,
        type: "bokeh",
        x: Math.random() * 100,
        y: Math.random() * 100,
        tx: Math.random() * 100,
        ty: Math.random() * 100,
        size: 30 + Math.random() * 70,
        delay: Math.random() * 0.2,
        dur: 0.5 + Math.random() * 0.3,
        rot: 0,
      });
    }
    setItems(arr);
    setPhase("burst");
    setTimeout(() => setPhase("bloom"), 250);
    setTimeout(() => setPhase("fade"), 550);
    setTimeout(() => {
      setPhase("idle");
      setItems([]);
      if (onDone) onDone();
    }, 800);
  }, [active]);

  if (phase === "idle") return null;
  const isBurst = phase === "burst" || phase === "bloom";
  const isFade = phase === "fade";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        pointerEvents: "none",
        background: phase === "bloom" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
        backdropFilter: phase === "bloom" ? "blur(4px)" : "blur(0px)",
        transition: "background 0.3s, backdrop-filter 0.3s",
      }}
    >
      {items.map((h) => {
        if (h.type === "heart")
          return (
            <div
              key={h.id}
              style={{
                position: "absolute",
                left: `${isBurst || isFade ? h.tx : h.x}%`,
                top: `${isBurst || isFade ? h.ty : h.y}%`,
                transform: `translate(-50%,-50%) rotate(${h.rot}deg) scale(${isFade ? 0 : isBurst ? 1 : 0})`,
                opacity: isFade ? 0 : isBurst ? 1 : 0,
                transition: `all ${h.dur}s cubic-bezier(0.16,1,0.3,1) ${h.delay}s`,
                fontSize: h.size,
                color: theme.primary,
                filter:
                  h.id === "c"
                    ? `drop-shadow(0 0 30px ${theme.glow})`
                    : `drop-shadow(0 0 8px ${theme.glow})`,
              }}
            >
              ♥
            </div>
          );
        if (h.type === "petal")
          return (
            <div
              key={h.id}
              style={{
                position: "absolute",
                left: `${isBurst || isFade ? h.tx : h.x}%`,
                top: `${isBurst || isFade ? h.ty : h.y}%`,
                width: h.size,
                height: h.size * 0.65,
                background: `${theme.primary}88`,
                borderRadius: "50% 0 50% 50%",
                transform: `translate(-50%,-50%) rotate(${h.rot + (isBurst ? 180 : 0)}deg) scale(${isFade ? 0 : isBurst ? 1 : 0})`,
                opacity: isFade ? 0 : isBurst ? 0.7 : 0,
                transition: `all ${h.dur}s cubic-bezier(0.16,1,0.3,1) ${h.delay}s`,
              }}
            />
          );
        if (h.type === "bokeh")
          return (
            <div
              key={h.id}
              style={{
                position: "absolute",
                left: `${h.x}%`,
                top: `${h.y}%`,
                width: h.size,
                height: h.size,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${theme.primary}15, transparent 70%)`,
                transform: `translate(-50%,-50%) scale(${isFade ? 1.5 : isBurst ? 1 : 0})`,
                opacity: isFade ? 0 : isBurst ? 1 : 0,
                transition: `all ${h.dur}s cubic-bezier(0.16,1,0.3,1) ${h.delay}s`,
              }}
            />
          );
        return null;
      })}
    </div>
  );
}
