import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MockupCard } from "@/components/ui/MockupCard";
import { PortfolioPreviewOverlay } from "@/components/ui/PortfolioPreviewOverlay";
import { cn } from "@/lib/utils";

// Project data with URLs for webview
// Structure: mobileHero (for mobile view), desktopHero (for desktop view)
const mockupProjects = [
  {
    mobileHero: "/img/projects/whitemobile.png", // Mobile hero section
    desktopHero: "/img/projects/white1.png", // Desktop hero section
    alt: "White Effect - Portfolio Project",
    url: "https://www.whiteeffect.pl/",
    url2: "https://www.whiteeffect.pl/", // Both mobile and desktop link to whiteeffect.pl
    title: "White Effect",
    position: "back",
    delay: 0,
  },
  {
    mobileHero: "/img/projects/tarasymobile.png", // Mobile hero section - Zielone Mile
    desktopHero: "/img/projects/tarasy1.png", // Desktop hero section - Zielone Mile
    alt: "Zielone Mile - Portfolio Project",
    url: "https://zielonemile.pl/",
    url2: "https://zielonemile.pl/", // Both mobile and desktop link to zielonemile.pl
    title: "Zielone Mile",
    position: "middle",
    delay: 0.2,
  },
  {
    mobileHero: "/img/projects/oranzeriamobile.png", // Mobile hero section
    desktopHero: "/img/projects/oranzeria1.png", // Desktop hero section
    alt: "Oranzeria - Portfolio Project",
    url: "https://oraneria.vercel.app/",
    url2: "https://oraneria.vercel.app/", // Both mobile and desktop link to oraneria.vercel.app
    title: "Oranzeria",
    position: "front",
    delay: 0.4,
  },
  {
    mobileHero: "/img/projects/fryzjerkamobile.png", // Mobile hero section
    desktopHero: "/img/projects/fryzjerka1.png", // Desktop hero section
    alt: "Fryzjerka Małgosia - Portfolio Project",
    url: "https://www.fryzjerkamalgosia.pl/",
    url2: "https://www.fryzjerkamalgosia.pl/", // Both mobile and desktop link to fryzjerkamalgosia.pl
    title: "Fryzjerka Małgosia",
    position: "back",
    delay: 0.6,
  },
  {
    mobileHero: "/img/projects/figuramobile.png", // Mobile hero section
    desktopHero: "/img/projects/figura1.png", // Desktop hero section
    alt: "Studio Figura - Portfolio Project",
    url: "https://www.studiofigurastablowice.pl/",
    url2: "https://www.studiofigurastablowice.pl/", // Both mobile and desktop link to studiofigurastablowice.pl
    title: "Studio Figura",
    position: "middle",
    delay: 0.8,
  },
  {
    mobileHero: "/img/projects/autyzmmobile.png", // Mobile hero section
    desktopHero: "/img/projects/autyzm1.png", // Desktop hero section
    alt: "Autyzm od Kuchni - Portfolio Project",
    url: "https://www.autyzmodkuchni.pl/",
    url2: "https://www.autyzmodkuchni.pl/", // Both mobile and desktop link to autyzmodkuchni.pl
    title: "Autyzm od Kuchni",
    position: "front",
    delay: 1.0,
  },
  {
    mobileHero: "/img/projects/openmobile.png", // Mobile hero section
    desktopHero: "/img/projects/open1.png", // Desktop hero section
    alt: "OpenPol - Portfolio Project",
    url: "https://openpol.pl/",
    url2: "https://openpol.pl/", // Both mobile and desktop link to openpol.pl
    title: "OpenPol",
    position: "back",
    delay: 1.2,
  },
];

export function MockupGallery({ onModalStateChange }) {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
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

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

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
        "hidden md:flex md:col-span-1 items-center justify-center", // Hidden on mobile, visible on desktop
        "p-0 md:p-2 overflow-visible relative",
        "transition-all duration-700 ease-out",
        "max-w-full md:max-w-none"
      )}>
        
        {/* Mockup Gallery Container - Shows 2 cards side by side (mobile hero left, desktop hero right) */}
        <div className="relative w-full h-full min-h-[280px] md:min-h-[400px] flex items-center justify-center overflow-visible md:pl-8">
          {/* Current Project Pair */}
          <AnimatePresence mode="wait">
            {mockupProjects.map((project, index) => {
              if (index !== currentProjectIndex) return null;
              
              return (
                <motion.div
                  key={`project-${index}-${currentProjectIndex}`}
                  className="flex items-center justify-center gap-4 md:gap-32 w-full"
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
                  {/* Left Card - Mobile View (hidden on mobile) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`left-${index}-${currentProjectIndex}`}
                      initial={{ 
                        opacity: 0, 
                        x: 0, // Start from center, then move right
                        rotate: -15,
                        scale: 0.7,
                        filter: "blur(10px)"
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 100, // Move mobile container 100px to the right (more space from text)
                        y: -10, // Move mobile container 10px up to shorten bottom frame
                        rotate: -3,
                        scale: 1,
                        filter: "blur(0px)"
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: -150, // Exit to the left
                        rotate: -25, 
                        scale: 0.5,
                        y: -50,
                        filter: "blur(15px)"
                      }}
                      transition={{ 
                        delay: 0.2, 
                        duration: 0.8, 
                        ease: [0.34, 1.56, 0.64, 1],
                        opacity: { duration: 0.5 },
                        filter: { duration: 0.6 }
                      }}
                      className="hidden md:block"
                    >
                      <MockupCard
                        key={`${project.alt}-left-${index}`}
                        images={[project.mobileHero]} // Mobile hero section (left side)
                        alt={`${project.alt} - Mobile Hero`}
                        delay={0}
                        position="left"
                        project={{ ...project, url: project.url }} // Use url for mobile (same as desktop)
                        onHover={handleHover}
                        onLeave={handleLeave}
                        onClick={handleClick}
                        isLeft={true}
                        isDesktopView={false} // Mobile view on left
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Right Card - Desktop View */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`right-${index}-${currentProjectIndex}`}
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
                        rotate: 3,
                        scale: 1,
                        filter: "blur(0px)"
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: 250, 
                        rotate: 25, 
                        scale: 0.5,
                        y: 50,
                        filter: "blur(15px)"
                      }}
                      transition={{ 
                        delay: 0.3, 
                        duration: 0.8, 
                        ease: [0.34, 1.56, 0.64, 1],
                        opacity: { duration: 0.5 },
                        filter: { duration: 0.6 }
                      }}
                    >
                      <MockupCard
                        key={`${project.alt}-right-${index}`}
                        images={[project.desktopHero]} // Desktop hero section (right side)
                        alt={`${project.alt} - Desktop Hero`}
                        delay={0.1}
                        position="right"
                        project={{ 
                          ...project, 
                          url: project.url // Use same url for desktop (both mobile and desktop use same URL)
                        }}
                        onHover={handleHover}
                        onLeave={handleLeave}
                        onClick={handleClick}
                        isLeft={false}
                        isDesktopView={true} // Desktop view on right
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

