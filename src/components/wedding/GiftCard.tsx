import { formatarPreco, type Gift } from "@/data/gifts";
import { cn } from "@/lib/utils";

interface Props {
  presente: Gift;
  reservado: boolean;
  onPresentear: () => void;
}

export function GiftCard({ presente, reservado, onPresentear }: Props) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-card",
        "border border-primary/10",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_40px_-20px_rgba(40,50,30,0.35)]",
        reservado && "opacity-60"
      )}
      data-id={presente.id}
    >
      {/* Halo sutil ao hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(107,122,78,0.10), transparent 60%)",
        }}
      />

      {presente.humor && (
        <span className="tracking-editorial absolute left-3 top-3 z-20 rounded-full border border-primary/20 bg-background/95 px-2.5 py-1 text-[9px] uppercase text-primary-dark backdrop-blur-sm">
          Surpresa
        </span>
      )}

      {reservado && (
        <span className="tracking-editorial absolute right-3 top-3 z-20 rounded-full border border-primary-dark/30 bg-background/95 px-2.5 py-1 text-[9px] uppercase text-primary-dark backdrop-blur-sm">
          ✓ Reservado
        </span>
      )}

      <div className="relative z-10 aspect-square overflow-hidden bg-muted">
        <img
          src={presente.img}
          alt={presente.nome}
          loading="lazy"
          decoding="async"
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect fill='%23e8e4dd' width='400' height='400'/></svg>";
          }}
        />
        {/* Shimmer diagonal premium */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full"
        />
        {/* Vinheta inferior para legibilidade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center gap-3 p-5 text-center">
        {/* Linha decorativa que cresce */}
        <span
          aria-hidden
          className="h-px w-8 bg-primary/40 transition-[width,background-color] duration-500 group-hover:w-16 group-hover:bg-primary-dark"
        />

        <h3 className="font-display text-lg italic leading-snug text-foreground">
          {presente.nome}
        </h3>

        <p className="tracking-editorial text-xs uppercase text-primary-dark tabular-nums">
          {formatarPreco(presente.preco)}
        </p>


        <button
          type="button"
          onClick={onPresentear}
          disabled={reservado}
          aria-label={reservado ? `${presente.nome}: já reservado` : `Presentear com ${presente.nome}`}
          className={cn(
            "tracking-editorial group/btn relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-full border px-5 py-2.5 text-[10px] uppercase transition-colors duration-300",
            "border-primary/40 text-primary-dark",
            "hover:border-primary-dark",
            "disabled:cursor-not-allowed disabled:border-muted disabled:text-muted-foreground"
          )}
        >
          {/* Fundo que desliza no hover */}
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 -z-0 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              !reservado && "group-hover/btn:scale-x-100"
            )}
          />
          <span
            className={cn(
              "relative z-10 transition-colors duration-300",
              !reservado && "group-hover/btn:text-primary-foreground"
            )}
          >
            {reservado ? "Reservado" : "Presentear"}
          </span>
        </button>
      </div>
    </article>
  );
}
