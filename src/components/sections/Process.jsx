import { Container } from "@/components/ui/Container";
import { BentoCard } from "@/components/ui/BentoCard";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Analiza",
    description: "Poznaję Twój biznes i cele sprzedażowe. Bez strategii nie ma efektów.",
    image: "/img/Analysis.png",
    alt: "Analiza biznesowa - proces tworzenia taniej i solidnej strony internetowej dla firm",
  },
  {
    number: "02",
    title: "Projekt",
    description: "Tworzę unikalny design UX/UI. Twoja strona nie będzie wyglądać jak tysiące innych.",
    image: "/img/Design Project.png",
    alt: "Projektowanie UX/UI - proces tworzenia taniej i solidnej strony internetowej dla firm",
  },
  {
    number: "03",
    title: "Kodowanie",
    description: "Piszę czysty kod od zera. Żadnych ciężkich wtyczek, tylko czysta szybkość i bezpieczeństwo.",
    image: "/img/Coding.png",
    alt: "Kodowanie strony internetowej - proces tworzenia taniej i solidnej strony internetowej dla firm",
  },
  {
    number: "04",
    title: "Wsparcie",
    description: "Opiekuję się Twoją stroną po wdrożeniu. Jestem Twoim partnerem technologicznym.",
    image: "/img/Security.png",
    alt: "Wsparcie techniczne - proces tworzenia taniej i solidnej strony internetowej dla firm",
  },
];

export function Process() {
  return (
    <section id="proces" className="py-12 md:py-20 bg-black relative">
      <Container>
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sans">
            Dlaczego ręcznie kodowana witryna to zysk dla Twojej firmy?
          </h2>
          <p className="text-lg text-neutral-400 mt-4 font-sans max-w-3xl mx-auto">
            Każda <strong className="text-white">szybka witryna dla biznesu</strong> powstaje w 4 krokach. 
            Tworzę <strong className="text-white">strony na własność</strong> – bez ukrytych kosztów, bez abonamentu.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <BentoCard
              key={step.number}
              className={cn(
                "relative overflow-hidden",
                "bg-neutral-900/50 backdrop-blur-md",
                "hover:border-[#CCFF00]/50 hover:bg-neutral-900/70",
                "transition-all duration-300"
              )}
            >
              {/* Background Number */}
              <div className="absolute top-4 right-4 text-[120px] md:text-[100px] font-black text-white/5 leading-none font-sans select-none">
                {step.number}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center p-6 md:p-8">
                {/* Image */}
                <div className="mb-6 w-full h-48 md:h-56 flex items-center justify-center bg-neutral-950/30 rounded-xl p-4">
                  <img
                    src={step.image}
                    alt={step.alt || `${step.title} - proces tworzenia taniej i solidnej strony internetowej dla firm`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%2318181b' width='400' height='300'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(step.title) + "%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white font-sans mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-neutral-400 font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>
            </BentoCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

