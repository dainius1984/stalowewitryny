import { useState, useEffect, useRef } from "react";
import ReactParallaxTilt from "react-parallax-tilt";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BentoCard } from "@/components/ui/BentoCard";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "White Effect",
    category: "Medycyna Estetyczna",
    url: "https://www.whiteeffect.pl/",
    image: "/img/projects/white1.png",
    colSpan: "md:col-span-2",
  },
  {
    title: "Autyzm od Kuchni",
    category: "Blog / Edukacja",
    url: "https://www.autyzmodkuchni.pl/",
    image: "/img/projects/autyzm1.png",
    colSpan: "md:col-span-1",
  },
  {
    title: "Fryzjerka Małgosia",
    category: "Usługi Lokalne",
    url: "https://www.fryzjerkamalgosia.pl/",
    image: "/img/projects/fryzjer1.png",
    colSpan: "md:col-span-1",
  },
  {
    title: "OpenPol",
    category: "Biznes / Przemysł",
    url: "http://openpol.pl",
    image: "/projects/openpol.jpg",
    colSpan: "md:col-span-1",
  },
  {
    title: "Oranzeria",
    category: "Gastro / Koncept",
    url: "https://oraneria.vercel.app",
    image: "/img/projects/oranzeria1.png",
    colSpan: "md:col-span-1",
  }
];

// Portfolio Card Component with Auto-Scroll Effect
function PortfolioCard({ project, colSpan }) {
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

  return (
    <ReactParallaxTilt
      className={cn("group", colSpan)}
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.02}
      perspective={2000}
      transitionSpeed={1500}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        title={`Zobacz przykład szybkiej strony internetowej - ${project.title}`}
      >
        <BentoCard className={cn(
          "h-full flex flex-col overflow-hidden p-0",
          "hover:border-primary/30 hover:backdrop-blur-md hover:bg-neutral-900/80 transition-all duration-300"
        )}>
          {/* Image Container with Auto-Scroll */}
          <div 
            ref={imageContainerRef}
            className="relative h-64 md:h-72 overflow-hidden rounded-t-[2rem] scrollbar-hide"
            style={{
              scrollBehavior: 'smooth',
            }}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/80 via-neutral-900/60 to-neutral-950/80 z-0"></div>
            
            {/* Decorative accent gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-40 z-0"></div>
            
            {/* Scrollable Image Container */}
            <div className="absolute inset-0 w-full h-full overflow-y-auto scrollbar-hide">
              <img
                src={project.image}
                alt={`Szybka strona internetowa ${project.category.toLowerCase()} - ${project.title} - przykład realizacji Stalowe Witryny`}
                className="relative z-10 w-full h-auto min-h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{
                  objectPosition: 'top center',
                }}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%2318181b' width='800' height='600'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(project.title) + "%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/20 rounded-full font-sans shadow-lg">
                {project.category}
              </span>
            </div>

            {/* Scroll Progress Indicator */}
            {isHovered && scrollProgress > 0 && (
              <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                <div className="w-1 h-16 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="w-full bg-primary rounded-full transition-all duration-100"
                    style={{ height: `${scrollProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 pointer-events-none">
              <div className="flex items-center gap-2 text-white font-sans font-semibold text-lg">
                <span>Odwiedź stronę</span>
                <ExternalLink className="w-5 h-5" />
              </div>
            </div>
            
            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300 pointer-events-none z-40 rounded-t-[2rem]"></div>
          </div>

          {/* Content Below Image */}
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold text-white font-sans mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-400 font-sans">
              {project.category}
            </p>
          </div>
        </BentoCard>
      </a>
    </ReactParallaxTilt>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-12 md:py-20 relative">
      <Container>
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-muted font-sans mb-4">
            Wybrane Realizacje
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sans">
            Przykłady taniej i solidnej strony internetowej
          </h2>
          <p className="text-base text-neutral-400 mt-4 font-sans max-w-2xl mx-auto">
            Zobacz realizacje <strong className="text-white">szybkich witryn dla biznesu</strong> – 
            każda to <strong className="text-white">strona na własność</strong>, bez abonamentu.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.url}
              project={project}
              colSpan={project.colSpan}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

