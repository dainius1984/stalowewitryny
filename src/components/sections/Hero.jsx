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
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { MockupGallery } from "@/components/sections/MockupGallery";
import { MockupGalleryMobile } from "@/components/sections/MockupGalleryMobile";
import { CompanySurvey } from "@/components/sections/CompanySurvey";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};


export function Hero({ onModalStateChange }) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const videoRef = useRef(null);
  const videos = ["/video/1.mp4", "/video/2.mp4"];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      // Switch to next video
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
  }, [currentVideo, videos.length]);

  return (
    <div className="relative overflow-hidden min-h-screen md:h-[calc(100vh-6rem)] md:flex md:items-center pt-[calc(4rem-20px)] pb-4 md:py-0 flex flex-col justify-center">
      {/* Video Background - Looping between two videos */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        playsInline
        key={currentVideo}
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>
      
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
        <div className="md:hidden flex flex-col gap-3 justify-center min-h-[calc(100vh-8rem)]">
          {/* Portfolio Slider First on Mobile */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex items-center justify-center"
            style={{ pointerEvents: 'none' }} // Allow touch events to pass through
          >
            <div style={{ pointerEvents: 'auto' }}> {/* Re-enable for child */}
              <MockupGalleryMobile onModalStateChange={onModalStateChange} />
            </div>
          </motion.div>

          {/* Banner Below on Mobile */}
          <BentoCard className="flex flex-col justify-center p-4 flex-shrink-0">
            <motion.div className="space-y-2" variants={containerVariants}>
              <motion.h1 
                className="text-2xl font-extrabold tracking-tight leading-[1.1] font-sans text-white text-center"
                variants={itemVariants}
              >
                Profesjonalne Strony Internetowe we Wrocławiu
              </motion.h1>
              
              <motion.h2 
                className="text-sm font-bold text-neutral-300 mt-1 font-sans text-center"
                variants={itemVariants}
              >
                Nowoczesne witryny dla małych i średnich firm z Dolnego Śląska
              </motion.h2>
              
              <motion.h3 
                className="text-xs font-semibold text-primary mt-1 font-sans text-center"
                variants={itemVariants}
              >
                Dlaczego Stalowe Witryny? Szybkość, SEO i UX
              </motion.h3>
              
              <motion.p 
                className="text-xs text-neutral-400 mt-1.5 font-sans text-center leading-relaxed px-2"
                variants={itemVariants}
              >
                Ręcznie kodowane strony internetowe na własność. <strong className="text-white">Brak opłat miesięcznych</strong>, pełna własność kodu, responsywne strony www z wynikiem PageSpeed 100/100. <strong className="text-primary">Google Analytics</strong> w standardzie – śledź ruch i optymalizuj wyniki.
              </motion.p>
              
              {/* Trust Bar - USP Highlights */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-2 pt-1"
                variants={itemVariants}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-300 font-sans">
                  <Zap className="w-3 h-3 text-primary" />
                  <span className="font-medium">Szybkość 100/100</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-300 font-sans">
                  <Shield className="w-3 h-3 text-primary" />
                  <span className="font-medium">Bez WordPressa</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-300 font-sans">
                  <Search className="w-3 h-3 text-primary" />
                  <span className="font-medium">SEO Friendly</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="pt-2 flex justify-center"
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
                  Profesjonalne Strony Internetowe we Wrocławiu
                </motion.h1>
                
                <motion.h2 
                  className="text-xl md:text-2xl font-bold text-neutral-300 mt-3 md:mt-4 font-sans"
                  variants={itemVariants}
                >
                  Nowoczesne witryny dla małych i średnich firm z Dolnego Śląska
                </motion.h2>
                
                <motion.h3 
                  className="text-lg md:text-xl font-semibold text-primary mt-3 md:mt-4 font-sans"
                  variants={itemVariants}
                >
                  Dlaczego Stalowe Witryny? Szybkość, SEO i UX
                </motion.h3>
                
                <motion.p 
                  className="text-base md:text-lg text-neutral-400 mt-3 md:mt-4 font-sans leading-relaxed max-w-[90%]"
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
          <MockupGallery onModalStateChange={onModalStateChange} />
        </motion.div>
      </Container>
      
      {/* Company Survey Modal */}
      <CompanySurvey isOpen={isSurveyOpen} onClose={() => setIsSurveyOpen(false)} />
    </div>
  );
}
