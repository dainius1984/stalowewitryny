/**
 * MockupCardMobileOnly Component
 * Simple component for mobile - displays full image
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function MockupCardMobileOnly({ images, alt, delay = 0, onHover, onLeave, onClick, project, className }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const containerRef = useRef(null);
  
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0]);

  // Minimum swipe distance to trigger change (in pixels)
  const minSwipeDistance = 50;

  // Auto-rotate between images (only when not dragging)
  useEffect(() => {
    if (!isHovered && !isDragging && images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, isDragging, images]);

  // Handle swipe gestures
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && images && images.length > 1) {
      // Swipe left - next image
      setDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe && images && images.length > 1) {
      // Swipe right - previous image
      setDirection(-1);
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  // Handle drag end for framer-motion drag
  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const threshold = 100;
    
    if (Math.abs(info.offset.x) > threshold && images && images.length > 1) {
      if (info.offset.x > 0) {
        // Swiped right - previous image
        setDirection(-1);
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else {
        // Swiped left - next image
        setDirection(1);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }
    
    // Reset position
    x.set(0);
  };

  const handleClick = () => {
    if (onClick && project) {
      onClick(project);
    }
  };

  // Always render something, even if no images
  const currentImage = images && images.length > 0 ? images[currentImageIndex] : null;

  return (
    <div
      className={cn("w-full h-[38vh] md:h-[50vh] relative overflow-hidden", className)}
      style={{
        width: '100%',
        height: '38vh',
        minHeight: '270px',
        backgroundColor: '#18181b',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (onHover) onHover(project);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (onLeave) onLeave();
      }}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full border-[3px] rounded-xl cursor-pointer bg-neutral-900 overflow-hidden"
        style={{ 
          width: '100%', 
          height: '100%',
        }}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Image Container with Swipe Support */}
        {currentImage ? (
          <div 
            ref={containerRef}
            className="absolute overflow-hidden bg-neutral-950 flex items-center justify-center touch-pan-y"
            style={{
              width: 'calc(100% - 12px)',
              height: 'calc(100% - 12px + 20px)', // Extra 20px at top to show navbar
              top: '6px',
              left: '6px',
              bottom: '6px',
              marginTop: '-20px', // Move up by 20px to show navbar
              borderRadius: '0.5rem',
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentImageIndex}
                custom={direction}
                className="absolute inset-0 w-full h-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                style={{ x, opacity }}
                initial={(dir) => ({ 
                  opacity: 0, 
                  scale: 1.05, 
                  x: dir === 1 ? 300 : -300 
                })}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={(dir) => ({ 
                  opacity: 0, 
                  scale: 0.95, 
                  x: dir === 1 ? -300 : 300 
                })}
                transition={{ 
                  duration: 0.35,
                  ease: [0.4, 0, 0.2, 1],
                  scale: {
                    duration: 0.35,
                    ease: [0.34, 1.56, 0.64, 1] // Spring bounce
                  }
                }}
              >
                <img
                  src={currentImage}
                  alt={alt || `Portfolio image ${currentImageIndex + 1}`}
                  draggable={false}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    userSelect: 'none',
                    WebkitUserDrag: 'none',
                  }}
                  loading="eager"
                  onError={(e) => {
                    console.error('❌ Image failed to load:', currentImage);
                    e.target.style.display = "none";
                  }}
                  onLoad={() => {
                    console.log('✅ Image loaded:', currentImage);
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Swipe Indicator - shows direction hint */}
            {isDragging && images && images.length > 1 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-between px-4 z-40 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-primary/30"
                  animate={{ 
                    scale: x.get() > 50 ? 1.1 : 1,
                    opacity: x.get() > 50 ? 1 : 0.5
                  }}
                >
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.div>
                <motion.div
                  className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-primary/30"
                  animate={{ 
                    scale: x.get() < -50 ? 1.1 : 1,
                    opacity: x.get() < -50 ? 1 : 0.5
                  }}
                >
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {/* Image Indicator Dots with swipe animation */}
            {images.length > 1 && (
              <motion.div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    className={cn(
                      "rounded-full transition-all duration-300 touch-manipulation",
                      index === currentImageIndex
                        ? "bg-[#CCFF00] w-8 h-2 shadow-[0_0_10px_rgba(204,255,0,0.6)]"
                        : "bg-white/40 w-2 h-2 hover:bg-white/60"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    initial={false}
                    animate={{
                      scale: index === currentImageIndex ? 1.1 : 1,
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  />
                ))}
              </motion.div>
            )}

            {/* Swipe hint text (only on mobile, first time) */}
            {images && images.length > 1 && !isDragging && (
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: [0, 1, 1, 0], y: 0 }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut"
                }}
              >
                <div className="px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full border border-primary/30 text-xs text-primary/80 font-medium">
                  Przesuń, aby zmienić
                </div>
              </motion.div>
            )}

            {/* Hover Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-black/40 flex items-center justify-center z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-white text-sm font-semibold px-4 py-2 bg-black/80 rounded-full border border-[#CCFF00]/50"
                    initial={{ scale: 0.8, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 10 }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.34, 1.56, 0.64, 1] // Spring bounce
                    }}
                  >
                    Kliknij, aby otworzyć
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="absolute inset-[6px] rounded-lg bg-neutral-950 flex items-center justify-center">
            <div className="text-neutral-500 text-sm">Brak obrazu</div>
          </div>
        )}

        {/* Border with hover glow effect - limited to frame only */}
        <div 
          className={cn(
            "absolute inset-0 border-[3px] rounded-xl pointer-events-none transition-all duration-300",
            isHovered ? "border-[#CCFF00]" : "border-white/30"
          )}
          style={{
            boxShadow: isHovered 
              ? 'inset 0 0 15px rgba(204,255,0,0.2), 0 0 15px rgba(204,255,0,0.4)' 
              : 'none',
          }}
        />
      </motion.div>
    </div>
  );
}
