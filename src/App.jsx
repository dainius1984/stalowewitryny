import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Comparison } from "@/components/sections/Comparison";
import { Process } from "@/components/sections/Process";
import SEOContent from "@/components/sections/SEOContent";
import { Footer } from "@/components/layout/Footer";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsPage } from "@/pages/TermsPage";
import { CookieBanner } from "@/components/ui/CookieBanner";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Efekt ziarna na tle */}
      <div className="bg-grain" />
      
      <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
        <Navbar isModalOpen={isModalOpen} />
        <main className="pt-24 md:pt-28 flex-grow">
          <Hero onModalStateChange={setIsModalOpen} />
          <Comparison />
          <Portfolio limit={6} />
          <Process />
          <SEOContent />
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Make lenis available globally for ScrollToTop
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/o-nas" element={<AboutPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPolicyPage />} />
        <Route path="/regulamin" element={<TermsPage />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  );
}

export default App;
