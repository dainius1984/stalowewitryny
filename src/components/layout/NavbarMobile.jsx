import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
      <motion.button
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
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.15 }}
      >
        <AnimatePresence mode="wait">
          {isMobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ 
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
              height: { duration: 0.3 },
              opacity: { duration: 0.2 }
            }}
            className="md:hidden mt-4 pt-4 border-t border-white/10 overflow-hidden"
          >
            {/* Logo "Stalowe Witryny" when menu is open */}
            <div className="flex items-center justify-center mb-4">
              <a 
                href="#" 
                className="text-lg font-black tracking-tighter font-sans text-white touch-manipulation" 
                title="Stalowe Witryny - Tanie i solidne strony internetowe"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                STALOWEWITRYNY
                <span className="text-primary">.</span>
              </a>
            </div>

            <motion.div 
              className="flex flex-col gap-3 pb-2"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 }
                }
              }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-neutral-400 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/5 font-sans touch-manipulation"
                  title={link.title || `Przejdź do sekcji ${link.label}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
              >
                <Button
                  variant="primary"
                  className="w-full mt-2 touch-manipulation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  title="Zamów darmową wycenę strony internetowej"
                >
                  Wycena
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

