import { useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useState, type RefObject } from "react";

/**
 * Parallax vertical baseado no progresso do elemento dentro do viewport.
 * - Respeita prefers-reduced-motion (retorna 0).
 * - Reduz intensidade no mobile (~40%) para não pesar.
 *
 * @param ref       Ref do elemento alvo (geralmente o container da seção).
 * @param distance  Deslocamento máximo em px (desktop). Positivo = desce, negativo = sobe.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance = 60,
): MotionValue<number> {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const factor = reduce ? 0 : isMobile ? 0.4 : 1;
  return useTransform(scrollYProgress, [0, 1], [-distance * factor, distance * factor]);
}
