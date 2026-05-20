import { useCountdown } from "@/hooks/use-countdown";
import { WEDDING } from "@/lib/wedding-config";

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ valor, label }: { valor: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-display text-6xl font-light leading-none tabular-nums text-primary-dark sm:text-7xl md:text-8xl">
        {valor}
      </div>
      <div className="mt-3 text-[9px] font-semibold uppercase tracking-editorial-lg text-primary-dark/60 sm:text-[10px]">
        {label}
      </div>
    </div>
  );
}

export function Countdown() {
  const { dias, horas, minutos, segundos, acabou } = useCountdown(WEDDING.data);

  if (acabou) {
    return (
      <p className="text-center font-display text-3xl italic text-primary-dark">
        Já casados.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        role="timer"
        aria-live="polite"
        aria-label="Contagem regressiva para o casamento"
        className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 sm:gap-x-16"
      >
        <Unit valor={pad(dias)} label="Dias" />
        <Unit valor={pad(horas)} label="Horas" />
        <Unit valor={pad(minutos)} label="Minutos" />
        <Unit valor={pad(segundos)} label="Segundos" />
      </div>
      <p className="tracking-editorial text-[9px] uppercase text-primary-dark/60">
        Horário de Brasília (UTC−3)
      </p>
    </div>
  );
}
