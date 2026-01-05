import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { portfolioProjects } from "@/data/portfolioProjects";

/**
 * Portfolio Tile Component
 * Modern tile-based layout with hover interaction
 */
function PortfolioTile({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const imageContainerRef = useRef(null);

  return (
    <motion.div
      className="group relative h-[500px] overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: isHovered ? "n-resize" : "pointer",
      }}
    >
      {/* Bottom Layer: Full-height website screenshot */}
      <div
        ref={imageContainerRef}
        className={cn(
          "absolute inset-0 transition-all duration-500",
          isHovered ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"
        )}
      >
        <img
          src={project.image}
          alt={`${project.title} - ${project.category}`}
          className="w-full h-auto object-cover object-top"
          style={{
            minHeight: "100%",
            display: "block",
          }}
          loading="lazy"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%2318181b' width='800' height='600'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(project.title) + "%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Top Layer: Overlay with content */}
      <AnimatePresence>
        {!isHovered && (
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
      {isHovered && (
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-6 py-3 bg-black/90 backdrop-blur-md text-white font-sans font-medium rounded-full border border-primary/50 shadow-lg hover:bg-black hover:border-primary transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <span>Odwiedź stronę</span>
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      )}
    </motion.div>
  );
}

/**
 * Portfolio Section Component
 * Modern tile-based grid layout
 */
export function Portfolio() {
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
            className="text-lg text-neutral-400 mt-4 font-sans max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Zobacz realizacje <strong className="text-white">szybkich witryn dla biznesu</strong> – 
            każda to <strong className="text-primary">strona na własność</strong>, bez abonamentu.
          </motion.p>
        </motion.div>

        {/* Portfolio Grid: 3 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {portfolioProjects
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((project, index) => (
              <PortfolioTile
                key={project.url}
                project={project}
                index={index}
              />
            ))}
        </div>
      </Container>
    </section>
  );
}
