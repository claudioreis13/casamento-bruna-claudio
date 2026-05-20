import { createFileRoute } from "@tanstack/react-router";
import { useDeferredValue, useMemo, useState } from "react";
import { toast } from "sonner";
import { PRESENTES, CATEGORIAS, type Categoria, type Gift } from "@/data/gifts";
import { GiftCard } from "@/components/wedding/GiftCard";
import { GiftModal } from "@/components/wedding/GiftModal";
import { useReservados } from "@/hooks/use-reservados";
import { WEDDING } from "@/lib/wedding-config";
import { cn } from "@/lib/utils";

type Faixa = "todos" | "ate200" | "200a500" | "500a1000" | "acima1000";
type Ordem = "padrao" | "menor" | "maior" | "az";

const FAIXAS: { id: Faixa; label: string }[] = [
  { id: "todos", label: "Qualquer valor" },
  { id: "ate200", label: "Até R$ 200" },
  { id: "200a500", label: "R$ 200 – 500" },
  { id: "500a1000", label: "R$ 500 – 1.000" },
  { id: "acima1000", label: "Acima R$ 1.000" },
];

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
  const [categoria, setCategoria] = useState<Categoria | "todos">("todos");
  const [faixa, setFaixa] = useState<Faixa>("todos");
  const [ordem, setOrdem] = useState<Ordem>("padrao");
  const [selecionado, setSelecionado] = useState<Gift | null>(null);

  const termoDeferred = useDeferredValue(termo);
  const { reservados, marcar } = useReservados();

  const lista = useMemo(() => {
    let l = PRESENTES.slice();
    const t = termoDeferred.toLowerCase().trim();
    if (t) l = l.filter((p) => p.nome.toLowerCase().includes(t));
    if (categoria !== "todos") l = l.filter((p) => p.categoria === categoria);
    if (faixa === "ate200") l = l.filter((p) => p.preco <= 200);
    else if (faixa === "200a500") l = l.filter((p) => p.preco > 200 && p.preco <= 500);
    else if (faixa === "500a1000") l = l.filter((p) => p.preco > 500 && p.preco <= 1000);
    else if (faixa === "acima1000") l = l.filter((p) => p.preco > 1000);
    if (ordem === "menor") l.sort((a, b) => a.preco - b.preco);
    else if (ordem === "maior") l.sort((a, b) => b.preco - a.preco);
    else if (ordem === "az") l.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    return l;
  }, [termoDeferred, categoria, faixa, ordem]);

  const ativos =
    (termoDeferred ? 1 : 0) + (categoria !== "todos" ? 1 : 0) + (faixa !== "todos" ? 1 : 0);

  function limpar() {
    setTermo("");
    setCategoria("todos");
    setFaixa("todos");
    setOrdem("padrao");
  }

  async function copiarPix() {
    try {
      await navigator.clipboard.writeText(WEDDING.pix);
      toast.success("PIX copiado", { description: WEDDING.pix });
    } catch {
      toast.error("Não foi possível copiar. PIX: " + WEDDING.pix);
    }
  }

  return (
    <div className="hero-bg min-h-screen">
      <section className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-20 text-center text-background">
        <span className="tracking-editorial-lg text-[10px] uppercase text-background/85">
          Com carinho
        </span>
        <h1 className="mt-6 font-display text-5xl italic text-background drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:text-7xl">
          Lista de Presentes
        </h1>
        <div className="mt-6 h-px w-16 bg-background/50" />
        <p className="mt-6 max-w-md text-sm text-background/85">
          Escolha algo especial para celebrar conosco
        </p>
      </section>

      <section className="mx-auto max-w-6xl bg-background/95 px-4 py-12 backdrop-blur-sm sm:px-8">
        {/* Banner PIX em destaque */}
        <div className="mb-10 border border-primary/30 bg-card p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="tracking-editorial text-[10px] uppercase text-primary-dark/60">
                Prefere contribuir em dinheiro?
              </p>
              <h2 className="mt-2 font-display text-2xl italic text-primary-dark sm:text-3xl">
                Envie um PIX direto para os noivos
              </h2>
              <p className="mt-2 font-mono text-sm text-foreground break-all">
                {WEDDING.pix}
              </p>
            </div>
            <button
              type="button"
              onClick={copiarPix}
              className="tracking-editorial w-full shrink-0 bg-primary px-6 py-3 text-[10px] uppercase text-primary-foreground transition-colors hover:bg-primary-dark sm:w-auto"
            >
              Copiar PIX
            </button>
          </div>
        </div>

        {/* Cabeçalho da lista */}
        <div className="mb-6 border-t border-primary/20 pt-8">
          <span className="tracking-editorial-lg text-[10px] uppercase text-primary-dark/60">
            Ou escolha um presente
          </span>
          <h2 className="mt-3 font-display text-3xl italic text-primary-dark sm:text-4xl">
            Lista completa
          </h2>
        </div>

        {/* Categorias em chips */}
        <div className="mb-6">
          <p className="tracking-editorial mb-3 text-[10px] uppercase text-primary-dark/50">
            Categoria
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map((c) => {
              const ativo = categoria === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoria(c.id)}
                  aria-pressed={ativo}
                  className={cn(
                    "tracking-editorial border px-4 py-2 text-[10px] uppercase transition-colors",
                    ativo
                      ? "border-primary-dark bg-primary text-primary-foreground"
                      : "border-primary/30 text-primary-dark hover:border-primary"
                  )}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Faixa de preço em chips */}
        <div className="mb-6">
          <p className="tracking-editorial mb-3 text-[10px] uppercase text-primary-dark/50">
            Faixa de preço
          </p>
          <div className="flex flex-wrap gap-2">
            {FAIXAS.map((f) => {
              const ativo = faixa === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFaixa(f.id)}
                  aria-pressed={ativo}
                  className={cn(
                    "tracking-editorial border px-4 py-2 text-[10px] uppercase transition-colors",
                    ativo
                      ? "border-primary-dark bg-primary text-primary-foreground"
                      : "border-primary/30 text-primary-dark hover:border-primary"
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Busca + ordenação + status */}
        <div className="sticky top-[57px] z-20 mb-10 flex flex-col gap-3 border-y border-primary/20 bg-background/95 py-4 backdrop-blur sm:flex-row sm:items-center">
          <input
            type="text"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Buscar presente"
            aria-label="Buscar entre os presentes"
            className="tracking-editorial flex-1 border-b border-primary/30 bg-transparent py-2.5 text-sm uppercase text-foreground placeholder:text-primary-dark/40 outline-none focus:border-primary-dark"
          />
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
          {(ativos > 0 || ordem !== "padrao") && (
            <button
              type="button"
              onClick={limpar}
              className="tracking-editorial border border-primary/30 px-4 py-2.5 text-[11px] uppercase text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Limpar
            </button>
          )}
        </div>

        <p
          aria-live="polite"
          className="tracking-editorial mb-6 text-[10px] uppercase text-primary-dark/60"
        >
          {lista.length} presente{lista.length !== 1 ? "s" : ""}
        </p>

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
