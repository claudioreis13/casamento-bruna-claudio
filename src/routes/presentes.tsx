import { createFileRoute } from "@tanstack/react-router";
import { useDeferredValue, useMemo, useState } from "react";
import { PRESENTES, type Gift } from "@/data/gifts";
import { GiftCard } from "@/components/wedding/GiftCard";
import { GiftModal } from "@/components/wedding/GiftModal";
import { useReservados } from "@/hooks/use-reservados";

type Faixa = "todos" | "ate200" | "200a500" | "500a1000" | "acima1000";
type Ordem = "padrao" | "menor" | "maior" | "az";

export const Route = createFileRoute("/presentes")({
  head: () => ({
    meta: [
      { title: "Lista de Presentes 🎁 — Bruna & Cláudio" },
      {
        name: "description",
        content:
          "Lista de presentes do casamento de Bruna e Cláudio. Escolha o seu presente e surpreenda os noivos!",
      },
      { property: "og:title", content: "Lista de Presentes 🎁 — Bruna & Cláudio" },
      {
        property: "og:description",
        content: "Escolha um presente especial para o casamento em 10/10/2026!",
      },
    ],
  }),
  component: Presentes,
});

function Presentes() {
  const [termo, setTermo] = useState("");
  const [faixa, setFaixa] = useState<Faixa>("todos");
  const [ordem, setOrdem] = useState<Ordem>("padrao");
  const [selecionado, setSelecionado] = useState<Gift | null>(null);

  const termoDeferred = useDeferredValue(termo);
  const { reservados, marcar } = useReservados();

  const lista = useMemo(() => {
    let l = PRESENTES.slice();
    const t = termoDeferred.toLowerCase().trim();
    if (t) l = l.filter((p) => p.nome.toLowerCase().includes(t));
    if (faixa === "ate200") l = l.filter((p) => p.preco <= 200);
    else if (faixa === "200a500") l = l.filter((p) => p.preco > 200 && p.preco <= 500);
    else if (faixa === "500a1000") l = l.filter((p) => p.preco > 500 && p.preco <= 1000);
    else if (faixa === "acima1000") l = l.filter((p) => p.preco > 1000);
    if (ordem === "menor") l.sort((a, b) => a.preco - b.preco);
    else if (ordem === "maior") l.sort((a, b) => b.preco - a.preco);
    else if (ordem === "az") l.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    return l;
  }, [termoDeferred, faixa, ordem]);

  const filtrosAtivos = (termoDeferred ? 1 : 0) + (faixa !== "todos" ? 1 : 0);

  function limpar() {
    setTermo("");
    setFaixa("todos");
    setOrdem("padrao");
  }

  return (
    <div className="hero-bg min-h-screen">
      <section className="flex min-h-[35vh] flex-col items-center justify-center px-6 py-14 text-center text-white">
        <h1 className="font-display text-5xl drop-shadow-md sm:text-6xl">Lista de Presentes</h1>
        <h2 className="mt-2 max-w-xl text-sm font-light sm:text-base">
          Escolha algo especial para celebrar conosco 🎁
        </h2>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Controles */}
        <div className="sticky top-[57px] z-20 mb-6 rounded-2xl bg-card/95 p-4 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                🔍
              </span>
              <input
                type="text"
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder="Buscar presente..."
                aria-label="Buscar entre os presentes"
                className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="flex flex-wrap gap-2 sm:flex-nowrap">
              <select
                value={faixa}
                onChange={(e) => setFaixa(e.target.value as Faixa)}
                aria-label="Filtrar por faixa de preço"
                className="rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                <option value="todos">Todos os preços</option>
                <option value="ate200">Até R$ 200</option>
                <option value="200a500">R$ 200 – R$ 500</option>
                <option value="500a1000">R$ 500 – R$ 1.000</option>
                <option value="acima1000">Acima de R$ 1.000</option>
              </select>

              <select
                value={ordem}
                onChange={(e) => setOrdem(e.target.value as Ordem)}
                aria-label="Ordenar presentes"
                className="rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                <option value="padrao">Ordenar por…</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
                <option value="az">A → Z</option>
              </select>

              {(filtrosAtivos > 0 || ordem !== "padrao") && (
                <button
                  type="button"
                  onClick={limpar}
                  aria-label="Limpar filtros"
                  className="rounded-full bg-muted px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
                >
                  ✕ Limpar
                </button>
              )}
            </div>
          </div>

          <p
            aria-live="polite"
            className="mt-3 text-xs text-muted-foreground"
          >
            {lista.length} presente{lista.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid */}
        {lista.length === 0 ? (
          <div
            role="status"
            className="rounded-2xl bg-card p-12 text-center text-muted-foreground shadow-soft"
          >
            Nenhum presente encontrado 😕
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {lista.map((p) => (
              <GiftCard
                key={p.id}
                presente={p}
                reservado={reservados.includes(p.id)}
                onPresentear={() => setSelecionado(p)}
              />
            ))}
          </div>
        )}
      </section>

      <GiftModal
        presente={selecionado}
        onClose={() => setSelecionado(null)}
        onConfirm={marcar}
      />
    </div>
  );
}
