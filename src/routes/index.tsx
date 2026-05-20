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
      <section className="hero-bg relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center text-white">
        <h1 className="font-display text-6xl leading-none drop-shadow-md sm:text-7xl md:text-8xl">
          Bruna &amp; Cláudio
        </h1>
        <div
          aria-hidden="true"
          className="my-5 h-px w-24 bg-white/70"
        />
        <h2 className="text-base font-light tracking-wide sm:text-lg">
          Bem-vindos ao nosso para sempre
        </h2>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14 text-center">
        <p className="font-display text-2xl text-primary-dark sm:text-3xl">
          “Assim eles já não são dois, mas sim uma só carne”
        </p>

        <h2 className="mt-12 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Faltam
        </h2>

        <div className="mt-6">
          <Countdown />
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {WEDDING.dataFormatada} • {WEDDING.horarioCerimonia}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/cerimonia"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Ver informações da cerimônia
          </Link>
          <Link
            to="/presentes"
            className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary-dark transition-colors hover:bg-accent"
          >
            Escolher um presente
          </Link>
        </div>
      </section>
    </>
  );
}
