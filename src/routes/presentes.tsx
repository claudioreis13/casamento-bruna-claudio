import { createFileRoute } from "@tanstack/react-router";
import { useDeferredValue, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { PRESENTES, CATEGORIAS, type Categoria, type Gift } from "@/data/gifts";
import { GiftCard } from "@/components/wedding/GiftCard";
import { GiftModal } from "@/components/wedding/GiftModal";

import { useReservados } from "@/hooks/use-reservados";
import { WEDDING, whatsappLink } from "@/lib/wedding-config";
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
      { title: "Para nossa nova casa — Bruna & Cláudio" },
      {
        name: "description",
        content:
          "Pequenos gestos para construir nossa nova casa. Escolha um presente especial ou contribua via PIX — Bruna & Cláudio, 10/10/2026.",
      },
      { property: "og:title", content: "Para nossa nova casa — Bruna & Cláudio" },
      {
        property: "og:description",
        content: "Pequenos gestos para construir nossa nova casa. Escolha um presente especial para 10/10/2026.",
      },
      { property: "og:image", content: "/imagens/casamento.jpg" },
      { property: "og:url", content: "/presentes" },
      { name: "twitter:image", content: "/imagens/casamento.jpg" },
    ],
    links: [
      { rel: "canonical", href: "/presentes" },
      {
        rel: "preload",
        as: "image",
        href: "/imagens/igreja-1280.webp",
        imagesrcset:
          "/imagens/igreja-640.webp 640w, /imagens/igreja-1280.webp 1280w, /imagens/igreja-1920.webp 1920w",
        imagesizes: "100vw",
        type: "image/webp",
        fetchpriority: "high",
      },
    ],
  }),
  component: Presentes,
});

function Presentes() {
  const reduce = useReducedMotion();
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
    if (categoria !== "todos") l = l.filter((p) => p.categoria === categoria || p.categorias?.includes(categoria));
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
    <div className="min-h-screen bg-background">
      {/* Hero editorial */}
      <header className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center sm:px-8 sm:pt-28">
        <h1 className="font-display text-5xl italic leading-[1.05] text-foreground sm:text-7xl">
          Para nossa nova casa
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
          A sua presença já é o maior presente. Mas se quiser deixar um cantinho
          seu na nossa casa, ficamos felizes demais.
        </p>
      </header>

      {/* PIX em destaque — boutique */}
      <section className="mx-auto mb-16 max-w-4xl px-4 sm:mb-24 sm:px-8">
        <div className="relative overflow-hidden border border-primary/20 bg-secondary/20 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] sm:p-12">
          {/* Ornamento sutil */}
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/5"
          />
          <div className="relative z-10 flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-8">
            <div className="w-full text-center sm:w-auto sm:text-left">
              <h2 className="font-display text-2xl italic text-primary-dark sm:text-3xl">
                Contribuição Espontânea
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Prefere contribuir em dinheiro? Envie um PIX direto aos noivos.
              </p>
              <div className="mt-4 inline-flex max-w-full items-center gap-3 border border-primary/15 bg-card px-3 py-2">
                <span className="font-mono text-xs text-foreground break-all sm:text-sm">
                  {WEDDING.pix}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={copiarPix}
              className="tracking-editorial w-full shrink-0 bg-primary px-6 py-4 text-[11px] font-semibold uppercase text-primary-foreground shadow-sm transition-colors hover:bg-primary-dark sm:w-auto sm:px-10"
            >
              Copiar Chave PIX
            </button>
          </div>
          <p className="tracking-editorial mt-8 text-center text-[10px] uppercase text-muted-foreground">
            Se preferir outra forma de presentear,{" "}
            <a
              href={whatsappLink(
                "Oii Bruna! Gostaria de combinar outra forma de presentear vocês."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-dark underline decoration-primary/40 underline-offset-4 hover:decoration-primary-dark"
            >
              fale com a Bruna
            </a>{" "}
            para combinar.
          </p>
        </div>
      </section>

      {/* Controls */}
      <div className="mx-auto mb-12 max-w-6xl border-b border-primary/15 px-4 pb-8 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="space-y-6">
            {/* Categoria — tabs editoriais */}
            <div>
              <span className="tracking-editorial mb-3 block text-[10px] font-semibold uppercase text-muted-foreground">
                Filtrar por Categoria
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {CATEGORIAS.map((c) => {
                  const ativo = categoria === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategoria(c.id)}
                      aria-pressed={ativo}
                      className={cn(
                        "pb-1 text-sm transition-colors",
                        ativo
                          ? "border-b border-primary-dark font-medium text-primary-dark"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Faixa — chips outlined */}
            <div>
              <span className="tracking-editorial mb-3 block text-[10px] font-semibold uppercase text-muted-foreground">
                Faixa de Preço
              </span>
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
                        "min-h-11 border px-3 py-1.5 text-xs transition-colors",
                        ativo
                          ? "border-primary-dark bg-primary text-primary-foreground"
                          : "border-primary/20 text-foreground hover:border-primary"
                      )}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:gap-4 lg:w-auto">
            <div className="relative w-full lg:w-64">
              <input
                type="text"
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder="BUSCAR PRESENTE"
                aria-label="Buscar entre os presentes"
                className="tracking-editorial min-h-11 w-full border-b border-primary/20 bg-transparent py-2 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary-dark"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={ordem}
                onChange={(e) => setOrdem(e.target.value as Ordem)}
                aria-label="Ordenar presentes"
                className="tracking-editorial min-h-11 flex-1 cursor-pointer border-b border-primary/20 bg-transparent py-2 text-xs uppercase text-foreground outline-none focus:border-primary-dark sm:flex-none"
              >
                <option value="padrao">ORDENAR POR</option>
                <option value="menor">Menor Preço</option>
                <option value="maior">Maior Preço</option>
                <option value="az">A → Z</option>
              </select>
              {(ativos > 0 || ordem !== "padrao") && (
                <button
                  type="button"
                  onClick={limpar}
                  className="tracking-editorial min-h-11 border-b border-primary/20 px-2 py-2 text-xs uppercase text-foreground transition-colors hover:text-primary-dark"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <p
        aria-live="polite"
        className="tracking-editorial mx-auto mb-10 max-w-6xl px-4 text-[10px] uppercase text-muted-foreground sm:px-8"
      >
        {lista.length} presente{lista.length !== 1 ? "s" : ""}
      </p>

      <section className="mx-auto mb-20 max-w-6xl px-4 sm:px-8">
        {lista.length === 0 ? (
          <div
            role="status"
            className="border border-primary/15 p-16 text-center font-display text-lg italic text-muted-foreground"
          >
            Nenhum presente encontrado
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
            }}
            key={`${categoria}-${faixa}-${ordem}-${termoDeferred}`}
          >
            {lista.map((p) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <GiftCard
                  presente={p}
                  reservado={reservados.includes(p.id)}
                  onPresentear={() => setSelecionado(p)}
                />
              </motion.div>
            ))}
          </motion.div>
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
