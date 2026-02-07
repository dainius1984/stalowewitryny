import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { portfolioProjects } from "@/data/portfolioProjects";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BASE_URL } from "@/lib/constants";

/**
 * Portfolio List Item Component
 * Alternating layout with image and content side-by-side
 * Image is scrollable, content is always visible
 * On mobile: image is clipped by default, click to toggle scroll
 */
function PortfolioListItem({ project, index }) {
  const [isMobileOverlayHidden, setIsMobileOverlayHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageContainerRef = useRef(null);
  const itemRef = useRef(null);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent page scroll when scrolling inside image container - Smooth scrolling version
  useEffect(() => {
    const shouldShowScroll = isMobile ? isMobileOverlayHidden : true;
    if (!shouldShowScroll || !imageContainerRef.current || !itemRef.current) return;

    const container = imageContainerRef.current;
    const item = itemRef.current;
    let rafId = null;

    let cachedScrollHeight = 0;
    let cachedClientHeight = 0;
    let lastScrollTop = 0;
    
    const updateCachedDimensions = () => {
      if (container) {
        cachedScrollHeight = container.scrollHeight;
        cachedClientHeight = container.clientHeight;
        lastScrollTop = container.scrollTop;
      }
    };
    
    let initRaf2;
    const initRaf1 = requestAnimationFrame(() => {
      initRaf2 = requestAnimationFrame(updateCachedDimensions);
    });
    
    const handleWheel = (e) => {
      const deltaY = e.deltaY;
      const maxScroll = Math.max(0, cachedScrollHeight - cachedClientHeight);
      const isScrollingDown = deltaY > 0;
      const isScrollingUp = deltaY < 0;
      const isAtTop = lastScrollTop <= 1;
      const isAtBottom = lastScrollTop >= maxScroll - 1;

      if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
        e.preventDefault();
        e.stopPropagation();
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const currentScrollTop = container.scrollTop;
          const newScrollTop = Math.max(0, Math.min(maxScroll, currentScrollTop + deltaY));
          container.scrollTop = newScrollTop;
          lastScrollTop = newScrollTop;
          rafId = null;
        });
      }
    };

    item.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    
    const ro = new ResizeObserver(updateCachedDimensions);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(initRaf1);
      if (initRaf2) cancelAnimationFrame(initRaf2);
      if (rafId) cancelAnimationFrame(rafId);
      item.removeEventListener('wheel', handleWheel, { capture: true });
      container.removeEventListener('wheel', handleWheel, { capture: true });
      ro.disconnect();
    };
  }, [isMobileOverlayHidden, isMobile]);

  // Handle mobile click to toggle overlay
  const handleImageClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      setIsMobileOverlayHidden(!isMobileOverlayHidden);
      // If showing overlay again, reset scroll
      if (isMobileOverlayHidden) {
        if (imageContainerRef.current) {
          imageContainerRef.current.scrollTop = 0;
        }
      }
    }
  };

  return (
    <motion.article
      ref={itemRef}
      className={cn(
        "flex flex-col md:flex-row gap-4 md:gap-6",
        "bg-neutral-900/30 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/5",
        "overflow-hidden",
        "w-full",
        "md:[&:nth-child(even)]:flex-row-reverse" // Reverse order for even items
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* Column A: Scrollable Image */}
      <div 
        ref={imageContainerRef}
        onClick={handleImageClick}
        className={cn(
          "flex-1 h-[280px] md:h-[450px] scrollbar-hide bg-neutral-950 w-full min-w-0 relative",
          "transition-all duration-500",
          // On mobile: only scrollable when overlay is hidden (after click)
          // On desktop: always scrollable
          (isMobile && isMobileOverlayHidden) || (!isMobile)
            ? "overflow-y-auto overflow-x-hidden"
            : "overflow-hidden"
        )}
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          cursor: isMobile ? 'pointer' : 'default',
          willChange: (isMobile && isMobileOverlayHidden) || !isMobile ? 'scroll-position' : 'auto',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      >
        <img
          src={project.image}
          srcSet={`${project.image.replace('.webp', '-small.webp')} 400w, ${project.image.replace('.webp', '-medium.webp')} 800w, ${project.image} 1200w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px"
          alt={`${project.title} - ${project.category} - Tania strona www Wrocław, szybki kod React, projektowanie stron Dolny Śląsk`}
          className="w-full object-cover object-top"
          style={{
            // On mobile when overlay is visible: clip image to container height
            // When scrollable: show full image height for scrolling
            height: (isMobile && !isMobileOverlayHidden) ? "100%" : "auto",
            minHeight: "100%",
            display: "block",
            objectFit: "cover",
            objectPosition: "top center",
            aspectRatio: "auto",
          }}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%2318181b' width='800' height='600'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(project.title) + "%3C/text%3E%3C/svg%3E";
          }}
        />
        
        {/* Mobile Overlay with Project Details - Only show on mobile when overlay is visible */}
        {isMobile && !isMobileOverlayHidden && (
          <AnimatePresence>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black/70 flex flex-col justify-end p-6 z-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Category Badge */}
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary border border-primary/40 rounded-full font-sans">
                  {project.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-2xl font-bold text-white font-sans mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {project.title}
              </motion.h3>

              {/* Description */}
              {project.description && (
                <motion.p
                  className="text-sm text-neutral-300 font-sans leading-relaxed mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.description}
                </motion.p>
              )}

              {/* CTA Hint */}
              <motion.div
                className="mt-2 flex items-center gap-2 text-primary/80 text-sm font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <span>Kliknij, aby zobaczyć więcej</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Mobile: Visit Button - Show when scrolling (overlay hidden) */}
        {isMobile && isMobileOverlayHidden && (
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-2 bg-black/90 backdrop-blur-md text-white font-sans text-sm font-medium rounded-full border border-primary/50 shadow-lg hover:bg-black/95 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent image click from firing
            }}
          >
            <span>Odwiedź stronę</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>
        )}
      </div>

      {/* Column B: Content - Only visible on desktop */}
      <div className="hidden md:flex flex-1 flex-col justify-center p-4 md:p-6 lg:p-8 w-full min-w-0">
        {/* Category Badge */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.1 }}
        >
          <span className="inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary border border-primary/40 rounded-full font-sans">
            {project.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-sans mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.15 }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        {project.description && (
          <motion.p
            className="text-base md:text-lg text-neutral-300 font-sans leading-relaxed mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {project.description}
          </motion.p>
        )}

        {/* CTA Button */}
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-sans font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 w-fit"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.25 }}
        >
          <span>Odwiedź stronę</span>
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </motion.article>
  );
}

/**
 * Full Portfolio Page
 * Displays all portfolio projects in alternating list layout
 */
export function PortfolioPage() {
  const sortedProjects = portfolioProjects.sort((a, b) => (a.order || 0) - (b.order || 0));

  useEffect(() => {
    document.title = "Portfolio | Stalowe Witryny";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${BASE_URL}/portfolio`);
  }, []);

  return (
    <>
      {/* Efekt ziarna na tle */}
      <div className="bg-grain" />
      
      <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col overflow-x-hidden w-full">
        <Navbar isModalOpen={false} />
        
        <main className="pt-24 md:pt-28 flex-grow relative w-full overflow-x-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>

          <Container className="relative z-10 py-12 md:py-16">
            {/* Page Header */}
            <motion.div
              className="mb-12 md:mb-16 lg:mb-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="text-sm uppercase tracking-widest text-primary/80 font-sans mb-4 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Portfolio
              </motion.p>
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-sans mb-6 bg-gradient-to-r from-white via-white to-primary/80 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Wszystkie Realizacje
              </motion.h1>
              <motion.p
                className="text-lg text-neutral-300 mt-4 font-sans max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Pełna kolekcja <strong className="text-white">szybkich witryn dla biznesu</strong> – 
                każda to <strong className="text-primary">strona na własność</strong>, bez abonamentu.
              </motion.p>
            </motion.div>

            {/* Portfolio List: Single column with alternating layout */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 w-full">
              {sortedProjects.map((project, index) => (
                <PortfolioListItem
                  key={project.url}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </Container>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
