import { motion, useReducedMotion } from "motion/react";

/**
 * Headline que se monta letra por letra (split text premium).
 * Preserva espaços e acessibilidade via aria-label.
 */
export function SplitHeadline({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const chars = Array.from(text);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.04, delayChildren: delay },
        },
      }}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: "0.4em", filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.span>
  );
}
