import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

type Photo = {
  src: string;
  alt: string;
  /** Altura relativa no grid — controla a "quebra" masonry. */
  span: "tall" | "short" | "medium";
};

/**
 * Galeria editorial — 8 fotos.
 *
 * Para substituir os placeholders, basta colocar os arquivos em:
 *   public/imagens/galeria/momento-01.jpg ... momento-08.jpg
 * (mantendo os mesmos nomes). Nenhuma alteração de código é necessária.
 */
const PHOTOS: Photo[] = [
  { src: "/imagens/galeria/momento-01.jpg", alt: "Momento 1", span: "tall" },
  { src: "/imagens/galeria/momento-02.jpg", alt: "Momento 2", span: "short" },
  { src: "/imagens/galeria/momento-03.jpg", alt: "Momento 3", span: "medium" },
  { src: "/imagens/galeria/momento-04.jpg", alt: "Momento 4", span: "tall" },
  { src: "/imagens/galeria/momento-05.jpg", alt: "Momento 5", span: "medium" },
  { src: "/imagens/galeria/momento-06.jpg", alt: "Momento 6", span: "short" },
  { src: "/imagens/galeria/momento-07.jpg", alt: "Momento 7", span: "medium" },
  { src: "/imagens/galeria/momento-08.jpg", alt: "Momento 8", span: "tall" },
];

const spanClasses: Record<Photo["span"], string> = {
  tall: "aspect-[3/4]",
  medium: "aspect-[4/5]",
  short: "aspect-[4/3]",
};

function PlaceholderArt({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-secondary/40 via-card to-primary/10">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="h-8 w-8 text-primary-dark/40"
      >
        <path d="M3 7a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
      <span className="mt-4 text-[9px] font-semibold uppercase tracking-editorial-lg text-primary-dark/50">
        Foto {String(index + 1).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] font-light italic text-primary-dark/40">
        em breve
      </span>
    </div>
  );
}

export function Gallery() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length,
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <Reveal>
            <span className="tracking-editorial-lg text-[10px] uppercase text-primary-dark/60">
              Galeria
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mt-6 font-display text-4xl font-light italic leading-tight text-primary-dark sm:text-5xl md:text-6xl">
              Momentos da nossa história
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mx-auto mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-primary/30" />
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-3 w-3 text-primary-dark/60"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="h-px w-12 bg-primary/30" />
            </div>
          </Reveal>
        </div>

        {/* Masonry via CSS columns — naturalmente editorial e responsivo */}
        <div className="columns-2 gap-4 md:columns-3 md:gap-6">
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 4) * 0.08} y={24}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className={`group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-secondary/20 md:mb-6 ${spanClasses[photo.span]}`}
                aria-label={`Abrir ${photo.alt}`}
              >
                <PlaceholderArt index={i} />
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setLoaded((s) => ({ ...s, [i]: true }))}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  className={`relative h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 ${loaded[i] ? "opacity-100" : "opacity-0"}`}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-dark/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Visualização ampliada"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(null);
              }}
              className="absolute right-6 top-6 text-background/80 transition-colors hover:text-background"
              aria-label="Fechar"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(
                  (i) =>
                    i === null
                      ? null
                      : (i - 1 + PHOTOS.length) % PHOTOS.length,
                );
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-background/70 transition-colors hover:text-background sm:left-8"
              aria-label="Foto anterior"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) =>
                  i === null ? null : (i + 1) % PHOTOS.length,
                );
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-background/70 transition-colors hover:text-background sm:right-8"
              aria-label="Próxima foto"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <motion.div
              className="relative max-h-[85vh] max-w-5xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex aspect-[3/4] max-h-[85vh] w-auto items-center justify-center bg-card/10">
                <PlaceholderArt index={openIndex} />
                <img
                  src={PHOTOS[openIndex].src}
                  alt={PHOTOS[openIndex].alt}
                  className="relative max-h-[85vh] w-auto max-w-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <p className="mt-4 text-center text-[10px] uppercase tracking-editorial-lg text-background/60">
                {String(openIndex + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
