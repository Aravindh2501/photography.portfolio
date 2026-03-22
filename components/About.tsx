"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface AboutProps {
  preview?: boolean;
}

export default function About({ preview = false }: AboutProps) {
  useScrollReveal();

  const skills = [
    "Cinematography",
    "Wedding Films",
    "Portrait Photography",
    "Commercial Video",
    "Color Grading",
    "Aerial Photography",
    "Brand Films",
    "Documentary",
  ];

  const gear = [
    { label: "Primary", value: "Sony FX3 / A7 IV" },
    { label: "Lenses", value: "Sigma Art Series, Sony G Master" },
    { label: "Lighting", value: "ARRI SkyPanel, Aputure 600D" },
    { label: "Aerial", value: "DJI Mavic 3 Pro" },
    { label: "Support", value: "DJI RS4 Pro, Syrp Genie" },
  ];

  return (
    <section
      style={{
        padding: preview ? "100px max(40px, 6vw)" : "120px max(40px, 6vw)",
        background: "#040404",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: "80px",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Image side */}
        <div data-reveal style={{ position: "relative" }}>
          {/* Main portrait */}
          <div
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              aspectRatio: "3/4",
              boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt="Aravindh - Cinematographer"
              fill
              style={{
                objectFit: "cover",
                filter: "brightness(0.85)",
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(4,4,4,0.7) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Floating camera icon card */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              right: "-24px",
              background: "rgba(10,10,10,0.85)",
              border: "1px solid rgba(201,168,76,0.2)",
              backdropFilter: "blur(16px)",
              borderRadius: "16px",
              padding: "20px 24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(201,168,76,0.15)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#c9a84c",
                }}
              >
                <Camera size={16} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#e8e8e8",
                    fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                  }}
                >
                  Available for Projects
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                  }}
                >
                  Nationwide & International
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "6px",
                marginTop: "12px",
              }}
            >
              {["Wedding", "Commercial", "Editorial"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "10px",
                    padding: "3px 8px",
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    borderRadius: "100px",
                    color: "#c9a84c",
                    fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Experience badge */}
          <div
            style={{
              position: "absolute",
              top: "32px",
              left: "-16px",
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.25)",
              backdropFilter: "blur(16px)",
              borderRadius: "12px",
              padding: "16px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily:
                  "var(--font-playfair, 'Playfair Display', serif)",
                fontSize: "28px",
                fontWeight: 900,
                background: "linear-gradient(135deg, #c9a84c, #f0d080)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              4+
            </div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                marginTop: "2px",
              }}
            >
              Years
            </div>
          </div>
        </div>

        {/* Content side */}
        <div>
          <SectionHeader
            eyebrow="About Aravindh"
            title="The Eye Behind"
            titleItalic="Every Frame"
            subtitle="A passionate storyteller with a camera, based in Chennai, India. I craft visual narratives that resonate long after the final frame."
          />

          <div data-reveal style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.55)",
                fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                fontWeight: 300,
                marginBottom: "16px",
              }}
            >
              Every project begins with understanding the soul of the story.
              Whether it&apos;s the raw emotion of a wedding day, the elegance of
              a brand film, or the delicate light of a portrait session — I
              approach each frame with intentionality and craft.
            </p>
            {!preview && (
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                  fontWeight: 300,
                }}
              >
                Trained in classical filmmaking principles and shaped by the
                vibrant visual culture of South India, my work blends
                cinematic technique with a deeply personal aesthetic.
              </p>
            )}
          </div>

          {/* Skills */}
          {!preview && (
            <div data-reveal style={{ marginBottom: "40px" }}>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                  marginBottom: "16px",
                }}
              >
                Specialties
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
              >
                {skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: "12px",
                      padding: "6px 14px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "100px",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gear */}
          {!preview && (
            <div data-reveal style={{ marginBottom: "40px" }}>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                  marginBottom: "16px",
                }}
              >
                Equipment
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "10px",
                }}
              >
                {gear.map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div data-reveal>
            <Link
              href={preview ? "/about" : "/contact"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "100px",
                color: "#c9a84c",
                fontFamily: "var(--font-outfit, Outfit, sans-serif)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
              }}
            >
              {preview ? "More About Me" : "Start a Project"}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
