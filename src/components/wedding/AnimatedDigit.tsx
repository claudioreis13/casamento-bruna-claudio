import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Dígito que rola verticalmente quando muda (flipboard premium).
 */
export function AnimatedDigit({ value }: { value: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className="tabular-nums">{value}</span>;
  }

  return (
    <span className="relative inline-block overflow-hidden align-baseline tabular-nums">
      {/* Reserva espaço com width estável usando o próprio glyph invisível */}
      <span aria-hidden className="invisible block">
        {value}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
