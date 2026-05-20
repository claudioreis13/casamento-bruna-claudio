import { useEffect, useState } from "react";

export interface CountdownState {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
  acabou: boolean;
}

function compute(target: Date): CountdownState {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0, acabou: true };
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor((diff / 3600000) % 24),
    minutos: Math.floor((diff / 60000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
    acabou: false,
  };
}

export function useCountdown(target: Date) {
  // SSR-safe: começa zerado, atualiza no client
  const [state, setState] = useState<CountdownState>(() => ({
    dias: 0, horas: 0, minutos: 0, segundos: 0, acabou: false,
  }));

  useEffect(() => {
    setState(compute(target));
    const id = setInterval(() => setState(compute(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return state;
}
