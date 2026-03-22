"use client";

import { useState } from "react";
import { Mail, ArrowUpRight, Heart } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface ContactProps {
  preview?: boolean;
}

export default function Contact({ preview = false }: ContactProps) {
  useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "", type: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const projectTypes = ["Wedding Film", "Portrait", "Commercial", "Brand Film", "Other"];

  if (preview) {
    return (
      <section style={{ padding: "100px max(40px,6vw)", background: "#040404" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <SectionHeader
            eyebrow="Let's Create"
            title="Have a Project"
            titleItalic="in Mind?"
            subtitle="Let's collaborate and create something extraordinary together."
            centered
          />
          <div data-reveal style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:madshotstudio@gmail.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 32px",
                background: "linear-gradient(135deg,#c9a84c,#a8893a)",
                borderRadius: "100px", color: "#040404",
                fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 600,
                fontSize: "14px", textDecoration: "none",
                boxShadow: "0 0 30px rgba(201,168,76,0.35)",
              }}
            >
              <Mail size={16} /> madshotstudio@gmail.com
            </a>
            <a
              href="https://wa.me/918383829288"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 32px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "100px", color: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 400,
                fontSize: "14px", textDecoration: "none", backdropFilter: "blur(16px)",
              }}
            >
              WhatsApp +91 83838 29288
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: "120px max(40px,6vw)", background: "#040404", position: "relative" }}>
      <div
        style={{
          position: "absolute", top: "20%", left: "50%",
          transform: "translateX(-50%)", width: "600px", height: "400px",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "60px", alignItems: "start" }}>
        {/* Left */}
        <div>
          <SectionHeader eyebrow="Contact" title="Let's Craft" titleItalic="Together" />

          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "48px" }}>
            {[
              { label: "Email", value: "madshotstudio@gmail.com", href: "mailto:madshotstudio@gmail.com" },
              { label: "WhatsApp", value: "+91 83838 29288", href: "https://wa.me/918383829288" },
              { label: "Instagram", value: "@mad.shot.studio", href: "https://instagram.com/mad.shot.studio" },
              { label: "Website", value: "mad.shot.studio", href: "https://mad.shot.studio" },
            ].map(({ label, value, href }) => (
              <a
                key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "16px 20px",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px", textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
              >
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", fontFamily: "var(--font-outfit,Outfit,sans-serif)", marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-outfit,Outfit,sans-serif)" }}>{value}</div>
                </div>
                <ArrowUpRight size={16} color="rgba(201,168,76,0.5)" />
              </a>
            ))}
          </div>

          {/* Quote */}
          <div data-reveal style={{ padding: "28px", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "16px" }}>
            <div style={{ fontFamily: "var(--font-playfair,'Playfair Display',serif)", fontSize: "18px", fontStyle: "italic", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "12px" }}>
              &ldquo;Every moment deserves to be remembered beautifully.&rdquo;
            </div>
            <div style={{ fontSize: "12px", color: "#c9a84c", fontFamily: "var(--font-outfit,Outfit,sans-serif)", letterSpacing: "0.1em" }}>— Aravindh</div>
          </div>
        </div>

        {/* Right: Form */}
        <div data-reveal>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Project type */}
            <div>
              <label style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", display: "block", marginBottom: "10px" }}>Project Type</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {projectTypes.map((t) => (
                  <button
                    type="button" key={t}
                    onClick={() => setForm(f => ({ ...f, type: t }))}
                    style={{
                      padding: "7px 16px",
                      borderRadius: "100px", fontSize: "12px", cursor: "none",
                      fontFamily: "var(--font-outfit,Outfit,sans-serif)",
                      border: form.type === t ? "1px solid rgba(201,168,76,0.5)" : "1px solid rgba(255,255,255,0.08)",
                      background: form.type === t ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.03)",
                      color: form.type === t ? "#c9a84c" : "rgba(255,255,255,0.45)",
                      transition: "all 0.2s ease",
                    }}
                  >{t}</button>
                ))}
              </div>
            </div>

            {[
              { id: "name", label: "Your Name", type: "text", placeholder: "Priya Sharma" },
              { id: "email", label: "Email Address", type: "email", placeholder: "priya@example.com" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", display: "block", marginBottom: "8px" }}>{label}</label>
                <input
                  id={id} type={type} placeholder={placeholder}
                  value={form[id as "name" | "email"]}
                  onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                  required
                  style={{
                    width: "100%", padding: "14px 18px",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px", color: "#e8e8e8",
                    fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontSize: "14px",
                    outline: "none", transition: "border-color 0.2s ease",
                  }}
                  onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-outfit,Outfit,sans-serif)", display: "block", marginBottom: "8px" }}>Tell Me About Your Vision</label>
              <textarea
                id="message" rows={4} placeholder="Describe your project, date, location..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                style={{
                  width: "100%", padding: "14px 18px", resize: "vertical",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px", color: "#e8e8e8",
                  fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontSize: "14px",
                  outline: "none", transition: "border-color 0.2s ease",
                }}
                onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              style={{
                padding: "16px 32px",
                background: status === "sent" ? "rgba(201,168,76,0.2)" : "linear-gradient(135deg,#c9a84c,#a8893a)",
                border: status === "sent" ? "1px solid rgba(201,168,76,0.4)" : "none",
                borderRadius: "100px",
                color: status === "sent" ? "#c9a84c" : "#040404",
                fontFamily: "var(--font-outfit,Outfit,sans-serif)", fontWeight: 600,
                fontSize: "14px", letterSpacing: "0.04em", cursor: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                boxShadow: status === "sent" ? "none" : "0 0 30px rgba(201,168,76,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              {status === "sending" ? "Sending..." : status === "sent" ? <>Message Sent <Heart size={14} fill="currentColor" /></> : <>Send Message <ArrowUpRight size={16} /></>}
            </button>

            {status === "error" && (
              <p style={{ fontSize: "13px", color: "#ff6b6b", textAlign: "center", fontFamily: "var(--font-outfit,Outfit,sans-serif)" }}>
                Something went wrong. Please email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
