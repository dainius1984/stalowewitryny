import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
// Lazy load below-the-fold components for mobile performance
const Portfolio = lazy(() => import("@/components/sections/Portfolio").then(m => ({ default: m.Portfolio })));
const Comparison = lazy(() => import("@/components/sections/Comparison").then(m => ({ default: m.Comparison })));
const Process = lazy(() => import("@/components/sections/Process").then(m => ({ default: m.Process })));
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";

// Lazy load non-critical components (below the fold)
const SEOContent = lazy(() => import("@/components/sections/SEOContent"));
const BlogPreview = lazy(() => import("@/components/sections/BlogPreview").then(m => ({ default: m.BlogPreview })));

// Lazy load all pages except HomePage (code splitting)
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage").then(m => ({ default: m.PortfolioPage })));
const AboutPage = lazy(() => import("@/pages/AboutPage").then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage").then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import("@/pages/TermsPage").then(m => ({ default: m.TermsPage })));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage").then(m => ({ default: m.BlogPostPage })));
const BlogPage = lazy(() => import("@/pages/BlogPage").then(m => ({ default: m.BlogPage })));

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
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <Comparison />
            <Portfolio limit={6} />
            <Process />
            <SEOContent />
            <BlogPreview />
          </Suspense>
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
      <Suspense fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white">Ładowanie...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/o-nas" element={<AboutPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/polityka-prywatnosci" element={<PrivacyPolicyPage />} />
          <Route path="/regulamin" element={<TermsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/ile-kosztuje-strona-internetowa-wroclaw" element={<BlogPostPage />} />
        </Routes>
      </Suspense>
      <CookieBanner />
    </BrowserRouter>
  );
}

export default App;
