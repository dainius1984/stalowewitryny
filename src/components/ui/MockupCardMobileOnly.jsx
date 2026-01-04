/**
 * MockupCardMobileOnly Component
 * Simple component for mobile - displays full image
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function MockupCardMobileOnly({ images, alt, delay = 0, onHover, onLeave, onClick, project, className }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate between images
  useEffect(() => {
    if (!isHovered && images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, images]);

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
        {/* Image Container */}
        {currentImage ? (
          <div 
            className="absolute overflow-hidden bg-neutral-950 flex items-center justify-center"
            style={{
              width: 'calc(100% - 12px)',
              height: 'calc(100% - 12px + 20px)', // Extra 20px at top to show navbar
              top: '6px',
              left: '6px',
              bottom: '6px',
              marginTop: '-20px', // Move up by 20px to show navbar
              borderRadius: '0.5rem',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.1, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                  scale: {
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1] // Spring bounce
                  }
                }}
              >
                <img
                  src={currentImage}
                  alt={alt || `Portfolio image ${currentImageIndex + 1}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
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

            {/* Image Indicator Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      index === currentImageIndex
                        ? "bg-[#CCFF00] w-8 h-2"
                        : "bg-white/40 w-2 h-2"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    initial={false}
                    animate={{
                      scale: index === currentImageIndex ? 1.1 : 1,
                    }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
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
