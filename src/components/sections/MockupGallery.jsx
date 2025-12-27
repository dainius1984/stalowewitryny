import { useState, useEffect, useRef } from "react";
import { MockupCard } from "@/components/ui/MockupCard";
import { PortfolioPreviewOverlay } from "@/components/ui/PortfolioPreviewOverlay";
import { BentoCard } from "@/components/ui/BentoCard";
import { cn } from "@/lib/utils";

// Project data with multiple images per project
const mockupProjects = [
  {
    images: ["/img/projects/white1.png", "/img/projects/white2.png"],
    alt: "White Effect - Portfolio Project",
    position: "back",
    delay: 0,
  },
  {
    images: ["/img/projects/autyzm1.png", "/img/projects/autyzm2.png"],
    alt: "Autyzm od Kuchni - Portfolio Project",
    position: "middle",
    delay: 0.2,
  },
  {
    images: ["/img/projects/fryzjer1.png", "/img/projects/fryzjer2.png"],
    alt: "Fryzjerka Małgosia - Portfolio Project",
    position: "front",
    delay: 0.4,
  },
];

export function MockupGallery() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const currentProjectRef = useRef(null);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleHover = (project) => {
    // Clear any pending leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    
    // Clear any existing hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Store current project in ref
    currentProjectRef.current = project;
    setHoveredProject(project);
    
    // Open preview after a short delay for smooth UX
    const isDesktopNow = window.innerWidth >= 768;
    if (isDesktopNow) {
      hoverTimeoutRef.current = setTimeout(() => {
        // Check if we're still hovering the same project
        if (currentProjectRef.current === project) {
          setPreviewOpen(true);
        }
        hoverTimeoutRef.current = null;
      }, 1000);
    } else {
      // On mobile, open immediately
      setPreviewOpen(true);
    }
  };

  const handleLeave = () => {
    // Clear hover timeout if still pending
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    // Clear current project ref
    currentProjectRef.current = null;
    setPreviewOpen(false);
    
    // Keep project data for smooth exit animation
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredProject(null);
      leaveTimeoutRef.current = null;
    }, 400);
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
        
        {/* Mockup Gallery Container */}
        <div className="relative w-full h-full min-h-[400px] md:min-h-[650px] flex items-center justify-center overflow-visible">
          {mockupProjects.map((project, index) => (
            <MockupCard
              key={`${project.alt}-${index}`}
              images={project.images}
              alt={project.alt}
              delay={project.delay}
              position={project.position}
              onHover={handleHover}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </BentoCard>

      {/* Portfolio Preview Overlay - Always render for AnimatePresence */}
      <PortfolioPreviewOverlay
        isOpen={previewOpen && hoveredProject !== null}
        onClose={() => {
          setPreviewOpen(false);
          if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
          }
          leaveTimeoutRef.current = setTimeout(() => {
            setHoveredProject(null);
            leaveTimeoutRef.current = null;
          }, 400);
        }}
        images={hoveredProject?.images || []}
        alt={hoveredProject?.alt || ""}
        currentIndex={hoveredProject?.currentIndex || 0}
      />
    </>
  );
}

