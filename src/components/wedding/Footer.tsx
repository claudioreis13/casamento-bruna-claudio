export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border/60 bg-background py-8 text-center text-sm text-muted-foreground">
      <p className="font-display text-2xl text-primary-dark">Bruna &amp; Cláudio 💖</p>
      <p className="mt-1">Obrigado por fazer parte desse momento especial</p>
      <p className="mt-3 text-xs opacity-80">Site desenvolvido pelo noivo 💻</p>
      <p className="text-xs">© {year}</p>
    </footer>
  );
}
