"use client";

import { useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const curtain = curtainRef.current;
    const content = contentRef.current;
    if (!curtain || !content) return;

    // Entrance: curtain slides out
    curtain.style.transition = "none";
    curtain.style.transform = "translateX(0%)";
    content.style.opacity = "0";
    content.style.transform = "scale(0.97)";

    const t1 = setTimeout(() => {
      curtain.style.transition = "transform 0.55s cubic-bezier(0.77,0,0.175,1)";
      curtain.style.transform = "translateX(100%)";
    }, 50);

    const t2 = setTimeout(() => {
      content.style.transition =
        "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)";
      content.style.opacity = "1";
      content.style.transform = "scale(1)";
    }, 200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return (
    <>
      {/* Cinematic curtain */}
      <div
        ref={curtainRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9990,
          background:
            "linear-gradient(135deg, #040404 0%, #1a1408 50%, #040404 100%)",
          borderRight: "2px solid rgba(201,168,76,0.3)",
          pointerEvents: "none",
          transform: "translateX(-100%)",
        }}
      />
      <div ref={contentRef} style={{ opacity: 0 }}>
        {children}
      </div>
    </>
  );
}
