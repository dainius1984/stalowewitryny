import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactParallaxTilt from "react-parallax-tilt";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BentoCard } from "@/components/ui/BentoCard";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "White Effect",
    category: "Usługi Sprzątające",
    description: "Profesjonalne sprzątanie biur i mieszkań",
    url: "https://www.whiteeffect.pl/",
    image: "/img/projects/whiteportfolio.png",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    size: "large",
  },
  {
    title: "Autyzm od Kuchni",
    category: "Dieta, Zdrowie",
    description: "Blog o zdrowym odżywianiu i diecie",
    url: "https://www.autyzmodkuchni.pl/",
    image: "/img/projects/autyzmportfolio.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    size: "medium",
  },
  {
    title: "Studio Figura",
    category: "Fitness, Wellness",
    description: "Studio fitness i wellness - treningi personalne",
    url: "https://www.studiofigurastablowice.pl/",
    image: "/img/projects/figuraportfolio.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    size: "medium",
  },
  {
    title: "Zielone Mile",
    category: "Usługi Lokalne (Ogrody, Tarasy)",
    description: "Projektowanie i wykonawstwo ogrodów i tarasów",
    url: "https://zielonemile.pl/",
    image: "/img/projects/zieloneportfolio.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    size: "medium",
  },
  {
    title: "Fryzjerka Małgosia",
    category: "Usługi Lokalne, Fryzjer",
    description: "Salon fryzjerski - profesjonalne usługi",
    url: "https://www.fryzjerkamalgosia.pl/",
    image: "/img/projects/fryzjerkaportfolio.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    size: "small",
  },
  {
    title: "Oranzeria",
    category: "Usługi Kosmetyczne, Kosmetologia",
    description: "Salon kosmetyczny - zabiegi pielęgnacyjne",
    url: "https://oraneria.vercel.app/",
    image: "/img/projects/oranzeriaportfolio.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    size: "small",
  },
  {
    title: "OpenPol",
    category: "Usługi Konsultacje AI",
    description: "Konsultacje i rozwiązania z zakresu sztucznej inteligencji",
    url: "https://openpol.pl/",
    image: "/img/projects/openpolportfolio.png",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    size: "wide",
  }
];

