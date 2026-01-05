/**
 * PortfolioPreviewOverlay Component
 * 
 * Full-screen modal overlay that displays a live website preview in an iframe.
 * Opens when user clicks on a MockupCard (MockupCardMobile, MockupCardDesktop, or MockupCardMobileOnly).
 * 
 * @component
 * @param {boolean} isOpen - Whether the overlay is visible
 * @param {function} onClose - Callback to close the overlay
 * @param {string} url - URL of the website to display in iframe
 * @param {string} title - Project title to display in header
 * @param {string} alt - Alternative text/description
 * 
 * Features:
 * - Full-screen overlay with backdrop
 * - Live website preview in iframe
 * - Swipe down to close on mobile
 * - External link button to open site in new tab
 * - Loading indicator while iframe loads
 * - Responsive design (mobile and desktop)
 * 
 * Used in:
 * - MockupGallery.jsx: Opens when clicking mobile/desktop mockup cards
 * - MockupGalleryMobile.jsx: Opens when clicking mobile-only mockup card
 * 
 * Flow:
 * 1. User clicks MockupCard → onClick callback triggers
 * 2. MockupGallery sets previewOpen=true and hoveredProject
 * 3. PortfolioPreviewOverlay receives isOpen=true and displays iframe
 * 4. User can close via X button, swipe down (mobile), or click backdrop
 */
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export function PortfolioPreviewOverlay({ 
  isOpen, 
  onClose, 
  url,
  title,
  alt
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const overlayRef = useRef(null);

  // Minimum swipe distance to close (in pixels)
  const minSwipeDistance = 100;

  // Reset loading state when overlay opens or URL changes
  useEffect(() => {
    if (isOpen && url) {
      setIsLoading(true);
    }
  }, [isOpen, url]);

  // Add parameter to disable subscription modal on whiteeffect.pl
  const getIframeUrl = (originalUrl) => {
    if (!originalUrl) return "";
    try {
      const urlObj = new URL(originalUrl);
      // Add parameter to disable subscription modal
      urlObj.searchParams.set('preview', 'true');
      urlObj.searchParams.set('noSubscriptionModal', 'true');
      return urlObj.toString();
    } catch {
      return originalUrl;
    }
  };

  // Swipe down to close on mobile
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -minSwipeDistance;
    
    if (isDownSwipe && overlayRef.current) {
      // Check if swipe started from top area of overlay
      const overlayTop = overlayRef.current.getBoundingClientRect().top;
      if (touchStart < overlayTop + 100) {
        onClose();
      }
    }
  };

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
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[300]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Overlay Content */}
          <div key="overlay-content" className="fixed inset-0 z-[301] flex items-center justify-center p-0 md:p-8 pointer-events-none">
            <motion.div
              ref={overlayRef}
              className={cn(
                "relative w-full h-full md:max-w-7xl md:h-full md:max-h-[95vh]",
                "bg-neutral-900 rounded-none md:rounded-[2rem] border-0 md:border-2 border-[#CCFF00]/30",
                "shadow-none md:shadow-[0_0_80px_rgba(204,255,0,0.4)]",
                "pointer-events-auto overflow-hidden flex flex-col"
              )}
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between p-4 md:p-4 border-b border-white/10 bg-neutral-900/95 backdrop-blur-md relative">
                {/* Swipe Indicator for Mobile */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/30 rounded-full md:hidden"></div>
                
                {/* Project Title */}
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.6)] flex-shrink-0"></div>
                  <span className="text-xs md:text-sm lg:text-base font-semibold text-white font-sans truncate">
                    {title || alt}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* External Link Button */}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 md:p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 hover:border-[#CCFF00]/50 active:scale-95 transition-all duration-300 text-white hover:text-[#CCFF00]"
                    aria-label="Otwórz w nowej karcie"
                    title="Otwórz stronę w nowej karcie"
                  >
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  
                  {/* Close Button - Larger on mobile */}
                  <button
                    onClick={onClose}
                    className="p-2.5 md:p-2 rounded-full bg-[#CCFF00]/20 backdrop-blur-md border-2 border-[#CCFF00]/50 hover:bg-[#CCFF00]/30 active:scale-95 transition-all duration-300 text-[#CCFF00] hover:text-[#CCFF00] touch-manipulation"
                    aria-label="Zamknij"
                    title="Zamknij podgląd"
                  >
                    <X className="w-5 h-5 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Close Hint - Removed for cleaner fullscreen */}

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
                  src={getIframeUrl(url)}
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

              {/* Mobile Bottom Close Button - Removed, using header button only for cleaner UX */}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

