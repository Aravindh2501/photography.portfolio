"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, ArrowUpRight } from "lucide-react";
import { portraitItems, coupleItems, videoItems, type PortfolioItem } from "@/lib/data";
import { PhotoCard, VideoCard } from "@/components/Portfolio";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/lib/useScrollReveal";

// ─── Photo Lightbox ───────────────────────────────────────────────────────────
function PhotoLightbox({ items, index, onClose, onPrev, onNext }: {
  items: PortfolioItem[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 60000,
        background: "rgba(4,4,4,0.96)", backdropFilter: "blur(24px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "60px 80px",
        animation: "lb-in 0.3s ease",
      }}
    >
      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: "24px", right: "24px",
        width: "44px", height: "44px", borderRadius: "50%",
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.6)", cursor: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "16px", zIndex: 2,
      }}>✕</button>

      {/* Prev */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} style={{
        position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)",
        width: "48px", height: "48px", borderRadius: "50%",
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.7)", cursor: "none",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
      }}>
        <ChevronLeft size={20} />
      </button>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", maxWidth: "860px", maxHeight: "80vh",
          width: "100%", height: "100%",
          borderRadius: "14px", overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.85)",
        }}
      >
        <Image src={item.thumb} alt={item.title} fill style={{ objectFit: "contain" }} sizes="90vw" priority />
      </div>

      {/* Next */}
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} style={{
        position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)",
        width: "48px", height: "48px", borderRadius: "50%",
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.7)", cursor: "none",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
      }}>
        <ChevronRight size={20} />
      </button>

      {/* Caption */}
      <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <div style={{ fontSize: "14px", fontWeight: 500, color: "#e8e8e8", fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginBottom: "3px" }}>{item.title}</div>
        {item.subtitle && <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-outfit,Outfit,sans-serif)" }}>{item.subtitle}</div>}
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", marginTop: "8px", fontFamily: "var(--font-outfit,Outfit,sans-serif)", letterSpacing: "0.12em" }}>
          {index + 1} / {items.length} &nbsp;·&nbsp; ← → to navigate &nbsp;·&nbsp; Esc to close
        </div>
      </div>

      <style>{`@keyframes lb-in { from { opacity:0; } to { opacity:1; } }`}</style>
    </div>
  );
}

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 60000,
        background: "rgba(4,4,4,0.97)", backdropFilter: "blur(24px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px",
        animation: "lb-in 0.3s ease",
      }}
    >
      <button onClick={onClose} style={{
        position: "absolute", top: "24px", right: "24px",
        width: "44px", height: "44px", borderRadius: "50%",
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.6)", cursor: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "16px", zIndex: 2,
      }}>✕</button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "960px",
          borderRadius: "14px", overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.9)",
          background: "#080808",
          border: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        {/* If src is a placeholder, show thumb with play overlay */}
        <div style={{ position: "relative", aspectRatio: "16/9" }}>
          <Image src={item.thumb} alt={item.title} fill style={{ objectFit: "cover", filter: "brightness(0.55)" }} sizes="90vw" />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <div style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.5)",
              backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(201,168,76,0.4)", color: "#c9a84c",
            }}>
              <Play size={28} fill="#c9a84c" style={{ marginLeft: "3px" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "#e8e8e8", fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginBottom: "4px" }}>{item.title}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", letterSpacing: "0.08em" }}>{item.subtitle} · {item.duration}</div>
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", letterSpacing: "0.08em", textAlign: "center" }}>
              Replace with your actual video URL in lib/data.ts
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes lb-in { from { opacity:0; } to { opacity:1; } }`}</style>
    </div>
  );
}

// ─── Portfolio Page ───────────────────────────────────────────────────────────
export default function PortfolioPage() {
  useScrollReveal();

  const [photoLB, setPhotoLB] = useState<{ items: PortfolioItem[]; index: number } | null>(null);
  const [videoModal, setVideoModal] = useState<PortfolioItem | null>(null);

  const openPhoto = (item: PortfolioItem, index: number, list: PortfolioItem[]) => setPhotoLB({ items: list, index });
  const openVideo = (item: PortfolioItem) => setVideoModal(item);

  return (
    <main style={{ background: "#040404", minHeight: "100vh" }}>
      {/* Page hero */}
      <div style={{
        padding: "140px max(40px,6vw) 80px",
        background: "linear-gradient(to bottom,rgba(201,168,76,0.04) 0%,transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ width: "40px", height: "1px", background: "#c9a84c" }} />
          <span style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c", fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 500 }}>Portfolio</span>
        </div>
        <h1 style={{
          fontFamily: "var(--font-playfair,'Playfair Display',serif)",
          fontSize: "clamp(48px,7vw,96px)", fontWeight: 900,
          lineHeight: 0.95, letterSpacing: "-0.03em", color: "#e8e8e8",
        }}>
          Visual<br />
          <em style={{
            fontStyle: "italic", fontWeight: 700,
            background: "linear-gradient(135deg,#c9a84c,#f0d080,#c9a84c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Archive</em>
        </h1>
      </div>

      {/* Portrait Photography */}
      <section style={{ padding: "100px max(40px,6vw)" }}>
        <SectionHeader eyebrow="Visual Stories" title="Portrait" titleItalic="Photography" subtitle={`${portraitItems.length} photographs — click any to open`} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "14px" }}>
          {portraitItems.map((item, i) => (
            <div key={item.id} data-reveal data-reveal-delay={String(i * 55)}>
              <PhotoCard item={item} onClick={() => openPhoto(item, i, portraitItems)} />
            </div>
          ))}
        </div>
      </section>

      {/* Couple Shoots */}
      <section style={{ padding: "100px max(40px,6vw)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <SectionHeader eyebrow="Love Stories" title="Couple" titleItalic="Shoots" subtitle={`${coupleItems.length} sessions — click any to open`} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "14px" }}>
          {coupleItems.map((item, i) => (
            <div key={item.id} data-reveal data-reveal-delay={String(i * 55)}>
              <PhotoCard item={item} onClick={() => openPhoto(item, i, coupleItems)} />
            </div>
          ))}
        </div>
      </section>

      {/* Cinematic Videos */}
      <section style={{ padding: "100px max(40px,6vw)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <SectionHeader eyebrow="Film Work" title="Cinematic" titleItalic="Videos" subtitle={`${videoItems.length} films — hover to preview, click to play`} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "18px" }}>
          {videoItems.map((item, i) => (
            <div key={item.id} data-reveal data-reveal-delay={String(i * 80)}>
              <VideoCard item={item} onClick={() => openVideo(item)} />
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Photo Lightbox */}
      {photoLB && (
        <PhotoLightbox
          items={photoLB.items}
          index={photoLB.index}
          onClose={() => setPhotoLB(null)}
          onPrev={() => setPhotoLB(lb => lb ? { ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length } : lb)}
          onNext={() => setPhotoLB(lb => lb ? { ...lb, index: (lb.index + 1) % lb.items.length } : lb)}
        />
      )}

      {/* Video Modal */}
      {videoModal && <VideoModal item={videoModal} onClose={() => setVideoModal(null)} />}
    </main>
  );
}
