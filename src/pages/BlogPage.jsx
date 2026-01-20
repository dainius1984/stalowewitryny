import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Calendar } from "lucide-react";

/**
 * Blog Page - Main blog listing page
 * Displays all blog posts with previews
 */
export function BlogPage() {
  // Update meta tags for SEO
  useEffect(() => {
    document.title = "Blog - Baza wiedzy o stronach internetowych | Stalowe Witryny";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Przeczytaj artykuły o tworzeniu stron internetowych, cenach, SEO i technologiach. Baza wiedzy dla firm z Wrocławia i Dolnego Śląska.');
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://stalowewitryny.pl/blog');
  }, []);

  const blogPosts = [
    {
      slug: "ile-kosztuje-strona-internetowa-wroclaw",
      title: "Ile kosztuje strona internetowa we Wrocławiu? Cennik 2026",
      excerpt: "Sprawdź aktualne ceny tworzenia stron www we Wrocławiu. Dowiedz się, dlaczego warto wybrać stronę w React bez abonamentu. Przejrzysty cennik Stalowych Witryn.",
      date: "2026-01-05",
      category: "Cennik",
    },
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
            {/* Breadcrumb */}
            <motion.nav
              className="mb-8 text-sm text-neutral-300 font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="hover:text-primary transition-colors">
                Strona główna
              </Link>
              <span className="mx-2">/</span>
              <span className="text-neutral-400">Blog</span>
            </motion.nav>

            {/* Page Header */}
            <motion.header
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans mb-6 leading-tight">
                Blog - Baza wiedzy
              </h1>
              <p className="text-lg md:text-xl text-neutral-300 font-sans max-w-3xl mx-auto leading-relaxed">
                Przeczytaj artykuły o tworzeniu stron internetowych, cenach, SEO i technologiach dla firm z Wrocławia i Dolnego Śląska.
              </p>
            </motion.header>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block group">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full font-sans">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-neutral-300 font-sans leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-neutral-400 font-sans">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('pl-PL', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </time>
                    </div>
                    
                    <div className="mt-6 flex items-center text-primary font-sans font-medium group-hover:gap-2 transition-all">
                      Czytaj więcej
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Back to home */}
            <motion.div
              className="text-center pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link 
                to="/"
                className="text-primary hover:text-primary/80 font-sans font-medium inline-flex items-center gap-2 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Powrót do strony głównej
              </Link>
            </motion.div>
          </Container>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
