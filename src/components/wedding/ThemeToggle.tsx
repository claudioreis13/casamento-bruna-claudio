import { useCallback, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "tema";
const DURATION = 700;
const EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

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

// Browsers that support View Transitions API
interface DocumentWithViewTransition extends Document {
  startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const animatingRef = useRef(false);

  // Reconcile with DOM (set pre-hydration by inline script in __root)
  useEffect(() => {
    const stored = readStoredTheme();
    const fromDom: Theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const initial = stored ?? fromDom;
    if (initial !== fromDom) applyTheme(initial);
    setTheme(initial);
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    if (animatingRef.current) return;
    const next: Theme = theme === "light" ? "dark" : "light";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const doc = document as DocumentWithViewTransition;
    const supported = typeof doc.startViewTransition === "function";

    // Fallback: no View Transitions API or reduced motion → instant
    if (!supported || prefersReducedMotion) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    // Capture click origin for the circular reveal
    const rect = btnRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    animatingRef.current = true;
    const transition = doc.startViewTransition!(() => {
      applyTheme(next);
      setTheme(next);
    });

    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${cx}px ${cy}px)`,
          `circle(${endRadius}px at ${cx}px ${cy}px)`,
        ];
        document.documentElement.animate(
          { clipPath },
          {
            duration: DURATION,
            easing: EASING,
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        /* ignore */
      });

    transition.finished.finally(() => {
      animatingRef.current = false;
    });
  }, [theme]);

  // Avoid hydration mismatch: render placeholder with same dimensions
  if (!mounted) {
    return <div aria-hidden className="h-9 w-9" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={isDark}
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-background text-primary-dark transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        key={isDark ? "sun" : "moon"}
        className="inline-flex animate-[themeIconIn_400ms_cubic-bezier(0.34,1.56,0.64,1)_both]"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}
