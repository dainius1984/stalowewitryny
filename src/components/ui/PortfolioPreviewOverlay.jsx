import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function PortfolioPreviewOverlay({ 
  isOpen, 
  onClose, 
  url,
  title,
  alt
}) {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when overlay opens or URL changes
  useEffect(() => {
    if (isOpen && url) {
      setIsLoading(true);
    }
  }, [isOpen, url]);

  // Don't render if no URL
  if (!url) {
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
                "relative w-full max-w-7xl h-full max-h-[95vh]",
                "bg-neutral-900 rounded-[2rem] border-2 border-[#CCFF00]/30",
                "shadow-[0_0_80px_rgba(204,255,0,0.4)]",
                "pointer-events-auto overflow-hidden flex flex-col"
              )}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-neutral-900/80 backdrop-blur-md">
                {/* Project Title */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.6)]"></div>
                  <span className="text-sm md:text-base font-semibold text-white font-sans">
                    {title || alt}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* External Link Button */}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 hover:border-[#CCFF00]/50 transition-all duration-300 text-white hover:text-[#CCFF00]"
                    aria-label="Otwórz w nowej karcie"
                    title="Otwórz stronę w nowej karcie"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 hover:border-[#CCFF00]/50 transition-all duration-300 text-white hover:text-[#CCFF00]"
                    aria-label="Zamknij"
                    title="Zamknij podgląd"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 z-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#CCFF00]/30 border-t-[#CCFF00] rounded-full animate-spin"></div>
                    <span className="text-sm text-neutral-400 font-sans">Ładowanie strony...</span>
                  </div>
                </div>
              )}

              {/* Webview Container */}
              <div className="flex-1 relative overflow-hidden">
                <iframe
                  src={url}
                  className="w-full h-full border-0"
                  title={title || alt}
                  allow="fullscreen"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                  style={{
                    minHeight: '100%',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

