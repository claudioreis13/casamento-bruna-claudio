import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Countdown } from "@/components/wedding/Countdown";
import { Reveal } from "@/components/wedding/Reveal";
import { SplitHeadline } from "@/components/wedding/SplitHeadline";
import { OrganicDivider } from "@/components/wedding/OrganicDivider";
import { HeroPicture } from "@/components/wedding/HeroPicture";
import { Gallery } from "@/components/wedding/Gallery";
import { useAdaptiveCopy } from "@/hooks/use-adaptive-copy";
import { useParallax } from "@/hooks/use-parallax";
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
      { property: "og:url", content: "/" },
      { name: "twitter:image", content: "/imagens/casamento.jpg" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "preload",
        as: "image",
        href: "/imagens/casamento-1280.webp",
        imagesrcset:
          "/imagens/casamento-640.webp 640w, /imagens/casamento-1280.webp 1280w, /imagens/casamento-1920.webp 1920w",
        imagesizes: "100vw",
        type: "image/webp",
        fetchpriority: "high",
      },
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
  const { saudacao, hero: heroCopy } = useAdaptiveCopy();

  // Parallax do conteúdo do hero conforme o usuário rola.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Parallax sutil para outras seções (respeita reduced-motion + mobile).
  const historiaRef = useRef<HTMLElement>(null);
  const historiaImgY = useParallax(historiaRef, 70);
  const historiaTextY = useParallax(historiaRef, -30);
  const countdownRef = useRef<HTMLElement>(null);
  const countdownY = useParallax(countdownRef, 40);

  return (
    <>
      {/* Hero fine-art com Ken Burns + parallax + scroll cue */}
      <section
        ref={heroRef}
        className="hero-section relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 text-center text-background"
      >

        <HeroPicture
          basePath="/imagens/casamento"
          jpgFallback="/imagens/casamento.jpg"
          kenBurns
          priority
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
            className="mt-6 text-[10px] font-medium uppercase tracking-editorial-lg text-background/70 sm:text-[11px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            {saudacao}
          </motion.p>
          <motion.p
            className="mt-3 text-[11px] font-medium uppercase tracking-editorial-lg text-background/85 sm:text-xs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.7 }}
          >
            {heroCopy}
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
            <div className="relative h-12 w-px overflow-hidden bg-background/30">
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
            <motion.svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              className="text-background/70"
              animate={reduce ? undefined : { y: [0, 3, 0] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            >
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
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
          <blockquote className="max-w-5xl font-display text-3xl font-light italic leading-relaxed text-primary-dark sm:text-4xl md:text-[2.75rem] md:whitespace-nowrap">
            “Assim eles já não são dois, mas sim uma só carne”
          </blockquote>
        </Reveal>
        <Reveal delay={0.3}>
          <cite className="mt-8 block text-[10px] font-semibold uppercase not-italic tracking-editorial text-primary-dark/60">
            Mateus 19:6
          </cite>
        </Reveal>
      </section>

      <OrganicDivider />

      {/* Seção assimétrica: imagem à esquerda, texto à direita */}
      <section ref={historiaRef} className="px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <Reveal className="md:col-span-7" y={32}>
            <div className="group relative aspect-[4/5] overflow-hidden">
              <motion.img
                src="/imagens/casamento.jpg"
                alt="Bruna e Cláudio"
                loading="lazy"
                decoding="async"
                className="h-[115%] w-full object-cover will-change-transform"
                style={{ objectPosition: "center 25%", y: historiaImgY }}
                initial={{ scale: 1.04 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary-dark/20 via-transparent to-transparent"
              />
            </div>
          </Reveal>

          <motion.div className="md:col-span-5" style={{ y: historiaTextY }}>
            <Reveal delay={0.15}>
              <span className="tracking-editorial-lg text-[10px] uppercase text-primary-dark/60">
                Nossa história
              </span>
            </Reveal>
            <Reveal delay={0.25}>
              <h2 className="mt-6 font-display text-4xl font-light italic leading-tight text-primary-dark sm:text-5xl md:text-6xl">
                De dois caminhos, um só destino.
              </h2>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-primary-dark/85">
                Cada encontro, cada risada, cada silêncio compartilhado nos
                trouxe até aqui. Em outubro, diante de Deus e de quem amamos,
                celebramos a escolha de seguir juntos para sempre.

              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-10 flex items-center gap-4">
                <span className="h-px w-12 bg-primary/60" />
                <span className="tracking-editorial text-[10px] uppercase text-primary-dark/60">
                  Bruna &amp; Cláudio
                </span>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </section>

      <OrganicDivider />

      <Gallery />

      <OrganicDivider />

      {/* Countdown + CTAs */}
      <section ref={countdownRef} className="bg-card/40 px-6 py-24 backdrop-blur-sm">


        <motion.div className="mx-auto flex max-w-5xl flex-col items-center" style={{ y: countdownY }}>
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
              <h2 className="flex flex-col items-center gap-2 text-center font-display text-2xl font-light tracking-wide text-primary-dark sm:flex-row sm:gap-0 sm:text-3xl">
                <span>{WEDDING.dataFormatada}</span>
                <span className="mx-4 hidden text-secondary sm:inline">|</span>
                <span>{WEDDING.horarioCerimonia}</span>
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
        </motion.div>
      </section>
    </>
  );
}
