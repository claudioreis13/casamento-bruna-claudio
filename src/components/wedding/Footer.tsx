export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background py-20 text-center">
      <div className="mb-8 flex justify-center" aria-hidden="true">
        <svg width="56" height="56" viewBox="0 0 100 100" className="opacity-40">
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary-dark"
          />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="22"
            fill="currentColor"
            className="text-primary-dark"
          >
            B&amp;C
          </text>
        </svg>
      </div>
      <p className="font-display text-2xl italic text-primary-dark">
        Bruna &amp; Cláudio
      </p>
      <p className="mt-3 text-[10px] font-medium uppercase tracking-editorial text-primary-dark/50">
        Dez de Outubro de Dois Mil e Vinte e Seis
      </p>
      <p className="mt-12 text-[9px] uppercase tracking-editorial text-primary-dark/30">
        Site desenvolvido pelo noivo · © {year}
      </p>
    </footer>
  );
}
