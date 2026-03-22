import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — mad.shot.diary",
  description: "Book Aravindh for your next cinematic project. Wedding films, portraits, commercial videos.",
};

export default function ContactPage() {
  return (
    <main style={{ background: "#040404", minHeight: "100vh" }}>
      <div style={{
        padding: "140px max(40px,6vw) 60px",
        background: "linear-gradient(to bottom,rgba(201,168,76,0.04) 0%,transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ width: "40px", height: "1px", background: "#c9a84c" }} />
          <span style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c", fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 500 }}>Get in Touch</span>
        </div>
        <h1 style={{
          fontFamily: "var(--font-playfair,'Playfair Display',serif)",
          fontSize: "clamp(48px,7vw,96px)", fontWeight: 900,
          lineHeight: 0.95, letterSpacing: "-0.03em", color: "#e8e8e8",
        }}>
          Let&apos;s<br />
          <em style={{
            fontStyle: "italic", fontWeight: 700,
            background: "linear-gradient(135deg,#c9a84c,#f0d080,#c9a84c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Collaborate</em>
        </h1>
      </div>

      <Contact />
      <Footer />
    </main>
  );
}
