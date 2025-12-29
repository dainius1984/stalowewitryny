import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarMobile } from "./NavbarMobile";

export function Navbar({ isModalOpen = false }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll to hide/show navbar
  useEffect(() => {
    if (isModalOpen) return; // Don't handle scroll when modal is open

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar at the top of the page
      if (currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Hide navbar when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isModalOpen]);

  const navLinks = [
    { label: "Portfolio", href: "#portfolio", title: "Zobacz przykłady taniej i solidnej strony internetowej" },
    { label: "Proces", href: "#proces", title: "Jak powstaje ręcznie kodowana strona internetowa" },
    { label: "Porównanie", href: "#porownanie", title: "Ręcznie kodowane vs platformy - porównanie" },
    { label: "Kontakt", href: "#kontakt", title: "Skontaktuj się - darmowa wycena strony internetowej" },
  ];

  return (
    <AnimatePresence mode="wait">
      {!isModalOpen && (
        <motion.header
          key="navbar"
          initial={{ opacity: 0, y: -100, x: "-50%" }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -100,
            x: "-50%",
            pointerEvents: isVisible ? 'auto' : 'none'
          }}
          exit={{ opacity: 0, y: -100, x: "-50%", pointerEvents: "none" }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="fixed top-6 left-1/2 z-40 w-[90%] max-w-4xl"
          style={{ 
            display: isModalOpen ? 'none' : 'block'
          }}
        >
          <nav
            className={cn(
              "rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-lg",
              "px-4 md:px-8 py-3 md:py-4",
              "relative"
            )}
          >
            <div className="flex items-center justify-between gap-2 md:gap-6 relative">
              {/* Left: Logo */}
              <div className="flex items-center flex-shrink-0 relative z-10">
                <a 
                  href="#" 
                  className="text-lg md:text-xl font-black tracking-tighter font-sans text-white touch-manipulation relative z-10" 
                  title="Stalowe Witryny - Tanie i solidne strony internetowe"
                >
                  STALOWEWITRYNY
                  <span className="text-primary">.</span>
                </a>
              </div>

              {/* Desktop Navigation */}
              <NavbarDesktop navLinks={navLinks} />

              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center flex-shrink-0 relative z-[60]">
                <NavbarMobile navLinks={navLinks} isModalOpen={isModalOpen} />
              </div>
            </div>
          </nav>
    </motion.header>
      )}
    </AnimatePresence>
  );
}
