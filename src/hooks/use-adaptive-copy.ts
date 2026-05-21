import { useEffect, useState } from "react";
import { useCountdown } from "@/hooks/use-countdown";
import { WEDDING } from "@/lib/wedding-config";

/**
 * Texto adaptativo baseado em horário do dia + dias restantes.
 * Para evitar mismatch de hidratação SSR/CSR, sempre renderiza
 * o texto estático no primeiro render e só ativa o dinâmico após
 * a montagem no cliente.
 */
export function useAdaptiveCopy() {
  const { dias, acabou } = useCountdown(WEDDING.data);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return { saudacao: "Bem-vindos", hero: "Bem-vindos ao nosso para sempre", dias, acabou };
  }

  const h = new Date().getHours();
  let saudacao = "Bem-vindos";
  if (h >= 5 && h < 12) saudacao = "Bom dia";
  else if (h >= 12 && h < 18) saudacao = "Boa tarde";
  else saudacao = "Boa noite";

  let hero = "Bem-vindos ao nosso para sempre";
  if (acabou) {
    hero = "O sim já foi dito — obrigado por celebrar conosco";
  } else if (dias === 0) {
    hero = "É hoje. Te esperamos.";
  } else if (dias === 1) {
    hero = "Amanhã. Não vemos a hora.";
  } else if (dias <= 30) {
    hero = `Faltam ${dias} dias para o nosso sim`;
  }


  return { saudacao, hero, dias, acabou };
}
