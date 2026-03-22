"use client";

import { useEffect, useRef, useState } from "react";

// ─── 5 distinct videos ────────────────────────────────────────────────────────
// Using W3Schools / Google CDN sample videos that are 100% always available.
// Swap these with your own MP4 URLs — keep them under 10MB each for best perf.
const moments = [
  {
    time: 0,
    title: "The Golden Hour",
    text: "When light breathes life into every frame",
    video: "https://videos.pexels.com/video-files/854173/854173-hd_1920_1080_25fps.mp4",
  },
  {
    time: 0.25,
    title: "Raw Emotion",
    text: "Capturing feelings that words cannot describe",
    video: "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4",
  },
  {
    time: 0.5,
    title: "Intimate Moments",
    text: "The quiet details that make stories unforgettable",
    video: "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4",
  },
  {
    time: 0.75,
    title: "Cinematic Vision",
    text: "Transforming reality into timeless art",
    video: "https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_30fps.mp4",
  },
  {
    time: 1.0,
    title: "Your Story, Told Beautifully",
    text: "Every frame crafted with intention and heart",
    video: "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4",
  },
];

export default function StorytellingSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const bodyRef     = useRef<HTMLParagraphElement>(null);
  const videoRefs   = useRef<(HTMLVideoElement | null)[]>([]);
  const loadedRef   = useRef<boolean[]>([false, false, false, false, false]);
  const [activeIdx, setActiveIdx] = useState(0);
  const lastIdx     = useRef(-1);
  const ticking     = useRef(false);

  // ── Load a video on demand (set src only when needed) ────────────────────
  const ensureLoaded = (idx: number) => {
    const vid = videoRefs.current[idx];
    if (!vid || loadedRef.current[idx]) return;
    loadedRef.current[idx] = true;
    vid.src = moments[idx].video;
    vid.load();
  };

  // ── On mount: load first two immediately, preload rest progressively ─────
  useEffect(() => {
    // Load video 0 and 1 immediately
    ensureLoaded(0);
    ensureLoaded(1);

    // Load remaining videos after a short delay so they don't block initial render
    const timer = setTimeout(() => {
      ensureLoaded(2);
      ensureLoaded(3);
      ensureLoaded(4);
    }, 2000);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Play active, pause others ─────────────────────────────────────────────
  useEffect(() => {
    // Ensure the next video is loaded before we need it
    ensureLoaded(activeIdx);
    if (activeIdx + 1 < moments.length) ensureLoaded(activeIdx + 1);

    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeIdx) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  // ── Scroll handler ────────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        ticking.current = false;
        const rect       = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress   = Math.max(0, Math.min(1, -rect.top / scrollable));

        if (progressRef.current) {
          progressRef.current.style.width = `${progress * 100}%`;
        }

        let idx = 0;
        for (let i = moments.length - 1; i >= 0; i--) {
          if (progress >= moments[i].time) { idx = i; break; }
        }

        if (idx !== lastIdx.current) {
          lastIdx.current = idx;
          setActiveIdx(idx);

          const title = titleRef.current;
          const body  = bodyRef.current;
          if (title && body) {
            title.style.transition = "none";
            body.style.transition  = "none";
            title.style.opacity    = "0";
            title.style.transform  = "translateY(14px)";
            body.style.opacity     = "0";
            setTimeout(() => {
              title.textContent      = moments[idx].title;
              body.textContent       = moments[idx].text;
              title.style.transition = "opacity 0.5s ease, transform 0.5s ease";
              body.style.transition  = "opacity 0.5s ease";
              title.style.opacity    = "1";
              title.style.transform  = "translateY(0)";
              body.style.opacity     = "1";
            }, 100);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: "350vh", position: "relative", background: "#040404" }}
    >
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        overflow: "hidden", display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>

        {/* Videos — NO src on mount, injected via ensureLoaded() */}
        {moments.map((_, i) => (
          <video
            key={i}
            ref={el => { videoRefs.current[i] = el; }}
            muted
            loop
            playsInline
            // No src or preload here — controlled manually above
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              filter: "brightness(0.38) saturate(0.6)",
              opacity: i === activeIdx ? 1 : 0,
              transition: "opacity 0.7s ease",
              zIndex: 0,
              willChange: "opacity",
              transform: "translateZ(0)",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom,rgba(4,4,4,0.55) 0%,rgba(4,4,4,0.15) 50%,rgba(4,4,4,0.65) 100%)",
          zIndex: 1,
        }} />

        {/* Eyebrow */}
        <div style={{
          position: "absolute", top: "68px", left: "50%",
          transform: "translateX(-50%)", zIndex: 3,
          textAlign: "center", whiteSpace: "nowrap",
        }}>
          <div style={{
            fontSize: "10px", letterSpacing: "0.38em",
            textTransform: "uppercase", color: "#c9a84c",
            fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 500,
          }}>
            ✦ &nbsp; Scroll to Experience &nbsp; ✦
          </div>
        </div>

        {/* Text overlay */}
        <div style={{
          position: "absolute", zIndex: 3, textAlign: "center",
          padding: "0 max(40px,10vw)", pointerEvents: "none",
        }}>
          <h2
            ref={titleRef}
            style={{
              fontFamily: "var(--font-playfair,'Playfair Display',serif)",
              fontSize: "clamp(38px,5.5vw,74px)", fontWeight: 900,
              lineHeight: 1.05, letterSpacing: "-0.02em", color: "#e8e8e8",
              marginBottom: "20px", textShadow: "0 2px 40px rgba(0,0,0,0.9)",
              opacity: 1, transform: "translateY(0)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {moments[0].title}
          </h2>
          <p
            ref={bodyRef}
            style={{
              fontSize: "clamp(13px,1.4vw,17px)", color: "rgba(255,255,255,0.52)",
              fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 300,
              lineHeight: 1.75, maxWidth: "480px", margin: "0 auto",
              transition: "opacity 0.5s ease",
            }}
          >
            {moments[0].text}
          </p>

          {/* Dots */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "36px" }}>
            {moments.map((_, i) => (
              <div key={i} style={{
                width: i === activeIdx ? "24px" : "6px",
                height: "6px", borderRadius: "3px",
                background: i === activeIdx ? "#c9a84c" : "rgba(201,168,76,0.25)",
                transition: "all 0.4s ease",
              }} />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          position: "absolute", bottom: "72px",
          left: "max(40px,6vw)", right: "max(40px,6vw)",
          height: "1px", background: "rgba(255,255,255,0.08)",
          zIndex: 3, borderRadius: "1px",
        }}>
          <div
            ref={progressRef}
            style={{
              height: "100%", width: "0%",
              background: "linear-gradient(to right,#c9a84c,#f0d080)",
              borderRadius: "1px", boxShadow: "0 0 8px rgba(201,168,76,0.55)",
            }}
          />
          {moments.map((m, i) => (
            <div key={i} style={{
              position: "absolute", top: "50%",
              transform: "translate(-50%,-50%)",
              left: `${m.time * 100}%`,
              width: i === activeIdx ? "9px" : "5px",
              height: i === activeIdx ? "9px" : "5px",
              borderRadius: "50%",
              background: i <= activeIdx ? "#c9a84c" : "rgba(201,168,76,0.2)",
              transition: "all 0.3s ease",
              boxShadow: i === activeIdx ? "0 0 8px rgba(201,168,76,0.8)" : "none",
            }} />
          ))}
        </div>

        {/* Letterbox */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "52px", background: "linear-gradient(to bottom,#040404,transparent)", zIndex: 4 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "52px", background: "linear-gradient(to top,#040404,transparent)", zIndex: 4 }} />
      </div>
    </section>
  );
}