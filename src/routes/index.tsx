import { createFileRoute, Link } from "@tanstack/react-router";
import { Countdown } from "@/components/wedding/Countdown";
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
  return (
    <>
      {/* Hero fine-art */}
      <section className="hero-bg relative flex min-h-[88vh] flex-col items-center justify-center px-6 text-center text-background">
        <div aria-hidden="true" className="mb-8 h-16 w-px bg-background/50" />
        <h1 className="font-display text-6xl italic leading-none tracking-tight text-background sm:text-8xl md:text-9xl [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]" style={{ fontWeight: 300 }}>
          Bruna &amp; Cláudio
        </h1>
        <p className="mt-8 text-[11px] font-medium uppercase tracking-editorial-lg text-background/85 sm:text-xs">
          Bem-vindos ao nosso para sempre
        </p>
      </section>

      {/* Versículo */}
      <section className="flex flex-col items-center px-6 py-28 text-center sm:py-32">
        <div className="mb-12 opacity-30" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0V40M0 20H40" stroke="currentColor" strokeWidth="0.5" className="text-primary-dark" />
            <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-primary-dark" />
          </svg>
        </div>
        <blockquote className="max-w-3xl font-display text-3xl font-light italic leading-relaxed text-primary-dark sm:text-4xl md:text-5xl">
          “Assim eles já não são dois, mas sim uma só carne”
        </blockquote>
        <cite className="mt-8 text-[10px] font-semibold uppercase not-italic tracking-editorial text-primary-dark/60">
          Mateus 19:6
        </cite>
      </section>

      {/* Countdown + CTAs */}
      <section className="bg-card/40 px-6 py-24 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <p className="mb-14 text-[10px] font-semibold uppercase tracking-editorial-lg text-primary-dark/60">
            Contagem Regressiva
          </p>

          <Countdown />

          <div className="mt-20 flex flex-col items-center">
            <h2 className="font-display text-2xl font-light tracking-wide text-primary-dark sm:text-3xl">
              {WEDDING.dataFormatada}
              <span className="mx-4 text-secondary">|</span>
              {WEDDING.horarioCerimonia}
            </h2>
            <div aria-hidden="true" className="mt-6 h-px w-12 bg-secondary" />
          </div>

        </div>
      </section>
    </>
  );
}
