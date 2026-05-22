import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  LayoutGroup,
} from "motion/react";
import { Reveal } from "./Reveal";

type Photo = {
  src: string;
  alt: string;
  span: "tall" | "short" | "medium" | "portrait";
  /** Velocidade de parallax (1 = neutro). */
  parallax: number;
  featured?: { label: string; caption: string };
};

/**
 * Substitua as fotos colocando os arquivos em:
 *   public/imagens/galeria/momento-01.jpg ... momento-07.jpg
 */
const PHOTOS: Photo[] = [
  {
    src: "/imagens/galeria/momento-01.jpg",
    alt: "A primeira foto que tiramos juntos",
    span: "portrait",
    parallax: -40,
    featured: {
      label: "O primeiro clique",
      caption: "onde tudo começou",
    },
  },
  
  { src: "/imagens/galeria/momento-03.jpg", alt: "Momento 3", span: "medium", parallax: -20 },
  { src: "/imagens/galeria/momento-04.jpg", alt: "Momento 4", span: "tall",   parallax:  35 },
  { src: "/imagens/galeria/momento-05.jpg", alt: "Momento 5", span: "medium", parallax: -30 },
  { src: "/imagens/galeria/momento-06.jpg", alt: "Momento 6", span: "short",  parallax:  20 },
  { src: "/imagens/galeria/momento-07.jpg", alt: "Momento 7", span: "tall",   parallax: -25 },
];

