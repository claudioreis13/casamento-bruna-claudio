import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <nav
      aria-label="Menu principal"
      className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
        <Link
          to="/"
          aria-label="Bruna e Cláudio — Início"
          className="group flex h-10 min-w-10 items-center justify-center rounded-full border border-primary/30 px-3 font-display text-base italic text-primary-dark transition-colors hover:border-primary"
        >
          B&amp;C
        </Link>
        <div className="flex items-center gap-6 text-[10px] font-medium uppercase tracking-editorial text-primary-dark sm:gap-10 sm:text-[11px]">
          {[
            { to: "/", label: "Início" },
            { to: "/cerimonia", label: "Cerimônia" },
            { to: "/presentes", label: "Presentes" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative py-1 transition-opacity hover:opacity-60"
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{
                "aria-current": "page",
                className:
                  "relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-primary-dark",
              }}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
