import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MockupCard } from "@/components/ui/MockupCard";
import { PortfolioPreviewOverlay } from "@/components/ui/PortfolioPreviewOverlay";
import { BentoCard } from "@/components/ui/BentoCard";
import { cn } from "@/lib/utils";

// Project data with URLs for webview
const mockupProjects = [
  {
    images: ["/img/projects/white1.png", "/img/projects/white2.png"],
    alt: "White Effect - Portfolio Project",
    url: "https://www.whiteeffect.pl/",
    title: "White Effect",
    position: "back",
    delay: 0,
  },
  {
    images: ["/img/projects/autyzm1.png", "/img/projects/autyzm2.png"],
    alt: "Autyzm od Kuchni - Portfolio Project",
    url: "https://www.autyzmodkuchni.pl/",
    title: "Autyzm od Kuchni",
    position: "middle",
    delay: 0.2,
  },
  {
    images: ["/img/projects/fryzjer1.png", "/img/projects/fryzjer2.png"],
    alt: "Fryzjerka Małgosia - Portfolio Project",
    url: "https://www.fryzjerkamalgosia.pl/",
    title: "Fryzjerka Małgosia",
    position: "front",
    delay: 0.4,
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
      <BentoCard className={cn(
        "md:col-span-1 flex items-center justify-center",
        "p-6 md:p-8 overflow-visible relative",
        "transition-all duration-700 ease-out",
        "bg-gradient-to-br from-neutral-900/80 to-neutral-950/80"
      )}>
        {/* Background gradient with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.1),transparent_70%)]" />
        
        {/* Mockup Gallery Container - Shows 2 cards side by side (image 1 left, image 2 right) */}
        <div className="relative w-full h-full min-h-[400px] md:min-h-[650px] flex items-center justify-center overflow-visible">
          {/* Current Project Pair */}
          <AnimatePresence mode="wait">
            {mockupProjects.map((project, index) => {
              if (index !== currentProjectIndex) return null;
              
              return (
                <motion.div
                  key={`project-${index}-${currentProjectIndex}`}
                  className="flex items-center justify-center gap-4 md:gap-8 w-full"
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Left Card - Image 1 (hidden on mobile) */}
                  <MockupCard
                    key={`${project.alt}-left-${index}`}
                    images={[project.images[0]]} // Only first image
                    alt={`${project.alt} - Widok 1`}
                    delay={0}
                    position="left"
                    project={project}
                    onHover={handleHover}
                    onLeave={handleLeave}
                    onClick={handleClick}
                    isLeft={true}
                    className="hidden md:block"
                  />
                  
                  {/* Mobile/Right Card - Shows Image 1 on mobile, Image 2 on desktop */}
                  <MockupCard
                    key={`${project.alt}-right-${index}`}
                    images={isDesktop ? [project.images[1]] : [project.images[0]]} // Second image on desktop, first on mobile
                    alt={`${project.alt} - Widok ${isDesktop ? '2' : '1'}`}
                    delay={0.1}
                    position="right"
                    project={project}
                    onHover={handleHover}
                    onLeave={handleLeave}
                    onClick={handleClick}
                    isLeft={false}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Project Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {mockupProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (rotationIntervalRef.current) {
                    clearInterval(rotationIntervalRef.current);
                  }
                  setCurrentProjectIndex(index);
                  // Restart rotation
                  rotationIntervalRef.current = setInterval(() => {
                    setCurrentProjectIndex((prev) => (prev + 1) % mockupProjects.length);
                  }, 5000);
                }}
                className={cn(
                  "rounded-full transition-all duration-300",
                  index === currentProjectIndex
                    ? "bg-[#CCFF00] w-8 h-2 shadow-[0_0_10px_rgba(204,255,0,0.8)]"
                    : "bg-white/40 hover:bg-white/60 w-2 h-2"
                )}
                aria-label={`Pokaż projekt ${index + 1}`}
                title={mockupProjects[index].title}
              />
            ))}
          </div>
        </div>
      </BentoCard>

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

