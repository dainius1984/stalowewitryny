/**
 * MockupGalleryMobile Component - SIMPLIFIED FOR MOBILE
 * Simple swipe gallery for mobile devices
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MockupCardMobileOnly } from "@/components/ui/MockupCardMobileOnly";
import { PortfolioPreviewOverlay } from "@/components/ui/PortfolioPreviewOverlay";

const mockupProjects = [
  {
    desktopHero: "/img/projects/white1.webp",
    mobileHero: "/img/projects/white1-small.webp", // Use small version for mobile LCP
    alt: "White Effect - Portfolio Project",
    url: "https://www.whiteeffect.pl/",
    title: "White Effect",
  },
  {
    desktopHero: "/img/projects/tarasy1.webp",
    alt: "Zielone Mile - Portfolio Project",
    url: "https://zielonemile.pl/",
    title: "Zielone Mile",
  },
  {
    desktopHero: "/img/projects/oranzeria1.webp",
    alt: "Oranzeria - Portfolio Project",
    url: "https://oraneria.vercel.app/",
    title: "Oranzeria",
  },
  {
    desktopHero: "/img/projects/fryzjerka1.webp",
    alt: "Fryzjerka Małgosia - Portfolio Project",
    url: "https://www.fryzjerkamalgosia.pl/",
    title: "Fryzjerka Małgosia",
  },
  {
    desktopHero: "/img/projects/figura1.webp",
    alt: "Studio Figura - Portfolio Project",
    url: "https://www.studiofigurastablowice.pl/",
    title: "Studio Figura",
  },
  {
    desktopHero: "/img/projects/autyzm1.webp",
    alt: "Autyzm od Kuchni - Portfolio Project",
    url: "https://www.autyzmodkuchni.pl/",
    title: "Autyzm od Kuchni",
  },
  {
    desktopHero: "/img/projects/open1.webp",
    alt: "OpenPol - Portfolio Project",
    url: "https://openpol.pl/",
    title: "OpenPol",
  },
];

export function MockupGalleryMobile({ onModalStateChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);
  const touchStartX = useRef(null);
  const touchStartTime = useRef(null);
  const autoRotateIntervalRef = useRef(null);
  const reEnableTimeoutRef = useRef(null);

  // Auto-rotate every 5 seconds (only when enabled)
  useEffect(() => {
    if (!autoRotateEnabled) return;

    autoRotateIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockupProjects.length);
    }, 5000);

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    };
  }, [autoRotateEnabled]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e) => {
    if (!touchStartX.current) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    const deltaTime = Date.now() - (touchStartTime.current || 0);
    const velocity = deltaTime > 0 ? Math.abs(deltaX) / deltaTime : 0;

    // Swipe threshold: 50px or fast swipe
    if (Math.abs(deltaX) > 50 || velocity > 0.3) {
      // Disable auto-rotate when user swipes
      setAutoRotateEnabled(false);
      
      // Clear existing timeout if any
      if (reEnableTimeoutRef.current) {
        clearTimeout(reEnableTimeoutRef.current);
      }
      
      // Re-enable auto-rotate after 3 seconds of inactivity
      reEnableTimeoutRef.current = setTimeout(() => {
        setAutoRotateEnabled(true);
      }, 3000);

      if (deltaX > 0) {
        // Swipe right - previous
        setCurrentIndex((prev) => (prev - 1 + mockupProjects.length) % mockupProjects.length);
      } else {
        // Swipe left - next
        setCurrentIndex((prev) => (prev + 1) % mockupProjects.length);
      }
    }

    touchStartX.current = null;
    touchStartTime.current = null;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
      if (reEnableTimeoutRef.current) {
        clearTimeout(reEnableTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = (project) => {
    setHoveredProject(project);
    setPreviewOpen(true);
  };

  const handleClose = () => {
    setPreviewOpen(false);
    setTimeout(() => setHoveredProject(null), 400);
  };

  // Notify parent
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(previewOpen && hoveredProject !== null);
    }
  }, [previewOpen, hoveredProject, onModalStateChange]);

  const currentProject = mockupProjects[currentIndex];

  return (
    <>
      <div
        className="w-full min-h-[30vh] flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-x pan-y' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <MockupCardMobileOnly
              images={[currentProject.mobileHero || currentProject.desktopHero]}
              alt={currentProject.alt}
              project={currentProject}
              onClick={handleClick}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <PortfolioPreviewOverlay
        isOpen={previewOpen && hoveredProject !== null}
        onClose={handleClose}
        url={hoveredProject?.url || ""}
        title={hoveredProject?.title || ""}
        alt={hoveredProject?.alt || ""}
      />
    </>
  );
}