const spanClasses: Record<Photo["span"], string> = {
  tall: "aspect-[3/4]",
  medium: "aspect-[4/5]",
  short: "aspect-[4/3]",
  portrait: "aspect-[9/16]",
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

/* ============================================================ */
/*  Tile com magnetic hover + tilt + parallax de scroll          */
/* ============================================================ */
function GalleryTile({
  photo,
  index,
  onOpen,
  reduce,
  sectionRef,
  isTouch,
}: {
  photo: Photo;
  index: number;
  onOpen: (i: number) => void;
  reduce: boolean | null;
  sectionRef: React.RefObject<HTMLElement | null>;
  isTouch: boolean;
}) {
  const tileRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Parallax: cada tile flutua em ritmo diferente conforme a seção é rolada.
  // Desabilitado em touch/mobile para evitar oscilação durante o scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce || isTouch ? [0, 0] : [photo.parallax, -photo.parallax],
  );

  // Tilt magnético com mouse (apenas desktop).
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sy = useSpring(ry, { stiffness: 120, damping: 14 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(x * 8);   // rotateY em graus
    rx.set(-y * 8);  // rotateX em graus
  };
  const handleMouseLeave = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  // No mobile a foto fica sempre revelada (em cor, sem grayscale).
  const isRevealed = hovered || isTouch;

  return (
    <motion.div
      style={{ y: parallaxY }}
      className={`mb-4 break-inside-avoid md:mb-6`}
    >
      <motion.button
        ref={tileRef}
        type="button"
        layoutId={`photo-${index}`}
        onClick={() => onOpen(index)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isTouch && setHovered(true)}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
          delay: (index % 4) * 0.09,
        }}
        style={{
          rotateX: isTouch ? 0 : sx,
          rotateY: isTouch ? 0 : sy,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
        }}
        className={`group relative block w-full overflow-hidden bg-secondary/20 ${spanClasses[photo.span]} cursor-pointer will-change-transform`}
        aria-label={`Abrir ${photo.alt}`}
      >

        {/* Placeholder por trás */}
        <PlaceholderArt index={index} />

        {/* Imagem real (some se quebrar) */}
        <motion.img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          animate={{
            scale: isRevealed ? (isTouch ? 1.02 : 1.06) : 1,
            filter: isRevealed
              ? "grayscale(0%) brightness(1.02)"
              : "grayscale(100%) brightness(0.95)",
            opacity: loaded ? 1 : 0,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`relative h-full w-full will-change-transform ${
            photo.featured ? "object-contain object-center" : "object-cover object-top"
          }`}
        />

        {/* Sheen — brilho diagonal que cruza no hover (desktop) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/25 to-transparent"
          animate={{ x: hovered && !isTouch ? "200%" : "-100%" }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Vinheta inferior + caption */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-dark/70 via-primary-dark/20 to-transparent"
          animate={{ opacity: isRevealed ? (isTouch ? 0.75 : 1) : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5"
          animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-display text-xs italic text-background/90 sm:text-sm">
            {isTouch ? "toque para ampliar" : "momento"}
          </span>
          <span className="tracking-editorial-lg text-[9px] uppercase text-background/80">
            {String(index + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Borda interna sutil para sensação de "moldura" */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ring-inset transition-all duration-500 ${
            photo.featured
              ? "ring-2 ring-primary/40 group-hover:ring-primary/70"
              : isTouch
                ? "ring-1 ring-background/15"
                : "ring-1 ring-background/0 group-hover:ring-background/20"
          }`}
        />


        {/* Selo de foto em destaque */}
        {photo.featured && (
          <motion.div
            className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1 sm:left-4 sm:top-4"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-primary" aria-hidden>
                <path d="M12 2l2.4 6.9H22l-6 4.4 2.3 7L12 16.1 5.7 20.3 8 13.3l-6-4.4h7.6z" />
              </svg>
              <span className="tracking-editorial-lg text-[8px] font-semibold uppercase text-primary-dark">
                {photo.featured.label}
              </span>
            </span>
            <span className="ml-1 font-display text-[11px] italic text-background drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              {photo.featured.caption}
            </span>
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}

/* ============================================================ */
/*  Lightbox premium                                              */
/* ============================================================ */
function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
  reduce,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      key="lightbox"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada"
    >
      {/* Backdrop com blur animado */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-primary-dark/95"
        initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
        animate={{ backdropFilter: "blur(20px)", opacity: 1 }}
        exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.6 }}
        style={{ WebkitBackdropFilter: "blur(20px)" }}
      />

      {/* Header: contador editorial */}
      <motion.div
        className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="tracking-editorial-lg text-[10px] uppercase text-background/60">
          Momentos · B &amp; C
        </span>
        <div className="flex items-center gap-3 text-background/70">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={index}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display text-base italic"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span className="h-px w-6 bg-background/30" />
          <span className="font-display text-base italic text-background/40">
            {String(PHOTOS.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>

      {/* Close */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-6 top-20 z-10 flex h-10 w-10 items-center justify-center rounded-full text-background/80 transition-all duration-300 hover:bg-background/10 hover:text-background sm:right-10"
        aria-label="Fechar"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.2 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </motion.button>

      {/* Setas */}
      {[
        { dir: "prev" as const, label: "Anterior", side: "left-4 sm:left-8", path: "M15 6l-6 6 6 6", handler: onPrev },
        { dir: "next" as const, label: "Próxima", side: "right-4 sm:right-8", path: "M9 6l6 6-6 6", handler: onNext },
      ].map((b) => (
        <motion.button
          key={b.dir}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            b.handler();
          }}
          className={`group absolute ${b.side} top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-background/70 transition-all duration-300 hover:bg-background/10 hover:text-background`}
          aria-label={b.label}
          initial={{ opacity: 0, x: b.dir === "prev" ? -16 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: b.dir === "prev" ? -16 : 16 }}
          transition={{ delay: 0.25 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="transition-transform duration-300 group-hover:scale-110">
            <path d={b.path} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      ))}

      {/* Imagem morfa do tile com layoutId */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          layoutId={`photo-${index}`}
          className="relative z-[1] aspect-[3/4] max-h-[78vh] w-auto overflow-hidden bg-card/10 shadow-2xl"
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <PlaceholderArt index={index} />
          <motion.img
            src={PHOTOS[index].src}
            alt={PHOTOS[index].alt}
            className="relative h-full w-auto max-w-full object-contain"
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "linear" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Footer: dicas de teclado */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-6 px-6 py-6 sm:py-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {[
          { keys: ["←", "→"], label: "navegar" },
          { keys: ["esc"], label: "fechar" },
        ].map((hint) => (
          <div key={hint.label} className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {hint.keys.map((k) => (
                <kbd
                  key={k}
                  className="inline-flex h-6 min-w-[24px] items-center justify-center rounded border border-background/20 px-1.5 text-[10px] font-medium text-background/70"
                >
                  {k}
                </kbd>
              ))}
            </div>
            <span className="tracking-editorial text-[9px] uppercase text-background/40">
              {hint.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================ */
/*  Componente principal                                          */
/* ============================================================ */
export function Gallery() {
  const reduce = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (max-width: 768px)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax suave no título da seção
  const { scrollYProgress: titleProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const titleY = useTransform(titleProgress, [0, 1], reduce ? [0, 0] : [40, 0]);
  const titleOpacity = useTransform(titleProgress, [0, 0.6], [0, 1]);

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
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Ornamentos de fundo que respondem ao scroll */}
      <motion.div
        aria-hidden
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        style={{ y: useTransform(titleProgress, [0, 1], reduce ? [0, 0] : [0, 60]) }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
        style={{ y: useTransform(titleProgress, [0, 1], reduce ? [0, 0] : [0, -60]) }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          style={{ y: titleY, opacity: titleOpacity }}
        >
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
              <motion.span
                className="h-px bg-primary/30"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-3 w-3 text-primary-dark/60"
                fill="currentColor"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <circle cx="12" cy="12" r="3" />
              </motion.svg>
              <motion.span
                className="h-px bg-primary/30"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </Reveal>
        </motion.div>

        <LayoutGroup>
          <div className="columns-2 gap-4 md:columns-3 md:gap-6">
            {PHOTOS.map((photo, i) => (
              <GalleryTile
                key={photo.src}
                photo={photo}
                index={i}
                onOpen={setOpenIndex}
                reduce={reduce}
                isTouch={isTouch}
                sectionRef={sectionRef}
              />
            ))}
          </div>

          <AnimatePresence>
            {openIndex !== null && (
              <Lightbox
                index={openIndex}
                onClose={() => setOpenIndex(null)}
                onPrev={() =>
                  setOpenIndex((i) =>
                    i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length,
                  )
                }
                onNext={() =>
                  setOpenIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length))
                }
                reduce={reduce}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
