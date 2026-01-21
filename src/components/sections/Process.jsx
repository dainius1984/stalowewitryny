import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Analiza",
    description: "Poznaję Twój biznes i cele sprzedażowe. Bez strategii nie ma efektów.",
    image: "/img/Analysis.webp",
    alt: "Analiza biznesowa - tania strona www Wrocław, szybki kod React, projektowanie stron Dolny Śląsk",
  },
  {
    number: "02",
    title: "Projekt",
    description: "Tworzę unikalny design UX/UI. Twoja strona nie będzie wyglądać jak tysiące innych.",
    image: "/img/Design Project.webp",
    alt: "Projektowanie UX/UI - tania strona www Wrocław, szybki kod React, projektowanie stron Dolny Śląsk",
  },
  {
    number: "03",
    title: "Kodowanie",
    description: "Piszę czysty kod od zera. Żadnych ciężkich wtyczek, tylko czysta szybkość i bezpieczeństwo.",
    image: "/img/Coding.webp",
    alt: "Kodowanie strony internetowej - tania strona www Wrocław, szybki kod React, projektowanie stron Dolny Śląsk",
  },
  {
    number: "04",
    title: "Wsparcie",
    description: "Opiekuję się Twoją stroną po wdrożeniu. Jestem Twoim partnerem technologicznym.",
    image: "/img/Security.webp",
    alt: "Wsparcie techniczne - tania strona www Wrocław, szybki kod React, projektowanie stron Dolny Śląsk",
  },
];

/**
 * Premium Process Card with glassmorphic design and hover effects
 */
function ProcessCard({ step, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-neutral-900/10 backdrop-blur-xl" />
      
      {/* Gradient Border Glow */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl p-[1px] transition-opacity duration-500",
          "bg-gradient-to-br from-primary/30 via-primary/10 to-transparent",
          isHovered ? "opacity-100" : "opacity-40"
        )}
      >
        <div className="absolute inset-[1px] rounded-2xl bg-black/40 backdrop-blur-xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-8 md:p-10 min-h-[420px]">
        {/* Large Background Number with Outline Effect */}
        <div 
          className="absolute top-6 right-6 text-[140px] md:text-[160px] font-black leading-none font-sans select-none pointer-events-none"
          style={{
            WebkitTextStroke: '2px rgba(163, 230, 53, 0.1)',
            WebkitTextFillColor: 'transparent',
            opacity: 0.15,
          }}
        >
          {step.number}
        </div>

        {/* Floating Icon with Glow Effect */}
        <motion.div
          className="relative mb-8 w-full h-56 flex items-center justify-center"
          animate={isHovered ? {
            y: [-5, 5, -5],
            scale: 1.1,
          } : {
            y: 0,
            scale: 1,
          }}
          transition={{
            y: {
              duration: 3,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            },
            scale: {
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }
          }}
        >
          <img
            src={step.image}
            srcSet={`${step.image.replace('.webp', '-small.webp')} 400w, ${step.image.replace('.webp', '-medium.webp')} 800w, ${step.image} 1200w`}
            sizes="(max-width: 640px) 250px, (max-width: 1024px) 350px, 450px"
            alt={step.alt || `${step.title} - proces tworzenia taniej i solidnej strony internetowej dla firm`}
            className="max-w-[85%] max-h-full object-contain drop-shadow-[0_0_25px_rgba(163,230,53,0.4)]"
            style={{
              filter: isHovered 
                ? 'drop-shadow(0 0 35px rgba(163, 230, 53, 0.6)) drop-shadow(0 0 15px rgba(163, 230, 53, 0.4))' 
                : 'drop-shadow(0 0 25px rgba(163, 230, 53, 0.4))',
              transition: 'filter 0.4s ease',
            }}
            loading="lazy"
            onError={(e) => {
              // Fallback to placeholder if image doesn't exist
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%2318181b' width='400' height='300'/%3E%3Ctext fill='%2366' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E" + encodeURIComponent(step.title) + "%3C/text%3E%3C/svg%3E";
            }}
          />
        </motion.div>

        {/* Title with Gradient on Hover */}
        <motion.h3 
          className={cn(
            "text-2xl md:text-3xl font-bold font-sans mb-4 transition-all duration-300",
            isHovered ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/90 to-white" : "text-white"
          )}
        >
          {step.title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-sm md:text-base text-neutral-300 font-sans leading-relaxed max-w-sm"
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step.description}
        </motion.p>

        {/* Bottom Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

/**
 * Process Section - Premium High-Tech Design
 */
export function Process() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInSection, setIsMouseInSection] = useState(false);
  const sectionRef = useRef(null);
  const cachedRect = useRef(null);
  const rafId = useRef(null);

  // Cache rect on mount and window resize (prevents forced reflow)
  useEffect(() => {
    const updateRect = () => {
      if (sectionRef.current) {
        cachedRect.current = sectionRef.current.getBoundingClientRect();
      }
    };
    
    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  const handleMouseMove = (e) => {
    // Cancel previous frame if still pending
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    // Batch reads and writes in requestAnimationFrame
    rafId.current = requestAnimationFrame(() => {
      if (!cachedRect.current) {
        cachedRect.current = e.currentTarget.getBoundingClientRect();
      }
      
      setMousePosition({
        x: e.clientX - cachedRect.current.left,
        y: e.clientY - cachedRect.current.top,
      });
    });
  };
  
  const handleMouseEnter = () => {
    setIsMouseInSection(true);
    // Update cached rect on enter
    if (sectionRef.current) {
      cachedRect.current = sectionRef.current.getBoundingClientRect();
    }
  };
  
  const handleMouseLeave = () => {
    setIsMouseInSection(false);
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="proces" 
      className="py-16 md:py-24 bg-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Spotlight Background */}
      {isMouseInSection && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(163, 230, 53, 0.06), transparent 40%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-sm uppercase tracking-widest text-primary font-semibold font-sans">
              Proces Realizacji
            </span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-sans mb-6 bg-gradient-to-r from-white via-white to-primary/80 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Dlaczego ręcznie kodowana witryna to zysk dla Twojej firmy?
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-neutral-300 mt-6 font-sans max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Każda <strong className="text-white">szybka witryna dla biznesu</strong> powstaje w 4 krokach. 
            Tworzę <strong className="text-primary">strony na własność</strong> – bez ukrytych kosztów, bez abonamentu. 
            Każda strona wyposażona jest w <strong className="text-primary">Google Analytics</strong> – profesjonalne narzędzie do analizy ruchu i optymalizacji konwersji.
          </motion.p>
        </motion.div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <ProcessCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
