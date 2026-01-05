/**
 * MockupCardMobileOnly Component
 * Simple component for mobile - displays full image with swipe support
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function MockupCardMobileOnly({ images, alt, delay = 0, onHover, onLeave, onClick, project, className }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartTime = useRef(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate between images (only when not dragging)
  useEffect(() => {
    if (!isHovered && !isDragging && images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, isDragging, images]);

  // Touch event handlers for mobile swipe - pass through to parent on mobile
  const handleTouchStart = (e) => {
    // On mobile, allow touch events to bubble up to parent (MockupGalleryMobile)
    // Don't handle swipe here if only one image
    if (isMobile && images && images.length <= 1) {
      return; // Let parent handle the swipe
    }
    
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    // On mobile with single image, don't prevent default - let parent handle
    if (isMobile && images && images.length <= 1) {
      return;
    }
    
    if (!touchStartX.current) return;
    
    // Prevent default to avoid page scrolling during horizontal swipe
    const deltaX = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    // On mobile with single image, don't handle - let parent handle
    if (isMobile && images && images.length <= 1) {
      setIsDragging(false);
      return;
    }
    
    if (!touchStartX.current) {
      setIsDragging(false);
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    const deltaTime = Date.now() - touchStartTime.current;
    const velocity = Math.abs(deltaX) / deltaTime; // pixels per ms

    // Threshold: 50px or fast swipe (velocity > 0.5 px/ms)
    if (Math.abs(deltaX) > 50 || velocity > 0.5) {
      if (deltaX > 0) {
        // Swiped right - previous image
        setDirection(-1);
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else {
        // Swiped left - next image
        setDirection(1);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }

    touchStartX.current = null;
    touchStartTime.current = null;
    setIsDragging(false);
  };

  // Handle framer-motion drag for desktop
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const threshold = 50;
    const velocity = Math.abs(info.velocity.x);
    
    if ((Math.abs(info.offset.x) > threshold || velocity > 500) && images && images.length > 1) {
      if (info.offset.x > 0 || info.velocity.x > 500) {
        setDirection(-1);
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (info.offset.x < 0 || info.velocity.x < -500) {
        setDirection(1);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }
  };

  const handleClick = () => {
    if (onClick && project && !isDragging) {
      onClick(project);
    }
  };

  const currentImage = images && images.length > 0 ? images[currentImageIndex] : null;

  return (
    <div
      ref={containerRef}
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
    >
      <motion.div
        className="relative w-full h-full border-[3px] rounded-xl bg-neutral-900 overflow-hidden"
        style={{ 
          width: '100%', 
          height: '100%',
          cursor: isMobile ? 'default' : (isDragging ? 'grabbing' : 'grab'),
          touchAction: isMobile && images && images.length <= 1 ? 'pan-x' : 'none',
        }}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        drag={isMobile && images && images.length <= 1 ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {/* Image Container */}
        {currentImage ? (
          <div 
            className="absolute overflow-hidden bg-neutral-950 flex items-center justify-center"
            style={{
              width: 'calc(100% - 12px)',
              height: 'calc(100% - 12px + 20px)',
              top: '6px',
              left: '6px',
              bottom: '6px',
              marginTop: '-20px',
              borderRadius: '0.5rem',
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentImageIndex}
                custom={direction}
                className="absolute inset-0 w-full h-full"
                initial={(dir) => ({ 
                  opacity: 0, 
                  scale: 1.05, 
                  x: dir === 1 ? 300 : dir === -1 ? -300 : 0
                })}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={(dir) => ({ 
                  opacity: 0, 
                  scale: 0.95, 
                  x: dir === 1 ? -300 : dir === -1 ? 300 : 0
                })}
                transition={{ 
                  duration: 0.35,
                  ease: [0.4, 0, 0.2, 1],
                  scale: {
                    duration: 0.35,
                    ease: [0.34, 1.56, 0.64, 1]
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
                    pointerEvents: 'none',
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

            {/* Hover Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 pointer-events-none"
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
                      ease: [0.34, 1.56, 0.64, 1]
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

        {/* Border with hover glow effect */}
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
