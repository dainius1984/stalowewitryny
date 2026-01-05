import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accordion Component
 * Collapsible content sections with smooth animations
 */
export function Accordion({ items, defaultOpen = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={index}
            className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleItem(index)}
              className={cn(
                "w-full flex items-center justify-between p-6 md:p-8 text-left",
                "hover:bg-white/5 transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset"
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
            >
              <div className="flex items-center gap-4 flex-1">
                {item.icon && (
                  <div className="flex-shrink-0 text-primary">
                    {item.icon}
                  </div>
                )}
                <h3 className="text-lg md:text-xl font-bold text-white font-sans">
                  {item.title}
                </h3>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 ml-4"
              >
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              </motion.div>
            </button>

            {/* Accordion Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                    <div className="text-base md:text-lg text-neutral-300 font-sans leading-relaxed space-y-4">
                      {item.content}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

