import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CompanySurvey } from "@/components/sections/CompanySurvey";
import { useState } from "react";

/**
 * Contact Page (Kontakt)
 * Contact form page
 */
export function ContactPage() {
  const [isSurveyOpen, setIsSurveyOpen] = useState(true);

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
                Kontakt
              </motion.p>
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-sans mb-6 bg-gradient-to-r from-white via-white to-primary/80 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Darmowa Wycena Strony
              </motion.h1>
              <motion.p
                className="text-lg text-neutral-400 mt-4 font-sans max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Wypełnij formularz poniżej, a otrzymasz <strong className="text-primary">bezpłatną wycenę</strong> 
                w ciągu 24 godzin. Bez zobowiązań, bez ukrytych kosztów.
              </motion.p>
            </motion.div>
          </Container>

          {/* Contact Form */}
          <CompanySurvey 
            isOpen={isSurveyOpen} 
            onClose={() => setIsSurveyOpen(false)} 
            isFullPage={true}
          />
        </main>
        
        <Footer />
      </div>
    </>
  );
}

