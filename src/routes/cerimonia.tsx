import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { HeroPicture } from "@/components/wedding/HeroPicture";
import { Reveal } from "@/components/wedding/Reveal";
import { WEDDING } from "@/lib/wedding-config";

export const Route = createFileRoute("/cerimonia")({
  head: () => ({
    meta: [
      { title: "Cerimônia — Bruna & Cláudio" },
      {
        name: "description",
        content:
          "Informações da cerimônia: 10/10/2026, 20h, Igreja Matriz de Nepomuceno/MG.",
      },
      { property: "og:title", content: "Cerimônia — Bruna & Cláudio" },
      {
        property: "og:description",
        content: "10/10/2026 • 20h • Igreja Matriz, Nepomuceno - MG.",
      },
      { property: "og:image", content: "/imagens/igreja.jpg" },
      { property: "og:url", content: "/cerimonia" },
      { name: "twitter:image", content: "/imagens/igreja.jpg" },
    ],
    links: [{ rel: "canonical", href: "/cerimonia" }],
  }),
  component: Cerimonia,
});

const ROTEIRO = [
  { hora: WEDDING.horarioRecepcao, desc: "Recepção dos convidados", destaque: false },
  { hora: WEDDING.horarioCerimonia, desc: "Início da cerimônia", destaque: true },
  { hora: WEDDING.horarioFesta, desc: "Início da festa", destaque: false },
];

function Cerimonia() {
  return (
    <div className="min-h-screen">
      <section className="hero-section relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center text-background">
        <HeroPicture
          basePath="/imagens/igreja"
          jpgFallback="/imagens/igreja.jpg"
          priority
        />

        <h1 className="mt-6 font-display text-5xl italic text-background drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:text-7xl">
          Cerimônia
        </h1>
        <div className="mt-6 h-px w-16 bg-background/50" />
        <p className="mt-6 max-w-md text-sm text-background/85">
          Tudo o que você precisa saber para celebrar conosco
        </p>
      </section>

      {/* Conteúdo — horas XL como âncora */}
      <section className="bg-background/95 px-6 py-20 backdrop-blur-sm sm:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Coluna esquerda — Informações gerais */}
          <Reveal className="lg:col-span-3 lg:pt-24" y={24}>
            <div className="border-l border-primary/20 pl-6">
              <span className="block text-[10px] font-light uppercase tracking-editorial-lg text-primary-dark/70">
                Essencial
              </span>
              <h2 className="mb-8 mt-4 font-display text-3xl italic leading-tight text-primary-dark">
                Informações
                <br />
                gerais
              </h2>

              <dl className="space-y-6">
                <div>
                  <dt className="mb-1 text-[9px] uppercase tracking-editorial text-primary-dark/60">
                    Data
                  </dt>
                  <dd className="text-sm text-foreground">{WEDDING.dataFormatada}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[9px] uppercase tracking-editorial text-primary-dark/60">
                    Horário
                  </dt>
                  <dd className="text-sm text-foreground">{WEDDING.horarioCerimonia}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[9px] uppercase tracking-editorial text-primary-dark/60">
                    Local
                  </dt>
                  <dd className="font-display text-sm italic leading-relaxed text-foreground">
                    Igreja Matriz
                    <br />
                    Nepomuceno, MG
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* Coluna central — Roteiro com horas XL */}
          <div className="flex flex-col items-center lg:col-span-6">
            <Reveal>
              <span className="mb-12 block text-[10px] font-light uppercase tracking-editorial-lg text-primary-dark/70">
                O tempo da noite
              </span>
            </Reveal>

            <ol className="flex w-full flex-col gap-14 sm:gap-16">
              {ROTEIRO.map((item, i) => (
                <li key={item.hora} className="flex flex-col items-center">
                  <Reveal delay={0.1 + i * 0.12}>
                    <motion.span
                      className={
                        "block text-center font-display text-7xl italic leading-none tabular-nums sm:text-8xl md:text-9xl " +
                        (item.destaque ? "text-primary-dark" : "text-primary")
                      }
                      initial={{ opacity: 0, y: 24, letterSpacing: "0.05em" }}
                      whileInView={{ opacity: 1, y: 0, letterSpacing: "0em" }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {item.hora}
                    </motion.span>
                  </Reveal>
                  <Reveal delay={0.2 + i * 0.12}>
                    <p
                      className={
                        "mt-4 text-center text-[11px] uppercase tracking-editorial-lg text-primary-dark " +
                        (item.destaque ? "font-semibold" : "font-light")
                      }
                    >
                      {item.desc}
                    </p>
                  </Reveal>
                  {item.destaque && (
                    <motion.div
                      aria-hidden
                      className="mt-6 h-px bg-primary/40"
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Coluna direita — Como chegar */}
          <Reveal className="lg:col-span-3 lg:pt-24" y={24}>
            <div className="border-l border-primary/20 pl-6">
              <span className="block text-[10px] font-light uppercase tracking-editorial-lg text-primary-dark/70">
                Localização
              </span>
              <h2 className="mb-8 mt-4 font-display text-3xl italic leading-tight text-primary-dark">
                Como
                <br />
                chegar
              </h2>

              <p className="mb-10 text-sm leading-relaxed text-foreground">
                Praça da Matriz
                <br />
                Nepomuceno — MG
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={WEDDING.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tracking-editorial inline-flex items-center justify-center border border-primary px-6 py-3 text-[10px] uppercase text-primary-dark transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Abrir no Waze
                </a>
                <a
                  href={WEDDING.gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tracking-editorial inline-flex items-center justify-center bg-primary px-6 py-3 text-[10px] uppercase text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Google Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
