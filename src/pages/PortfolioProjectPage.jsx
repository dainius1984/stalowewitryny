import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { portfolioProjects } from "@/data/portfolioProjects";
import { BASE_URL } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

/**
 * Dynamiczna podstrona portfolio: /portfolio/[slug]
 * SEO: unikalny meta title/description, canonical, sekcje Wyzwanie / Rozwiązanie / Technologie.
 */
export function PortfolioProjectPage() {
  const { slug } = useParams();
  const project = portfolioProjects.find((p) => p.slug === slug);

  useEffect(() => {
    if (!project) return;
    document.title = project.metaTitle || `Projekt i wdrożenie strony: ${project.title} | Stalowe Witryny`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", project.metaDescription || "");
    else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = project.metaDescription || "";
      document.head.appendChild(meta);
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}/portfolio/${project.slug}`);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
        <div className="bg-grain" />
        <Navbar isModalOpen={false} />
        <main className="pt-24 md:pt-28 flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Projekt nie znaleziony</h1>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Wróć do portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            {/* Breadcrumb */}
            <motion.nav
              className="mb-8 text-sm text-neutral-400 font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              aria-label="Nawigacja"
            >
              <Link to="/" className="hover:text-white transition-colors">Strona główna</Link>
              <span className="mx-2">/</span>
              <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{project.title}</span>
            </motion.nav>

            {/* Hero: H1 + kategoria + zdjęcie */}
            <motion.header
              className="mb-12 md:mb-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary border border-primary/40 rounded-full font-sans mb-6">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans mb-6 bg-gradient-to-r from-white via-white to-primary/80 bg-clip-text text-transparent">
                Projekt i wdrożenie strony: {project.title}
              </h1>
              {project.description && (
                <p className="text-lg text-neutral-300 font-sans max-w-2xl mb-8">
                  {project.description}
                </p>
              )}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/50">
                <img
                  src={project.image}
                  alt={`Strona internetowa ${project.title} - realizacja Stalowe Witryny`}
                  className="w-full h-auto object-cover object-top"
                  loading="eager"
                />
              </div>
            </motion.header>

            {/* Sekcje: Wyzwanie, Rozwiązanie, Technologie */}
            <div className="grid md:grid-cols-1 gap-10 md:gap-14 max-w-3xl">
              {project.challenge && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-xl font-bold text-white font-sans mb-4">Wyzwanie</h2>
                  <p className="text-neutral-300 font-sans leading-relaxed">{project.challenge}</p>
                </motion.section>
              )}
              {project.solution && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-xl font-bold text-white font-sans mb-4">Rozwiązanie</h2>
                  <p className="text-neutral-300 font-sans leading-relaxed">{project.solution}</p>
                </motion.section>
              )}
              {project.technologies && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-white font-sans mb-4">Technologie</h2>
                  <p className="text-neutral-300 font-sans leading-relaxed">{project.technologies}</p>
                </motion.section>
              )}
            </div>

            {/* CTA: Odwiedź stronę */}
            <motion.div
              className="mt-12 md:mt-16 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-sans font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Odwiedź stronę
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-sans font-medium rounded-full border border-white/10 hover:bg-white/10 transition-all"
              >
                Wszystkie realizacje
              </Link>
            </motion.div>

            {/* Local SEO: Realizacja dla firmy z Wrocławia */}
            {project.location && (
              <motion.aside
                className="mt-16 pt-8 border-t border-white/10 text-center md:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p className="text-sm text-neutral-400 font-sans">
                  Realizacja strony dla firmy z Wrocławia – {project.location}.
                </p>
              </motion.aside>
            )}
          </Container>
        </main>

        <Footer />
      </div>
    </>
  );
}
