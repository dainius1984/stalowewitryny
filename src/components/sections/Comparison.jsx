import { Container } from "@/components/ui/Container";
import { BentoCard } from "@/components/ui/BentoCard";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisonData = {
  handcrafted: {
    title: "Ręcznie Kodowane Strony",
    features: [
      { text: "PageSpeed 100/100", value: true },
      { text: "Płatność jednorazowa", value: true },
      { text: "Wysokie bezpieczeństwo", value: true },
      { text: "Pełna własność kodu", value: true },
      { text: "Brak opłat miesięcznych", value: true },
      { text: "Szybka witryna dla biznesu", value: true },
    ],
  },
  platforms: {
    title: "WordPress / Wix / Inne Platformy",
    features: [
      { text: "PageSpeed ~40/100", value: false },
      { text: "Abonament miesięczny", value: false },
      { text: "Niskie bezpieczeństwo", value: false },
      { text: "Brak własności kodu", value: false },
      { text: "Ukryte koszty", value: false },
      { text: "Wolne ładowanie", value: false },
    ],
  },
};

export function Comparison() {
  return (
    <section id="porownanie" className="py-12 md:py-20 bg-black relative">
      <Container>
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sans mb-4">
            Tworzenie stron www bez abonamentu – Porównanie
          </h2>
          <p className="text-lg text-neutral-300 font-sans max-w-3xl mx-auto">
            Zobacz, dlaczego <strong className="text-white">tanie i szybkie strony internetowe Wrocław</strong> kodowane ręcznie 
            to lepsza inwestycja niż platformy z abonamentem.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Handcrafted Column */}
          <BentoCard className={cn(
            "relative overflow-hidden",
            "bg-neutral-900/50 backdrop-blur-md border-2 border-primary/30",
            "hover:border-primary/50 hover:bg-neutral-900/70",
            "transition-all duration-300"
          )}>
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-primary font-sans mb-2">
                  {comparisonData.handcrafted.title}
                </h3>
                <p className="text-neutral-300 font-sans">
                  Strona na własność, bez abonamentu
                </p>
              </div>
              
              <ul className="space-y-4">
                {comparisonData.handcrafted.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-neutral-300 font-sans">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BentoCard>

          {/* Platforms Column */}
          <BentoCard className={cn(
            "relative overflow-hidden",
            "bg-neutral-900/50 backdrop-blur-md border-2 border-white/10",
            "hover:border-white/20 hover:bg-neutral-900/70",
            "transition-all duration-300"
          )}>
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white font-sans mb-2">
                  {comparisonData.platforms.title}
                </h3>
                <p className="text-neutral-300 font-sans">
                  Platformy z ukrytymi kosztami
                </p>
              </div>
              
              <ul className="space-y-4">
                {comparisonData.platforms.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <X className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-neutral-300 font-sans line-through opacity-60">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BentoCard>
        </div>

        {/* CTA Below Comparison */}
        <div className="mt-12 text-center">
          <p className="text-lg text-neutral-300 font-sans mb-6">
            Wybierz <strong className="text-primary">solidną stronę internetową</strong> bez abonamentu. 
            <br className="hidden md:block" />
            <strong className="text-white">Responsywne strony www</strong> kodowane ręcznie – szybkie, bezpieczne, na własność.
          </p>
        </div>
      </Container>
    </section>
  );
}

