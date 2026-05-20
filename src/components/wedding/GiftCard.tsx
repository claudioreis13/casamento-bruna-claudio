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
        "group relative flex flex-col overflow-hidden rounded-xl bg-card shadow-soft transition-all",
        "hover:-translate-y-1 hover:shadow-card",
        reservado && "opacity-60"
      )}
      data-id={presente.id}
    >
      {presente.humor && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-secondary/95 px-2.5 py-1 text-xs font-medium text-secondary-foreground shadow-soft">
          😄 Surpresa
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
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect fill='%23e8e4dd' width='400' height='400'/><text x='50%25' y='50%25' font-family='sans-serif' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='%236B7A4E'>🎁</text></svg>";
          }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-medium leading-snug text-foreground" title={presente.nome}>
          {presente.nome}
        </h3>
        <p className="text-lg font-semibold text-primary-dark">{formatarPreco(presente.preco)}</p>
        <button
          type="button"
          onClick={onPresentear}
          disabled={reservado}
          aria-label={reservado ? `${presente.nome}: já reservado` : `Presentear com ${presente.nome}`}
          className={cn(
            "mt-1 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary-dark",
            "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          )}
        >
          {reservado ? "✓ Reservado" : "Presentear"}
        </button>
      </div>
    </article>
  );
}
