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
    image: "/projects/whiteeffect.jpg",
    colSpan: "md:col-span-2",
  },
  {
    title: "Autyzm od Kuchni",
    category: "Blog / Edukacja",
    url: "https://www.autyzmodkuchni.pl/",
    image: "/projects/autyzm.jpg",
    colSpan: "md:col-span-1",
  },
  {
    title: "Fryzjerka Małgosia",
    category: "Usługi Lokalne",
    url: "https://www.fryzjerkamalgosia.pl/",
    image: "/projects/fryzjer.jpg",
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
    title: "Oraneria",
    category: "Gastro / Koncept",
    url: "https://oraneria.vercel.app",
    image: "/projects/oraneria.jpg",
    colSpan: "md:col-span-1",
  }
];

export function Portfolio() {
  return (
    <section className="py-12 md:py-20 relative">
      <Container>
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-muted font-sans mb-4">
            Wybrane Realizacje
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sans">
            Zobacz, co potrafię zbudować
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ReactParallaxTilt
              key={project.url}
              className={cn("group", project.colSpan)}
              glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.02}
              perspective={2000}
              transitionSpeed={1500}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <BentoCard className={cn(
                  "h-full flex flex-col overflow-hidden p-0",
                  "hover:border-primary/30 transition-all duration-300"
                )}>
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to a placeholder if image doesn't exist
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%2318181b' width='800' height='600'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(project.title) + "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white font-sans font-medium">
                        <span>Odwiedź stronę</span>
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-full font-sans">
                        {project.category}
                      </span>
                    </div>
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
          ))}
        </div>
      </Container>
    </section>
  );
}

