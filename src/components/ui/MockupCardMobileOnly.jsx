/**
 * MockupCardMobileOnly Component - SIMPLIFIED FOR MOBILE
 * Simple card displaying one image
 */
import { motion } from "framer-motion";

export function MockupCardMobileOnly({ images, alt, project, onClick, className }) {
  const image = images && images.length > 0 ? images[0] : null;

  if (!image) {
    return (
      <div className="w-full h-[35vh] min-h-[240px] max-h-[280px] -mt-5 bg-neutral-900 rounded-xl flex items-center justify-center">
        <div className="text-neutral-300 text-xs">Brak obrazu</div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-[35vh] min-h-[240px] max-h-[280px] -mt-5 relative cursor-pointer ${className || ''}`}
      style={{
        backgroundColor: '#18181b',
      }}
      onClick={() => onClick && project && onClick(project)}
    >
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={image}
          alt={alt || "Portfolio image"}
          draggable={false}
          className="w-full h-full object-cover object-center"
          style={{
            display: 'block',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={(e) => {
            console.error('Image failed to load:', image);
            e.target.style.display = "none";
            const parent = e.target.parentElement;
            if (parent) {
              parent.style.background = "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)";
              parent.style.display = "flex";
              parent.style.alignItems = "center";
              parent.style.justifyContent = "center";
            }
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', image);
          }}
        />
        <div className="absolute inset-0 border-2 rounded-xl border-white/20 pointer-events-none" />
      </motion.div>
    </div>
  );
}
