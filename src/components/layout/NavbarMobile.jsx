import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function NavbarMobile({ navLinks, location, isModalOpen, onSurveyClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isModalOpen]);

  // Same active link logic as NavbarDesktop
  const isActive = (href) => {
    if (href.startsWith('#')) {
      // For hash links, check if we're on home page
      return location.pathname === '/';
    }
    // For route links, check if pathname matches exactly
    return location.pathname === href;
  };

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

      {/* Mobile Menu Dropdown - Full Width */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - Darker to hide background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[50] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Full Width Panel */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="fixed top-0 left-0 right-0 w-full bg-black border-b border-white/10 z-[60] md:hidden overflow-y-auto shadow-2xl"
            >
              {/* Header with Logo and Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Link 
                  to="/"
                  className="text-xl font-black tracking-tighter font-sans text-white touch-manipulation" 
                  title="Stalowe Witryny - Tanie i solidne strony internetowe"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  STALOWEWITRYNY
                  <span className="text-primary">.</span>
                </Link>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white hover:text-primary transition-colors touch-manipulation"
                  aria-label="Close menu"
                  title="Zamknij menu"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Menu Content */}
              <motion.div 
                className="flex flex-col gap-2 p-6"
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
                {navLinks.map((link, index) => {
                  const LinkComponent = link.href.startsWith('#') ? motion.a : motion(Link);
                  const linkProps = link.href.startsWith('#') 
                    ? { href: link.href }
                    : { to: link.href };
                  const active = isActive(link.href);
                  
                  return (
                    <LinkComponent
                      key={link.href}
                      {...linkProps}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-base font-medium transition-all duration-300 py-4 px-6 rounded-xl font-sans touch-manipulation relative",
                        active
                          ? "text-primary"
                          : "text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent"
                      )}
                      title={link.title || `Przejdź do sekcji ${link.label}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.label}
                      {active && (
                        <span className="absolute -bottom-1 left-6 right-6 h-0.5 bg-primary rounded-full" />
                      )}
                    </LinkComponent>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <Button
                    variant="primary"
                    className="w-full touch-manipulation py-4 text-base font-semibold"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (onSurveyClick) {
                        onSurveyClick();
                      }
                    }}
                    title="Zamów darmową wycenę strony internetowej"
                  >
                    Wycena
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

