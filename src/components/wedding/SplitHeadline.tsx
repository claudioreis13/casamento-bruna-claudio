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
  

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  // Split por palavras; cada palavra é nowrap para não quebrar no meio
  const words = text.split(" ");

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
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((c, i) => (
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
              {c}
            </motion.span>
          ))}
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
