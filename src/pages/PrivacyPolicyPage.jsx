import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Accordion } from "@/components/ui/Accordion";
import { Shield, Building2, Mail, Cookie, Lock, Scale } from "lucide-react";

/**
 * Company Data
 * Easy to edit company information
 */
const companyData = {
  name: "ChmielIT Marcin Chmielnicki",
  address: "ul. Sarbinowska 15/5, 54-320 Wrocław",
  nip: "8942751087",
  email: "[WSTAW_SWÓJ_EMAIL_TUTAJ]", // TODO: Replace with actual email
};

/**
 * Privacy Policy Page
 * RODO-compliant privacy policy page with accordion sections
 */
export function PrivacyPolicyPage() {
  const accordionItems = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Administrator Danych",
      content: (
        <>
          <p>
            Administratorem danych osobowych przetwarzanych w związku z korzystaniem ze strony internetowej 
            <strong className="text-white"> Stalowe Witryny</strong> jest:
          </p>
          <div className="bg-neutral-900/50 rounded-xl p-6 border border-white/10 mt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Pełna nazwa:</p>
                  <p className="text-neutral-300">{companyData.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Adres:</p>
                  <p className="text-neutral-300">{companyData.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">NIP:</p>
                  <p className="text-neutral-300">{companyData.nip}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Kontakt e-mail:</p>
                  <a 
                    href={`mailto:${companyData.email}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {companyData.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Cele Przetwarzania Danych",
      content: (
        <>
          <p className="mb-4">
            Przetwarzamy Twoje dane osobowe w następujących celach:
          </p>
          <ul className="list-disc list-inside space-y-3 ml-2">
            <li>
              <strong className="text-white">Formularz kontaktowy:</strong> Przetwarzanie danych 
              (imię, nazwisko, adres e-mail, numer telefonu, treść wiadomości) w celu odpowiedzi 
              na Twoje pytania i realizacji zapytań ofertowych.
            </li>
            <li>
              <strong className="text-white">Analityka strony:</strong> Zbieranie danych o sposobie 
              korzystania ze strony internetowej (adres IP, typ przeglądarki, czas wizyty) za pomocą 
              narzędzi analitycznych (Google Analytics) w celu poprawy funkcjonalności strony.
            </li>
          </ul>
          <p className="mt-4 text-sm text-neutral-400">
            Podstawą prawną przetwarzania jest Twoja zgoda (art. 6 ust. 1 lit. a RODO) oraz 
            prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO).
          </p>
        </>
      ),
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: "Pliki Cookies",
      content: (
        <>
          <p className="mb-4">
            Nasza strona internetowa wykorzystuje pliki cookies (ciasteczka) w następujących celach:
          </p>
          <div className="space-y-4">
            <div className="bg-neutral-900/50 rounded-xl p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">Google Analytics</h4>
              <p className="text-neutral-300 text-sm">
                Używamy Google Analytics do analizy ruchu na stronie. Pliki cookies zbierają 
                anonimowe informacje o sposobie korzystania ze strony, co pozwala nam na 
                poprawę jej funkcjonalności i treści.
              </p>
            </div>
            <div className="bg-neutral-900/50 rounded-xl p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">Pliki sesyjne</h4>
              <p className="text-neutral-300 text-sm">
                Pliki cookies sesyjne są niezbędne do prawidłowego działania strony internetowej 
                i są automatycznie usuwane po zamknięciu przeglądarki.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-neutral-400">
            Możesz w każdej chwili zmienić ustawienia dotyczące plików cookies w swojej przeglądarce. 
            Pamiętaj jednak, że wyłączenie niektórych plików cookies może wpłynąć na funkcjonalność strony.
          </p>
        </>
      ),
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Prawa Użytkownika",
      content: (
        <>
          <p className="mb-4">
            Zgodnie z Rozporządzeniem RODO, przysługują Ci następujące prawa:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <strong className="text-white">Prawo do dostępu do danych (art. 15 RODO):</strong>
                <p className="text-neutral-300 mt-1">
                  Masz prawo uzyskać informację o tym, jakie dane osobowe Cię dotyczą i w jaki sposób 
                  są przetwarzane.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <strong className="text-white">Prawo do sprostowania danych (art. 16 RODO):</strong>
                <p className="text-neutral-300 mt-1">
                  Możesz żądać poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych osobowych.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <strong className="text-white">Prawo do usunięcia danych - "prawo do bycia zapomnianym" (art. 17 RODO):</strong>
                <p className="text-neutral-300 mt-1">
                  Możesz żądać usunięcia swoich danych osobowych, gdy nie są już niezbędne do celów, 
                  dla których zostały zebrane, lub gdy cofniesz zgodę na ich przetwarzanie.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <strong className="text-white">Prawo do ograniczenia przetwarzania (art. 18 RODO):</strong>
                <p className="text-neutral-300 mt-1">
                  Możesz żądać ograniczenia przetwarzania danych w określonych sytuacjach.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <strong className="text-white">Prawo do przenoszenia danych (art. 20 RODO):</strong>
                <p className="text-neutral-300 mt-1">
                  Możesz otrzymać swoje dane osobowe w ustrukturyzowanym, powszechnie używanym formacie.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <strong className="text-white">Prawo do sprzeciwu (art. 21 RODO):</strong>
                <p className="text-neutral-300 mt-1">
                  Możesz wnieść sprzeciw wobec przetwarzania danych opartego na prawnie uzasadnionym 
                  interesie administratora.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <strong className="text-white">Prawo do cofnięcia zgody (art. 7 ust. 3 RODO):</strong>
                <p className="text-neutral-300 mt-1">
                  W przypadku przetwarzania danych na podstawie zgody, możesz ją w każdej chwili cofnąć.
                </p>
              </div>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
            <p className="text-sm text-neutral-300">
              <strong className="text-white">Aby skorzystać z powyższych praw, skontaktuj się z nami:</strong>
              <br />
              E-mail: <a href={`mailto:${companyData.email}`} className="text-primary hover:text-primary/80">{companyData.email}</a>
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Efekt ziarna na tle */}
      <div className="bg-grain" />
      
      <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
        <Navbar isModalOpen={false} />
        
        <main className="pt-24 md:pt-28 flex-grow relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>

          <Container className="relative z-10 py-12 md:py-16">
            {/* Page Header */}
            <motion.div
              className="mb-12 md:mb-16 text-center"
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
                <Shield className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans mb-6 bg-gradient-to-r from-white via-white to-primary/80 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Polityka Prywatności
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-neutral-400 mt-4 font-sans max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Informujemy, że przetwarzamy Twoje dane osobowe zgodnie z Rozporządzeniem 
                Ogólnym o Ochronie Danych Osobowych (RODO).
              </motion.p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              className="mb-12 bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-base md:text-lg text-neutral-300 font-sans leading-relaxed">
                Szanujemy Twoją prywatność i zobowiązujemy się do ochrony Twoich danych osobowych. 
                Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób zbieramy, wykorzystujemy i chronimy 
                informacje, które przekazujesz nam podczas korzystania ze strony internetowej{" "}
                <strong className="text-white">Stalowe Witryny</strong>.
              </p>
            </motion.div>

            {/* Accordion Sections */}
            <Accordion items={accordionItems} defaultOpen={0} />

            {/* Footer Note */}
            <motion.div
              className="mt-12 p-6 md:p-8 bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-sm md:text-base text-neutral-400 font-sans">
                Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-neutral-500 mt-2 font-sans">
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. 
                O wszelkich zmianach będziemy informować na tej stronie.
              </p>
            </motion.div>
          </Container>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

