import { useCountdown } from "@/hooks/use-countdown";
import { WEDDING } from "@/lib/wedding-config";

const R = 34;
const C = 2 * Math.PI * R;

function Arc({
  valor,
  maximo,
  label,
  numero,
}: {
  valor: number;
  maximo: number;
  label: string;
  numero: string;
}) {
  const offset = C - Math.min(valor / maximo, 1) * C;
  return (
    <div
      className="flex flex-col items-center gap-1"
      aria-label={`${valor} ${label.toLowerCase()}`}
    >
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle
            cx="40" cy="40" r={R}
            fill="none"
            stroke="var(--color-sage-light)"
            strokeWidth="4"
          />
          <circle
            cx="40" cy="40" r={R}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.4s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-semibold text-primary-dark text-lg sm:text-xl tabular-nums">
          {numero}
        </div>
      </div>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const { dias, horas, minutos, segundos, acabou } = useCountdown(WEDDING.data);

  if (acabou) {
    return (
      <p className="text-center text-2xl font-medium text-primary-dark">
        Já casados! 🎉
      </p>
    );
  }

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label="Contagem regressiva para o casamento"
      className="flex items-center justify-center gap-3 sm:gap-6"
    >
      <Arc valor={dias % 365} maximo={365} label="Dias" numero={pad(dias)} />
      <Arc valor={horas} maximo={24} label="Horas" numero={pad(horas)} />
      <Arc valor={minutos} maximo={60} label="Minutos" numero={pad(minutos)} />
      <Arc valor={segundos} maximo={60} label="Segundos" numero={pad(segundos)} />
    </div>
  );
}
