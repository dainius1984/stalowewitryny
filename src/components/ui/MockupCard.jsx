import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import ReactParallaxTilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";

export function MockupCard({ images, alt, delay, position, onHover, onLeave, onClick, project, isLeft, className }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  // Auto-rotate between images every 4 seconds
  useEffect(() => {
    if (!isHovered && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setScrollProgress(0); // Reset scroll on image change
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isHovered, images.length]);

  // Smooth scroll effect on hover - scrolls down to show more content
  useEffect(() => {
    if (isHovered && imageRef.current) {
      const container = imageRef.current;
      const img = container.querySelector('img');
      
      if (img) {
        const containerHeight = container.clientHeight;
        const imgHeight = img.offsetHeight;
        const maxScroll = Math.max(0, imgHeight - containerHeight);
        
        if (maxScroll > 0) {
          scrollIntervalRef.current = setInterval(() => {
            setScrollProgress((prev) => {
              const newProgress = Math.min(prev + 0.8, 100);
              if (container) {
                container.scrollTop = (newProgress / 100) * maxScroll;
              }
              return newProgress;
            });
          }, 40);
        }
      }
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
      setScrollProgress(0);
      if (imageRef.current) {
        imageRef.current.scrollTop = 0;
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isHovered, currentImageIndex]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover({ images, alt, currentIndex: currentImageIndex });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setScrollProgress(0);
    if (onLeave) {
      onLeave();
    }
  };

  const handleImageSwitch = (e) => {
    e.stopPropagation(); // Prevent triggering parent click
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setScrollProgress(0);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      // Pass the full project object if available, otherwise pass basic info
      onClick(project || { images, alt, currentIndex: currentImageIndex });
    }
  };

  return (
    <ReactParallaxTilt
      className={cn(
        "w-40 md:w-56 h-[400px] md:h-[600px]",
        position === "left" && "relative z-10",
        position === "right" && "relative z-10",
        // Old positions for backward compatibility
        position === "back" && "hidden md:block absolute",
        position === "middle" && "absolute md:relative z-10",
        position === "front" && "hidden md:block relative z-20",
        className
      )}
      style={{
        transform: position === "left"
          ? "translateX(0%) translateY(0%) rotate(-3deg)"
          : position === "right"
          ? "translateX(0%) translateY(0%) rotate(3deg)"
          : position === "back" 
          ? "translateX(-25%) translateY(8%) rotate(-10deg)"
          : position === "front"
          ? "translateX(25%) translateY(3%) rotate(3deg)"
          : "md:translateX(0%) md:translateY(-8%) md:rotate(-5deg)",
        zIndex: position === "left" || position === "right" ? 10 : position === "back" ? 1 : position === "front" ? 3 : 2,
      }}
      tiltMaxAngleX={isHovered ? 8 : 5}
      tiltMaxAngleY={isHovered ? 8 : 5}
      scale={isHovered ? 1.15 : 1.0}
      transitionSpeed={2000}
      glareEnable={true}
      glareMaxOpacity={isHovered ? 0.6 : 0.2}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn(
          "relative w-full h-full rounded-[2rem] border-2 bg-black overflow-hidden",
          "shadow-2xl transition-all duration-500 cursor-pointer",
          isHovered 
            ? "border-[#CCFF00] shadow-[0_0_60px_rgba(204,255,0,0.9)] z-[99]" 
            : "border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        )}
        style={{ width: '100%', height: '100%' }}
        onClick={handleCardClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1
        }}
        transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Phone/Tablet Frame with glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-[2rem] border-2 pointer-events-none z-10 transition-all duration-700",
          isHovered ? "border-[#CCFF00]/30" : "border-neutral-800"
        )} />
        
        {/* Screen Content with Image Carousel */}
        <div className="absolute top-[6px] left-[6px] right-[6px] bottom-[6px] rounded-[1.5rem] overflow-hidden bg-neutral-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              ref={imageRef}
              className="absolute inset-0 w-full h-full z-0 overflow-y-auto scrollbar-hide"
              style={{
                scrollBehavior: 'smooth',
              }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: 1, 
                scale: isHovered ? 1.05 : 1,
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="w-full h-full">
                <img
                  src={images[currentImageIndex]}
                  alt={`${alt} - Przykład szybkiej strony internetowej - widok ${currentImageIndex + 1}`}
                  className="w-full h-auto object-cover"
                  style={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    minHeight: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    const parent = e.target.parentElement?.parentElement;
                    if (parent) {
                      parent.style.background = "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)";
                      parent.style.display = "flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                    }
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Image Indicator Dots (if multiple images) */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    index === currentImageIndex
                      ? "bg-[#CCFF00] w-8 h-2 shadow-[0_0_10px_rgba(204,255,0,0.8)]"
                      : "bg-white/40 hover:bg-white/60 w-2 h-2"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                    setScrollProgress(0);
                  }}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Hover Overlay - Enhanced with scroll indicator */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 flex flex-col items-center justify-end pb-16 z-25 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {images.length > 1 && (
                <motion.div
                  className="text-white/90 text-sm font-semibold font-sans px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-[#CCFF00]/50 shadow-[0_0_20px_rgba(204,255,0,0.3)] mb-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Kliknij, aby otworzyć
                </motion.div>
              )}
              {/* Scroll progress indicator */}
              <div className="w-1 h-20 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="w-full bg-[#CCFF00] rounded-full"
                  initial={{ height: 0 }}
                  animate={{ height: `${scrollProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Enhanced gradient overlay */}
        <div className={cn(
          "absolute inset-0 pointer-events-none z-5 transition-opacity duration-700",
          isHovered 
            ? "bg-gradient-to-b from-transparent via-transparent to-transparent opacity-0"
            : "bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-100"
        )} />
        
        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute -inset-1 bg-[#CCFF00]/20 blur-xl rounded-[2rem] z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </ReactParallaxTilt>
  );
}

