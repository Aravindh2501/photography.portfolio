"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX } from "lucide-react";
import type { PortfolioItem } from "@/lib/data";

interface LightboxProps {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ items, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const current = items[currentIndex];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const isVideo = !!(current?.src);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  // Auto-play video when lightbox opens on a video item
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    setVideoReady(false);
    vid.load();
    const onCanPlay = () => {
      setVideoReady(true);
      vid.play().catch(() => {});
    };
    vid.addEventListener("canplay", onCanPlay);
    return () => vid.removeEventListener("canplay", onCanPlay);
  }, [currentIndex]);

  if (!current) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(4,4,4,0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "lbFadeIn 0.25s ease",
      }}
    >
      {/* ── Close ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: "fixed", top: "20px", right: "20px",
          width: "40px", height: "40px", borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.7)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10, transition: "background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
      >
        <X size={16} />
      </button>

      {/* ── Prev ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: "fixed", left: "16px", top: "50%", transform: "translateY(-50%)",
          width: "44px", height: "44px", borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.7)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10, transition: "background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
      >
        <ChevronLeft size={20} />
      </button>

      {/* ── Media container ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(92vw, 1000px)",
          maxHeight: "82vh",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 32px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isVideo ? (
          /* ── VIDEO ── */
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
            {/* Loading spinner */}
            {!videoReady && (
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center", zIndex: 2,
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  border: "2px solid rgba(201,168,76,0.2)",
                  borderTop: "2px solid #c9a84c",
                  animation: "lbSpin 0.8s linear infinite",
                }} />
              </div>
            )}
            <video
              ref={videoRef}
              muted={muted}
              loop
              playsInline
              controls
              preload="auto"
              style={{
                width: "100%", height: "100%",
                objectFit: "contain", display: "block",
                opacity: videoReady ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {current.src && <source src={current.src} type="video/mp4" />}
            </video>

            {/* Mute toggle (only shown when not using native controls) */}
          </div>
        ) : (
          /* ── IMAGE ── */
          <div style={{
            position: "relative",
            width: "min(92vw, 1000px)",
            maxHeight: "82vh",
            // Let the image dictate height via aspect ratio
            aspectRatio: "4/3",
          }}>
            <Image
              src={current.thumb}
              alt={current.title}
              fill
              style={{ objectFit: "contain" }}
              sizes="min(92vw, 1000px)"
              priority
            />
          </div>
        )}
      </div>

      {/* ── Next ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: "fixed", right: "16px", top: "50%", transform: "translateY(-50%)",
          width: "44px", height: "44px", borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.7)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10, transition: "background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Caption ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 10,
          whiteSpace: "nowrap",
        }}
      >
        <div style={{
          fontSize: "13px", fontWeight: 500, color: "#e8e8e8",
          fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginBottom: "3px",
        }}>
          {current.title}
        </div>
        {current.subtitle && (
          <div style={{
            fontSize: "11px", color: "rgba(255,255,255,0.38)",
            fontFamily: "var(--font-outfit,Outfit,sans-serif)",
          }}>
            {current.subtitle}
          </div>
        )}
        <div style={{
          fontSize: "10px", color: "rgba(255,255,255,0.2)",
          marginTop: "6px", letterSpacing: "0.15em",
          fontFamily: "var(--font-outfit,Outfit,sans-serif)",
        }}>
          {currentIndex + 1} / {items.length}
        </div>
      </div>

      {/* ── Dot strip ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed", bottom: "88px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: "6px", zIndex: 10,
        }}
      >
        {items.map((_, i) => (
          <div key={i} style={{
            width: i === currentIndex ? "18px" : "5px",
            height: "5px", borderRadius: "3px",
            background: i === currentIndex ? "#c9a84c" : "rgba(255,255,255,0.18)",
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>

      <style>{`
        @keyframes lbFadeIn { from { opacity: 0; transform: scale(0.97) } to { opacity: 1; transform: scale(1) } }
        @keyframes lbSpin   { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}