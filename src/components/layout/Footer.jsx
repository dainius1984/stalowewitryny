import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top function
  const scrollToTop = () => {
    // Use Lenis if available
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  // Handle hash link clicks
  const handleHashLink = (e, hash) => {
    e.preventDefault();
    
    // If we're not on homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation, then scroll to hash
      setTimeout(() => {
        scrollToTop();
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }, 100);
    } else {
      // Already on homepage, just scroll to hash
      scrollToTop();
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  // Handle React Router link clicks
  const handleRouteLink = (e, path) => {
    e.preventDefault();
    navigate(path);
    scrollToTop();
  };

  const footerLinks = {
    navigation: [
      { label: "Portfolio", href: "#portfolio" },
      { label: "Proces", href: "#proces" },
      { label: "Cennik", href: "#cennik" },
      { label: "Kontakt", href: "#kontakt" },
    ],
    legal: [
      { label: "Polityka Prywatności", href: "/polityka-prywatnosci" },
      { label: "Regulamin", href: "/regulamin" },
    ],
  };

  return (
    <footer id="kontakt" className="border-t border-white/10 bg-black/40 backdrop-blur-xl mt-20">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Brand */}
          <div className="space-y-4 text-center md:text-left">
            <Link 
              to="/" 
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== '/') {
                  navigate('/');
                }
                scrollToTop();
              }}
              className="inline-block" 
              title="Stalowe Witryny - Strona główna"
            >
              <span className="text-2xl md:text-3xl font-black tracking-tighter font-sans text-white">
                STALOWEWITRYNY
                <span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 font-sans max-w-xs mx-auto md:mx-0">
              Tanie i solidne strony internetowe dla firm. Kodowane ręcznie, bez abonamentu, strona na własność.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-sans">
              Szybki dostęp
            </h3>
            <nav className="flex flex-col gap-3 items-center md:items-start">
              {footerLinks.navigation.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleHashLink(e, link.href)}
                  className="text-sm text-neutral-400 hover:text-white transition-colors font-sans cursor-pointer"
                  title={`Przejdź do sekcji ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal Links & Service Areas */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-sans">
              Informacje
            </h3>
            <nav className="flex flex-col gap-3 items-center md:items-start">
              {footerLinks.legal.map((link) => {
                // All legal links are React Router routes
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={scrollToTop}
                    className="text-sm text-neutral-400 hover:text-white transition-colors font-sans"
                    title={`Przeczytaj ${link.label}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            
            {/* Service Areas - Local SEO */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-sans mb-3">
                Obsługiwane miasta
              </h4>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {["Wrocław", "Legnica", "Lubin", "Świdnica", "Oleśnica", "Oława", "Dzierżoniów"].map((city) => (
                  <span
                    key={city}
                    className="text-xs text-neutral-400 font-sans px-2 py-1 bg-neutral-900/50 rounded border border-white/5"
                    title={`Strony internetowe ${city}`}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 font-sans">
            © {currentYear} STALOWEWITRYNY<span className="text-primary">.</span> Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </Container>
    </footer>
  );
}

