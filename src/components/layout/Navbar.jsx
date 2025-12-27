import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Portfolio", href: "#portfolio", title: "Zobacz przykłady taniej i solidnej strony internetowej" },
    { label: "Proces", href: "#proces", title: "Jak powstaje ręcznie kodowana strona internetowa" },
    { label: "Porównanie", href: "#porownanie", title: "Ręcznie kodowane vs platformy - porównanie" },
    { label: "Kontakt", href: "#kontakt", title: "Skontaktuj się - darmowa wycena strony internetowej" },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <nav
        className={cn(
          "rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-lg",
          "px-4 md:px-8 py-3 md:py-4"
        )}
      >
        <div className="flex items-center justify-between gap-2 md:gap-6">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <a href="#" className="text-lg md:text-xl font-black tracking-tighter font-sans text-white" title="Stalowe Witryny - Tanie i solidne strony internetowe">
              STALOWEWITRYNY
              <span className="text-primary">.</span>
            </a>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center mx-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors font-sans whitespace-nowrap"
                title={link.title || `Przejdź do sekcji ${link.label}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: CTA Button & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* CTA Button (Desktop) */}
            <Button
              variant="primary"
              className="hidden md:inline-flex px-5 py-2 text-sm whitespace-nowrap"
            >
              Wycena
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-neutral-400 hover:text-white transition-colors py-2 font-sans"
                  title={link.title || `Przejdź do sekcji ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="primary"
                className="w-full mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wycena
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
