import { motion, useReducedMotion } from "motion/react";

interface Props {
  /** Caminho base SEM extensão nem sufixo de tamanho — ex: "/imagens/casamento" */
  basePath: string;
  /** Fallback .jpg para navegadores sem WebP */
  jpgFallback: string;
  /** Habilita Ken Burns (zoom infinito) */
  kenBurns?: boolean;
  /** Marca esta imagem como LCP candidate (priorizar) */
  priority?: boolean;
  alt?: string;
  className?: string;
  /** Camadas de overlay aplicadas em cima da imagem */
  overlayClassName?: string;
  /** object-position CSS — default "center" */
  objectPosition?: string;
}

/**
 * Hero responsivo com <picture> + srcset (WebP 640/1280/1920).
 * Substitui .hero-bg de fundo CSS por uma imagem real otimizada.
 */
export function HeroPicture({
  basePath,
  jpgFallback,
  kenBurns = false,
  priority = false,
  alt = "",
  className = "",
  overlayClassName = "",
  objectPosition = "center 30%",
}: Props) {
  const reduce = useReducedMotion();
  const animate = kenBurns && !reduce;

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <motion.picture
        className="block h-full w-full"
        initial={animate ? { scale: 1 } : false}
        animate={animate ? { scale: 1.08 } : undefined}
        transition={
          animate
            ? {
                duration: 24,
                ease: "easeOut",
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
      >
        <source
          type="image/webp"
          srcSet={`${basePath}-640.webp 640w, ${basePath}-1280.webp 1280w, ${basePath}-1920.webp 1920w`}
          sizes="100vw"
        />
        <img
          src={jpgFallback}
          alt={alt}
          aria-hidden={alt === "" ? true : undefined}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      </motion.picture>

      {/* Overlay sage (mesma intenção do antigo .hero-bg) */}
      <div
        aria-hidden
        className={`absolute inset-0 ${overlayClassName || "bg-[radial-gradient(ellipse_at_center,rgba(40,50,30,0.45)_0%,rgba(30,40,22,0.78)_100%)]"}`}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[rgba(30,40,22,0.55)] via-[rgba(40,50,30,0.45)] to-[rgba(30,40,22,0.85)]"
      />

      {/* Grão analógico */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </div>
  );
}
