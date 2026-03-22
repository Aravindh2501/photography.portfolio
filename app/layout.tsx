import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import FloatNav from "@/components/FloatNav";
import Loader from "@/components/Loader";
import GSAPLoader from "@/components/GSAPLoader";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "mad.shot.diary | Aravindh — Cinematographer & Photographer",
  description:
    "Award-winning cinematography and photography by Aravindh. mad.shot.studio — capturing light, emotion, and cinematic stories.",
  keywords: [
    "cinematographer",
    "photographer",
    "mad shot studio",
    "Aravindh",
    "cinematic",
    "portfolio",
  ],
  openGraph: {
    title: "mad.shot.diary",
    description: "Cinematographer & Photographer — Aravindh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}
      >
        <GSAPLoader />
        <Loader />
        <SmoothScroll />
        <Cursor />
        <FloatNav />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
