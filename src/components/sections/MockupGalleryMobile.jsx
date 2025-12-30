/**
 * MockupGalleryMobile Component (Mobile Version)
 * 
 * Displays an interactive portfolio gallery in the Hero section on mobile devices.
 * Shows only desktop mockup visuals (single card) with wider container for better visibility.
 * 
 * Features:
 * - Auto-rotates through all projects every 5 seconds
 * - Click on mockup to open full-screen webview overlay
 * - Smooth 3D animations and transitions
 * - Hides navbar when overlay is open
 * - Wider container (200% max-width) to show more of desktop images
 * 
 * Used in:
 * - Hero.jsx (mobile layout only, hidden on desktop)
 * 
 * Components used:
 * - MockupCardMobileOnly: Desktop mockup frame optimized for mobile view
 * - PortfolioPreviewOverlay: Full-screen webview overlay
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MockupCardMobileOnly } from "@/components/ui/MockupCardMobileOnly";
import { PortfolioPreviewOverlay } from "@/components/ui/PortfolioPreviewOverlay";
import { cn } from "@/lib/utils";

// Project data with URLs for webview
// Mobile shows only desktop visuals (no mobile mockups)
const mockupProjects = [
  {
    desktopHero: "/img/projects/white1.png", // Desktop hero section
    alt: "White Effect - Portfolio Project",
    url: "https://www.whiteeffect.pl/",
    title: "White Effect",
    delay: 0,
  },
  {
    desktopHero: "/img/projects/tarasy1.png", // Desktop hero section - Zielone Mile
    alt: "Zielone Mile - Portfolio Project",
    url: "https://zielonemile.pl/",
    title: "Zielone Mile",
    delay: 0.2,
  },
  {
    desktopHero: "/img/projects/oranzeria1.png", // Desktop hero section
    alt: "Oranzeria - Portfolio Project",
    url: "https://oraneria.vercel.app/",
    title: "Oranzeria",
    delay: 0.4,
  },
  {
    desktopHero: "/img/projects/fryzjerka1.png", // Desktop hero section
    alt: "Fryzjerka Małgosia - Portfolio Project",
    url: "https://www.fryzjerkamalgosia.pl/",
    title: "Fryzjerka Małgosia",
    delay: 0.6,
  },
  {
    desktopHero: "/img/projects/figura1.png", // Desktop hero section
    alt: "Studio Figura - Portfolio Project",
    url: "https://www.studiofigurastablowice.pl/",
    title: "Studio Figura",
    delay: 0.8,
  },
  {
    desktopHero: "/img/projects/autyzm1.png", // Desktop hero section
    alt: "Autyzm od Kuchni - Portfolio Project",
    url: "https://www.autyzmodkuchni.pl/",
    title: "Autyzm od Kuchni",
    delay: 1.0,
  },
  {
    desktopHero: "/img/projects/open1.png", // Desktop hero section
    alt: "OpenPol - Portfolio Project",
    url: "https://openpol.pl/",
    title: "OpenPol",
    delay: 1.2,
  },
];

export function MockupGalleryMobile({ onModalStateChange }) {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const hoverTimeoutRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const currentProjectRef = useRef(null);
  const rotationIntervalRef = useRef(null);

  // Notify parent when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(previewOpen && hoveredProject !== null);
    }
  }, [previewOpen, hoveredProject, onModalStateChange]);

  // Auto-rotate through all projects every 5 seconds
  useEffect(() => {
    rotationIntervalRef.current = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % mockupProjects.length);
    }, 5000); // Rotate every 5 seconds

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, []);

  const handleClick = (project) => {
    // Clear any pending timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    
    // Store current project and open overlay immediately
    currentProjectRef.current = project;
    setHoveredProject(project);
    setPreviewOpen(true);
  };

  const handleClose = () => {
    setPreviewOpen(false);
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredProject(null);
      leaveTimeoutRef.current = null;
    }, 400);
  };

  const handleHover = (project) => {
    // Just store project for hover effect, don't open overlay
    currentProjectRef.current = project;
    setHoveredProject(project);
  };

  const handleLeave = () => {
    // Only clear hover state, don't close overlay if it's open
    if (!previewOpen) {
      currentProjectRef.current = null;
      setHoveredProject(null);
    }
  };

  return (
    <>
      <div className={cn(
        "flex items-center justify-center",
        "p-0 overflow-visible relative",
        "transition-all duration-700 ease-out",
        "w-full -mx-6", // Negative margin to extend beyond container, centered
        "min-h-[300px]" // Ensure minimum height for images
      )}>
        
        {/* Mockup Gallery Container - Mobile: Shows only desktop visuals, wider container */}
        <div className="relative w-full max-w-[200%] min-h-[420px] flex items-center justify-center overflow-visible" style={{ width: '100%', minWidth: '100%' }}>
          {/* Current Project */}
          <AnimatePresence mode="wait">
            {mockupProjects.map((project, index) => {
              if (index !== currentProjectIndex) return null;
              
              return (
                <motion.div
                  key={`project-${index}-${currentProjectIndex}`}
                  className="flex items-center justify-center w-full"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.6, 
                    x: 200,
                    rotateY: -30,
                    rotateX: 10,
                    filter: "blur(15px) brightness(0.5)"
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0, 
                    rotateY: 0,
                    rotateX: 0,
                    filter: "blur(0px) brightness(1)"
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.6, 
                    x: -200, 
                    rotateY: 30,
                    rotateX: -10,
                    filter: "blur(15px) brightness(0.5)"
                  }}
                  transition={{ 
                    duration: 1.2,
                    ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
                    scale: { 
                      duration: 1.0,
                      ease: [0.34, 1.56, 0.64, 1]
                    },
                    opacity: { 
                      duration: 0.7,
                      ease: "easeInOut"
                    },
                    filter: {
                      duration: 0.9,
                      ease: "easeOut"
                    },
                    rotateY: {
                      duration: 1.1,
                      ease: [0.34, 1.56, 0.64, 1]
                    },
                    rotateX: {
                      duration: 1.0,
                      ease: [0.34, 1.56, 0.64, 1]
                    }
                  }}
                >
                  {/* Desktop View Only for Mobile */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`mobile-${index}-${currentProjectIndex}`}
                      className="w-full"
                      style={{ width: '100%', minWidth: '100%', display: 'flex', justifyContent: 'center' }}
                      initial={{ 
                        opacity: 0, 
                        x: 100, 
                        rotate: 15,
                        scale: 0.7,
                        filter: "blur(10px)"
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        rotate: 0,
                        scale: 1,
                        filter: "blur(0px)"
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: -250, 
                        rotate: -25, 
                        scale: 0.5,
                        y: 50,
                        filter: "blur(15px)"
                      }}
                      transition={{ 
                        delay: 0.2, 
                        duration: 0.8, 
                        ease: [0.34, 1.56, 0.64, 1],
                        opacity: { duration: 0.5 },
                        filter: { duration: 0.6 }
                      }}
                    >
                      <MockupCardMobileOnly
                        key={`${project.alt}-mobile-${index}`}
                        images={[project.desktopHero]} // Desktop hero section for mobile view
                        alt={`${project.alt} - Desktop Hero`}
                        delay={0.1}
                        project={{ 
                          ...project, 
                          url: project.url
                        }}
                        onHover={handleHover}
                        onLeave={handleLeave}
                        onClick={handleClick}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Portfolio Preview Overlay - Always render for AnimatePresence */}
      <PortfolioPreviewOverlay
        isOpen={previewOpen && hoveredProject !== null}
        onClose={handleClose}
        url={hoveredProject?.url || ""}
        title={hoveredProject?.title || hoveredProject?.alt || ""}
        alt={hoveredProject?.alt || ""}
      />
    </>
  );
}

