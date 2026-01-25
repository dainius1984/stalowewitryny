import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Process } from "@/components/sections/Process";

/**
 * About Page (O Nas)
 * Information about the company and services
 */
export function AboutPage() {
  return (
    <>
      {/* Efekt ziarna na tle */}
      <div className="bg-grain" />
      
      <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col overflow-x-hidden w-full">
        <Navbar isModalOpen={false} />
        
        <main className="pt-24 md:pt-28 flex-grow relative w-full overflow-x-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>

          <Container className="relative z-10 py-12 md:py-16 px-4 md:px-6">
            {/* Page Header */}
            <motion.div
              className="mb-12 md:mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="text-sm uppercase tracking-widest text-primary/80 font-sans mb-4 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                O Nas
              </motion.p>
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-sans mb-6 bg-gradient-to-r from-white via-white to-primary/80 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Tworzymy Szybkie Strony dla Biznesu
              </motion.h1>
            </motion.div>

            {/* Personal Introduction Section with Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 md:mb-16 max-w-4xl mx-auto"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="bg-neutral-900/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-white/5 overflow-hidden">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                  {/* Family Photo */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex-shrink-0"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20">
                      <img
                        src="/img/Us.png"
                        alt="Marcin z rodziną"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <div className="flex-1 text-center md:text-left">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-3xl md:text-4xl font-bold text-white font-sans mb-4"
                    >
                      Cześć, jestem <span className="text-primary">Marcin</span>
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-4"
                    >
                      Jestem <strong className="text-white">pasjonatem programowania</strong> i twórcą <strong className="text-primary">Stalowych Witryn</strong>. 
                      Jako <strong className="text-primary">niezależny deweloper</strong>, specjalizuję się w tworzeniu szybkich, 
                      ręcznie kodowanych stron internetowych dla małych i średnich firm.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="text-base md:text-lg text-neutral-400 leading-relaxed"
                    >
                      Każdy projekt traktuję indywidualnie, dbając o najwyższą jakość kodu i wydajność. 
                      Moja pasja do programowania przekłada się na <strong className="text-white">strony, które działają szybko i bezawaryjnie</strong>.
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-8 md:space-y-12 lg:space-y-16 max-w-4xl mx-auto w-full">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-neutral-900/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-white/5 w-full"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mb-4">
                  Misja
                </h2>
                <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
                  Moja misja to udostępnienie każdej firmie <strong className="text-primary">profesjonalnej strony internetowej</strong> 
                  bez astronomicznych kosztów i miesięcznych abonamentów. Tworzę <strong className="text-white">strony na własność</strong> – 
                  płacisz raz, strona jest Twoja na zawsze.
                </p>
              </motion.div>

              {/* Why Hand-Coded */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-neutral-900/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-white/5 w-full"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mb-4">
                  Dlaczego Ręcznie Kodowane?
                </h2>
                <ul className="space-y-4 text-base md:text-lg text-neutral-300">
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl leading-none">✓</span>
                    <span><strong className="text-white">Szybkość 100/100</strong> – brak ciężkich wtyczek WordPress</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl leading-none">✓</span>
                    <span><strong className="text-white">Bezpieczeństwo</strong> – czysty kod bez luk bezpieczeństwa</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl leading-none">✓</span>
                    <span><strong className="text-white">Brak abonamentu</strong> – pełna własność strony</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl leading-none">✓</span>
                    <span><strong className="text-white">SEO Friendly</strong> – optymalizacja pod Google</span>
                  </li>
                </ul>
              </motion.div>

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-neutral-900/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-white/5 w-full"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mb-4">
                  Technologie
                </h2>
                <p className="text-base md:text-lg text-neutral-300 leading-relaxed mb-6">
                  Używam nowoczesnych technologii, które gwarantują najwyższą wydajność:
                </p>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'SEO Optimization'].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-full text-sm font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Analytics & Tracking */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                className="bg-neutral-900/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-white/5 w-full"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mb-4">
                  Analityka i Śledzenie
                </h2>
                <p className="text-base md:text-lg text-neutral-300 leading-relaxed mb-4">
                  Każda strona internetowa, którą tworzę, jest wyposażona w <strong className="text-primary">Google Analytics</strong> – 
                  profesjonalne narzędzie do analizy ruchu na stronie.
                </p>
                <div className="space-y-3 text-base md:text-lg text-neutral-300">
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl leading-none">✓</span>
                    <span><strong className="text-white">Śledzenie ruchu</strong> – dowiedz się, skąd przychodzą Twoi klienci</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl leading-none">✓</span>
                    <span><strong className="text-white">Analiza zachowań</strong> – zobacz, które strony są najpopularniejsze</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl leading-none">✓</span>
                    <span><strong className="text-white">Optymalizacja konwersji</strong> – poprawiaj wyniki na podstawie danych</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl leading-none">✓</span>
                    <span><strong className="text-white">Raporty SEO</strong> – monitoruj pozycję w Google</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mt-4 italic">
                  Google Analytics jest w pełni zgodne z RODO i pomaga w optymalizacji strony pod kątem lepszych wyników biznesowych.
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-center"
              >
                <p className="text-lg text-neutral-300 mb-6">
                  Gotowy na <strong className="text-white">szybką stronę</strong> dla Twojej firmy?
                </p>
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-sans font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105"
                >
                  Skontaktuj się
                </a>
              </motion.div>
            </div>
          </Container>

          {/* Process Section */}
          <div id="proces" className="relative z-10">
            <Process />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

