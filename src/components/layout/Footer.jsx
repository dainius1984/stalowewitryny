import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "Portfolio", href: "#portfolio" },
      { label: "Proces", href: "#proces" },
      { label: "Cennik", href: "#cennik" },
      { label: "Kontakt", href: "#kontakt" },
    ],
    legal: [
      { label: "Polityka Prywatności", href: "#privacy" },
      { label: "Regulamin", href: "#terms" },
    ],
  };

  return (
    <footer id="kontakt" className="border-t border-white/10 bg-black/40 backdrop-blur-xl mt-20">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Brand */}
          <div className="space-y-4">
            <a href="#" className="inline-block" title="Stalowe Witryny - Strona główna">
              <span className="text-2xl md:text-3xl font-black tracking-tighter font-sans text-white">
                STALOWEWITRYNY
                <span className="text-primary">.</span>
              </span>
            </a>
            <p className="text-sm text-neutral-400 font-sans max-w-xs">
              Tanie i solidne strony internetowe dla firm. Kodowane ręcznie, bez abonamentu, strona na własność.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-sans">
              Nawigacja
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.navigation.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-white transition-colors font-sans"
                  title={`Przejdź do sekcji ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-sans">
              Informacje
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-white transition-colors font-sans"
                  title={`Przeczytaj ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
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

