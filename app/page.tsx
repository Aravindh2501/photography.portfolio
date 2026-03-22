import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import StorytellingSection from "@/components/StorytellingSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Portfolio preview />
      <StorytellingSection />
      <About preview />
      <Contact preview />
      <Footer />
    </main>
  );
}
