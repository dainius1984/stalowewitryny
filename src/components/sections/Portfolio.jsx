import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { portfolioProjects } from "@/data/portfolioProjects";

/**
 * Portfolio Tile Component
 * Optimized tile-based layout with hover interaction and scroll
 */
export function PortfolioTile({ project, index, isLastInRow, totalItems }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOverlayHidden, setIsMobileOverlayHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageContainerRef = useRef(null);
  const tileRef = useRef(null);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mouse leave - reset scroll and show overlay
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      // Reset scroll position to top
      if (imageContainerRef.current) {
        imageContainerRef.current.scrollTop = 0;
      }
    }
  };

  // Prevent page scroll when scrolling inside tile - Smooth scrolling version
  useEffect(() => {
    const shouldShowScroll = isMobile ? isMobileOverlayHidden : isHovered;
    if (!shouldShowScroll || !imageContainerRef.current || !tileRef.current) return;

    const container = imageContainerRef.current;
    const tile = tileRef.current;
    let rafId = null;
    let isScrolling = false;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const maxScroll = scrollHeight - clientHeight;
      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollTop >= maxScroll - 1;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Prevent page scroll if scrolling within tile bounds
      if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
        e.preventDefault();
        e.stopPropagation();
        
        // Use requestAnimationFrame for smooth scrolling
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        
        rafId = requestAnimationFrame(() => {
          const newScrollTop = Math.max(0, Math.min(maxScroll, scrollTop + e.deltaY));
          container.scrollTo({
            top: newScrollTop,
            behavior: 'auto' // Use 'auto' for instant but smooth via RAF
          });
          rafId = null;
        });
      }
    };

    tile.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      tile.removeEventListener('wheel', handleWheel, { capture: true });
      container.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [isHovered, isMobileOverlayHidden, isMobile]);

  // Calculate column span for orphan handling
  const getColSpan = () => {
    const remainder = totalItems % 3;
    const isLastItem = index === totalItems - 1;
    const isSecondLastItem = index === totalItems - 2;
    
    // If last item is alone (remainder === 1), make it span full width
    if (remainder === 1 && isLastItem) {
      return "lg:col-span-3";
    }
    // If last two items (remainder === 2), center them (keep normal span)
    return "";
  };

  return (
    <motion.div
      ref={tileRef}
      className={cn(
        "group relative h-[550px] overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 cursor-pointer block",
        getColSpan()
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => {
        if (!isMobile) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        if (isMobile) {
          // On mobile, toggle overlay on click
          e.preventDefault();
          setIsMobileOverlayHidden(!isMobileOverlayHidden);
          // If showing overlay, reset scroll
          if (isMobileOverlayHidden) {
            if (imageContainerRef.current) {
              imageContainerRef.current.scrollTop = 0;
            }
          }
        }
      }}
      title={`Zobacz ${project.title} - ${project.category}`}
    >
      {/* Layer 0: Full-height website screenshot */}
      <div
        ref={imageContainerRef}
        className={cn(
          "absolute inset-0 transition-all duration-500 scrollbar-hide",
          ((isMobile && isMobileOverlayHidden) || (!isMobile && isHovered)) 
            ? "overflow-y-auto overflow-x-hidden" 
            : "overflow-hidden"
        )}
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          willChange: ((isMobile && isMobileOverlayHidden) || (!isMobile && isHovered)) ? 'scroll-position' : 'auto',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      >
        <img
          src={project.image}
          alt={`${project.title} - ${project.category} - Tania strona www Wrocław, szybki kod React, projektowanie stron Dolny Śląsk`}
          className="w-full h-auto object-cover object-top"
          style={{
            minHeight: "100%",
            display: "block",
          }}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%2318181b' width='800' height='600'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(project.title) + "%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Layer 1: Overlay with content - visible by default, hides on hover/click */}
      <AnimatePresence>
        {((isMobile && !isMobileOverlayHidden) || (!isMobile && !isHovered)) && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black/70 flex flex-col justify-end p-6 md:p-8 z-10"
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
              className="text-2xl md:text-3xl font-bold text-white font-sans mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            {project.description && (
              <motion.p
                className="text-sm md:text-base text-neutral-300 font-sans leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.description}
              </motion.p>
            )}

            {/* CTA Hint */}
            <motion.div
              className="mt-6 flex items-center gap-2 text-primary/80 text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <span>Najedź, aby zobaczyć więcej</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover State: Click to visit indicator */}
      {((isMobile && isMobileOverlayHidden) || (!isMobile && isHovered)) && (
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
            e.stopPropagation(); // Prevent tile click from firing
          }}
        >
          <span>Odwiedź stronę</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.a>
      )}
    </motion.div>
  );
}

/**
 * Portfolio Section Component
 * Shows only 6 projects with "View More" button
 */
export function Portfolio({ limit = 6 }) {
  const sortedProjects = portfolioProjects.sort((a, b) => (a.order || 0) - (b.order || 0));
  const displayedProjects = sortedProjects.slice(0, limit);
  const hasMore = sortedProjects.length > limit;

  return (
    <section id="portfolio" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16 lg:mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm uppercase tracking-widest text-primary/80 font-sans mb-4 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Wybrane Realizacje
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white font-sans mb-6 bg-gradient-to-r from-white via-white to-primary/80 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Przykłady taniej i solidnej strony internetowej
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-300 mt-4 font-sans max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Zobacz realizacje <strong className="text-white">szybkich witryn dla biznesu</strong> – 
            każda to <strong className="text-primary">strona na własność</strong>, bez abonamentu.
          </motion.p>
        </motion.div>

        {/* Portfolio Grid: Show only 6 projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <PortfolioTile
              key={project.url}
              project={project}
              index={index}
              isLastInRow={false}
              totalItems={displayedProjects.length}
            />
          ))}
        </div>

        {/* View More Button */}
        {hasMore && (
          <motion.div
            className="mt-12 md:mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-sans font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105"
            >
              <span>Zobacz wszystkie realizacje</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
