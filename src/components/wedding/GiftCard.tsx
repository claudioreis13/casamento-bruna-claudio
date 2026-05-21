import { useState } from "react";
import { formatarPreco, type Gift } from "@/data/gifts";
import { cn } from "@/lib/utils";

interface Props {
  presente: Gift;
  reservado: boolean;
  onPresentear: () => void;
}

export function GiftCard({ presente, reservado, onPresentear }: Props) {
  const [carregada, setCarregada] = useState(false);
  const presenteado = !!presente.presenteado;
  const indisponivel = presenteado || reservado;

  return (
    <article
      className={cn(
        "group flex flex-col [content-visibility:auto] [contain-intrinsic-size:1px_520px]",
        indisponivel && "opacity-60"
      )}
      data-id={presente.id}
    >
      {/* Moldura — image with white matte border */}
      <div
        className={cn(
          "relative aspect-square overflow-hidden bg-secondary/20",
          "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          !indisponivel && "group-hover:-translate-y-1"
        )}
      >
        {/* Badges */}
        {presente.humor && (
          <span className="tracking-editorial absolute left-4 top-4 z-20 bg-primary px-2.5 py-1 text-[9px] uppercase text-primary-foreground">
            Surpresa
          </span>
        )}
        {presenteado ? (
          <span className="tracking-editorial absolute left-4 top-4 z-20 bg-muted-foreground px-2.5 py-1 text-[9px] uppercase text-background">
            ✓ Já presenteado
          </span>
        ) : reservado ? (
          <span className="tracking-editorial absolute left-4 top-4 z-20 bg-background/95 border border-primary/30 px-2.5 py-1 text-[9px] uppercase text-primary-dark backdrop-blur-sm">
            ✓ Reservado
          </span>
        ) : null}

        {/* White matte frame */}
        <div className="absolute inset-0 z-10 border-[8px] border-background pointer-events-none sm:border-[12px]" />

        {/* Skeleton */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-secondary/30 via-secondary/10 to-secondary/30 transition-opacity duration-700",
            carregada ? "opacity-0" : "opacity-100 animate-pulse"
          )}
        />
        <picture>
          <source
            type="image/webp"
            srcSet={presente.img.replace(/\.jpe?g$/i, ".webp")}
          />
          <img
            src={presente.img}
            alt={presente.nome}
            loading="lazy"
            decoding="async"
            width={400}
            height={400}
            sizes="(min-width: 768px) 300px, 50vw"
            onLoad={() => setCarregada(true)}
            className={cn(
              "h-full w-full object-contain p-4 transition-[transform,filter,opacity] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              !indisponivel && "group-hover:scale-105",
              presenteado && "grayscale",
              carregada ? "opacity-100 blur-0" : "scale-105 opacity-0 blur-xl"
            )}
            onError={(e) => {
              setCarregada(true);
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect fill='%23e8e4dd' width='400' height='400'/></svg>";
            }}
          />
        </picture>
      </div>

      {/* Info */}
      <div className="mt-6 flex flex-col items-center gap-2 text-center">
        <h3 className="font-display text-lg italic leading-tight text-foreground">
          {presente.nome}
        </h3>
        <p
          className={cn(
            "tracking-editorial text-sm font-semibold text-primary-dark tabular-nums",
            presenteado && "line-through text-muted-foreground"
          )}
        >
          {formatarPreco(presente.preco)}
        </p>

        <button
          type="button"
          onClick={onPresentear}
          disabled={indisponivel}
          aria-label={
            presenteado
              ? `${presente.nome}: já presenteado`
              : reservado
                ? `${presente.nome}: já reservado`
                : `Presentear com ${presente.nome}`
          }
          className={cn(
            "tracking-editorial mt-3 w-full border py-3 text-[10px] font-bold uppercase transition-all duration-300",
            indisponivel
              ? "border-muted text-muted-foreground cursor-not-allowed"
              : "border-primary text-primary-dark hover:bg-primary hover:text-primary-foreground"
          )}
        >
          {presenteado ? "Já presenteado" : reservado ? "Reservado" : "Presentear"}
        </button>
      </div>
    </article>
  );
}
