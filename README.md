# mad.shot.diary — Portfolio Website

Cinematic portfolio website for Aravindh, Cinematographer & Photographer.

## Tech Stack

- **Next.js 14** (App Router, no src/)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (via @tailwindcss/postcss)
- **Lenis** (ultra-smooth scrolling)
- **GSAP 3 + ScrollTrigger** (loaded via CDN dynamically)
- **next/font/google** (Playfair Display + Outfit)
- **lucide-react** (icons)
- **next/image** (optimised images)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
madshot/
├── app/
│   ├── globals.css          # Design system, film grain, CSS variables
│   ├── layout.tsx           # Root layout with fonts, Loader, Cursor, Nav
│   ├── page.tsx             # Home page
│   ├── portfolio/page.tsx   # Full portfolio with lightbox
│   ├── about/page.tsx       # About page
│   ├── contact/page.tsx     # Contact page
│   └── api/contact/route.ts # Contact form API
├── components/
│   ├── GSAPLoader.tsx        # Dynamically loads GSAP+ScrollTrigger from CDN
│   ├── SmoothScroll.tsx      # Lenis smooth scroll init
│   ├── Cursor.tsx            # Custom 2-layer gold cursor
│   ├── Loader.tsx            # Camera lens opening animation
│   ├── PageTransition.tsx    # Cinematic curtain page transitions
│   ├── FloatNav.tsx          # Floating pill navigation
│   ├── Hero.tsx              # Full-screen cinematic hero with parallax
│   ├── Portfolio.tsx         # Photo/video cards with 3D tilt + follow play
│   ├── StorytellingSection.tsx # Scroll-controlled video storytelling
│   ├── About.tsx             # About section
│   ├── Contact.tsx           # Contact form + details
│   ├── Lightbox.tsx          # Full-screen image lightbox
│   ├── SectionHeader.tsx     # Reusable section heading
│   └── Footer.tsx            # Footer with links
└── lib/
    ├── data.ts               # Portfolio items data
    └── useScrollReveal.ts    # IntersectionObserver scroll reveal hook
```

## Features

- 🎬 **Cinematic Camera Lens Loader** — lens blades open animation, gold progress ring
- 🎥 **Full-screen Hero Video Reel** — with parallax camera lens effect on mouse move
- 📸 **3D Portfolio Cards** — perspective tilt toward cursor on hover
- 🎞️ **Film Perforation Edges** — on video cards for cinematic aesthetic
- ▶️ **Mouse-Follow Play Button** — lerp-smoothed following cursor inside video cards
- 📜 **Scroll-Controlled Video Storytelling** — scroll position scrubs video + text overlays
- 🔭 **Lightbox Viewer** — full-screen with keyboard nav (← → Esc)
- ✨ **Custom Dual-Layer Cursor** — gold dot + ring, expands on hover
- 🧲 **Floating Pill Nav** — auto-hides on scroll down, shows on scroll up
- 🎭 **Cinematic Page Transitions** — gold curtain slides + scale fade
- 🌾 **Film Grain Overlay** — animated SVG noise on body::before
- 💫 **Scroll Reveal** — IntersectionObserver fade-up with stagger delays
- 🖋️ **Gold Gradient Typography** — Playfair Display italic headings
- 📱 **Responsive** — grid layouts adapt to all screen sizes

## Contact Form

The `/api/contact` route logs submissions. To send real emails, integrate:
- [Resend](https://resend.com) — `npm install resend`
- [Nodemailer](https://nodemailer.com) — `npm install nodemailer`

## Customisation

Replace placeholder images in `lib/data.ts` with your real Unsplash/CDN URLs or local `/public/` assets.

Replace placeholder video src in `Hero.tsx` and `StorytellingSection.tsx` with your real video URLs.

---

*Crafted with vision & light ✦*
