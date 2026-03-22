export type PortfolioItem = {
  id: string;
  category: "portrait" | "couple" | "video";
  title: string;
  subtitle?: string;
  thumb: string;
  src?: string; // video src
  duration?: string;
};

// ─── Portrait Photography ─────────────────────────────────────────────────────
// All portrait images: cinematic, moody, emotional photography aesthetic
export const portraitItems: PortfolioItem[] = [
  {
    id: "p1",
    category: "portrait",
    title: "Golden Hour",
    subtitle: "Chennai, 2024",
    thumb: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85&fit=crop",
  },
  {
    id: "p2",
    category: "portrait",
    title: "Ethereal Light",
    subtitle: "Studio Session",
    thumb: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=85&fit=crop",
  },
  {
    id: "p3",
    category: "portrait",
    title: "Urban Soul",
    subtitle: "Cityscape Series",
    thumb: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=85&fit=crop",
  },
  {
    id: "p4",
    category: "portrait",
    title: "Velvet Dark",
    subtitle: "Fine Art",
    thumb: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=85&fit=crop",
  },
  {
    id: "p5",
    category: "portrait",
    title: "Morning Glow",
    subtitle: "Natural Light",
    thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&fit=crop",
  },
  {
    id: "p6",
    category: "portrait",
    title: "Raw Emotion",
    subtitle: "Documentary",
    thumb: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=85&fit=crop",
  },
  {
    id: "p7",
    category: "portrait",
    title: "Silhouette",
    subtitle: "Backlit Series",
    thumb: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=85&fit=crop",
  },
  {
    id: "p8",
    category: "portrait",
    title: "Window Light",
    subtitle: "Indoor Natural",
    thumb: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=85&fit=crop",
  },
  {
    id: "p9",
    category: "portrait",
    title: "Festival Colors",
    subtitle: "Cultural Series",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=85&fit=crop",
  },
  {
    id: "p10",
    category: "portrait",
    title: "Monochrome",
    subtitle: "Black & White",
    thumb: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=85&fit=crop",
  },
  {
    id: "p11",
    category: "portrait",
    title: "Dusk",
    subtitle: "Evening Light",
    thumb: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&q=85&fit=crop",
  },
  {
    id: "p12",
    category: "portrait",
    title: "Cinematic",
    subtitle: "Film Look",
    thumb: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&q=85&fit=crop",
  },
];

// ─── Couple Shoots ────────────────────────────────────────────────────────────
export const coupleItems: PortfolioItem[] = [
  {
    id: "c1",
    category: "couple",
    title: "Forever & Always",
    subtitle: "Pre-Wedding",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85&fit=crop",
  },
  {
    id: "c2",
    category: "couple",
    title: "Golden Vows",
    subtitle: "Wedding Day",
    thumb: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=85&fit=crop",
  },
  {
    id: "c3",
    category: "couple",
    title: "Sunset Romance",
    subtitle: "Beach Session",
    thumb: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=85&fit=crop",
  },
  {
    id: "c4",
    category: "couple",
    title: "Two Hearts",
    subtitle: "Intimate Portrait",
    thumb: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=85&fit=crop",
  },
  {
    id: "c5",
    category: "couple",
    title: "Urban Love",
    subtitle: "City Series",
    thumb: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=85&fit=crop",
  },
  {
    id: "c6",
    category: "couple",
    title: "Garden Dreams",
    subtitle: "Outdoor Session",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=85&fit=crop",
  },
  {
    id: "c7",
    category: "couple",
    title: "First Dance",
    subtitle: "Reception",
    thumb: "https://images.unsplash.com/photo-1525258946800-7a60a3b3b3e1?w=800&q=85&fit=crop",
  },
  {
    id: "c8",
    category: "couple",
    title: "Timeless",
    subtitle: "Anniversary",
    thumb: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=85&fit=crop",
  },
];

// ─── Cinematic Videos ─────────────────────────────────────────────────────────
// Using free Pexels/Pixabay MP4 videos — cinematic, moody aesthetic
export const videoItems: PortfolioItem[] = [
  {
    id: "v1",
    category: "video",
    title: "Wedding Film — Priya & Arjun",
    subtitle: "Cinematic Wedding",
    duration: "4:32",
    thumb: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=85&fit=crop",
    src: "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4",
  },
  {
    id: "v2",
    category: "video",
    title: "Brand Film — The Spice House",
    subtitle: "Commercial",
    duration: "2:18",
    thumb: "https://images.unsplash.com/photo-1556103255-4443dbae8e5a?w=900&q=85&fit=crop",
    src: "https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_30fps.mp4",
  },
  {
    id: "v3",
    category: "video",
    title: "Short Film — Monsoon",
    subtitle: "Narrative Film",
    duration: "7:45",
    thumb: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=85&fit=crop",
    src: "https://videos.pexels.com/video-files/1860684/1860684-hd_1920_1080_30fps.mp4",
  },
  {
    id: "v4",
    category: "video",
    title: "Travel Reel — Kerala",
    subtitle: "Travel Documentary",
    duration: "3:10",
    thumb: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=85&fit=crop",
    src: "https://videos.pexels.com/video-files/854173/854173-hd_1920_1080_25fps.mp4",
  },
  {
    id: "v5",
    category: "video",
    title: "Fashion Film — Silk Route",
    subtitle: "Fashion",
    duration: "2:55",
    thumb: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85&fit=crop",
    src: "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4",
  },
  {
    id: "v6",
    category: "video",
    title: "Music Video — Tribute",
    subtitle: "Music Video",
    duration: "5:20",
    thumb: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=85&fit=crop",
    src: "https://videos.pexels.com/video-files/2516159/2516159-hd_1920_1080_30fps.mp4",
  },
];

export const portfolioItems = [...portraitItems, ...coupleItems, ...videoItems];
