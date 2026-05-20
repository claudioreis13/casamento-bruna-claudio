import { useEffect, useState } from "react";

const KEY = "tema";
type Tema = "claro" | "escuro";

function lerTema(): Tema {
  if (typeof window === "undefined") return "claro";
  const salvo = localStorage.getItem(KEY) as Tema | null;
  if (salvo) return salvo;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
}

function aplicar(tema: Tema) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", tema === "escuro");
}

export function ThemeToggle() {
  // SSR-safe: começa "claro", reconcilia no client
  const [tema, setTema] = useState<Tema>("claro");
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    const t = lerTema();
    setTema(t);
    aplicar(t);
    setMontado(true);
  }, []);

  function alternar() {
    const novo: Tema = tema === "claro" ? "escuro" : "claro";
    setTema(novo);
    aplicar(novo);
    localStorage.setItem(KEY, novo);
  }

  if (!montado) {
    // placeholder com mesmo tamanho para evitar layout shift
    return <div aria-hidden className="h-9 w-9" />;
  }

  const escuro = tema === "escuro";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={escuro ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={escuro}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 text-primary-dark transition-colors hover:border-primary hover:bg-primary/10"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500"
        style={{ transform: escuro ? "rotate(0deg)" : "rotate(40deg)" }}
        aria-hidden
      >
        {escuro ? (
          // Sol (no escuro mostra opção de mudar para claro)
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        ) : (
          // Lua (no claro mostra opção de mudar para escuro)
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}
