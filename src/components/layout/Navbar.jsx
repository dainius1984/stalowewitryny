import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarMobile } from "./NavbarMobile";
import { CompanySurvey } from "@/components/sections/CompanySurvey";

export function Navbar({ isModalOpen = false }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const location = useLocation();

  // Reset navbar visibility when route changes - ALWAYS show on route change
  useEffect(() => {
    setIsVisible(true);
    setLastScrollY(0);
    setIsScrolling(false);
    // Force navbar to be visible immediately on route change
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, [location.pathname]);

  // Handle scroll to hide/show navbar with throttling for better performance
  useEffect(() => {
    if (isModalOpen) {
      setIsVisible(true); // Always show when modal is open
      return;
    }
    
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);
          
          // Only trigger if scroll difference is significant (prevents jitter)
          if (scrollDifference < 5) {
            ticking = false;
            return;
          }
          
          setIsScrolling(true);
          
          // Show navbar at the top of the page
          if (currentScrollY < 30) {
            setIsVisible(true);
          } 
          // Hide navbar when scrolling down, show when scrolling up
          else if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
          
          // Reset scrolling state after a delay
          setTimeout(() => setIsScrolling(false), 150);
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isModalOpen, location.pathname]);

  const navLinks = [
    { label: "Strona Główna", href: "/", title: "Strona główna - Stalowe Witryny", isExternal: false },
    { label: "Portfolio", href: "/portfolio", title: "Zobacz wszystkie realizacje portfolio", isExternal: false },
    { label: "O Nas", href: "/o-nas", title: "Poznaj nas - kim jesteśmy i co robimy", isExternal: false },
    { label: "Blog", href: "/blog", title: "Blog - Baza wiedzy o stronach internetowych", isExternal: false },
    { label: "Kontakt", href: "/kontakt", title: "Skontaktuj się - darmowa wycena strony internetowej", isExternal: false },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {!isModalOpen && (
          <motion.header
          key="navbar"
          initial={{ opacity: 0, y: -120, x: "-50%", scale: 0.95 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -120,
            x: "-50%",
            scale: isVisible ? 1 : 0.95,
            pointerEvents: isVisible ? 'auto' : 'none'
          }}
          exit={{ opacity: 0, y: -120, x: "-50%", scale: 0.95, pointerEvents: "none" }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94], // Smooth ease-in-out
            opacity: { duration: 0.3 },
            scale: { duration: 0.35 }
          }}
          className="fixed top-4 md:top-6 left-1/2 z-40 w-[95%] md:w-[90%] max-w-4xl"
          style={{ 
            display: isModalOpen ? 'none' : 'block'
          }}
        >
          <nav
            className={cn(
              "border border-white/10 bg-black/60 backdrop-blur-xl shadow-lg",
              "px-4 md:px-8 py-3 md:py-4",
              "relative transition-all duration-300",
              "rounded-lg md:rounded-full", // Traditional shape on mobile, pill on desktop
              isVisible ? "shadow-lg" : "shadow-none"
            )}
          >
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between gap-2 md:gap-6 relative">
              {/* Left: Logo */}
              <div className="flex items-center flex-shrink-0 relative z-10 gap-2">
                <Link 
                  to="/"
                  className="flex items-center gap-2 text-lg md:text-xl font-black tracking-tighter font-sans text-white touch-manipulation relative z-10 hover:opacity-80 transition-opacity" 
                  title="Stalowe Witryny - Tanie i solidne strony internetowe"
                >
                  <img 
                    src="/img/logo.webp" 
                    alt="Tania strona www Wrocław - Stalowe Witryny Logo" 
                    className="h-6 w-6 md:h-7 md:w-7 object-contain"
                    width="28"
                    height="28"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <span>
                    STALOWEWITRYNY
                    <span className="text-primary">.</span>
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <NavbarDesktop navLinks={navLinks} location={location} onSurveyClick={() => setIsSurveyOpen(true)} />
            </div>

            {/* Mobile Layout - Hamburger Menu */}
            <div className="md:hidden flex items-center justify-between gap-2 relative">
              {/* Left: Logo */}
              <div className="flex items-center flex-shrink-0 relative z-10 gap-2">
                <Link 
                  to="/"
                  className="flex items-center gap-2 text-lg font-black tracking-tighter font-sans text-white touch-manipulation relative z-10 hover:opacity-80 transition-opacity" 
                  title="Stalowe Witryny - Tanie i solidne strony internetowe"
                >
                  <img 
                    src="/img/logo.webp" 
                    alt="Tania strona www Wrocław - Stalowe Witryny Logo" 
                    className="h-5 w-5 object-contain"
                    width="20"
                    height="20"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <span>
                    STALOWEWITRYNY
                    <span className="text-primary">.</span>
                  </span>
                </Link>
              </div>

              {/* Right: Hamburger Menu */}
              <NavbarMobile navLinks={navLinks} location={location} isModalOpen={isModalOpen} onSurveyClick={() => setIsSurveyOpen(true)} />
            </div>
          </nav>
          </motion.header>
        )}
      </AnimatePresence>
      
      {/* Company Survey Modal */}
      <CompanySurvey isOpen={isSurveyOpen} onClose={() => setIsSurveyOpen(false)} />
    </>
  );
}
