import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <nav
      aria-label="Menu principal"
      className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/"
          className="font-display text-2xl text-primary-dark"
          aria-label="Bruna e Cláudio — Início"
        >
          B &amp; C
        </Link>
        <div className="flex items-center gap-1 text-sm sm:gap-2 sm:text-base">
          {[
            { to: "/", label: "Início" },
            { to: "/presentes", label: "Presentes" },
            { to: "/cerimonia", label: "Cerimônia" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3 py-1.5 font-medium text-primary-dark transition-colors hover:bg-accent"
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
