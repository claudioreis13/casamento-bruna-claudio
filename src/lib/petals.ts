import confetti from "canvas-confetti";

// Caminho de uma pétala estilizada (gota com curva suave).
const PETAL_PATH =
  "M50 0 C 70 25, 70 55, 50 100 C 30 55, 30 25, 50 0 Z";

let cachedShapes: ReturnType<typeof confetti.shapeFromPath>[] | null = null;
function getShapes() {
  if (cachedShapes) return cachedShapes;
  cachedShapes = [
    confetti.shapeFromPath({ path: PETAL_PATH }),
    // pequena variação de forma para sensação orgânica
    confetti.shapeFromPath({
      path: "M50 0 C 75 30, 65 60, 50 100 C 35 60, 25 30, 50 0 Z",
    }),
  ];
  return cachedShapes;
}

/**
 * Burst de pétalas em queda lenta — sensação botânica/sage.
 * Combina dois disparos: um lateral esquerdo, outro direito.
 */
export function petalBurst() {
  const shapes = getShapes();
  const colors = ["#B9CCAE", "#D4DECE", "#E8E4DD", "#A8B89A", "#6B7A4E"];

  const defaults = {
    spread: 70,
    ticks: 220,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 28,
    scalar: 1.4,
    shapes,
    colors,
    drift: 0.6,
  } as const;

  confetti({ ...defaults, particleCount: 28, origin: { x: 0.15, y: 0.4 }, angle: 60 });
  confetti({ ...defaults, particleCount: 28, origin: { x: 0.85, y: 0.4 }, angle: 120 });
  // chuva central suave
  confetti({
    ...defaults,
    particleCount: 30,
    spread: 140,
    startVelocity: 22,
    origin: { x: 0.5, y: 0.2 },
    angle: 270,
    gravity: 0.35,
  });
}
