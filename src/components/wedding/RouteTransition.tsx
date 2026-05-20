import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Transição suave entre rotas. Usa o pathname como key para forçar
 * o ciclo enter/exit. Respeita reduced-motion.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
