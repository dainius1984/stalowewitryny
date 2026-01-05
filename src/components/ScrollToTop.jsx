import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Scrolls to top of page on route change
 * Works with Lenis smooth scroll
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure route change is complete
    const timer = setTimeout(() => {
      // Scroll to top instantly on route change
      // Try multiple methods for compatibility with Lenis
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      
      // Force scroll for Lenis compatibility
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
        // Also try direct manipulation
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
      
      // If Lenis is available, use it
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
