import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function PortfolioPreviewOverlay({ 
  isOpen, 
  onClose, 
  images, 
  alt,
  currentIndex: initialIndex = 0 
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Reset index when overlay opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsAutoScrolling(true);
    }
  }, [isOpen, initialIndex]);

  // Auto-scroll effect
  useEffect(() => {
    if (isOpen && isAutoScrolling && images.length > 0) {
      const container = document.getElementById('preview-image-container');
      if (container) {
        const img = container.querySelector('img');
        if (img) {
          const containerHeight = container.clientHeight;
          const imgHeight = img.offsetHeight;
          const maxScroll = Math.max(0, imgHeight - containerHeight);
          
          if (maxScroll > 0) {
            const scrollInterval = setInterval(() => {
              container.scrollTop = Math.min(
                container.scrollTop + 2,
                maxScroll
              );
              
              if (container.scrollTop >= maxScroll) {
                setIsAutoScrolling(false);
                clearInterval(scrollInterval);
              }
            }, 30);

            return () => clearInterval(scrollInterval);
          }
        }
      }
    }
  }, [isOpen, isAutoScrolling, currentIndex, images.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoScrolling(true);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoScrolling(true);
  };

  // Don't render if no images
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Overlay Content */}
          <div key="overlay-content" className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              className={cn(
                "relative w-full max-w-6xl h-full max-h-[90vh]",
                "bg-neutral-900 rounded-[2rem] border-2 border-[#CCFF00]/30",
                "shadow-[0_0_80px_rgba(204,255,0,0.4)]",
                "pointer-events-auto overflow-hidden"
              )}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-black/80 backdrop-blur-md border border-white/10 hover:bg-black/90 hover:border-[#CCFF00]/50 transition-all duration-300 text-white hover:text-[#CCFF00]"
                aria-label="Zamknij"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/80 backdrop-blur-md border border-white/10 hover:bg-black/90 hover:border-[#CCFF00]/50 transition-all duration-300 text-white hover:text-[#CCFF00]"
                    aria-label="Poprzedni obraz"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/80 backdrop-blur-md border border-white/10 hover:bg-black/90 hover:border-[#CCFF00]/50 transition-all duration-300 text-white hover:text-[#CCFF00]"
                    aria-label="Następny obraz"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Container */}
              <div
                id="preview-image-container"
                className="w-full h-full overflow-y-auto scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
              >
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${alt} - Portfolio Preview ${currentIndex + 1}`}
                  className="w-full h-auto object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Image Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsAutoScrolling(true);
                      }}
                      className={cn(
                        "rounded-full transition-all duration-300",
                        index === currentIndex
                          ? "bg-[#CCFF00] w-8 h-2 shadow-[0_0_10px_rgba(204,255,0,0.8)]"
                          : "bg-white/40 hover:bg-white/60 w-2 h-2"
                      )}
                      aria-label={`Show image ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Project Title */}
              <div className="absolute top-4 left-4 z-50 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className="text-sm font-semibold text-white font-sans">
                  {alt}
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

