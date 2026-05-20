export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background py-16 text-center">
      <div aria-hidden="true" className="mx-auto mb-6 h-px w-12 bg-primary-dark/30" />
      <p className="text-[10px] font-medium uppercase tracking-editorial text-primary-dark/60">
        Dez de Outubro de Dois Mil e Vinte e Seis
      </p>
      <p className="mt-8 text-[9px] uppercase tracking-editorial text-primary-dark/30">
        Site desenvolvido pelo noivo · © {year}
      </p>
    </footer>
  );
}
