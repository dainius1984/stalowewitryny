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
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const currentProjectRef = useRef(null);
  const rotationIntervalRef = useRef(null);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  // Detect mobile device - ALWAYS true for MockupGalleryMobile (it's mobile-only component)
  useEffect(() => {
    const checkMobile = () => {
      // This component is ONLY used on mobile, so always set to true
      // But also check actual screen size as fallback
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      console.log('📱 MockupGalleryMobile - isMobile:', isMobileDevice, 'window.innerWidth:', window.innerWidth);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Minimum swipe distance to trigger project change (reduced for better UX)
  const minSwipeDistance = 20; // Lower threshold for easier swiping

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

  // Native touch handlers for mobile swipe (backup for framer-motion)
  const touchStartXRef = useRef(null);
  const touchStartTimeRef = useRef(null);

  const handleNativeTouchStart = (e) => {
    console.log('🖐️ handleNativeTouchStart', e.touches[0].clientX);
    // CRITICAL: Don't prevent default here - let it bubble naturally
    touchStartXRef.current = e.touches[0].clientX;
    touchStartTimeRef.current = Date.now();
    setIsSwiping(true);
    setIsManualNavigation(true);
    setIsManualSwipe(true);
    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current);
      rotationIntervalRef.current = null;
    }
  };

  const handleNativeTouchMove = (e) => {
    if (!touchStartXRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    const deltaY = Math.abs(e.touches[0].clientY - (e.touches[0].clientY || 0));
    
    // CRITICAL: Only prevent default if horizontal swipe is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      e.preventDefault(); // Prevent vertical scroll during horizontal swipe
      e.stopPropagation(); // Stop event from bubbling
    }
    
    // Update visual position during drag for smooth feedback
    x.set(deltaX);
    // Set direction
    if (deltaX > 0) {
      setSwipeDirection(-1);
    } else if (deltaX < 0) {
      setSwipeDirection(1);
    }
  };

  const handleNativeTouchEnd = (e) => {
    console.log('👆 handleNativeTouchEnd');
    if (!touchStartXRef.current) {
      setIsSwiping(false);
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaTime = Date.now() - (touchStartTimeRef.current || 0);
    const velocity = deltaTime > 0 ? Math.abs(deltaX) / deltaTime : 0;

    console.log(`📊 Swipe stats: deltaX=${deltaX.toFixed(1)}px, velocity=${velocity.toFixed(3)}px/ms, threshold=${minSwipeDistance}px`);

    setIsSwiping(false);

    // CRITICAL: Lower threshold for easier swiping - check distance OR velocity
    if (Math.abs(deltaX) > minSwipeDistance || velocity > 0.15) {
      if (deltaX > 0) {
        // Swiped right - previous project
        setCurrentProjectIndex((prev) => {
          const newIndex = (prev - 1 + mockupProjects.length) % mockupProjects.length;
          console.log(`✅ Swipe RIGHT: ${prev} -> ${newIndex} (${mockupProjects[newIndex].title})`);
          return newIndex;
        });
        setSwipeDirection(-1);
      } else {
        // Swiped left - next project
        setCurrentProjectIndex((prev) => {
          const newIndex = (prev + 1) % mockupProjects.length;
          console.log(`✅ Swipe LEFT: ${prev} -> ${newIndex} (${mockupProjects[newIndex].title})`);
          return newIndex;
        });
        setSwipeDirection(1);
      }
      setIsManualNavigation(true);
      setIsManualSwipe(true);
    } else {
      console.log('❌ Swipe too small, ignoring');
      setIsManualSwipe(false);
    }

    // Reset position
    controls.start({ 
      x: 0, 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.25
      } 
    });
    x.set(0);
    touchStartXRef.current = null;
    touchStartTimeRef.current = null;

    // Reset swipe direction after animation
    setTimeout(() => {
      setSwipeDirection(0);
      setIsManualSwipe(false);
    }, 300);
  };

  // Handle swipe gestures for project navigation (framer-motion)
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
    
    // Lower velocity threshold for easier quick swipes (reduced from 500 to 300)
    if (Math.abs(info.offset.x) > threshold || velocity > 300) {
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
    
    // Reset position with smooth spring animation
    controls.start({ 
      x: 0, 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.25
      } 
    });
    x.set(0);
    
    // Reset swipe direction after animation completes
    setTimeout(() => {
      setSwipeDirection(0);
      setIsManualSwipe(false);
    }, 300); // Match animation duration
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
      <div 
        className={cn(
          "flex items-center justify-center",
          "p-0 overflow-visible relative",
          "transition-all duration-700 ease-out",
          "w-full",
          "min-h-[240px]" // Reduced height for mobile
        )}
        style={{
          touchAction: 'pan-x pan-y', // Allow touch events on wrapper
          pointerEvents: 'auto', // Ensure wrapper can receive events
        }}
      >
        
        {/* Mockup Gallery Container - Mobile: Shows only desktop visuals, wider container */}
        <motion.div 
          ref={containerRef}
          className="relative w-full max-w-[120%] min-h-[30vh] flex items-center justify-center overflow-visible mx-auto" 
          style={{ 
            width: '100%', 
            minWidth: '100%', 
            x,
            touchAction: 'pan-x pan-y', // CRITICAL: Always allow horizontal AND vertical panning (this is mobile-only component)
            WebkitUserSelect: 'none',
            userSelect: 'none',
            WebkitTouchCallout: 'none', // Prevent iOS callout menu
            WebkitTapHighlightColor: 'transparent', // Remove tap highlight
            pointerEvents: 'auto', // CRITICAL: Ensure this element can receive touch events
          }}
          // CRITICAL: Always disable framer-motion drag - use native touch only
          drag={false}
          // CRITICAL: Native touch handlers - ALWAYS active (this is mobile-only component)
          onTouchStart={(e) => {
            console.log('🖐️ MockupGalleryMobile motion.div onTouchStart', e.touches[0].clientX, 'isMobile:', isMobile, 'target:', e.target?.className || e.target?.tagName);
            handleNativeTouchStart(e);
          }}
          onTouchMove={(e) => {
            handleNativeTouchMove(e);
          }}
          onTouchEnd={(e) => {
            console.log('👆 MockupGalleryMobile onTouchEnd', 'isMobile:', isMobile);
            handleNativeTouchEnd(e);
          }}
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
                      // Manual swipe: Ultra-smooth slide with minimal fade
                      return {
                        opacity: 0.7,
                        x: dir === 1 ? 30 : -30,
                        scale: 0.98,
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
                      // Manual swipe: Ultra-smooth slide out
                      return {
                        opacity: 0.7,
                        x: dir === 1 ? -30 : 30,
                        scale: 0.98,
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
                    // Manual swipe: Ultra-fast, ultra-smooth spring transition
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                    mass: 0.8,
                    opacity: { 
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    },
                    x: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                      mass: 0.8
                    },
                    scale: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                      mass: 0.8
                    },
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
                        // Manual swipe: Minimal fade and slide for ultra-smooth feel
                        opacity: 0.8,
                        x: swipeDirection === 1 ? 20 : -20,
                        scale: 0.99,
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
                        // Manual swipe: Ultra-smooth exit
                        opacity: 0.8,
                        x: swipeDirection === 1 ? -20 : 20,
                        scale: 0.99,
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
                        // Manual swipe: Ultra-fast spring for instant feel
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                        mass: 0.7,
                        opacity: { 
                          duration: 0.15,
                          ease: [0.4, 0, 0.2, 1]
                        },
                        x: { 
                          type: "spring",
                          stiffness: 500,
                          damping: 40,
                          mass: 0.7
                        },
                        scale: { 
                          type: "spring",
                          stiffness: 500,
                          damping: 40,
                          mass: 0.7
                        },
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

