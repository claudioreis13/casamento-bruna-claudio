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
        "group relative flex flex-col bg-card/80 transition-all",
        "hover:bg-card",
        reservado && "opacity-50"
      )}
      data-id={presente.id}
    >
      {presente.humor && (
        <span className="tracking-editorial absolute left-3 top-3 z-10 bg-background/90 px-2 py-1 text-[9px] uppercase text-primary-dark">
          Surpresa
        </span>
      )}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={presente.img}
          alt={presente.nome}
          loading="lazy"
          decoding="async"
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect fill='%23e8e4dd' width='400' height='400'/></svg>";
          }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3
          className="line-clamp-2 min-h-[2.75rem] font-display text-base italic leading-snug text-foreground"
          title={presente.nome}
        >
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
            "tracking-editorial mt-1 inline-flex items-center justify-center border px-4 py-2.5 text-[10px] uppercase transition-colors",
            "border-primary/40 text-primary-dark hover:bg-primary hover:text-primary-foreground",
            "disabled:cursor-not-allowed disabled:border-muted disabled:bg-transparent disabled:text-muted-foreground disabled:hover:bg-transparent"
          )}
        >
          {reservado ? "Reservado" : "Presentear"}
        </button>
      </div>
    </article>
  );
}
