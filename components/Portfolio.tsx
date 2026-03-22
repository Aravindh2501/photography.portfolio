"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { portraitItems, coupleItems, videoItems, type PortfolioItem } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  items, index, onClose, onPrev, onNext,
}: {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const isVideo = item?.category === "video";

  // Lock scroll, keyboard nav
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  // Auto-play video when item changes
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !isVideo) return;
    setVideoReady(false);
    vid.load();
    const onCan = () => { setVideoReady(true); vid.play().catch(() => {}); };
    vid.addEventListener("canplay", onCan);
    return () => vid.removeEventListener("canplay", onCan);
  }, [index, isVideo]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(4,4,4,0.97)",
        backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        animation: "lbIn 0.2s ease",
      }}
    >
      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: "fixed", top: "18px", right: "18px", zIndex: 10,
          width: "38px", height: "38px", borderRadius: "50%",
          background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      ><X size={15} /></button>

      {/* Prev */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{
            position: "fixed", left: "14px", top: "50%", transform: "translateY(-50%)", zIndex: 10,
            width: "42px", height: "42px", borderRadius: "50%",
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        ><ChevronLeft size={20} /></button>
      )}

      {/* Media */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: isVideo ? "min(95vw, 1100px)" : "min(88vw, 860px)",
          maxHeight: "78vh",
          borderRadius: "12px", overflow: "hidden",
          background: "#0a0a0a",
          boxShadow: "0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)",
          position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {isVideo ? (
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
            {!videoReady && (
              <div style={{
                position: "absolute", inset: 0, background: "#0a0a0a", zIndex: 2,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  border: "2px solid rgba(201,168,76,0.15)",
                  borderTop: "2px solid #c9a84c",
                  animation: "lbSpin 0.75s linear infinite",
                }} />
              </div>
            )}
            <video
              ref={videoRef}
              muted loop playsInline controls preload="auto"
              style={{
                width: "100%", height: "100%", objectFit: "contain", display: "block",
                opacity: videoReady ? 1 : 0, transition: "opacity 0.3s ease",
              }}
            >
              {item.src && <source src={item.src} type="video/mp4" />}
            </video>
          </div>
        ) : (
          <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", maxHeight: "78vh" }}>
            <Image
              src={item.thumb} alt={item.title} fill priority
              style={{ objectFit: "contain" }}
              sizes="min(88vw, 860px)"
            />
          </div>
        )}
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            position: "fixed", right: "14px", top: "50%", transform: "translateY(-50%)", zIndex: 10,
            width: "42px", height: "42px", borderRadius: "50%",
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        ><ChevronRight size={20} /></button>
      )}

      {/* Caption */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ marginTop: "18px", textAlign: "center", zIndex: 10 }}
      >
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#e8e8e8", fontFamily: "var(--font-outfit,Outfit,sans-serif)" }}>
          {item.title}
        </div>
        {item.subtitle && (
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginTop: "3px" }}>
            {item.subtitle}
          </div>
        )}
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginTop: "8px", letterSpacing: "0.15em" }}>
          {index + 1} / {items.length}
        </div>
      </div>

      {/* Dots */}
      {items.length > 1 && (
        <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", gap: "6px", marginTop: "14px", zIndex: 10 }}>
          {items.map((_, i) => (
            <div key={i} style={{
              width: i === index ? "18px" : "5px", height: "5px", borderRadius: "3px",
              background: i === index ? "#c9a84c" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes lbIn   { from { opacity:0; transform:scale(0.98) } to { opacity:1; transform:scale(1) } }
        @keyframes lbSpin { to { transform:rotate(360deg) } }
      `}</style>
    </div>
  );
}

// ─── Photo Card ──────────────────────────────────────────────────────────────
export function PhotoCard({ item, onClick }: { item: PortfolioItem; onClick?: () => void }) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const arrowRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.025)`;
  };
  const onMouseEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
    if (arrowRef.current) { arrowRef.current.style.opacity = "1"; arrowRef.current.style.transform = "scale(1)"; }
    const img = cardRef.current?.querySelector("img");
    if (img) (img as HTMLElement).style.transform = "scale(1.07)";
    if (cardRef.current) cardRef.current.style.boxShadow = "0 10px 44px rgba(201,168,76,0.22), 0 0 0 1px rgba(201,168,76,0.12)";
  };
  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1200px) rotateY(0) rotateX(0) scale(1)";
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
    if (arrowRef.current) { arrowRef.current.style.opacity = "0"; arrowRef.current.style.transform = "scale(0.75)"; }
    const img = card.querySelector("img");
    if (img) (img as HTMLElement).style.transform = "scale(1)";
    card.style.boxShadow = "0 4px 24px rgba(0,0,0,0.45)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick?.(); }}
      style={{
        position: "relative", borderRadius: "12px", overflow: "hidden",
        aspectRatio: "3/4", cursor: "pointer",
        transition: "transform 0.18s ease-out, box-shadow 0.3s ease",
        boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
      }}
    >
      <Image src={item.thumb} alt={item.title} fill
        style={{ objectFit: "cover", transition: "transform 0.55s ease" }}
        sizes="(max-width:768px) 50vw, 25vw"
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(4,4,4,0.85) 0%,transparent 50%)", zIndex: 1 }} />
      <div ref={overlayRef} style={{ position: "absolute", inset: 0, background: "rgba(201,168,76,0.07)", zIndex: 2, opacity: 0, transition: "opacity 0.3s ease" }} />
      <div ref={arrowRef} style={{
        position: "absolute", top: "14px", right: "14px", zIndex: 3,
        width: "32px", height: "32px", borderRadius: "50%",
        background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)",
        backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center",
        color: "#c9a84c", opacity: 0, transform: "scale(0.75)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        <ArrowUpRight size={13} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 14px 13px", zIndex: 3 }}>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#e8e8e8", fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginBottom: "2px" }}>{item.title}</div>
        {item.subtitle && <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-outfit,Outfit,sans-serif)" }}>{item.subtitle}</div>}
      </div>
    </div>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────
export function VideoCard({ item, onClick }: { item: PortfolioItem; onClick?: () => void }) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const playBtnRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const playX = useRef(0); const playY = useRef(0);
  const targetX = useRef(0); const targetY = useRef(0);
  const rafId = useRef<number>(0);

  const animatePlay = useCallback(() => {
    playX.current += (targetX.current - playX.current) * 0.15;
    playY.current += (targetY.current - playY.current) * 0.15;
    if (playBtnRef.current)
      playBtnRef.current.style.transform = `translate(calc(-50% + ${playX.current}px), calc(-50% + ${playY.current}px))`;
    rafId.current = requestAnimationFrame(animatePlay);
  }, []);

  const onMouseEnter = () => {
    setIsHovering(true);
    rafId.current = requestAnimationFrame(animatePlay);
    const v = videoRef.current;
    if (v) { v.muted = true; v.loop = true; v.play().catch(() => {}); }
  };
  const onMouseLeave = () => {
    setIsHovering(false);
    targetX.current = 0; targetY.current = 0;
    cancelAnimationFrame(rafId.current);
    if (playBtnRef.current) {
      playBtnRef.current.style.transition = "transform 0.45s cubic-bezier(0.22,1,0.36,1)";
      playBtnRef.current.style.transform = "translate(-50%,-50%)";
      setTimeout(() => { if (playBtnRef.current) playBtnRef.current.style.transition = ""; }, 450);
    }
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    targetX.current = e.clientX - (rect.left + rect.width / 2);
    targetY.current = e.clientY - (rect.top + rect.height / 2);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick?.(); }}
      style={{
        position: "relative", borderRadius: "12px", overflow: "hidden",
        aspectRatio: "16/9", cursor: "pointer", background: "#0a0a0a",
        border: `1px solid ${isHovering ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.06)"}`,
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
        boxShadow: isHovering ? "0 10px 44px rgba(201,168,76,0.22)" : "0 4px 24px rgba(0,0,0,0.55)",
      }}
    >
      <Image src={item.thumb} alt={item.title} fill
        style={{ objectFit: "cover", transition: "opacity 0.4s ease", opacity: isHovering ? 0 : 1, zIndex: 0 }}
        sizes="(max-width:768px) 100vw, 50vw"
      />
      <video ref={videoRef} muted loop playsInline preload="none"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: isHovering ? 1 : 0,
          transition: "opacity 0.4s ease", filter: "brightness(0.6) saturate(0.8)",
        }}
      >
        {item.src && <source src={item.src} type="video/mp4" />}
      </video>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(4,4,4,0.9) 0%,transparent 55%)", zIndex: 2 }} />
      <div ref={playBtnRef} style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "64px", height: "64px", borderRadius: "50%",
        background: "rgba(10,10,10,0.55)",
        border: `1px solid ${isHovering ? "rgba(201,168,76,0.7)" : "rgba(255,255,255,0.25)"}`,
        backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 5, pointerEvents: "none",
        boxShadow: isHovering ? "0 0 30px rgba(201,168,76,0.55)" : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}>
        <Play size={22} fill={isHovering ? "#c9a84c" : "rgba(255,255,255,0.7)"} style={{ marginLeft: "2px" }} />
      </div>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "16px 20px", zIndex: 4,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 500, color: "#e8e8e8", fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginBottom: "3px" }}>{item.title}</div>
          {item.subtitle && <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-outfit,Outfit,sans-serif)" }}>{item.subtitle}</div>}
        </div>
        {item.duration && (
          <div style={{
            fontSize: "11px", color: "#c9a84c", fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 500,
            background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.22)", borderRadius: "100px", padding: "3px 10px",
          }}>{item.duration}</div>
        )}
      </div>
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function PortfolioSection({ eyebrow, title, italic, children, preview }: {
  eyebrow: string; title: string; italic: string;
  children: React.ReactNode; preview: boolean;
}) {
  return (
    <section style={{ padding: "100px max(40px,6vw)", background: "#040404", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <SectionHeader eyebrow={eyebrow} title={title} titleItalic={italic} />
      {children}
      {preview && (
        <div data-reveal style={{ marginTop: "52px", textAlign: "center" }}>
          <Link href="/portfolio" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "14px 32px", border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "100px", color: "#c9a84c",
            fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontSize: "12px",
            fontWeight: 500, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase",
          }}>
            View Full Portfolio <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Portfolio({ preview = false }: { preview?: boolean }) {
  useScrollReveal();

  const [lightbox, setLightbox] = useState<{ items: PortfolioItem[]; index: number } | null>(null);

  const open  = (items: PortfolioItem[], index: number) => setLightbox({ items, index });
  const close = () => setLightbox(null);
  const prev  = () => setLightbox(lb => lb ? { ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length } : null);
  const next  = () => setLightbox(lb => lb ? { ...lb, index: (lb.index + 1) % lb.items.length } : null);

  const portraits = preview ? portraitItems.slice(0, 4) : portraitItems;
  const couples   = preview ? coupleItems.slice(0, 4)   : coupleItems;
  const videos    = preview ? videoItems.slice(0, 4)    : videoItems;

  return (
    <>
      <PortfolioSection eyebrow="Visual Stories" title="Portrait" italic="Photography" preview={preview}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "14px" }}>
          {portraits.map((item, i) => (
            <div key={item.id} data-reveal data-reveal-delay={String(i * 70)}>
              <PhotoCard item={item} onClick={() => open(portraits, i)} />
            </div>
          ))}
        </div>
      </PortfolioSection>

      <PortfolioSection eyebrow="Love Stories" title="Couple" italic="Shoots" preview={preview}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "14px" }}>
          {couples.map((item, i) => (
            <div key={item.id} data-reveal data-reveal-delay={String(i * 70)}>
              <PhotoCard item={item} onClick={() => open(couples, i)} />
            </div>
          ))}
        </div>
      </PortfolioSection>

      <PortfolioSection eyebrow="Film Work" title="Cinematic" italic="Videos" preview={preview}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "18px" }}>
          {videos.map((item, i) => (
            <div key={item.id} data-reveal data-reveal-delay={String(i * 90)}>
              <VideoCard item={item} onClick={() => open(videos, i)} />
            </div>
          ))}
        </div>
      </PortfolioSection>

      {lightbox && (
        <Lightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}