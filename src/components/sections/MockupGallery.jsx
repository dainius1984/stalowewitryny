import { MockupCard } from "@/components/ui/MockupCard";
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
  return (
    <BentoCard className={cn(
      "md:col-span-1 flex items-center justify-center",
      "p-4 md:p-6 overflow-visible relative"
    )}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950" />
      
      {/* Mockup Gallery Container */}
      <div className="relative w-full h-full min-h-[300px] md:min-h-[500px] flex items-center justify-center">
        {mockupProjects.map((project, index) => (
          <MockupCard
            key={index}
            images={project.images}
            alt={project.alt}
            delay={project.delay}
            position={project.position}
          />
        ))}
      </div>
    </BentoCard>
  );
}

