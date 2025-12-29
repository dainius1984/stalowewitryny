import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function NavbarMobile({ navLinks, isModalOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isModalOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsMobileMenuOpen(!isMobileMenuOpen);
        }}
        className="md:hidden p-2.5 text-white hover:text-primary active:text-primary transition-colors touch-manipulation relative z-[60]"
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        title="Otwórz menu nawigacyjne"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 pt-4 border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-3 pb-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-neutral-400 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/5 font-sans touch-manipulation"
                  title={link.title || `Przejdź do sekcji ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="primary"
                className="w-full mt-2 touch-manipulation"
                onClick={() => setIsMobileMenuOpen(false)}
                title="Zamów darmową wycenę strony internetowej"
              >
                Wycena
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

