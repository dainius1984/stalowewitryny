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
import { motion, AnimatePresence, useMotionValue, useAnimation } from "framer-motion";
import { MockupCardMobileOnly } from "@/components/ui/MockupCardMobileOnly";
import { PortfolioPreviewOverlay } from "@/components/ui/PortfolioPreviewOverlay";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(0); // -1 for left, 1 for right
  const [isManualNavigation, setIsManualNavigation] = useState(false);
  const [isManualSwipe, setIsManualSwipe] = useState(false); // Track if swipe is manual or auto
  const hoverTimeoutRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const currentProjectRef = useRef(null);
  const rotationIntervalRef = useRef(null);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  // Minimum swipe distance to trigger project change
  const minSwipeDistance = 50;

  // Preload all images when component mounts
  useEffect(() => {
    mockupProjects.forEach((project) => {
      if (project.desktopHero) {
        const img = new Image();
        img.src = project.desktopHero;
        console.log('🖼️ Preloading image:', project.desktopHero);
      }
    });
  }, []);

  // Notify parent when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(previewOpen && hoveredProject !== null);
    }
  }, [previewOpen, hoveredProject, onModalStateChange]);

  // Auto-rotate through all projects every 5 seconds (only when not manually navigating)
  useEffect(() => {
    if (!isManualNavigation && !isSwiping && !previewOpen) {
      rotationIntervalRef.current = setInterval(() => {
        setIsManualSwipe(false); // Mark as auto-scroll
        setSwipeDirection(1); // Set direction for auto-scroll
        setCurrentProjectIndex((prev) => (prev + 1) % mockupProjects.length);
      }, 5000); // Rotate every 5 seconds
    } else {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
        rotationIntervalRef.current = null;
      }
    }

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [isManualNavigation, isSwiping, previewOpen]);

  // Reset manual navigation flag after 10 seconds of inactivity
  useEffect(() => {
    if (isManualNavigation) {
      const timeout = setTimeout(() => {
        setIsManualNavigation(false);
      }, 10000); // Reset after 10 seconds
      return () => clearTimeout(timeout);
    }
  }, [isManualNavigation, currentProjectIndex]);

  // Handle swipe gestures for project navigation
  const handleDragStart = () => {
    setIsSwiping(true);
    setIsManualNavigation(true);
    setIsManualSwipe(true); // Mark as manual swipe
    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current);
      rotationIntervalRef.current = null;
    }
  };

  const handleDrag = (event, info) => {
    x.set(info.offset.x);
    // Set direction based on drag
    if (info.offset.x > 0) {
      setSwipeDirection(-1); // Swiping right shows previous
    } else if (info.offset.x < 0) {
      setSwipeDirection(1); // Swiping left shows next
    }
  };

  const handleDragEnd = (event, info) => {
    setIsSwiping(false);
    const threshold = minSwipeDistance;
    const velocity = Math.abs(info.velocity.x);
    
    if (Math.abs(info.offset.x) > threshold || velocity > 500) {
      if (info.offset.x > 0) {
        // Swiped right - previous project
        setCurrentProjectIndex((prev) => (prev - 1 + mockupProjects.length) % mockupProjects.length);
        setSwipeDirection(-1);
      } else {
        // Swiped left - next project
        setCurrentProjectIndex((prev) => (prev + 1) % mockupProjects.length);
        setSwipeDirection(1);
      }
      setIsManualNavigation(true);
      setIsManualSwipe(true); // Keep manual flag for animation
    } else {
      // Reset manual flag if swipe wasn't completed
      setIsManualSwipe(false);
    }
    
    // Reset position
    controls.start({ x: 0, transition: { duration: 0.3 } });
    x.set(0);
    
    // Reset swipe direction after animation completes
    setTimeout(() => {
      setSwipeDirection(0);
      setIsManualSwipe(false);
    }, 400); // Match animation duration
  };

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
        "w-full",
        "min-h-[300px]" // Ensure minimum height for images
      )}>
        
        {/* Mockup Gallery Container - Mobile: Shows only desktop visuals, wider container */}
        <motion.div 
          ref={containerRef}
          className="relative w-full max-w-[120%] min-h-[38vh] flex items-center justify-center overflow-visible mx-auto" 
          style={{ 
            width: '100%', 
            minWidth: '100%', 
            x,
            touchAction: 'pan-x', // Allow horizontal panning
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {/* Swipe Direction Indicators */}
          {isSwiping && (
            <AnimatePresence>
              <motion.div
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: x.get() > 30 ? 1 : 0.3, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border-2 border-primary/50 shadow-lg">
                  <ChevronLeft className="w-6 h-6 text-primary" />
                </div>
              </motion.div>
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: x.get() < -30 ? 1 : 0.3, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border-2 border-primary/50 shadow-lg">
                  <ChevronRight className="w-6 h-6 text-primary" />
                </div>
              </motion.div>
            </AnimatePresence>
          )}


          {/* Current Project */}
          <AnimatePresence mode="wait" custom={swipeDirection}>
            {mockupProjects.map((project, index) => {
              if (index !== currentProjectIndex) return null;
              
              // Different animations for manual swipe vs auto-scroll
              const isManual = isManualSwipe;
              
              return (
                <motion.div
                  key={`project-${index}-${currentProjectIndex}`}
                  custom={swipeDirection}
                  className="flex items-center justify-center w-full"
                  initial={(dir) => {
                    if (isManual) {
                      // Manual swipe: Smooth slide with fade
                      return {
                        opacity: 0,
                        x: dir === 1 ? 50 : -50,
                        scale: 0.95,
                      };
                    } else {
                      // Auto-scroll: 3D effect with blur
                      return {
                        opacity: 0,
                        scale: 0.8,
                        x: dir === 1 ? 100 : -100,
                        y: 50,
                        rotateY: dir === 1 ? -15 : 15,
                        rotateX: 5,
                        filter: "blur(20px) brightness(0.3)",
                      };
                    }
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotateY: 0,
                    rotateX: 0,
                    filter: "blur(0px) brightness(1)",
                  }}
                  exit={(dir) => {
                    if (isManual) {
                      // Manual swipe: Smooth slide out
                      return {
                        opacity: 0,
                        x: dir === 1 ? -50 : 50,
                        scale: 0.95,
                      };
                    } else {
                      // Auto-scroll: 3D effect
                      return {
                        opacity: 0,
                        scale: 0.7,
                        x: dir === 1 ? -100 : 100,
                        y: -30,
                        rotateY: dir === 1 ? 15 : -15,
                        rotateX: -5,
                        filter: "blur(20px) brightness(0.3)",
                      };
                    }
                  }}
                  transition={isManual ? {
                    // Manual swipe: Faster, smoother transition
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94], // Smooth ease
                    opacity: { duration: 0.25 },
                    x: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                    scale: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                  } : {
                    // Auto-scroll: Original 3D effect
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                    scale: { 
                      duration: 0.5,
                      ease: [0.34, 1.56, 0.64, 1]
                    },
                    opacity: { 
                      duration: 0.4,
                      ease: "easeOut"
                    },
                    filter: {
                      duration: 0.5,
                      ease: "easeOut"
                    },
                    rotateY: {
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1]
                    },
                    rotateX: {
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1]
                    },
                    x: {
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1]
                    },
                    y: {
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                >
                  {/* Desktop View Only for Mobile */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`mobile-${index}-${currentProjectIndex}`}
                      className="w-full"
                      style={{ width: '100%', minWidth: '100%', display: 'flex', justifyContent: 'center' }}
                      initial={isManual ? {
                        // Manual swipe: Simple fade and slide
                        opacity: 0,
                        x: swipeDirection === 1 ? 30 : -30,
                        scale: 0.98,
                      } : {
                        // Auto-scroll: Original effect
                        opacity: 0,
                        x: 50,
                        y: 20,
                        rotate: 5,
                        scale: 0.9,
                        filter: "blur(8px) brightness(0.7)",
                      }}
                      animate={{ 
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        filter: "blur(0px) brightness(1)",
                      }}
                      exit={isManual ? {
                        // Manual swipe: Smooth exit
                        opacity: 0,
                        x: swipeDirection === 1 ? -30 : 30,
                        scale: 0.98,
                      } : {
                        // Auto-scroll: Original exit
                        opacity: 0,
                        x: -50,
                        y: -20,
                        rotate: -5,
                        scale: 0.9,
                        filter: "blur(8px) brightness(0.7)",
                      }}
                      transition={isManual ? {
                        // Manual swipe: Faster, smoother
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        opacity: { duration: 0.25 },
                        x: { duration: 0.3 },
                        scale: { duration: 0.3 },
                      } : {
                        // Auto-scroll: Original timing
                        delay: 0.1,
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.4 },
                        filter: { duration: 0.5 },
                        scale: {
                          duration: 0.6,
                          ease: [0.34, 1.56, 0.64, 1]
                        }
                      }}
                    >
                      <MockupCardMobileOnly
                        key={`${project.alt}-mobile-${index}`}
                        images={[project.desktopHero]} // Desktop hero section for mobile view
                        alt={`${project.alt} - Desktop Hero`}
                        delay={isManual ? 0 : 0.1}
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

        </motion.div>
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

