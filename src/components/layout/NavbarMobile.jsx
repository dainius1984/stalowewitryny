import { Button } from "@/components/ui/Button";

export function NavbarMobile({ navLinks, isModalOpen }) {
  return (
    <div className="md:hidden flex flex-col gap-2">
      {/* Navigation Links - Always Visible on Mobile */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5 font-sans touch-manipulation"
            title={link.title || `Przejdź do sekcji ${link.label}`}
          >
            {link.label}
          </a>
        ))}
      </div>
      
      {/* CTA Button */}
      <div className="flex justify-center mt-1">
        <Button
          variant="primary"
          className="text-sm px-4 py-2 touch-manipulation"
          title="Zamów darmową wycenę strony internetowej"
        >
          Wycena
        </Button>
      </div>
    </div>
  );
}

