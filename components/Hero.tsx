"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lensFlareRef = useRef<HTMLDivElement>(null);

  const bgX = useRef(0); const bgY = useRef(0);
  const glowX = useRef(0); const glowY = useRef(0);
  const txX = useRef(0); const txY = useRef(0);
  const bgTX = useRef(0); const bgTY = useRef(0);
  const glowTX = useRef(0); const glowTY = useRef(0);
  const txTX = useRef(0); const txTY = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      bgX.current = lerp(bgX.current, bgTX.current, 0.06);
      bgY.current = lerp(bgY.current, bgTY.current, 0.06);
      glowX.current = lerp(glowX.current, glowTX.current, 0.06);
      glowY.current = lerp(glowY.current, glowTY.current, 0.06);
      txX.current = lerp(txX.current, txTX.current, 0.06);
      txY.current = lerp(txY.current, txTY.current, 0.06);

      if (bgRef.current)
        bgRef.current.style.transform = `translate(${bgX.current}px, ${bgY.current}px) scale(1.08)`;
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${glowX.current}px, ${glowY.current}px)`;
      if (textRef.current)
        textRef.current.style.transform = `translate(${txX.current}px, ${txY.current}px)`;

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      bgTX.current = x * -18;
      bgTY.current = y * -12;
      glowTX.current = x * -28;
      glowTY.current = y * -18;
      txTX.current = x * 8;
      txTY.current = y * 5;

      if (lensFlareRef.current) {
        lensFlareRef.current.style.left = `${50 + x * 30}%`;
        lensFlareRef.current.style.top = `${50 + y * 20}%`;
        lensFlareRef.current.style.opacity = `${0.25 + Math.abs(x) * 0.35}`;
      }
    };

    const onMouseLeave = () => {
      bgTX.current = 0; bgTY.current = 0;
      glowTX.current = 0; glowTY.current = 0;
      txTX.current = 0; txTY.current = 0;
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${y * 0.35}px) scale(1.12)`;
      if (textRef.current) {
        const opacity = Math.max(0, 1 - y / 550);
        textRef.current.style.opacity = String(opacity);
        textRef.current.style.transform = `translateY(${y * 0.18}px)`;
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "600px",
        overflow: "hidden",
        background: "#040404",
      }}
    >
      {/* Background video */}
      <div ref={bgRef} style={{ position: "absolute", inset: "-8%", willChange: "transform" }}>
        <video
          autoPlay muted loop playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.42) saturate(0.65)" }}
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(4,4,4,0.25) 0%, rgba(4,4,4,0.05) 30%, rgba(4,4,4,0.55) 70%, rgba(4,4,4,0.97) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(4,4,4,0.65) 0%, transparent 55%, rgba(4,4,4,0.25) 100%)", zIndex: 1 }} />

      {/* Gold glow */}
      <div ref={glowRef} style={{ position: "absolute", top: "25%", left: "15%", width: "65%", height: "45%", background: "radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)", zIndex: 2, willChange: "transform", pointerEvents: "none" }} />

      {/* Lens flare */}
      <div ref={lensFlareRef} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(240,208,128,0.12) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)", borderRadius: "50%", zIndex: 2, opacity: 0.18, pointerEvents: "none", transition: "opacity 0.3s ease" }} />

      {/* Letterbox */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "52px", background: "linear-gradient(to bottom,#040404,transparent)", zIndex: 3 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "52px", background: "linear-gradient(to top,#040404,transparent)", zIndex: 3 }} />

      {/* Studio name — top center */}
      <div style={{
        position: "absolute", top: "28px", left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10, textAlign: "center", whiteSpace: "nowrap",
      }}>
        <span style={{
          fontSize: "13px", letterSpacing: "0.42em",
          textTransform: "uppercase",
          fontFamily: "var(--font-outfit,Outfit,sans-serif)",
          fontWeight: 600, color: "#c9a84c",
        }}>
          Mad Shot Studio
        </span>
      </div>

      {/* Main text */}
      <div
        ref={textRef}
        style={{
          position: "absolute", inset: 0, zIndex: 4,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 max(40px,6vw)", paddingBottom: "80px",
          willChange: "transform, opacity",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <span style={{ width: "48px", height: "1px", background: "#c9a84c", display: "block" }} />
          <span style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c", fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 500 }}>
            Cinematographer & Photographer
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "var(--font-playfair,'Playfair Display',serif)",
          fontSize: "clamp(52px,8.5vw,110px)", fontWeight: 900,
          lineHeight: 0.92, letterSpacing: "-0.03em", color: "#e8e8e8", marginBottom: "8px",
        }}>
          Crafting
          <br />
          <em style={{
            fontStyle: "italic", fontWeight: 700,
            background: "linear-gradient(135deg,#c9a84c 0%,#f0d080 45%,#c9a84c 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Visual</em>
          <br />
          Stories
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "clamp(13px,1.4vw,16px)", color: "rgba(255,255,255,0.48)",
          fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 300, lineHeight: 1.75,
          maxWidth: "360px", marginTop: "22px", marginBottom: "44px",
        }}>
          Based in India — where light meets emotion,
          <br />
          every frame tells a story.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <Link href="/portfolio" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "14px 28px",
            background: "linear-gradient(135deg,#c9a84c,#a8893a)",
            borderRadius: "100px", color: "#040404",
            fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 600,
            fontSize: "13px", letterSpacing: "0.04em", textDecoration: "none",
            boxShadow: "0 0 32px rgba(201,168,76,0.38)",
          }}>
            View Portfolio <ArrowUpRight size={15} />
          </Link>
          <Link href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "14px 28px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "100px", color: "rgba(255,255,255,0.72)",
            fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 400,
            fontSize: "13px", textDecoration: "none", backdropFilter: "blur(16px)",
          }}>
            Book a Session
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "40px", marginTop: "60px", flexWrap: "wrap" }}>
          {[{ num: "4+", label: "Years" }, { num: "200+", label: "Projects" }, { num: "50+", label: "Clients" }].map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: "var(--font-playfair,'Playfair Display',serif)",
                fontSize: "26px", fontWeight: 900,
                background: "linear-gradient(135deg,#c9a84c,#f0d080)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>{num}</div>
              <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "68px", right: "max(40px,6vw)", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ writingMode: "vertical-rl", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-outfit,Outfit,sans-serif)" }}>Scroll</div>
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom,rgba(201,168,76,0.55),transparent)", animation: "scrollpulse 2s ease infinite" }} />
      </div>

      <style>{`
        @keyframes scrollpulse {
          0%,100% { opacity:1; }
          50% { opacity:0.25; }
        }
      `}</style>
    </section>
  );
}