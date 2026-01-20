import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText, Gavel, PenTool, CheckCircle, Download, Building2, Mail, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Company Data
 * Easy to edit company information
 */
const companyData = {
  name: "ChmielIT Marcin Chmielnicki",
  address: "ul. Sarbinowska 15/5, 54-320 Wrocław",
  nip: "8942751087",
  email: "kontakt@stalowewitryny.pl",
};

/**
 * Terms of Service Page
 * Professional terms and conditions page with sticky navigation
 */
export function TermsPage() {
  const [activeSection, setActiveSection] = useState("section-1");
  const sectionsRef = useRef({});

  // Scroll spy - detect which section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = sectionsRef.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  const sections = [
    { id: "section-1", title: "Postanowienia ogólne", icon: FileText },
    { id: "section-2", title: "Definicje", icon: Gavel },
    { id: "section-3", title: "Rodzaj i zakres usług", icon: PenTool },
    { id: "section-4", title: "Zasady współpracy", icon: CheckCircle },
    { id: "section-5", title: "Prawa autorskie", icon: FileText },
    { id: "section-6", title: "Odpowiedzialność", icon: Gavel },
    { id: "section-7", title: "Postępowanie reklamacyjne", icon: CheckCircle },
    { id: "section-8", title: "Postanowienia końcowe", icon: Gavel },
  ];

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
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Sticky Navigation Sidebar */}
              <aside className="lg:w-64 flex-shrink-0">
                <motion.div
                  className="sticky top-32 bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Spis treści
                  </h3>
                  <nav className="space-y-2">
                    {sections.map((section, index) => {
                      const Icon = section.icon;
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2",
                            isActive
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "text-neutral-400 hover:text-white hover:bg-white/5"
                          )}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{section.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </motion.div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 max-w-4xl">
                {/* Page Header */}
                <motion.div
                  className="mb-12 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Gavel className="w-8 h-8 text-primary" />
                  </motion.div>
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans mb-6 bg-gradient-to-r from-white via-white to-primary/80 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Regulamin
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-xl text-neutral-400 mt-4 font-sans max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Regulamin świadczenia usług przez {companyData.name}
                  </motion.p>
                </motion.div>

                {/* Introduction */}
                <motion.div
                  className="mb-12 bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white mb-3">Dane Usługodawcy</h2>
                      <div className="space-y-2 text-neutral-300">
                        <p><strong className="text-white">Nazwa:</strong> {companyData.name}</p>
                        <p><strong className="text-white">Adres:</strong> {companyData.address}</p>
                        <p><strong className="text-white">NIP:</strong> {companyData.nip}</p>
                        <p>
                          <strong className="text-white">Kontakt:</strong>{" "}
                          <a href={`mailto:${companyData.email}`} className="text-primary hover:text-primary/80">
                            {companyData.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Terms Sections */}
                <div className="space-y-8">
                  {/* §1. Postanowienia ogólne */}
                  <motion.section
                    id="section-1"
                    ref={(el) => (sectionsRef.current["section-1"] = el)}
                    className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          §1. Postanowienia ogólne
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-neutral-300 leading-relaxed">
                          <p>
                            Niniejszy Regulamin określa zasady i warunki korzystania z serwisu internetowego{" "}
                            <strong className="text-white">Stalowe Witryny</strong> oraz świadczenia usług przez{" "}
                            <strong className="text-white">{companyData.name}</strong>.
                          </p>
                          <p>
                            Regulamin stanowi integralną część umowy o świadczenie usług i jest wiążący dla wszystkich{" "}
                            użytkowników serwisu oraz klientów korzystających z usług Usługodawcy.
                          </p>
                          <p>
                            Korzystanie z serwisu oraz zamówienie usług oznacza akceptację postanowień niniejszego Regulaminu.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.section>

                  {/* §2. Definicje */}
                  <motion.section
                    id="section-2"
                    ref={(el) => (sectionsRef.current["section-2"] = el)}
                    className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Gavel className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          §2. Definicje
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-neutral-300 leading-relaxed">
                          <ul className="space-y-3 list-none">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>
                                <strong className="text-white">Usługodawca</strong> – {companyData.name}, 
                                z siedzibą przy {companyData.address}, NIP: {companyData.nip}.
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>
                                <strong className="text-white">Klient</strong> – osoba fizyczna, prawna lub jednostka 
                                organizacyjna nieposiadająca osobowości prawnej, korzystająca z usług Usługodawcy.
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>
                                <strong className="text-white">Serwis</strong> – strona internetowa dostępna pod 
                                adresem stalowewitryny.pl oraz powiązane podstrony.
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>
                                <strong className="text-white">Projekt</strong> – strona internetowa, aplikacja webowa 
                                lub inna realizacja wykonana przez Usługodawcę na zlecenie Klienta.
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.section>

                  {/* §3. Rodzaj i zakres usług */}
                  <motion.section
                    id="section-3"
                    ref={(el) => (sectionsRef.current["section-3"] = el)}
                    className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <PenTool className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          §3. Rodzaj i zakres usług
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-neutral-300 leading-relaxed">
                          <p>Usługodawca świadczy następujące usługi:</p>
                          <ul className="space-y-3 list-none">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-white">Tworzenie stron internetowych</strong> – projektowanie i 
                                kodowanie responsywnych stron www, aplikacji webowych oraz systemów zarządzania treścią.
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-white">Wsparcie techniczne</strong> – konserwacja, aktualizacje, 
                                optymalizacja wydajności oraz rozwiązywanie problemów technicznych istniejących projektów.
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-white">Konsultacje IT</strong> – doradztwo w zakresie technologii 
                                webowych, optymalizacji SEO, bezpieczeństwa oraz strategii cyfrowej.
                              </div>
                            </li>
                          </ul>
                          <p>
                            Szczegółowy zakres usług oraz cena są ustalane indywidualnie z każdym Klientem na podstawie 
                            zapytania ofertowego i przygotowanej wyceny.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.section>

                  {/* §4. Zasady współpracy */}
                  <motion.section
                    id="section-4"
                    ref={(el) => (sectionsRef.current["section-4"] = el)}
                    className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          §4. Zasady współpracy
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-neutral-300 leading-relaxed">
                          <p>
                            <strong className="text-white">Proces kontaktu:</strong> Klient składa zapytanie ofertowe 
                            poprzez formularz kontaktowy dostępny w Serwisie lub bezpośrednio na adres e-mail Usługodawcy.
                          </p>
                          <p>
                            <strong className="text-white">Przygotowanie wyceny:</strong> Na podstawie zapytania Usługodawca 
                            przygotowuje indywidualną wycenę, która zawiera szczegółowy zakres prac, czas realizacji oraz 
                            cenę usługi.
                          </p>
                          <p>
                            <strong className="text-white">Akceptacja oferty:</strong> Po akceptacji wyceny przez Klienta, 
                            strony zawierają umowę o świadczenie usług, która może mieć formę pisemną lub elektroniczną.
                          </p>
                          <p>
                            <strong className="text-white">Realizacja projektu:</strong> Usługodawca realizuje projekt zgodnie 
                            z ustalonym harmonogramem i zakresem prac, informując Klienta o postępach w realizacji.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.section>

                  {/* §5. Prawa autorskie */}
                  <motion.section
                    id="section-5"
                    ref={(el) => (sectionsRef.current["section-5"] = el)}
                    className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          §5. Prawa autorskie
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-neutral-300 leading-relaxed">
                          <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                            <p className="text-white font-semibold mb-2">
                              ⚠️ Kluczowe postanowienie
                            </p>
                            <p>
                              <strong className="text-white">Autorskie prawa majątkowe</strong> do wykonanego Projektu przechodzą 
                              na Klienta z chwilą pełnego uregulowania przez Klienta wynagrodzenia za wykonanie Projektu.
                            </p>
                          </div>
                          <p>
                            Usługodawca zachowuje autorskie prawa osobiste do Projektu, w tym prawo do oznaczenia Projektu 
                            swoim imieniem i nazwiskiem lub nazwą.
                          </p>
                          <p>
                            Klient otrzymuje pełne prawa do użytkowania, modyfikacji oraz dalszego rozwoju Projektu zgodnie 
                            z przeznaczeniem, bez ograniczeń czasowych i terytorialnych.
                          </p>
                          <p>
                            Usługodawca zastrzega sobie prawo do wykorzystania Projektu w celach promocyjnych (portfolio, 
                            case study), chyba że strony uzgodnią inaczej.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.section>

                  {/* §6. Odpowiedzialność */}
                  <motion.section
                    id="section-6"
                    ref={(el) => (sectionsRef.current["section-6"] = el)}
                    className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Gavel className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          §6. Odpowiedzialność
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-neutral-300 leading-relaxed">
                          <p>
                            Usługodawca dokłada wszelkich starań, aby świadczone usługi były najwyższej jakości i odpowiadały 
                            wymaganiom Klienta.
                          </p>
                          <p>
                            <strong className="text-white">Usługodawca nie ponosi odpowiedzialności</strong> za:
                          </p>
                          <ul className="space-y-2 list-none ml-4">
                            <li className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>treści, materiały oraz informacje dostarczone przez Klienta,</div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>działania osób trzecich lub siły wyższej,</div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>zmiany w technologiach lub standardach branżowych po zakończeniu realizacji Projektu,</div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>szkody wynikające z niewłaściwego użytkowania lub modyfikacji Projektu przez Klienta.</div>
                            </li>
                          </ul>
                          <p>
                            Odpowiedzialność Usługodawcy jest ograniczona do wysokości wynagrodzenia otrzymanego za dany Projekt.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.section>

                  {/* §7. Postępowanie reklamacyjne */}
                  <motion.section
                    id="section-7"
                    ref={(el) => (sectionsRef.current["section-7"] = el)}
                    className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          §7. Postępowanie reklamacyjne
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-neutral-300 leading-relaxed">
                          <p>
                            <strong className="text-white">Składanie reklamacji:</strong> Klient ma prawo złożyć reklamację 
                            dotyczącą świadczonych usług na adres e-mail Usługodawcy:{" "}
                            <a href={`mailto:${companyData.email}`} className="text-primary hover:text-primary/80">
                              {companyData.email}
                            </a>
                          </p>
                          <p>
                            Reklamacja powinna zawierać: opis problemu, dane kontaktowe Klienta oraz wszelkie dokumenty 
                            potwierdzające złożenie reklamacji.
                          </p>
                          <p>
                            <strong className="text-white">Rozpatrzenie reklamacji:</strong> Usługodawca rozpatruje reklamację 
                            w terminie <strong className="text-white">14 dni roboczych</strong> od dnia jej otrzymania.
                          </p>
                          <p>
                            Odpowiedź na reklamację zostaje przesłana Klientowi na adres e-mail podany w reklamacji lub 
                            wskazany w umowie.
                          </p>
                          <p>
                            W przypadku uznania reklamacji, Usługodawca podejmie działania mające na celu usunięcie 
                            nieprawidłowości lub zwrot proporcjonalnej części wynagrodzenia.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.section>

                  {/* §8. Postanowienia końcowe */}
                  <motion.section
                    id="section-8"
                    ref={(el) => (sectionsRef.current["section-8"] = el)}
                    className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Gavel className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          §8. Postanowienia końcowe
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-neutral-300 leading-relaxed">
                          <p>
                            <strong className="text-white">Prawo właściwe:</strong> Do wszelkich spraw wynikających z 
                            niniejszego Regulaminu oraz umów o świadczenie usług stosuje się prawo polskie.
                          </p>
                          <p>
                            <strong className="text-white">Rozstrzyganie sporów:</strong> W przypadku sporów, strony 
                            dążą do ich polubownego rozwiązania. W razie braku porozumienia, spory rozstrzygane są przez 
                            sądy właściwe dla siedziby Usługodawcy.
                          </p>
                          <p>
                            <strong className="text-white">Zmiany Regulaminu:</strong> Usługodawca zastrzega sobie prawo 
                            do wprowadzania zmian w Regulaminie. O zmianach Klienci będą informowani poprzez publikację 
                            nowej wersji Regulaminu w Serwisie.
                          </p>
                          <p>
                            Zmiany Regulaminu nie mają wpływu na umowy zawarte przed ich wprowadzeniem, chyba że Klient 
                            wyrazi zgodę na zastosowanie nowych postanowień.
                          </p>
                          <p>
                            <strong className="text-white">Postanowienia szczególne:</strong> W przypadku rozbieżności 
                            między Regulaminem a umową o świadczenie usług, pierwszeństwo ma umowa.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                </div>

                {/* Download PDF Button */}
                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <button
                    onClick={() => {
                      // Placeholder - można dodać funkcjonalność generowania PDF w przyszłości
                      alert("Funkcjonalność pobierania PDF będzie dostępna wkrótce.");
                    }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-sans font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    <span>Pobierz jako PDF</span>
                  </button>
                </motion.div>

                {/* Footer Note */}
                <motion.div
                  className="mt-12 p-6 md:p-8 bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-sm md:text-base text-neutral-400 font-sans">
                    Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-neutral-500 mt-2 font-sans">
                    Regulamin wchodzi w życie z dniem publikacji w Serwisie.
                  </p>
                </motion.div>
              </div>
            </div>
          </Container>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

