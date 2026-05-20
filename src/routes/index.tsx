import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Countdown } from "@/components/wedding/Countdown";
import { Reveal } from "@/components/wedding/Reveal";
import { SplitHeadline } from "@/components/wedding/SplitHeadline";
import { WEDDING } from "@/lib/wedding-config";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Casamento Bruna & Cláudio",
  startDate: "2026-10-10T20:00:00-03:00",
  endDate: "2026-10-11T03:00:00-03:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Igreja Matriz de Nepomuceno",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Praça da Matriz",
      addressLocality: "Nepomuceno",
      addressRegion: "MG",
      addressCountry: "BR",
    },
  },
  description:
    "Cerimônia de casamento de Bruna e Cláudio — 10 de outubro de 2026, 20h, Igreja Matriz de Nepomuceno/MG.",
  organizer: { "@type": "Person", name: "Bruna & Cláudio" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bruna & Cláudio 💍 — 10/10/2026" },
      {
        name: "description",
        content:
          "Site oficial do casamento de Bruna e Cláudio — 10 de outubro de 2026, Igreja Matriz de Nepomuceno/MG.",
      },
      { property: "og:title", content: "Bruna & Cláudio 💍 — 10/10/2026" },
      {
        property: "og:description",
        content:
          "Estamos muito felizes em compartilhar esse momento com você! Confira a lista de presentes e informações da cerimônia.",
      },
      { property: "og:image", content: "/imagens/casamento.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(eventJsonLd),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax do conteúdo do hero conforme o usuário rola.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <>
      {/* Hero fine-art com Ken Burns + parallax + scroll cue */}
      <section
        ref={heroRef}
        className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 text-center text-background"
      >
        {/* Camada de imagem com Ken Burns lento */}
        <motion.div
          aria-hidden
          className="hero-bg absolute inset-0 -z-10"
          initial={reduce ? false : { scale: 1 }}
          animate={reduce ? undefined : { scale: 1.08 }}
          transition={{
            duration: 24,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        {/* Grain sutil para textura analógica */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex flex-col items-center"
        >
          <motion.div
            aria-hidden="true"
            className="mb-8 w-px bg-background/50"
            initial={{ height: 0 }}
            animate={{ height: 64 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          <h1
            className="font-display text-6xl italic leading-none tracking-tight text-background sm:text-8xl md:text-9xl [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
            style={{ fontWeight: 300 }}
          >
            <SplitHeadline text="Bruna & Cláudio" delay={0.6} />
          </h1>
          <motion.p
            className="mt-8 text-[11px] font-medium uppercase tracking-editorial-lg text-background/85 sm:text-xs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.6 }}
          >
            Bem-vindos ao nosso para sempre
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="tracking-editorial-lg text-[9px] uppercase text-background/70">
              Role
            </span>
            <div className="relative h-10 w-px overflow-hidden bg-background/30">
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 bg-background"
                animate={reduce ? undefined : { y: ["-100%", "200%"] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Versículo */}
      <section className="flex flex-col items-center px-6 py-28 text-center sm:py-32">
        <Reveal>
          <div className="mb-12 opacity-30" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 0V40M0 20H40"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary-dark"
              />
              <circle
                cx="20"
                cy="20"
                r="5"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                className="text-primary-dark"
              />
            </svg>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <blockquote className="max-w-3xl font-display text-3xl font-light italic leading-relaxed text-primary-dark sm:text-4xl md:text-5xl">
            “Assim eles já não são dois, mas sim uma só carne”
          </blockquote>
        </Reveal>
        <Reveal delay={0.3}>
          <cite className="mt-8 block text-[10px] font-semibold uppercase not-italic tracking-editorial text-primary-dark/60">
            Mateus 19:6
          </cite>
        </Reveal>
      </section>

      {/* Countdown + CTAs */}
      <section className="bg-card/40 px-6 py-24 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <Reveal>
            <p className="mb-14 text-[10px] font-semibold uppercase tracking-editorial-lg text-primary-dark/60">
              Contagem Regressiva
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Countdown />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-20 flex flex-col items-center">
              <h2 className="font-display text-2xl font-light tracking-wide text-primary-dark sm:text-3xl">
                {WEDDING.dataFormatada}
                <span className="mx-4 text-secondary">|</span>
                {WEDDING.horarioCerimonia}
              </h2>
              <motion.div
                aria-hidden="true"
                className="mt-6 h-px bg-secondary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
