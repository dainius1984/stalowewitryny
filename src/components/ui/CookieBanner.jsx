import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CookieBanner Component
 * 
 * Displays a cookie consent banner at the bottom of the screen.
 * - Shows only if user hasn't accepted/rejected cookies yet
 * - Saves consent to localStorage
 * - Responsive design with Tailwind CSS
 */
export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to ensure smooth page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
        >
          <div className="container mx-auto px-4 py-4 md:py-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-7xl mx-auto">
              {/* Text Content */}
              <div className="flex-1 text-sm md:text-base text-white font-sans leading-relaxed">
                <p>
                  Nasza strona korzysta z ciasteczek, abyś mógł cieszyć się najlepszą jakością usług. 
                  Szczegóły znajdziesz w{" "}
                  <Link
                    to="/polityka-prywatnosci"
                    className="text-primary hover:text-primary/80 underline font-medium transition-colors"
                  >
                    Polityce Prywatności
                  </Link>
                  .
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Reject Button - Discrete */}
                <button
                  onClick={handleReject}
                  className="px-4 py-2 text-sm md:text-base text-neutral-400 hover:text-white font-sans font-medium transition-colors border border-white/10 hover:border-white/20 rounded-full bg-transparent"
                  aria-label="Odrzuć ciasteczka"
                >
                  Odrzuć
                </button>

                {/* Accept Button - Prominent */}
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 text-sm md:text-base bg-primary text-black font-sans font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95"
                  aria-label="Akceptuję ciasteczka"
                >
                  Akceptuję
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
