import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import logoBC from "@/assets/logo-bc.png";

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

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
          className="group flex items-center justify-center transition-opacity hover:opacity-70"
        >
          <img
            src={logoBC}
            alt="Monograma Bruna e Cláudio"
            className="h-14 w-auto object-contain sm:h-16"
            width={405}
            height={611}
          />
        </Link>
        <div className="flex items-center gap-6 text-[10px] font-medium uppercase tracking-editorial text-primary-dark sm:gap-10 sm:text-[11px]">
          {[
            { to: "/", label: "Início" },
            { to: "/cerimonia", label: "Cerimônia" },
            { to: "/presentes", label: "Presentes" },
          ].map((l) => (
            <motion.div
              key={l.to}
              initial="initial"
              whileHover="hover"
              style={{ perspective: "600px" }}
              className="relative"
            >
              <Link
                to={l.to}
                className="relative block py-1"
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{
                  "aria-current": "page",
                  className:
                    "relative block py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-primary-dark",
                }}
              >
                <motion.span
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom", display: "inline-block" }}
                >
                  {l.label}
                </motion.span>
                <motion.span
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center top", display: "inline-block" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {l.label}
                </motion.span>
              </Link>
            </motion.div>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
