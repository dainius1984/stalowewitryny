import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function NavbarDesktop({ navLinks, location, onSurveyClick }) {
  const isActive = (href) => {
    if (href.startsWith('#')) {
      // For hash links, check if we're on home page
      // Hash might not be set immediately, so we just check if we're on home
      return location.pathname === '/';
    }
    // For route links, check if pathname matches exactly
    return location.pathname === href;
  };

  return (
    <>
      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-6 flex-1 justify-center mx-4">
        {navLinks.map((link) => {
          const LinkComponent = link.href.startsWith('#') ? 'a' : Link;
          const linkProps = link.href.startsWith('#') 
            ? { href: link.href }
            : { to: link.href };
          const active = isActive(link.href);
          
          return (
            <LinkComponent
              key={link.href}
              {...linkProps}
              className={cn(
                "text-sm font-medium transition-colors font-sans whitespace-nowrap relative",
                active 
                  ? "text-primary" 
                  : "text-neutral-400 hover:text-white"
              )}
              title={link.title || `Przejdź do sekcji ${link.label}`}
            >
              {link.label}
              {active && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
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

