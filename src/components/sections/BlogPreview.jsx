import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Calendar } from "lucide-react";

/**
 * Blog Preview Section
 * Displays latest blog post preview on homepage
 */
export function BlogPreview() {
  const latestPost = {
    slug: "ile-kosztuje-strona-internetowa-wroclaw",
    title: "Ile kosztuje strona internetowa we Wrocławiu? Cennik 2026",
    excerpt: "Sprawdź aktualne ceny tworzenia stron www we Wrocławiu. Dowiedz się, dlaczego warto wybrać stronę w React bez abonamentu. Przejrzysty cennik Stalowych Witryn.",
    date: "2026-01-05",
    category: "Cennik",
  };

  return (
    <section className="py-16 md:py-20 relative">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sans mb-4">
            Aktualności / Blog
          </h2>
          <p className="text-lg text-neutral-300 font-sans max-w-2xl mx-auto">
            Przeczytaj najnowsze artykuły o tworzeniu stron internetowych, cenach i technologiach.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to={`/blog/${latestPost.slug}`}
            className="block bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full font-sans">
                    {latestPost.category}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white font-sans mb-4 group-hover:text-primary transition-colors">
                  {latestPost.title}
                </h3>
                
                <p className="text-neutral-300 font-sans leading-relaxed mb-6">
                  {latestPost.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-neutral-400 font-sans mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={latestPost.date}>
                      {new Date(latestPost.date).toLocaleDateString('pl-PL', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>
                </div>
                
                <div className="flex items-center text-primary font-sans font-medium group-hover:gap-2 transition-all">
                  Czytaj więcej
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          <div className="mt-8 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center text-neutral-300 hover:text-primary font-sans font-medium transition-colors"
            >
              Zobacz wszystkie artykuły
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
