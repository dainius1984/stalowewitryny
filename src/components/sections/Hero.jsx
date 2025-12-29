import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { MockupGallery } from "@/components/sections/MockupGallery";
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
    <div className="relative overflow-hidden md:h-[calc(100vh-6rem)] md:flex md:items-center py-2 md:py-0">
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
        <div className="md:hidden flex flex-col gap-3">
          {/* Portfolio Slider First on Mobile */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <MockupGallery onModalStateChange={onModalStateChange} />
          </motion.div>

          {/* Banner Below on Mobile */}
          <BentoCard className="flex flex-col justify-center p-4">
            <motion.div className="space-y-2" variants={containerVariants}>
              <motion.h1 
                className="text-2xl font-extrabold tracking-tight leading-[1.1] font-sans text-white text-center"
                variants={itemVariants}
              >
                Tanie i solidne strony internetowe dla firm –{" "}
                <span className="text-[#CCFF00] drop-shadow-[0_0_20px_rgba(204,255,0,0.5)]">Stalowe Witryny</span>
              </motion.h1>
              
              <motion.h2 
                className="text-base font-bold text-neutral-300 mt-1 font-sans text-center"
                variants={itemVariants}
              >
                Szybkie strony www bez abonamentu i WordPressa
              </motion.h2>
              
              <motion.p 
                className="text-xs text-neutral-400 mt-0.5 font-sans text-center leading-relaxed"
                variants={itemVariants}
              >
                Ręcznie kodowane strony internetowe na własność. <strong className="text-white">Brak opłat miesięcznych</strong>, pełna własność kodu, responsywne strony www z wynikiem PageSpeed 100/100.
              </motion.p>
              
              {/* Trust Bar - USP Highlights */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-2 pt-0.5"
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
                className="pt-0.5 flex justify-center"
                variants={itemVariants}
              >
                <Button 
                  variant="primary"
                  onClick={() => setIsSurveyOpen(true)}
                  title="Zamów darmową wycenę taniej i solidnej strony internetowej"
                  className="text-xs px-5 py-2 shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.8)] transition-all duration-300"
                >
                  Darmowa Wycena
                </Button>
              </motion.div>
            </motion.div>
          </BentoCard>
        </div>

        {/* Desktop Layout: Original Grid */}
        <motion.div
          className="hidden md:grid grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Card - Span 2 columns */}
          <BentoCard className={cn(
            "md:col-span-2 flex flex-col justify-center",
            "p-6 md:p-10"
          )}>
            <motion.div className="space-y-3 md:space-y-4" variants={containerVariants}>
              <motion.h1 
                className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] font-sans text-white"
                variants={itemVariants}
              >
                Tanie i solidne strony internetowe dla firm –{" "}
                <span className="text-[#CCFF00] drop-shadow-[0_0_20px_rgba(204,255,0,0.5)]">Stalowe Witryny</span>
              </motion.h1>
              
              <motion.h2 
                className="text-xl md:text-2xl font-bold text-neutral-300 mt-1 md:mt-2 font-sans"
                variants={itemVariants}
              >
                Szybkie strony www bez abonamentu i WordPressa
              </motion.h2>
              
              <motion.p 
                className="text-base md:text-lg text-neutral-400 mt-1 font-sans leading-relaxed"
                variants={itemVariants}
              >
                Ręcznie kodowane strony internetowe na własność. <strong className="text-white">Brak opłat miesięcznych</strong>, pełna własność kodu, responsywne strony www z wynikiem PageSpeed 100/100.
              </motion.p>
              
              {/* Trust Bar - USP Highlights */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 md:gap-6 mt-2"
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
                className="mt-4 flex justify-center"
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
