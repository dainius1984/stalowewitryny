/**
 * MockupCardMobile Component
 * 
 * Displays a mobile phone mockup frame for desktop view.
 * Used on the left side of MockupGallery (desktop) to show mobile hero sections.
 * 
 * @component
 * @param {string[]} images - Array of image URLs to display (supports multiple images for carousel)
 * @param {string} alt - Alt text for the image
 * @param {number} delay - Animation delay in seconds
 * @param {function} onHover - Callback when card is hovered
 * @param {function} onLeave - Callback when mouse leaves card
 * @param {function} onClick - Callback when card is clicked (opens PortfolioPreviewOverlay)
 * @param {object} project - Project data object with url, title, etc.
 * @param {string} className - Additional CSS classes
 * 
 * Features:
 * - Phone-like rounded frame (240px × 500px on desktop)
 * - 3D tilt effect on hover
 * - Auto-scroll on hover (for long images)
 * - Auto-rotate between multiple images
 * - Click to open full-screen webview overlay
 * 
 * Used in:
 * - MockupGallery.jsx (desktop, left side)
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactParallaxTilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";

export function MockupCardMobile({ images, alt, delay, onHover, onLeave, onClick, project, className }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const containerRef = useRef(null);

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
      onHover(project || { images, alt, currentIndex: currentImageIndex });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setScrollProgress(0);
    if (onLeave) {
      onLeave();
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(project || { images, alt, currentIndex: currentImageIndex });
    }
  };

  return (
    <ReactParallaxTilt
      className={cn(
        "w-full md:w-[240px] h-[320px] md:h-[500px] relative z-10",
        className
      )}
      style={{
        transform: "translateX(0%) translateY(0%) rotate(-3deg)",
        zIndex: 10,
      }}
      tiltMaxAngleX={isHovered ? 12 : 6}
      tiltMaxAngleY={isHovered ? 12 : 6}
      scale={isHovered ? 1.12 : 1.0}
      transitionSpeed={1500}
      glareEnable={true}
      glareMaxOpacity={isHovered ? 0.6 : 0.2}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn(
          "relative w-full h-full border-[3px] rounded-[2rem]",
          "shadow-2xl transition-all duration-500 cursor-pointer",
          "bg-gradient-to-br from-neutral-950/90 via-neutral-900/80 to-neutral-950/90",
          isHovered 
            ? "border-[#CCFF00] shadow-[0_0_80px_rgba(204,255,0,1)] z-[99]" 
            : "border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        )}
        style={{ width: '100%', height: '100%', minHeight: '320px' }}
        onClick={handleCardClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1
        }}
        transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-30 pointer-events-none z-0"></div>
        
        {/* Phone Frame with glow effect */}
        <div className={cn(
          "absolute inset-0 border-[3px] pointer-events-none z-10 transition-all duration-700 rounded-[2rem]",
          isHovered ? "border-[#CCFF00]/40 shadow-[0_0_40px_rgba(204,255,0,0.6)]" : "border-neutral-700"
        )} />
        
        {/* Screen Content with Image Carousel */}
        <div className="absolute top-[6px] left-[6px] right-[6px] bottom-[6px] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 rounded-[1.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              ref={imageRef}
              className="absolute inset-0 w-full h-full z-0 scrollbar-hide overflow-y-auto overflow-x-hidden"
              style={{
                scrollBehavior: 'smooth',
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div ref={containerRef} className="absolute inset-0 w-full h-full">
                <img
                  src={images[currentImageIndex]}
                  alt={`${alt} - Przykład szybkiej strony internetowej - widok ${currentImageIndex + 1}`}
                  style={{ 
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'top center',
                    transform: 'none',
                    transformOrigin: 'top center',
                  }}
                  onError={(e) => {
                    console.error('Image failed to load:', images[currentImageIndex]);
                    e.target.style.display = "none";
                    const parent = e.target.parentElement?.parentElement;
                    if (parent) {
                      parent.style.background = "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)";
                      parent.style.display = "flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                    }
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', images[currentImageIndex]);
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

