import { useEffect, useRef, useState } from "react";

/**
 * Cursor custom premium:
 *  - pontinho sage que segue o mouse (sem lag, sem rAF caro)
 *  - cresce ao passar sobre links/botões/inputs
 *  - escondido em telas com touch primário
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsHover) return;
    setEnabled(true);

    let rafId = 0;
    let tx = 0,
      ty = 0,
      rx = 0,
      ry = 0;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      }
      if (!rafId) rafId = requestAnimationFrame(loop);
    }

    function loop() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      if (Math.abs(tx - rx) > 0.2 || Math.abs(ty - ry) > 0.2) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = 0;
      }
    }

    function onOver(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const interactive = el.closest(
        'a, button, [role="button"], input, select, textarea, [data-cursor="hover"]'
      );
      setHover(!!interactive);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html, body, a, button { cursor: none !important; }
        }
      `}</style>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-primary-dark mix-blend-difference"
        style={{ transition: "opacity 0.2s ease" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-primary-dark/70 mix-blend-difference"
        style={{
          width: hover ? 44 : 28,
          height: hover ? 44 : 28,
          transition:
            "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.25s ease",
        }}
      />
    </>
  );
}
