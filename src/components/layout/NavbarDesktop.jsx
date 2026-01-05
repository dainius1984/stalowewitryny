import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function NavbarDesktop({ navLinks, onSurveyClick }) {
  return (
    <>
      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-6 flex-1 justify-center mx-4">
        {navLinks.map((link) => {
          const LinkComponent = link.href.startsWith('#') ? 'a' : Link;
          const linkProps = link.href.startsWith('#') 
            ? { href: link.href }
            : { to: link.href };
          
          return (
            <LinkComponent
              key={link.href}
              {...linkProps}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors font-sans whitespace-nowrap"
              title={link.title || `Przejdź do sekcji ${link.label}`}
            >
              {link.label}
            </LinkComponent>
          );
        })}
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

