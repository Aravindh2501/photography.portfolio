"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "60px max(40px,6vw) 40px",
        background: "#040404",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "40px",
          marginBottom: "48px",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-playfair,'Playfair Display',serif)",
              fontSize: "24px",
              fontStyle: "italic",
              fontWeight: 700,
              background: "linear-gradient(135deg,#c9a84c,#f0d080,#c9a84c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "8px",
            }}
          >
            mad.shot.diary
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-outfit,Outfit,sans-serif)",
              fontWeight: 300,
              letterSpacing: "0.05em",
            }}
          >
            Cinematographer & Photographer
            <br />
            Chennai, India
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginBottom: "16px" }}>Navigate</div>
            {[{ label: "Home", href: "/" }, { label: "Portfolio", href: "/portfolio" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }].map(({ label, href }) => (
              <div key={label} style={{ marginBottom: "10px" }}>
                <Link href={href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", textDecoration: "none", transition: "color 0.2s ease" }}>
                  {label}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginBottom: "16px" }}>Connect</div>
            {[
              { label: "Instagram", href: "https://instagram.com/mad.shot.studio" },
              { label: "WhatsApp", href: "https://wa.me/918383829288" },
              { label: "Email", href: "mailto:madshotstudio@gmail.com" },
            ].map(({ label, href }) => (
              <div key={label} style={{ marginBottom: "10px" }}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "4px",
                    fontSize: "13px", color: "rgba(255,255,255,0.45)",
                    fontFamily: "var(--font-outfit,Outfit,sans-serif)",
                    textDecoration: "none", transition: "color 0.2s ease",
                  }}
                >
                  {label} <ArrowUpRight size={10} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-outfit,Outfit,sans-serif)" }}>
          © {year} mad.shot.studio — Aravindh. All rights reserved.
        </div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", letterSpacing: "0.05em" }}>
          Crafted with vision & light ✦
        </div>
      </div>
    </footer>
  );
}
