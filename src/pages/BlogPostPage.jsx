import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Phone, Mail } from "lucide-react";

/**
 * Blog Post Page - Ile kosztuje strona internetowa we Wrocławiu
 * SEO-optimized blog post about website costs in Wrocław
 */
export function BlogPostPage() {
  // Update meta tags for SEO
  useEffect(() => {
    document.title = "Ile kosztuje strona internetowa we Wrocławiu? Cennik 2026 - Stalowe Witryny";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Sprawdź realne ceny stron www we Wrocławiu. Dowiedz się, dlaczego warto wybrać React bez abonamentu. Przejrzysty cennik Stalowych Witryn.');
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.stalowewitryny.pl/blog/ile-kosztuje-strona-internetowa-wroclaw');
  }, []);

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

          <Container className="relative z-10 py-12 md:py-16">
            {/* Breadcrumb - Optimized with proper Schema.org structure */}
            <motion.nav
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center text-sm text-neutral-300 font-sans" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link 
                    to="/" 
                    className="hover:text-primary transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">Strona główna</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <span className="mx-2">/</span>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link 
                    to="/blog" 
                    className="hover:text-primary transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">Blog</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <span className="mx-2">/</span>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span className="text-neutral-400" itemProp="name">Ile kosztuje strona internetowa</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </motion.nav>

            {/* Article Header */}
            <motion.article
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* H1 Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans mb-6 leading-tight">
                Ile kosztuje strona internetowa we Wrocławiu? Cennik 2026
              </h1>

              {/* Meta info */}
              <div className="flex items-center gap-4 text-sm text-neutral-300 font-sans mb-8">
                <time dateTime="2026-01-01">2026</time>
                <span>•</span>
                <span>Stalowe Witryny</span>
              </div>

              {/* Introduction */}
              <div className="prose prose-invert prose-lg max-w-none mb-12">
                <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans">
                  Szukasz konkretnej odpowiedzi na pytanie o koszt strony www we Wrocławiu, ale wszędzie widzisz tylko przycisk „zapytaj o wycenę”? 
                  W <Link to="/" className="text-primary hover:text-primary/80 underline font-medium">Stalowych Witrynach</Link> stawiamy na przejrzystość. 
                  Jako lokalny deweloper z Wrocławia (Nowy Dwór), pokazuję, jak wyglądają realne stawki w 2026 roku i dlaczego model „bez abonamentu” to przyszłość.
                </p>
              </div>

              {/* Section 1: Pricing Table */}
              <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-6">
                  Średnie ceny we Wrocławiu
                </h2>
                
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-white/10 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-neutral-900/50">
                        <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold font-sans">Rodzaj strony</th>
                        <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold font-sans">Średnia cena (Wrocław)</th>
                        <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold font-sans">Stalowe Witryny</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-neutral-900/30 hover:bg-neutral-900/50 transition-colors">
                        <td className="border border-white/10 px-4 py-3 text-neutral-300 font-sans">Landing Page / Wizytówka</td>
                        <td className="border border-white/10 px-4 py-3 text-neutral-300 font-sans">1500 - 3000 zł</td>
                        <td className="border border-white/10 px-4 py-3 text-primary font-semibold font-sans">od 500 zł</td>
                      </tr>
                      <tr className="bg-neutral-900/30 hover:bg-neutral-900/50 transition-colors">
                        <td className="border border-white/10 px-4 py-3 text-neutral-300 font-sans">Strona firmowa (5-10 podstron)</td>
                        <td className="border border-white/10 px-4 py-3 text-neutral-300 font-sans">3500 - 5500 zł</td>
                        <td className="border border-white/10 px-4 py-3 text-primary font-semibold font-sans">od 1000 zł</td>
                      </tr>
                      <tr className="bg-neutral-900/30 hover:bg-neutral-900/50 transition-colors">
                        <td className="border border-white/10 px-4 py-3 text-neutral-300 font-sans">Portal / Sklep internetowy</td>
                        <td className="border border-white/10 px-4 py-3 text-neutral-300 font-sans">od 8000 zł</td>
                        <td className="border border-white/10 px-4 py-3 text-primary font-semibold font-sans">od 2000 zł</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.section>

              {/* Section 2: What you're paying for */}
              <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-6">
                  Za co właściwie płacisz?
                </h2>
                
                <p className="text-lg text-neutral-300 leading-relaxed font-sans mb-6">
                  Wielu klientów z Dolnego Śląska nie wie, że niska cena początkowa często oznacza wysokie koszty ukryte.
                </p>

                <div className="space-y-6">
                  <div className="bg-neutral-900/50 rounded-xl p-6 border border-white/10">
                    <h3 className="text-2xl font-bold text-white font-sans mb-3">
                      Silnik strony
                    </h3>
                    <p className="text-neutral-300 leading-relaxed font-sans">
                      My tworzymy w <strong className="text-primary">React</strong>, co oznacza brak konieczności płacenia za ciężkie wtyczki WordPress.
                    </p>
                  </div>

                  <div className="bg-neutral-900/50 rounded-xl p-6 border border-white/10">
                    <h3 className="text-2xl font-bold text-white font-sans mb-3">
                      Szybkość
                    </h3>
                    <p className="text-neutral-300 leading-relaxed font-sans">
                      Strony od <Link to="/" className="text-primary hover:text-primary/80 underline font-medium">Stalowych Witryn</Link> mają wynik <strong className="text-primary">100/100 w Google PageSpeed Insights</strong>. Szybsza strona to wyższa pozycja w Google za darmo.
                    </p>
                  </div>

                  <div className="bg-neutral-900/50 rounded-xl p-6 border border-white/10">
                    <h3 className="text-2xl font-bold text-white font-sans mb-3">
                      Własność
                    </h3>
                    <p className="text-neutral-300 leading-relaxed font-sans">
                      U nas płacisz raz. Strona jest Twoja, nie jesteś uwiązany abonamentem agencji.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Section 3: Why choose local developer */}
              <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-6">
                  Dlaczego warto wybrać lokalnego programistę z Wrocławia?
                </h2>
                
                <p className="text-lg text-neutral-300 leading-relaxed font-sans mb-4">
                  Współpraca z kimś na miejscu (Stabłowice, Nowy Dwór, centrum) to pewność, że Twoim projektem nie zajmuje się anonimowy automat. 
                  W <Link to="/" className="text-primary hover:text-primary/80 underline font-medium">Stalowych Witrynach</Link> dostajesz <strong className="text-primary">prototyp strony w 30 minut</strong>, co pozwala Ci zaoszczędzić czas i pieniądze już na starcie.
                </p>
              </motion.section>

              {/* Summary & CTA */}
              <motion.section
                className="mb-12 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 md:p-12 border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-6">
                  Podsumowanie
                </h2>
                
                <p className="text-lg text-neutral-300 leading-relaxed font-sans mb-8">
                  Nie przepłacaj za przestarzałe technologie. Sprawdź, jak może wyglądać Twoja nowa strona www. 
                  Zadzwoń lub napisz do nas – wycena jest zawsze darmowa.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/kontakt">
                    <Button className="w-full sm:w-auto">
                      Zamów darmowy prototyp w 30 minut
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

              {/* Final Call to Action - Large CTA Button */}
              <motion.section
                className="mt-12 pt-10 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl p-12 md:p-16 border-2 border-primary/30 text-center relative overflow-hidden">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-sans mb-6 leading-tight">
                      Gotowy na własną<br />Stalową Witrynę?
                    </h2>
                    <p className="text-xl md:text-2xl text-neutral-200 font-sans mb-10 max-w-3xl mx-auto leading-relaxed">
                      Bezpłatny prototyp w 30 minut.<br />
                      Żadnych zobowiązań. Tylko konkretna wycena.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <Link to="/kontakt" className="w-full sm:w-auto">
                        <Button 
                          className="w-full sm:w-auto text-xl md:text-2xl px-12 md:px-16 py-6 md:py-8 shadow-[0_0_60px_hsl(var(--primary)/0.6)] hover:shadow-[0_0_80px_hsl(var(--primary)/0.9)] transition-all duration-300 font-bold"
                        >
                          Darmowa wycena w 30 minut
                          <ArrowRight className="w-6 h-6 md:w-7 md:h-7 ml-3" />
                        </Button>
                      </Link>
                    </div>
                    <p className="text-sm text-neutral-400 font-sans mt-6">
                      ✓ Bez ukrytych kosztów  •  ✓ Lokalna obsługa Wrocław  •  ✓ PageSpeed 100/100
                    </p>
                  </div>
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
