import { useCountdown } from "@/hooks/use-countdown";
import { WEDDING } from "@/lib/wedding-config";

/**
 * Texto adaptativo baseado em horário do dia + dias restantes.
 *  - Manhã/tarde/noite muda saudação
 *  - Copy do hero muda quando faltam < 30, < 180 ou < 365 dias
 */
export function useAdaptiveCopy() {
  const { dias, acabou } = useCountdown(WEDDING.data);

  if (typeof window === "undefined") {
    return { saudacao: "Bem-vindos", hero: "ao nosso para sempre" };
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
  } else if (dias <= 180) {
    hero = `Faltam ${dias} dias — e contando`;
  } else {
    hero = "Bem-vindos ao nosso para sempre";
  }

  return { saudacao, hero, dias, acabou };
}
