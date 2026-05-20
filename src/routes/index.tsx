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
      <section className="hero-bg relative flex min-h-[88vh] flex-col items-center justify-center px-6 text-center text-primary-dark">
        <div aria-hidden="true" className="mb-8 h-16 w-px bg-primary-dark/40" />
        <h1 className="font-display text-6xl font-light italic leading-none tracking-tight sm:text-8xl md:text-9xl">
          Bruna &amp; Cláudio
        </h1>
        <p className="mt-8 text-[11px] font-medium uppercase tracking-editorial-lg text-primary-dark/80 sm:text-xs">
          Bem-vindos ao nosso para sempre
        </p>
        <p
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse text-[10px] uppercase tracking-editorial text-primary-dark/40"
        >
          Role
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

          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              to="/cerimonia"
              className="min-w-[260px] bg-primary px-10 py-4 text-center text-[10px] font-medium uppercase tracking-editorial text-primary-foreground shadow-soft transition-all duration-500 hover:bg-primary-dark"
            >
              Cerimônia &amp; Festa
            </Link>
            <Link
              to="/presentes"
              className="min-w-[260px] border border-primary/30 px-10 py-4 text-center text-[10px] font-medium uppercase tracking-editorial text-primary-dark transition-all duration-500 hover:bg-accent/40"
            >
              Lista de Presentes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
