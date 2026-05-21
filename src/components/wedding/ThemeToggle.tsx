import { useCallback, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "tema";
const DURATION = 550;
const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === "dark" || raw === "escuro") return "dark";
  if (raw === "light" || raw === "claro") return "light";
  return null;
}

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", t === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, t);
  } catch {
    /* ignore quota / privacy mode */
  }
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

type Phase = "idle" | "falling" | "rising";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const curtainColorRef = useRef<string>("");

  // Reconcile with DOM (set pre-hydration by inline script in __root)
  useEffect(() => {
    const stored = readStoredTheme();
    const fromDom: Theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const initial = stored ?? fromDom;
    if (initial !== fromDom) applyTheme(initial);
    setTheme(initial);
    setMounted(true);
  }, []);

  // Respect reduced motion: skip curtain entirely
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const toggle = useCallback(() => {
    if (phase !== "idle") return;
    const next: Theme = theme === "light" ? "dark" : "light";

    if (prefersReducedMotion) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    curtainColorRef.current = next === "dark" ? "var(--bg-dark)" : "var(--bg-light)";
    setPhase("falling");

    window.setTimeout(() => {
      applyTheme(next);
      setTheme(next);
      setPhase("rising");
      window.setTimeout(() => setPhase("idle"), DURATION + 60);
    }, DURATION);
  }, [phase, theme, prefersReducedMotion]);

  // Avoid hydration mismatch: render placeholder with same dimensions
  if (!mounted) {
    return <div aria-hidden className="h-9 w-9" />;
  }

  const isDark = theme === "dark";

  return (
    <>
      {/* Curtain overlay — driven by design tokens */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 origin-top"
        style={{
          zIndex: 9997,
          background: curtainColorRef.current,
          transform: phase === "falling" ? "scaleY(1)" : "scaleY(0)",
          transition: phase !== "idle" ? `transform ${DURATION}ms ${EASING}` : "none",
        }}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
        aria-pressed={isDark}
        className="relative z-[9999] inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-background text-primary-dark transition-all duration-200 hover:scale-110 hover:border-primary hover:bg-primary/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span
          className="transition-transform duration-500"
          style={{ transform: isDark ? "rotate(0deg)" : "rotate(40deg)" }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </span>
      </button>
    </>
  );
}
