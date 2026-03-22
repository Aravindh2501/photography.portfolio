"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { House, Grid2X2, User, Mail } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Work", href: "/portfolio", icon: Grid2X2 },
  { label: "About", href: "/about", icon: User },
  { label: "Contact", href: "/contact", icon: Mail },
];

export default function FloatNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setVisible(true);
      } else if (y > lastScrollY.current + 8) {
        setVisible(false);
      } else if (y < lastScrollY.current - 8) {
        setVisible(true);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "28px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "90px"})`,
        zIndex: 9000,
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        background: "rgba(10,10,10,0.75)",
        border: "1px solid rgba(201,168,76,0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "100px",
        padding: "8px 12px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.05)",
      }}
    >
      {navItems.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: active ? "8px 16px" : "8px 12px",
              borderRadius: "100px",
              background: active
                ? "linear-gradient(135deg,rgba(201,168,76,0.2),rgba(240,208,128,0.1))"
                : "transparent",
              border: active ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent",
              color: active ? "#f0d080" : "rgba(255,255,255,0.45)",
              fontSize: "12px",
              fontFamily: "var(--font-outfit, Outfit, sans-serif)",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
            }}
          >
            <Icon size={14} strokeWidth={1.8} />
            <span
              style={{
                display: active ? "inline" : "none",
                fontSize: "11px",
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
