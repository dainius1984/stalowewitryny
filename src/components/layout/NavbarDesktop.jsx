import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function NavbarDesktop({ navLinks, onSurveyClick }) {
  return (
    <>
      {/* Center: Navigation Links */}
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

      {/* Right: CTA Button */}
      <div className="hidden md:flex items-center gap-4 flex-shrink-0">
        <Button
          variant="primary"
          className="px-5 py-2 text-sm whitespace-nowrap"
          title="Zamów darmową wycenę strony internetowej"
          onClick={onSurveyClick}
        >
          Wycena
        </Button>
      </div>
    </>
  );
}

