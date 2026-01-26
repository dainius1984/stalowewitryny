/**
 * Hero Section Component
 * 
 * Main hero section of the website with video background, animated text, and portfolio gallery.
 * 
 * Layout:
 * - Mobile: MockupGalleryMobile (portfolio slider) → Text banner with CTA
 * - Desktop: Text content (left, 2 cols) → MockupGallery (portfolio, right, 1 col)
 * 
 * Components used:
 * - Container: Wrapper for centered content
 * - BentoCard: Dark card container for text content
 * - Button: CTA button ("Darmowa Wycena")
 * - MockupGallery: Desktop portfolio gallery (hidden on mobile)
 * - MockupGalleryMobile: Mobile portfolio gallery (hidden on desktop)
 * - CompanySurvey: Modal form for quote requests
 * 
 * Features:
 * - Looping video background (2 videos)
 * - Dark gradient overlay for text readability
 * - Animated grid background
 * - Staggered text animations
 * - Responsive layout (different on mobile vs desktop)
 */
import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
// Lazy load desktop gallery - not needed on mobile initial load
const MockupGallery = lazy(() => import("@/components/sections/MockupGallery").then(m => ({ default: m.MockupGallery })));
import { MockupGalleryMobile } from "@/components/sections/MockupGalleryMobile";
// Lazy load modal - not needed for initial render
const CompanySurvey = lazy(() => import("@/components/sections/CompanySurvey").then(m => ({ default: m.CompanySurvey })));
import { cn } from "@/lib/utils";

// Optimized variants for mobile - faster animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Faster on mobile
      delayChildren: 0, // No delay for faster LCP
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 }, // Smaller movement on mobile
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Faster on mobile
      ease: "easeOut",
    },
  },
};


