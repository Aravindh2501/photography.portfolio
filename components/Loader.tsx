"use client";

import { useEffect, useRef, useState } from "react";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 18 + 8;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTimeout(() => {
          const loader = loaderRef.current;
          if (loader) {
            loader.style.transition = "opacity 0.7s ease, transform 0.7s ease";
            loader.style.opacity = "0";
            loader.style.transform = "scale(1.08)";
            setTimeout(() => {
              loader.style.display = "none";
              setDone(true);
            }, 700);
          }
        }, 400);
      }
      setProgress(Math.min(prog, 100));
    }, 80);

    return () => clearInterval(interval);
  }, [done]);

  if (done) return null;

  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (progress / 100) * circumference;

  // Lens blade paths
  const blades = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 360;
    return angle;
  });

  return (
    <div
      ref={loaderRef}
      id="madshot-loader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        background: "#040404",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      {/* Camera lens SVG */}
      <div style={{ position: "relative", width: 160, height: 160 }}>
        {/* Outer rotating ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(201,168,76,0.2)",
            animation: "spin 4s linear infinite",
          }}
        />

        {/* Focus ring marks */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            animation: "spin-slow 8s linear infinite",
          }}
          width="160"
          height="160"
          viewBox="0 0 160 160"
        >
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * 360;
            const rad = (angle * Math.PI) / 180;
            const x1 = 80 + 72 * Math.cos(rad);
            const y1 = 80 + 72 * Math.sin(rad);
            const x2 = 80 + (i % 4 === 0 ? 60 : 66) * Math.cos(rad);
            const y2 = 80 + (i % 4 === 0 ? 60 : 66) * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 4 === 0 ? "#c9a84c" : "rgba(201,168,76,0.3)"}
                strokeWidth={i % 4 === 0 ? "1.5" : "0.8"}
              />
            );
          })}
        </svg>

        {/* Progress ring */}
        <svg
          style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
          width="160"
          height="160"
          viewBox="0 0 160 160"
        >
          <circle
            cx="80"
            cy="80"
            r="52"
            fill="none"
            stroke="rgba(201,168,76,0.1)"
            strokeWidth="2"
          />
          <circle
            cx="80"
            cy="80"
            r="52"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.1s ease" }}
          />
        </svg>

        {/* Lens blades */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {blades.map((angle, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "center",
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "50%",
                  height: "60px",
                  background: `rgba(10,10,10,${0.85 - (progress / 100) * 0.85})`,
                  transformOrigin: "0 0",
                  transform: `translateY(-50%) rotate(${(progress / 100) * 25 - 12}deg)`,
                  transition: "all 0.05s",
                  borderRadius: "0 0 40px 40px",
                }}
              />
            </div>
          ))}

          {/* Center aperture glow */}
          <div
            style={{
              position: "absolute",
              inset: "30%",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(201,168,76,${
                0.1 + (progress / 100) * 0.6
              }) 0%, transparent 70%)`,
              boxShadow: `0 0 ${20 + (progress / 100) * 40}px rgba(201,168,76,${
                0.3 + (progress / 100) * 0.4
              })`,
              transition: "all 0.1s",
            }}
          />
        </div>

        {/* Inner ring */}
        <div
          style={{
            position: "absolute",
            inset: "28px",
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.15)",
          }}
        />
      </div>

      {/* Brand text */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
            fontSize: "28px",
            fontStyle: "italic",
            fontWeight: 700,
            background:
              "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.05em",
            marginBottom: "8px",
          }}
        >
          mad.shot.diary
        </div>
        <div
          style={{
            fontFamily: "var(--font-outfit, Outfit, sans-serif)",
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
          }}
        >
          {progress < 100 ? `Loading ${Math.round(progress)}%` : "Ready"}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
