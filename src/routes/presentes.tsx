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
      <section className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-20 text-center">
        <span className="tracking-editorial-lg text-[10px] uppercase text-primary-dark/70">
          Com carinho
        </span>
        <h1 className="mt-6 font-display text-5xl italic text-primary-dark sm:text-7xl">
          Lista de Presentes
        </h1>
        <div className="mt-6 h-px w-16 bg-primary-dark/40" />
        <p className="mt-6 max-w-md text-sm text-primary-dark/80">
          Escolha algo especial para celebrar conosco
        </p>
      </section>

      <section className="mx-auto max-w-6xl bg-background/85 px-4 py-12 backdrop-blur-sm sm:px-8">
        <div className="sticky top-[57px] z-20 mb-10 border-y border-primary/20 bg-background/95 py-4 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder="Buscar presente"
                aria-label="Buscar entre os presentes"
                className="tracking-editorial w-full border-b border-primary/30 bg-transparent py-2.5 text-sm uppercase text-foreground placeholder:text-primary-dark/40 outline-none focus:border-primary-dark"
              />
            </div>

            <div className="flex flex-wrap gap-2 sm:flex-nowrap">
              <select
                value={faixa}
                onChange={(e) => setFaixa(e.target.value as Faixa)}
                aria-label="Filtrar por faixa de preço"
                className="tracking-editorial border border-primary/30 bg-transparent px-4 py-2.5 text-[11px] uppercase text-foreground outline-none focus:border-primary-dark"
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
                className="tracking-editorial border border-primary/30 bg-transparent px-4 py-2.5 text-[11px] uppercase text-foreground outline-none focus:border-primary-dark"
              >
                <option value="padrao">Ordenar por</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
                <option value="az">A → Z</option>
              </select>

              {(filtrosAtivos > 0 || ordem !== "padrao") && (
                <button
                  type="button"
                  onClick={limpar}
                  aria-label="Limpar filtros"
                  className="tracking-editorial border border-primary/30 px-4 py-2.5 text-[11px] uppercase text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          <p
            aria-live="polite"
            className="tracking-editorial mt-3 text-[10px] uppercase text-primary-dark/60"
          >
            {lista.length} presente{lista.length !== 1 ? "s" : ""}
          </p>
        </div>

        {lista.length === 0 ? (
          <div
            role="status"
            className="border border-primary/20 p-16 text-center font-display text-lg italic text-muted-foreground"
          >
            Nenhum presente encontrado
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
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
