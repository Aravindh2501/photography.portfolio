"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: unknown;
  }
}

export default function GSAPLoader() {
  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window === "undefined") return;

      const gsapScript = document.createElement("script");
      gsapScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      gsapScript.async = true;

      await new Promise<void>((resolve) => {
        gsapScript.onload = () => resolve();
        document.head.appendChild(gsapScript);
      });

      const stScript = document.createElement("script");
      stScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      stScript.async = true;

      await new Promise<void>((resolve) => {
        stScript.onload = () => resolve();
        document.head.appendChild(stScript);
      });

      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
      }

      window.dispatchEvent(new CustomEvent("gsap-ready"));
    };

    loadGSAP();
  }, []);

  return null;
}