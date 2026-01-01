/**
 * MockupCardMobileOnly Component
 * Simple component for mobile - displays full image
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      className={cn("w-full h-[50vh] relative", className)}
      style={{
        width: '100%',
        height: '50vh',
        minHeight: '350px',
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
        className="relative w-full h-full border-[3px] rounded-xl shadow-2xl cursor-pointer bg-neutral-900 overflow-hidden"
        style={{ 
          width: '100%', 
          height: '100%',
          minHeight: '400px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.3 }}
      >
        {/* Image Container */}
        {currentImage ? (
          <div 
            className="absolute inset-[6px] overflow-visible bg-neutral-950 flex items-center justify-center"
            style={{
              width: 'calc(100% - 12px)',
              height: 'calc(100% - 12px)',
              top: '6px',
              left: '6px',
              borderRadius: '0.5rem',
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

            {/* Image Indicator Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {images.map((_, index) => (
                  <button
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
                  />
                ))}
              </div>
            )}

            {/* Hover Overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                <div className="text-white text-sm font-semibold px-4 py-2 bg-black/80 rounded-full border border-[#CCFF00]/50">
                  Kliknij, aby otworzyć
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-[6px] rounded-lg bg-neutral-950 flex items-center justify-center">
            <div className="text-neutral-500 text-sm">Brak obrazu</div>
          </div>
        )}

        {/* Border */}
        <div className={cn(
          "absolute inset-0 border-[3px] rounded-xl pointer-events-none transition-all duration-300",
          isHovered ? "border-[#CCFF00]" : "border-white/30"
        )} />
      </motion.div>
    </div>
  );
}
