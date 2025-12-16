import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Portfolio", href: "#portfolio" },
    { label: "Proces", href: "#proces" },
    { label: "Cennik", href: "#cennik" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
      <nav
        className={cn(
          "rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-lg",
          "px-4 md:px-6 py-3 md:py-4"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center">
            <a href="#" className="text-xl md:text-2xl font-black tracking-tighter font-sans text-white">
              STALOWEWITRYNY
              <span className="text-primary">.</span>
            </a>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors font-sans"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* CTA Button (Desktop) */}
            <Button
              variant="primary"
              className="hidden md:inline-flex px-4 py-2 text-sm"
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