export function Hero({ onModalStateChange }) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [secondVideoLoaded, setSecondVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const videos = ["/video/1.mp4", "/video/2.mp4"];

  // Detect mobile - completely disable video on mobile for better LCP
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile: completely disable video to prioritize LCP image
      // On desktop: load video immediately
      setShouldLoadVideo(!mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lazy load second video using Intersection Observer
  useEffect(() => {
    if (secondVideoLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Preload second video when Hero section is visible
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'video';
            link.href = videos[1];
            document.head.appendChild(link);
            setSecondVideoLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => observer.disconnect();
  }, [secondVideoLoaded, videos]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    const handleVideoEnd = () => {
      // Switch to next video only if second video is loaded
      if (currentVideo === 0 && !secondVideoLoaded) {
        // Loop first video until second is ready
        video.currentTime = 0;
        video.play().catch(() => {});
        return;
      }
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener("ended", handleVideoEnd);
    
    // Load and play current video
    video.load();
    video.play().catch(() => {
      // Video autoplay prevented - silent fail
    });

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [currentVideo, videos.length, secondVideoLoaded]);

  return (
    <div ref={heroSectionRef} className="relative overflow-hidden min-h-0 md:h-[calc(100vh-6rem)] md:flex md:items-center pt-12 pb-2 md:py-0 flex flex-col md:justify-center">
      {/* Video Background - Desktop only, completely disabled on mobile for better LCP */}
      {shouldLoadVideo && !isMobile && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/img/logo.webp"
          fetchpriority="high"
          key={currentVideo}
        >
          <source src={videos[currentVideo]} type="video/mp4" />
        </video>
      )}
      {/* Static gradient background on mobile - no video for better performance */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 z-0" />
      )}
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 z-[1]" />
      
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-[2]"
        style={{
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <Container className="relative z-10">
        {/* Mobile Layout: Portfolio Slider First, Then Banner */}
        <div className="md:hidden flex flex-col gap-2 justify-start py-2">
          {/* Portfolio Slider First on Mobile - Reduced animation delay for faster LCP */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0 flex items-center justify-center -mx-2 -mb-[10px]"
            style={{ pointerEvents: 'none' }} // Allow touch events to pass through
            transition={{ staggerChildren: 0.05, delayChildren: 0 }} // Faster on mobile
          >
            <div className="w-full px-2" style={{ pointerEvents: 'auto' }}> {/* Re-enable for child */}
              <MockupGalleryMobile onModalStateChange={onModalStateChange} />
            </div>
          </motion.div>

          {/* Banner Below on Mobile - Reduced animation for faster render */}
          <BentoCard className="w-full flex flex-col justify-center p-3 flex-shrink-0">
            <motion.div 
              className="space-y-1.5" 
              variants={containerVariants}
              transition={{ staggerChildren: 0.05, delayChildren: 0.05 }} // Faster stagger
            >
              <motion.h1 
                className="text-xl font-extrabold tracking-tight leading-[1.1] font-sans text-white text-center"
                variants={itemVariants}
              >
                Strony internetowe Wrocław | Tanie, szybkie, bez abonamentu
              </motion.h1>
              
              <motion.h2 
                className="text-xs font-bold text-neutral-300 mt-0.5 font-sans text-center"
                variants={itemVariants}
              >
                Dlaczego szybkie strony (React) to lepszy wybór?
              </motion.h2>
              
              <motion.p 
                className="text-[10px] font-semibold text-primary mt-0.5 font-sans text-center"
                variants={itemVariants}
              >
                Tworzenie stron www bez abonamentu | Lokalny deweloper z Wrocławia
              </motion.p>
              
              <motion.p 
                className="text-[10px] text-neutral-300 mt-1 font-sans text-center leading-relaxed px-1"
                variants={itemVariants}
              >
                Ręcznie kodowane strony internetowe na własność. <strong className="text-white">Brak opłat miesięcznych</strong>, pełna własność kodu, responsywne strony www z wynikiem PageSpeed 100/100. <strong className="text-primary">Google Analytics</strong> w standardzie – śledź ruch i optymalizuj wyniki.
              </motion.p>
              
              {/* Trust Bar - USP Highlights */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5"
                variants={itemVariants}
              >
                <div className="flex items-center gap-1 text-[9px] text-neutral-300 font-sans">
                  <Zap className="w-2.5 h-2.5 text-primary" />
                  <span className="font-medium">Szybkość 100/100</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-neutral-300 font-sans">
                  <Shield className="w-2.5 h-2.5 text-primary" />
                  <span className="font-medium">Bez WordPressa</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-neutral-300 font-sans">
                  <Search className="w-2.5 h-2.5 text-primary" />
                  <span className="font-medium">SEO Friendly</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="pt-1.5 flex justify-center"
                variants={itemVariants}
              >
                <Button 
                  variant="primary"
                  onClick={() => setIsSurveyOpen(true)}
                  title="Zamów darmową wycenę taniej i solidnej strony internetowej"
                  className="text-sm px-6 py-2.5 shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.8)] transition-all duration-300"
                >
                  Darmowa Wycena
                </Button>
              </motion.div>
            </motion.div>
          </BentoCard>
        </div>

        {/* Desktop Layout: Original Grid */}
        <motion.div
          className="hidden md:grid grid-cols-3 gap-8 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Card - Span 2 columns */}
          <BentoCard className={cn(
            "md:col-span-2 flex flex-col justify-between",
            "p-8 md:p-12 md:pr-16"
          )}>
            <motion.div className="flex flex-col justify-between h-full space-y-4 md:space-y-6" variants={containerVariants}>
              <div className="flex-1 flex flex-col justify-start">
                <motion.h1 
                  className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] font-sans text-white max-w-full"
                  variants={itemVariants}
                >
                  Strony internetowe Wrocław | Tanie, szybkie, bez abonamentu
                </motion.h1>
                
                <motion.h2 
                  className="text-xl md:text-2xl font-bold text-neutral-300 mt-3 md:mt-4 font-sans"
                  variants={itemVariants}
                >
                  Dlaczego szybkie strony (React) to lepszy wybór?
                </motion.h2>
                
                <motion.p 
                  className="text-lg md:text-xl font-semibold text-primary mt-3 md:mt-4 font-sans"
                  variants={itemVariants}
                >
                  Tworzenie stron www bez abonamentu | Lokalny deweloper z Wrocławia
                </motion.p>
                
                <motion.p 
                  className="text-base md:text-lg text-neutral-300 mt-3 md:mt-4 font-sans leading-relaxed max-w-[90%]"
                  variants={itemVariants}
                >
                  Ręcznie kodowane strony internetowe na własność. <strong className="text-white">Brak opłat miesięcznych</strong>, pełna własność kodu, responsywne strony www z wynikiem PageSpeed 100/100. <strong className="text-primary">Google Analytics</strong> w standardzie – śledź ruch i optymalizuj wyniki.
                </motion.p>
              </div>
              
              {/* Trust Bar - USP Highlights */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 md:gap-6 mt-4"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 text-sm text-neutral-300 font-sans">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-medium">Szybkość 100/100</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-300 font-sans">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-medium">Strona bez WordPressa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-300 font-sans">
                  <Search className="w-5 h-5 text-primary" />
                  <span className="font-medium">Kod Przyjazny SEO</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-6 flex justify-center"
                variants={itemVariants}
              >
                <Button 
                  variant="primary"
                  onClick={() => setIsSurveyOpen(true)}
                  title="Zamów darmową wycenę taniej i solidnej strony internetowej"
                  className="text-base md:text-lg px-8 md:px-10 py-3 md:py-4 shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.8)] transition-all duration-300"
                >
                  Darmowa Wycena
                </Button>
              </motion.div>
            </motion.div>
          </BentoCard>

          {/* Right Card - Span 1 column - Interactive Mockup Gallery */}
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <MockupGallery onModalStateChange={onModalStateChange} />
          </Suspense>
        </motion.div>
      </Container>
      
      {/* Company Survey Modal - Lazy loaded */}
      {isSurveyOpen && (
        <Suspense fallback={null}>
          <CompanySurvey isOpen={isSurveyOpen} onClose={() => setIsSurveyOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
