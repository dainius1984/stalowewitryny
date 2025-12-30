import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import ReactParallaxTilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";

export function MockupCard({ images, alt, delay, position, onHover, onLeave, onClick, project, isLeft, className, isDesktopView = false }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const containerRef = useRef(null);

  // Log container and image sizes for mobile optimization
  useEffect(() => {
    if (!isDesktopView && containerRef.current) {
      const container = containerRef.current;
      const img = container.querySelector('img');
      if (img && img.complete) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        
        // Calculate recommended size to show first 2 sections nicely
        // Container is 320px height, we want to show ~2 sections = ~640-800px
        const recommendedWidth = 375; // Standard mobile width (iPhone SE/12/13)
        const recommendedHeight = 700; // ~2.2x container height for 2 sections with good visibility
        
        console.log('📱 Mobile MockupCard - Image Size Recommendations:');
        console.log(`Current Container Size: ${Math.round(containerWidth)}px × ${Math.round(containerHeight)}px`);
        console.log(`Current Image Size: ${imgWidth}px × ${imgHeight}px`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`✅ RECOMMENDED Image Size for Mobile (first 2 sections):`);
        console.log(`   Width: ${recommendedWidth}px (standard mobile width)`);
        console.log(`   Height: ${recommendedHeight}px (shows ~2 sections)`);
        console.log(`   Aspect Ratio: ${recommendedWidth}:${recommendedHeight} (${(recommendedWidth/recommendedHeight).toFixed(3)})`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`💡 Crop your image to: ${recommendedWidth}px × ${recommendedHeight}px`);
        console.log(`   Start from top (Y: 0) to capture hero + first section`);
      }
    }
  }, [isDesktopView, currentImageIndex, images]);

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
        // Mobile view: full width on mobile, phone-like size on desktop (240px width, 500px height)
        !isDesktopView && "w-full md:w-[240px] h-[320px] md:h-[500px]",
        // Desktop view: full width on mobile, wider on desktop (hero section proportions)
        isDesktopView && "w-full md:w-[480px] h-[240px] md:h-[360px]",
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
          "relative w-full h-full border-[3px] overflow-hidden",
          // Mobile: rounded phone-like
          !isDesktopView && "rounded-[2rem]",
          // Desktop: less rounded, more desktop-like
          isDesktopView && "rounded-xl",
          "shadow-2xl transition-all duration-500 cursor-pointer",
          "bg-gradient-to-br from-neutral-950/90 via-neutral-900/80 to-neutral-950/90",
          isHovered 
            ? "border-[#CCFF00] shadow-[0_0_80px_rgba(204,255,0,1)] z-[99]" 
            : "border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
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
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-30 pointer-events-none z-0"></div>
        {/* Phone/Desktop Frame with glow effect */}
        <div className={cn(
          "absolute inset-0 border-[3px] pointer-events-none z-10 transition-all duration-700",
          !isDesktopView && "rounded-[2rem]",
          isDesktopView && "rounded-xl",
          isHovered ? "border-[#CCFF00]/40 shadow-[0_0_40px_rgba(204,255,0,0.6)]" : "border-neutral-700"
        )} />
        
        {/* Screen Content with Image Carousel */}
        <div className={cn(
          "absolute top-[6px] left-[6px] right-[6px] bottom-[6px] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950",
          !isDesktopView && "rounded-[1.5rem] overflow-hidden", // Only overflow-hidden for rounded corners
          isDesktopView && "rounded-lg overflow-hidden"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              ref={imageRef}
              className={cn(
                "absolute inset-0 w-full h-full z-0 scrollbar-hide",
                !isDesktopView ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"
              )}
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
              <div ref={containerRef} className={cn(
                "w-full",
                !isDesktopView ? "min-h-full" : "h-full"
              )}>
                <img
                  src={images[currentImageIndex]}
                  alt={`${alt} - Przykład szybkiej strony internetowej - widok ${currentImageIndex + 1}`}
                  style={{ 
                    display: 'block',
                    // Mobile: fit full image 375x1495px proportionally in phone container
                    width: !isDesktopView ? '100%' : '100%',
                    height: !isDesktopView ? 'auto' : '100%',
                    // Mobile: use contain to show full image without cropping, Desktop: cover to fill
                    objectFit: !isDesktopView ? 'contain' : 'cover',
                    objectPosition: !isDesktopView ? 'top center' : 'top center',
                    // No transform/scale - let objectFit handle scaling
                    transform: 'none',
                    transformOrigin: 'top center',
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

