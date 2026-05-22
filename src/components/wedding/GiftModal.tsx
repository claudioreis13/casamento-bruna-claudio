import { useEffect, useRef, useState } from "react";
import { formatarPreco, type Gift } from "@/data/gifts";
import { WEDDING, whatsappLink } from "@/lib/wedding-config";
import { petalBurst } from "@/lib/petals";
import { cn } from "@/lib/utils";


interface Props {
  presente: Gift | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function GiftModal({ presente, onClose, onConfirm }: Props) {
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset + focus inicial
  useEffect(() => {
    if (!presente) return;
    setCopied(false);
    const t = setTimeout(() => closeRef.current?.focus(), 10);
    return () => clearTimeout(t);
  }, [presente]);

  // Escape + focus trap
  useEffect(() => {
    if (!presente) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !contentRef.current) return;
      const focusables = contentRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]),[href],input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [presente, onClose]);

  if (!presente) return null;

  const wppUrl = whatsappLink(`Oii Bruna! Quero presentear vocês com: ${presente.nome}`);

  async function copiarPix() {
    if (!presente) return;
    try {
      await navigator.clipboard.writeText(WEDDING.pix);
      setCopied(true);
      petalBurst();
      onConfirm(presente.id);
      setTimeout(() => onClose(), 2500);
    } catch {
      alert(`Copie manualmente: ${WEDDING.pix}`);
    }
  }


  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={contentRef}
        className={cn(
          "relative flex w-full max-w-md flex-col gap-4 rounded-t-2xl bg-card p-6 shadow-lifted",
          "sm:rounded-2xl sm:animate-in sm:zoom-in-95 sm:duration-200"
        )}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar diálogo"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-xl text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          ×
        </button>

        <div className="text-center">
          <p className="tracking-editorial text-[10px] uppercase text-muted-foreground">
            Que presente especial
          </p>
          <h2
            id="modal-title"
            className="mt-2 font-display text-3xl italic leading-tight text-primary-dark"
          >
            Obrigado de coração
          </h2>
        </div>

        <picture>
          <source type="image/webp" srcSet={presente.img.replace(/\.jpe?g$/i, ".webp")} />
          <img
            src={presente.img}
            alt={presente.nome}
            width={128}
            height={128}
            className="mx-auto h-32 w-32 rounded-xl bg-secondary/20 object-contain p-2 shadow-soft"
            loading="lazy"
            decoding="async"
          />
        </picture>

        <div className="text-center">
          <p className="font-display text-lg italic text-foreground">{presente.nome}</p>
          <p className="tracking-editorial mt-1 text-sm font-semibold text-primary-dark tabular-nums">
            {formatarPreco(presente.preco)}
          </p>
        </div>

        <p className="mx-auto max-w-xs text-center text-sm font-light leading-relaxed text-muted-foreground">
          Cada presente vira uma memória na nossa nova casa.
          Copie o PIX abaixo e finalize no seu banco — a gente cuida do resto com muito carinho.
        </p>

        <div className="rounded-lg border border-primary/15 bg-secondary/10 px-4 py-3 text-center">
          <p className="tracking-editorial text-[10px] uppercase text-muted-foreground">Chave PIX</p>
          <p className="mt-1 font-mono text-sm break-all text-foreground">{WEDDING.pix}</p>
        </div>

        <button
          type="button"
          onClick={copiarPix}
          aria-label={copied ? "PIX copiado" : "Copiar código PIX"}
          className={cn(
            "tracking-editorial inline-flex items-center justify-center px-6 py-3 text-[11px] font-semibold uppercase transition-colors",
            copied
              ? "bg-primary-dark text-primary-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary-dark"
          )}
        >
          {copied ? "PIX copiado ✔" : "Copiar chave PIX"}
        </button>

        {copied && (
          <p
            role="status"
            aria-live="polite"
            className="text-center font-display text-base italic text-primary-dark"
          >
            Muito obrigado, de verdade. 💛
            <span className="mt-1 block text-xs not-italic font-sans text-muted-foreground">
              Agora é só abrir seu banco e colar o PIX para finalizar.
            </span>
          </p>
        )}

        <a
          href={wppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar com a Bruna via WhatsApp"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Combine com a Bruna
        </a>
      </div>
    </div>
  );
}
