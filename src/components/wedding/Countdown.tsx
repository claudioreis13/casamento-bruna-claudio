import { motion } from "motion/react";
import { useEffect } from "react";
import { useCountdown } from "@/hooks/use-countdown";
import { WEDDING } from "@/lib/wedding-config";
import { petalBurst } from "@/lib/petals";
import { AnimatedDigit } from "./AnimatedDigit";

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ valor, label }: { valor: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex font-display text-6xl font-light leading-none text-primary-dark sm:text-7xl md:text-8xl">
        {Array.from(valor).map((d, i) => (
          <AnimatedDigit key={i} value={d} />
        ))}
      </div>
      <div className="mt-3 text-[9px] font-semibold uppercase tracking-editorial-lg text-primary-dark/60 sm:text-[10px]">
        {label}
      </div>
    </div>
  );
}

export function Countdown() {
  const { dias, horas, minutos, segundos, acabou } = useCountdown(WEDDING.data);

  // Quando o contador zera, dispara pétalas (uma vez por sessão)
  useEffect(() => {
    if (!acabou) return;
    const flag = "petalsCelebrados";
    if (sessionStorage.getItem(flag)) return;
    sessionStorage.setItem(flag, "1");
    petalBurst();
  }, [acabou]);

  if (acabou) {
    return (
      <motion.div
        className="flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          aria-hidden
          className="text-5xl"
          animate={{ rotate: [0, -6, 6, -4, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 }}
        >
          💍
        </motion.div>
        <p className="font-display text-4xl italic leading-tight text-primary-dark sm:text-5xl">
          Já casados.
        </p>
        <p className="tracking-editorial text-[10px] uppercase text-primary-dark/60">
          Obrigado por celebrar este dia conosco
        </p>
      </motion.div>
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
