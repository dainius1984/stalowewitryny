import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactParallaxTilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";

export function MockupCard({ images, alt, delay, position }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate between images every 3 seconds
  useEffect(() => {
    if (!isHovered && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isHovered, images.length]);

  // Pause auto-rotate on hover, resume on leave
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Manual image switch on hover (optional - can be removed if you want only auto-rotate)
  const handleImageSwitch = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <ReactParallaxTilt
      className={cn(
        "w-28 md:w-36 h-[280px] md:h-[420px]",
        position === "back" && "hidden md:block absolute",
        position === "middle" && "absolute md:relative",
        position === "front" && "hidden md:block relative"
      )}
      style={{
        transform: position === "back" 
          ? "translateX(-20%) translateY(10%) rotate(-8deg)"
          : position === "front"
          ? "translateX(20%) translateY(5%) rotate(2deg)"
          : "md:translateX(0%) md:translateY(-5%) md:rotate(-4deg)",
        zIndex: position === "back" ? 1 : position === "front" ? 3 : 2,
      }}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.05}
      transitionSpeed={1500}
      glareEnable={true}
      glareMaxOpacity={0.2}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn(
          "relative w-full h-full rounded-[1.5rem] border border-white/10 bg-black overflow-hidden",
          "shadow-lg transition-all duration-500 cursor-pointer",
          "hover:border-[#CCFF00]/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.4)]"
        )}
        onClick={handleImageSwitch}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
      >
        {/* Phone/Tablet Frame */}
        <div className="absolute inset-0 rounded-[1.5rem] border-2 border-neutral-800 pointer-events-none z-10" />
        
        {/* Screen Content with Image Carousel */}
        <div className="absolute inset-[4px] rounded-[1.2rem] overflow-hidden bg-neutral-900 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <img
                src={images[currentImageIndex]}
                alt={`${alt} - Przykład szybkiej strony internetowej - widok ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background = "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)";
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Image Indicator Dots (if multiple images) */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    index === currentImageIndex
                      ? "bg-[#CCFF00] w-4"
                      : "bg-white/30 hover:bg-white/50"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Hover Overlay - Shows "Click to switch" hint */}
          {images.length > 1 && (
            <motion.div
              className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-15 pointer-events-none"
              initial={false}
            >
              <div className="text-white/80 text-xs font-medium font-sans px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
                Kliknij, aby przełączyć
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none z-5" />
      </motion.div>
    </ReactParallaxTilt>
  );
}

