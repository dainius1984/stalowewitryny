import React from 'react';
import { Container } from "@/components/ui/Container";

const SEOContent = () => {
  return (
    <section className="py-16 md:py-20 bg-black relative">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-sans">
            Tanie strony internetowe Wrocław – Szybkość React i brak abonamentu
          </h2>
          
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-neutral-300 font-sans">
            <p>
              Szukasz sposobu na skuteczną promocję swojej firmy w stolicy Dolnego Śląska? 
              <strong className="text-white"> Stalowe Witryny</strong> to nie tylko kolejna agencja – to Twoje wsparcie 
              w tworzeniu nowoczesnych i <strong className="text-primary">tanich stron internetowych we Wrocławiu</strong>. 
              Moje podejście opiera się na czystym kodzie React, co gwarantuje, że Twoja witryna 
              będzie ładować się błyskawicznie, deklasując konkurencję opartą na ciężkich systemach WordPress.
            </p>

            <p>
              Wyróżnia mnie unikalna oferta: <strong className="text-primary">gotowy prototyp strony w 30 minut</strong>. 
              Jako lokalny deweloper z Wrocławia, rozumiem potrzeby małych i średnich przedsiębiorstw. 
              Moje strony są <strong className="text-white">bez abonamentu</strong> – płacisz raz i otrzymujesz pełną własność kodu. 
              To najtańsze rozwiązanie w dłuższej perspektywie, ponieważ nie musisz martwić się 
              o płatne wtyczki czy drogie aktualizacje.
            </p>

            <p>
              Działam na terenie całego <strong className="text-white">Dolnego Śląska</strong>. Moje 
              <strong className="text-primary"> szybkie strony internetowe</strong> pomagają lokalnym biznesom zyskać 
              wysokie pozycje w wyszukiwarce Google dzięki optymalizacji SEO pod konkretne 
              dzielnice Wrocławia (Stare Miasto, Fabryczna, Krzyki, Psie Pole) oraz okoliczne miasta.
            </p>

            <p>
              Wśród moich realizacji znajdziesz strony dla różnych branż – od usług sprzątających, 
              przez salony kosmetyczne, aż po firmy ogrodnicze. Przykładem może być strona dla 
              <a 
                href="https://www.zielonemile.pl/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline font-medium"
                title="Zielone Mile - projektowanie ogrodów i tarasów Wrocław"
              >
                Zielone Mile
              </a>
              – firmy specjalizującej się w projektowaniu ogrodów i tarasów we Wrocławiu. 
              Każda realizacja to <strong className="text-white">strona na własność</strong>, 
              bez miesięcznych opłat i z pełną kontrolą nad kodem źródłowym.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white font-sans">
              Obsługiwane lokalizacje na Dolnym Śląsku:
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm md:text-base text-neutral-400 font-sans">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Wrocław</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Legnica</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Lubin</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Świdnica</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Oleśnica</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Oława</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Dzierżoniów</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>Jelcz-Laskowice</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SEOContent;

