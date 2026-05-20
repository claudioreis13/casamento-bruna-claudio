import { createFileRoute } from "@tanstack/react-router";
import { WEDDING } from "@/lib/wedding-config";

export const Route = createFileRoute("/cerimonia")({
  head: () => ({
    meta: [
      { title: "Cerimônia — Bruna & Cláudio 📍" },
      {
        name: "description",
        content:
          "Informações da cerimônia: 10/10/2026, 20h, Igreja Matriz de Nepomuceno/MG.",
      },
      { property: "og:title", content: "Cerimônia — Bruna & Cláudio 📍" },
      {
        property: "og:description",
        content: "10/10/2026 • 20h • Igreja Matriz, Nepomuceno - MG.",
      },
      { property: "og:image", content: "/imagens/igreja.jpg" },
    ],
  }),
  component: Cerimonia,
});

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
      <div className="border-b border-border bg-muted/60 px-5 py-3 text-sm font-medium text-primary-dark">
        <span aria-hidden="true">{icon}</span> {title}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-foreground">{value}</div>
    </div>
  );
}

function Cerimonia() {
  return (
    <>
      <section className="hero-bg-cerimonia flex min-h-[40vh] flex-col items-center justify-center px-6 py-16 text-center text-white">
        <h1 className="font-display text-5xl drop-shadow-md sm:text-6xl">
          Bruna &amp; Cláudio
        </h1>
        <h2 className="mt-2 text-xl font-light tracking-wide sm:text-2xl">Cerimônia</h2>
        <p className="mt-3 text-sm opacity-90">
          Tudo que você precisa saber para não perder nada 💒
        </p>
      </section>

      <section className="mx-auto grid max-w-3xl gap-5 px-4 py-12 sm:px-6">
        <InfoCard icon="📅" title="Informações gerais">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Data" value={WEDDING.dataFormatada} />
            <Field label="Horário" value={WEDDING.horarioCerimonia} />
            <div className="sm:col-span-2">
              <Field label="Local" value={WEDDING.local} />
            </div>
          </div>
        </InfoCard>

        <InfoCard icon="🕐" title="Roteiro da noite">
          <ol className="relative space-y-5 border-l-2 border-secondary pl-5">
            {[
              { hora: WEDDING.horarioRecepcao, desc: "Recepção dos convidados" },
              { hora: WEDDING.horarioCerimonia, desc: "Início da cerimônia" },
              { hora: WEDDING.horarioFesta, desc: "Festa! 🎉", festa: true },
            ].map((item) => (
              <li key={item.hora} className="relative">
                <span
                  aria-hidden="true"
                  className={
                    "absolute -left-[27px] top-1.5 h-3 w-3 rounded-full ring-4 ring-card " +
                    (item.festa ? "bg-primary-dark" : "bg-primary")
                  }
                />
                <div
                  className={
                    "font-semibold " +
                    (item.festa ? "text-primary-dark" : "text-primary-dark")
                  }
                >
                  {item.hora}
                </div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </li>
            ))}
          </ol>
        </InfoCard>

        <InfoCard icon="📍" title="Como chegar">
          <p className="text-foreground">{WEDDING.endereco}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={WEDDING.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#33CCFF] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              🚗 Abrir no Waze
            </a>
            <a
              href={WEDDING.gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-dark"
            >
              🗺 Google Maps
            </a>
          </div>
        </InfoCard>
      </section>
    </>
  );
}
