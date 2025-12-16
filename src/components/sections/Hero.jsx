import { Container } from "@/components/ui/Container";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <Container className="py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Left Card - Span 2 columns */}
        <BentoCard className={cn(
          "md:col-span-2 flex flex-col justify-center",
          "p-8 md:p-10"
        )}>
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] font-sans text-white">
              Tworzę strony, które{" "}
              <span className="text-primary">sprzedają</span>
            </h1>
            <p className="text-lg text-neutral-400 mt-4 font-sans">
              Kodowane od zera. Szybkie. Bezpieczne.
            </p>
            <div className="pt-2">
              <Button variant="primary">
                Darmowa Wycena
              </Button>
            </div>
          </div>
        </BentoCard>

        {/* Right Card - Span 1 column */}
        <BentoCard className={cn(
          "md:col-span-1 flex items-center justify-center",
          "p-8 md:p-10"
        )}>
          <div className="w-full aspect-square relative overflow-hidden rounded-[2rem]">
            {/* Placeholder for photo/memoji */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40 flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.2)]">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 text-primary/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Bottom Card - Span 3 columns */}
        <BentoCard className={cn(
          "md:col-span-3",
          "p-8 md:p-10"
        )}>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
              <Badge variant="accent">Dostępny od zaraz</Badge>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary)/0.6)]"></div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider font-sans">Online</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-neutral-400 font-sans">
              <span>Status</span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary)/0.6)]"></div>
            </div>
          </div>
        </BentoCard>
      </div>
    </Container>
  );
}