// Portfolio Card Component with Auto-Scroll Effect
function PortfolioCard({ project, colSpan, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  // Auto-scroll effect on hover - scrolls down to show more content
  useEffect(() => {
    if (isHovered && imageContainerRef.current) {
      const container = imageContainerRef.current;
      const img = container.querySelector('img');
      
      if (img) {
        const containerHeight = container.clientHeight;
        const imgHeight = img.naturalHeight || img.offsetHeight;
        const maxScroll = Math.max(0, imgHeight - containerHeight);
        
        if (maxScroll > 0) {
          scrollIntervalRef.current = setInterval(() => {
            setScrollProgress((prev) => {
              const newProgress = Math.min(prev + 0.6, 100);
              if (container) {
                container.scrollTop = (newProgress / 100) * maxScroll;
              }
              return newProgress;
            });
          }, 40);
        }
      }
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
      setScrollProgress(0);
      if (imageContainerRef.current) {
        imageContainerRef.current.scrollTop = 0;
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isHovered]);

  // Determine card height and styling based on size
  const isLarge = project.size === "large";
  const isWide = project.size === "wide";
  const isMedium = project.size === "medium";
  const isSmall = project.size === "small";
  const isTall = project.rowSpan === "md:row-span-2";
  
  const cardHeight = isTall 
    ? "md:h-[650px]" 
    : isLarge 
    ? "md:h-[550px]" 
    : isWide
    ? "md:h-[480px]"
    : isMedium
    ? "md:h-[500px]"
    : "md:h-[460px]";

  return (
    <motion.div
      className={cn("group", colSpan, project.rowSpan)}
      initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.34, 1.56, 0.64, 1],
        scale: {
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1]
        }
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      <ReactParallaxTilt
        glareEnable={true}
        glareMaxOpacity={isHovered ? 0.3 : 0.15}
        scale={isHovered ? (isLarge ? 1.02 : 1.04) : 1.0}
        perspective={2000}
        transitionSpeed={1500}
        tiltMaxAngleX={isHovered ? 10 : 5}
        tiltMaxAngleY={isHovered ? 10 : 5}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
          title={`Zobacz przykład szybkiej strony internetowej - ${project.title}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <BentoCard className={cn(
            "h-full flex flex-col overflow-hidden p-0 relative",
            "hover:border-primary/50 hover:backdrop-blur-xl hover:bg-neutral-900/95",
            "transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20",
            "group/card",
            isLarge && "hover:scale-[1.02]",
            isWide && "hover:scale-[1.01]",
            cardHeight
          )}>
            {/* Animated background gradient with multiple layers */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 z-0"
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tl from-primary/3 via-transparent to-transparent z-0"
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            
            {/* Animated glow effect on hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-primary/5 blur-3xl z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}

            {/* Image Container with Auto-Scroll - expands on hover */}
            <motion.div 
              ref={imageContainerRef}
              className={cn(
                "relative overflow-hidden scrollbar-hide transition-all duration-500",
                isHovered 
                  ? "flex-1" 
                  : isTall 
                    ? "h-[65%]" 
                    : isLarge 
                      ? "h-[60%]" 
                      : isWide
                        ? "h-[55%]"
                        : isMedium
                          ? "h-[55%]"
                          : "h-[50%]"
              )}
              style={{
                scrollBehavior: 'smooth',
              }}
            >
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10 pointer-events-none"></div>
              
              {/* Scrollable Image Container */}
              <div className="absolute inset-0 w-full h-full overflow-y-auto scrollbar-hide">
                <motion.img
                  src={project.image}
                  alt={`Szybka strona internetowa ${project.category.toLowerCase()} - ${project.title} - przykład realizacji Stalowe Witryny`}
                  className="relative z-0 w-full h-auto min-h-full object-cover"
                  style={{
                    objectPosition: 'top center',
                  }}
                  loading="lazy"
                  animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%2318181b' width='800' height='600'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(project.title) + "%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              
              {/* Category Badge with enhanced animation */}
              <motion.div
                className="absolute top-4 left-4 z-20 pointer-events-none"
                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                animate={isHovered ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
              >
                <motion.span 
                  className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-black/90 backdrop-blur-md text-primary border border-primary/40 rounded-full font-sans shadow-lg shadow-primary/20"
                  animate={isHovered ? { 
                    backgroundColor: "rgba(0, 0, 0, 0.95)",
                    borderColor: "rgba(204, 255, 0, 0.6)",
                    boxShadow: "0 0 20px rgba(204, 255, 0, 0.3)"
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {project.category}
                </motion.span>
              </motion.div>

              {/* Scroll Progress Indicator */}
              {isHovered && scrollProgress > 0 && (
                <motion.div
                  className="absolute bottom-4 right-4 z-20 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-1.5 h-20 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                    <motion.div
                      className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-full"
                      initial={{ height: 0 }}
                      animate={{ height: `${scrollProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Hover Overlay with enhanced animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 z-30 pointer-events-none flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex items-center gap-3 text-white font-sans font-semibold text-lg px-8 py-4 bg-black/70 backdrop-blur-xl rounded-full border-2 border-primary/50 shadow-2xl shadow-primary/30"
                  initial={{ y: 20, opacity: 0, scale: 0.9 }}
                  animate={{ 
                    y: isHovered ? 0 : 20, 
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.9
                  }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <span>Odwiedź stronę</span>
                  <motion.div
                    animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatDelay: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 border-2 border-primary/0 rounded-t-[2rem] pointer-events-none z-40"
                animate={{ borderColor: isHovered ? "rgba(204,255,0,0.4)" : "rgba(204,255,0,0)" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Content Below Image - hides on hover */}
            <AnimatePresence mode="wait">
              {!isHovered && (
                <motion.div
                  key="content"
                  className="relative p-6 md:p-8 flex flex-col bg-gradient-to-b from-neutral-900/50 to-neutral-950/50 z-10 overflow-hidden"
                  initial={{ opacity: 1, height: "auto", maxHeight: 300 }}
                  animate={{ opacity: 1, height: "auto", maxHeight: 300 }}
                  exit={{ 
                    opacity: 0, 
                    height: 0, 
                    maxHeight: 0,
                    paddingTop: 0, 
                    paddingBottom: 0,
                    marginTop: 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-white font-sans mb-3 group-hover:text-primary transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-sm font-semibold text-primary/90 font-sans mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {project.category}
                  </motion.p>
                  
                  {project.description && (
                    <motion.p
                      className="text-sm text-neutral-400 font-sans leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      {project.description}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
          </BentoCard>
        </a>
      </ReactParallaxTilt>
    </motion.div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        {/* Section Header with animation */}
        <motion.div
          className="mb-16 md:mb-20 text-center"
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

        {/* Portfolio Grid with improved dynamic layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.url}
              project={project}
              colSpan={project.colSpan}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

