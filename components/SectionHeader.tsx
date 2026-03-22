"use client";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleItalic,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      data-reveal
      style={{
        textAlign: centered ? "center" : "left",
        marginBottom: "64px",
      }}
    >
      {eyebrow && (
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#c9a84c",
            fontFamily: "var(--font-outfit, Outfit, sans-serif)",
            fontWeight: 500,
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: centered ? "center" : "flex-start",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "#c9a84c",
            }}
          />
          {eyebrow}
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "#c9a84c",
            }}
          />
        </div>
      )}

      <h2
        style={{
          fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 900,
          lineHeight: 1.05,
          color: "#e8e8e8",
          letterSpacing: "-0.02em",
        }}
      >
        {title}{" "}
        {titleItalic && (
          <em
            className="text-gold-gradient"
            style={{ fontStyle: "italic", fontWeight: 700 }}
          >
            {titleItalic}
          </em>
        )}
      </h2>

      {subtitle && (
        <p
          style={{
            marginTop: "20px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-outfit, Outfit, sans-serif)",
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: centered ? "540px" : "420px",
            margin: centered ? "20px auto 0" : "20px 0 0",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
