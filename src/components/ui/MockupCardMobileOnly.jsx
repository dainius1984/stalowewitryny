/**
 * MockupCardMobileOnly Component - SIMPLIFIED FOR MOBILE
 * Simple card displaying one image
 */
import { motion } from "framer-motion";

export function MockupCardMobileOnly({ images, alt, project, onClick, className }) {
  const image = images && images.length > 0 ? images[0] : null;

  if (!image) {
    return (
      <div className="w-full h-[30vh] min-h-[220px] bg-neutral-900 rounded-xl flex items-center justify-center">
        <div className="text-neutral-500 text-sm">Brak obrazu</div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-[30vh] min-h-[220px] relative ${className || ''}`}
      style={{
        backgroundColor: '#18181b',
      }}
      onClick={() => onClick && project && onClick(project)}
    >
      <motion.div
        className="relative w-full h-full border-[3px] rounded-xl bg-neutral-900 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute overflow-hidden bg-neutral-950 flex items-center justify-center"
          style={{
            width: 'calc(100% - 12px)',
            height: 'calc(100% - 12px + 20px)',
            top: '6px',
            left: '6px',
            marginTop: '-20px',
            borderRadius: '0.5rem',
          }}
        >
          <img
            src={image}
            alt={alt || "Portfolio image"}
            draggable={false}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            loading="eager"
          />
        </div>

        <div className="absolute inset-0 border-[3px] rounded-xl border-white/30 pointer-events-none" />
      </motion.div>
    </div>
  );
}
