import { createFileRoute } from "@tanstack/react-router";
import { HeroPicture } from "@/components/wedding/HeroPicture";
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
    ],
  }),
  component: Cerimonia,
});

function Panel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-primary/20 pt-8">
      <div className="mb-8">
        <span className="block tracking-editorial-lg text-[10px] uppercase text-primary-dark/60">
          {eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl italic text-primary-dark sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="tracking-editorial text-[10px] uppercase text-primary-dark/60">
        {label}
      </div>
      <div className="mt-1 font-display text-lg text-foreground">{value}</div>
    </div>
  );
}

function Cerimonia() {
  return (
    <div className="min-h-screen">
      <section className="hero-section relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center text-background">
        <HeroPicture
          basePath="/imagens/igreja"
          jpgFallback="/imagens/igreja.jpg"
          priority
        />
        <span className="tracking-editorial-lg text-[10px] uppercase text-background/85">
          10 · 10 · 2026
        </span>
        <h1 className="mt-6 font-display text-5xl italic text-background drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:text-7xl">
          Cerimônia
        </h1>
        <div className="mt-6 h-px w-16 bg-background/50" />
        <p className="mt-6 max-w-md text-sm text-background/85">
          Tudo o que você precisa saber para celebrar conosco
        </p>
      </section>


      <section className="mx-auto max-w-2xl space-y-14 bg-background/85 px-6 py-16 backdrop-blur-sm sm:px-12">
        <Panel eyebrow="I" title="Informações gerais">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Data" value={WEDDING.dataFormatada} />
            <Field label="Horário" value={WEDDING.horarioCerimonia} />
            <div className="sm:col-span-2">
              <Field label="Local" value={WEDDING.local} />
            </div>
          </div>
        </Panel>

        <Panel eyebrow="II" title="Roteiro da noite">
          <ol className="space-y-6">
            {[
              { hora: WEDDING.horarioRecepcao, desc: "Recepção dos convidados" },
              { hora: WEDDING.horarioCerimonia, desc: "Início da cerimônia" },
              { hora: WEDDING.horarioFesta, desc: "Festa" },
            ].map((item) => (
              <li
                key={item.hora}
                className="flex items-baseline gap-6 border-b border-primary/10 pb-5 last:border-0"
              >
                <span className="font-display text-3xl italic text-primary-dark tabular-nums">
                  {item.hora}
                </span>
                <span className="tracking-editorial text-xs uppercase text-foreground/80">
                  {item.desc}
                </span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel eyebrow="III" title="Como chegar">
          <p className="font-display text-lg italic text-foreground">
            {WEDDING.endereco}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href={WEDDING.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-editorial inline-flex items-center justify-center border border-primary/40 px-6 py-3 text-[11px] uppercase text-primary-dark transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Abrir no Waze
            </a>
            <a
              href={WEDDING.gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-editorial inline-flex items-center justify-center bg-primary px-6 py-3 text-[11px] uppercase text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              Google Maps
            </a>
          </div>
        </Panel>
      </section>
    </div>
  );
}
