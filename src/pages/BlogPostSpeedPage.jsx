import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BASE_URL } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Phone, Mail, Zap } from "lucide-react";

/**
 * Blog Post - Szybkość strony a SEO Wrocław
 * SEO-optimized article about page speed and Core Web Vitals (LCP, FCP, Performance).
 */
export function BlogPostSpeedPage() {
  useEffect(() => {
    document.title = "Szybkość strony a SEO - Dlaczego 0.8s LCP to klucz? | Stalowe Witryny";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'Dowiedz się, jak szybkość strony wpływa na Twoją pozycję w Google i zyski. Sprawdź, dlaczego strony w React są szybsze od WordPressa. Optymalizacja SEO Wrocław.'
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${BASE_URL}/blog/szybkosc-strony-internetowej-seo-wroclaw`);
  }, []);

  return (
    <>
      <div className="bg-grain" />
      <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col overflow-x-hidden w-full">
        <Navbar isModalOpen={false} />
        <main className="pt-24 md:pt-28 flex-grow relative w-full overflow-x-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <Container className="relative z-10 py-12 md:py-16">
            <motion.nav
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center text-sm text-neutral-300 font-sans" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link to="/" className="hover:text-primary transition-colors" itemProp="item">
                    <span itemProp="name">Strona główna</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <span className="mx-2">/</span>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link to="/blog" className="hover:text-primary transition-colors" itemProp="item">
                    <span itemProp="name">Blog</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <span className="mx-2">/</span>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span className="text-neutral-400" itemProp="name">Szybkość strony a SEO</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </motion.nav>

            <motion.article
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans mb-6 leading-tight">
                Szybkość strony a SEO – dlaczego 0.8s LCP to klucz?
              </h1>

              <div className="flex items-center gap-4 text-sm text-neutral-300 font-sans mb-8">
                <time dateTime="2026-01-25">25 stycznia 2026</time>
                <span>•</span>
                <span>Stalowe Witryny</span>
              </div>

              {/* Wizualny boks - Nasz rekord LCP | Performance */}
              <motion.div
                className="mb-10 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-3 px-6 py-4 md:px-8 md:py-5 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-2 border-primary/40 shadow-lg shadow-primary/20">
                  <Zap className="w-8 h-8 md:w-10 md:h-10 text-primary flex-shrink-0" />
                  <span className="text-xl md:text-2xl font-bold text-white font-sans whitespace-nowrap">
                    Nasz rekord: <span className="text-primary">LCP 0.8s</span> | <span className="text-primary">Performance 99/100</span>
                  </span>
                </div>
              </motion.div>

              <div className="prose prose-invert prose-lg max-w-none mb-12">
                <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans">
                  Szybkość ładowania strony to jeden z najważniejszych czynników rankingowych Google. 
                  W <Link to="/" className="text-primary hover:text-primary/80 underline font-medium">Stalowych Witrynach</Link> budujemy strony w React, 
                  które osiągają wyniki <strong className="text-white">LCP poniżej 1 s</strong> i <strong className="text-white">PageSpeed 99/100</strong> na desktopie. 
                  Dlaczego to ma znaczenie dla Twojej firmy we Wrocławiu i Dolnego Śląska?
                </p>
              </div>

              <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-6">
                  Czym jest LCP i dlaczego 0.8s to cel?
                </h2>
                <p className="text-lg text-neutral-300 leading-relaxed font-sans mb-4">
                  <strong className="text-white">Largest Contentful Paint (LCP)</strong> mierzy, kiedy największy widoczny element (np. zdjęcie lub nagłówek) pojawia się na ekranie. 
                  Google uznaje LCP &lt; 2.5 s za dobre, a &lt; 1 s za doskonałe. Im szybszy LCP, tym lepsza pozycja w wyszukiwarce i niższy współczynnik odrzuceń.
                </p>
                <p className="text-lg text-neutral-300 leading-relaxed font-sans">
                  Strony oparte na ciężkich systemach (np. WordPress z dziesiątkami wtyczek) często mają LCP 3–4 s na mobile. 
                  Strony w React, z optymalizacją obrazów i bez zbędnego JavaScriptu, mogą trzymać <strong className="text-primary">LCP około 0.8 s</strong> – to realna przewaga SEO i UX.
                </p>
              </motion.section>

              <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-6">
                  Dlaczego strony w React są szybsze od WordPressa?
                </h2>
                <p className="text-lg text-neutral-300 leading-relaxed font-sans mb-6">
                  WordPress ładuje setki kilobajtów PHP, motywu i wtyczek zanim użytkownik zobaczy treść. 
                  React pozwala dostarczyć tylko niezbędny kod i zasoby (obrazy, fonty), z lazy loadingiem reszty. 
                  Efekt: szybszy First Contentful Paint (FCP), szybszy LCP i wyższy wynik Performance w PageSpeed Insights – a co za tym idzie, lepsze SEO i wyższe konwersje.
                </p>
              </motion.section>

              <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-6">
                  Optymalizacja SEO Wrocław – szybkość to ranking
                </h2>
                <p className="text-lg text-neutral-300 leading-relaxed font-sans mb-4">
                  Dla firm z Wrocławia i Dolnego Śląska konkurencja w Google jest duża. Szybka strona to sygnał jakości dla algorytmu i dla użytkownika: 
                  niższy odsetek odrzuceń, dłuższy czas na stronie i lepsze szanse na kontakt. Inwestycja w technologię (React, WebP, CDN, minimalny JS) 
                  zwraca się w wyższej pozycji i większej liczbie leadów.
                </p>
              </motion.section>

              {/* Link wewnętrzny do artykułu o cenach */}
              <motion.section
                className="mb-12 p-6 md:p-8 rounded-2xl bg-neutral-900/50 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-lg text-neutral-300 font-sans">
                  Sprawdź też:{" "}
                  <Link
                    to="/blog/ile-kosztuje-strona-internetowa-wroclaw"
                    className="text-primary hover:text-primary/80 underline font-medium"
                  >
                    Ile kosztuje strona internetowa we Wrocławiu?
                  </Link>
                </p>
              </motion.section>

              <motion.section
                className="mb-12 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 md:p-12 border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-6">
                  Podsumowanie
                </h2>
                <p className="text-lg text-neutral-300 leading-relaxed font-sans mb-8">
                  Szybkość strony bezpośrednio wpływa na Twoją pozycję w Google i zyski. LCP 0.8 s i Performance 99/100 to realne cele przy stronie w React i dobrej optymalizacji. 
                  Chcesz taki wynik dla swojej firmy? Zapraszamy do kontaktu – przygotujemy wycenę i prototyp bez zobowiązań.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/kontakt">
                    <Button className="w-full sm:w-auto">
                      Darmowa wycena – szybka strona
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <a
                    href="tel:+48532690876"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-300 border border-white/20 bg-transparent text-white hover:bg-white/10 font-sans"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Zadzwoń: 532 690 876
                  </a>
                  <a
                    href="mailto:kontakt@stalowewitryny.pl"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-300 border border-white/20 bg-transparent text-white hover:bg-white/10 font-sans"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Napisz email
                  </a>
                </div>
              </motion.section>
            </motion.article>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}
