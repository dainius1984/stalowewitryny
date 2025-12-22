import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Search } from "lucide-react";
import ReactParallaxTilt from "react-parallax-tilt";
import { Container } from "@/components/ui/Container";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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

// Mockup Card Component with Auto-Scroll Effect
function MockupCard({ image, alt, delay }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative w-full h-full rounded-[1.5rem] border border-white/10 bg-black overflow-hidden",
        "shadow-lg transition-all duration-500",
        "hover:border-[#CCFF00]/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.4)]"
      )}
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {/* Phone/Tablet Frame */}
      <div className="absolute inset-0 rounded-[1.5rem] border-2 border-neutral-800 pointer-events-none z-10" />
      
      {/* Screen Content with Auto-Scroll */}
      <div
        className="absolute inset-[4px] rounded-[1.2rem] overflow-hidden bg-neutral-900"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: isHovered ? "center bottom" : "center top",
          backgroundRepeat: "no-repeat",
          transition: "background-position 8s ease-in-out",
        }}
      >
        {/* Fallback for images that don't exist */}
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover opacity-0"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.style.backgroundImage = `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`;
          }}
        />
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none z-5" />
    </motion.div>
  );
}

export function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
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
    video.play().catch((error) => {
      console.log("Video autoplay prevented:", error);
    });

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [currentVideo, videos.length]);

  return (
    <div className="relative py-12 md:py-20 overflow-hidden">
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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Card - Span 2 columns */}
          <BentoCard className={cn(
            "md:col-span-2 flex flex-col justify-center",
            "p-8 md:p-10"
          )}>
            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.h1 
                className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] font-sans text-white"
                variants={itemVariants}
              >
                Tworzę strony, które{" "}
                <span className="text-[#CCFF00] drop-shadow-[0_0_20px_rgba(204,255,0,0.5)]">sprzedają</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-neutral-400 mt-4 font-sans"
                variants={itemVariants}
              >
                Kodowane od zera. Szybkie. Bezpieczne.
              </motion.p>
              
              {/* Trust Bar - USP Highlights */}
              <motion.div 
                className="flex flex-wrap items-center gap-6 md:gap-8 pt-2"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 text-sm text-neutral-300 font-sans">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-medium">Szybkość 100/100</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-300 font-sans">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-medium">Brak luk WordPress</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-300 font-sans">
                  <Search className="w-5 h-5 text-primary" />
                  <span className="font-medium">Kod Przyjazny SEO</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="pt-2"
                variants={itemVariants}
              >
                <Button variant="primary">
                  Darmowa Wycena
                </Button>
              </motion.div>
            </motion.div>
          </BentoCard>

          {/* Right Card - Span 1 column - Interactive Mockup Gallery */}
          <BentoCard className={cn(
            "md:col-span-1 flex items-center justify-center",
            "p-4 md:p-6 overflow-visible relative"
          )}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950" />
            
            {/* Mockup Gallery Container */}
            <div className="relative w-full h-full min-h-[300px] md:min-h-[500px] flex items-center justify-center">
              {/* Mockup Card 1 - Back (Hidden on mobile) */}
              <ReactParallaxTilt
                className="hidden md:block absolute w-28 md:w-36 h-[320px] md:h-[420px]"
                style={{
                  transform: "translateX(-20%) translateY(10%) rotate(-8deg)",
                  zIndex: 1,
                }}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.05}
                transitionSpeed={1500}
                glareEnable={true}
                glareMaxOpacity={0.2}
              >
                <MockupCard
                  image="/projects/whiteeffect.jpg"
                  alt="White Effect - Portfolio Project"
                  delay={0}
                />
              </ReactParallaxTilt>

              {/* Mockup Card 2 - Middle */}
              <ReactParallaxTilt
                className="absolute w-32 md:w-36 h-[280px] md:h-[420px]"
                style={{
                  transform: "md:translateX(0%) md:translateY(-5%) md:rotate(-4deg)",
                  zIndex: 2,
                }}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.05}
                transitionSpeed={1500}
                glareEnable={true}
                glareMaxOpacity={0.2}
              >
                <MockupCard
                  image="/projects/autyzm.jpg"
                  alt="Autyzm od Kuchni - Portfolio Project"
                  delay={0.2}
                />
              </ReactParallaxTilt>

              {/* Mockup Card 3 - Front (Hidden on mobile) */}
              <ReactParallaxTilt
                className="hidden md:block relative w-28 md:w-36 h-[320px] md:h-[420px]"
                style={{
                  transform: "translateX(20%) translateY(5%) rotate(2deg)",
                  zIndex: 3,
                }}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.05}
                transitionSpeed={1500}
                glareEnable={true}
                glareMaxOpacity={0.2}
              >
                <MockupCard
                  image="/projects/oraneria.jpg"
                  alt="Oraneria - Portfolio Project"
                  delay={0.4}
                />
              </ReactParallaxTilt>
            </div>
          </BentoCard>

          {/* Bottom Card - Span 3 columns */}
          <BentoCard className={cn(
            "md:col-span-3",
            "p-8 md:p-10",
            "bg-neutral-900/70 backdrop-blur-md"
          )}>
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3">
                <Badge variant="accent">Dostępny od zaraz</Badge>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary)/0.6)]"></div>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-sans">Online</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-neutral-400 font-sans">
                <span>Status</span>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary)/0.6)]"></div>
              </div>
            </motion.div>
          </BentoCard>
        </motion.div>
      </Container>
    </div>
  );
}
