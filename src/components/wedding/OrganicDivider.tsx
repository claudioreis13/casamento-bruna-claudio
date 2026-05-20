import { motion, useReducedMotion } from "motion/react";

/**
 * Divisor orgânico: um ramo desenhado em SVG que se traça com stroke-dasharray
 * quando entra no viewport. Substitui o `<hr>` invisível.
 */
export function OrganicDivider({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`flex w-full items-center justify-center py-6 ${className ?? ""}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 240 40"
        fill="none"
        className="h-10 w-60 text-primary-dark/50"
      >
        {/* haste central */}
        <motion.path
          d="M10 20 H230"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* folhas */}
        <motion.path
          d="M120 20 C110 10, 95 8, 85 14 C95 18, 110 18, 120 20 Z"
          fill="currentColor"
          fillOpacity="0.4"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "120px 20px" }}
        />
        <motion.path
          d="M120 20 C130 30, 145 32, 155 26 C145 22, 130 22, 120 20 Z"
          fill="currentColor"
          fillOpacity="0.4"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "120px 20px" }}
        />
        {/* botão central */}
        <motion.circle
          cx="120"
          cy="20"
          r="2"
          fill="currentColor"
          initial={reduce ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
      </svg>
    </div>
  );
}
