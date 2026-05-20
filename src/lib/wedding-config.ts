// Single source of truth para informações do casamento.
// Data com timezone explícito (-03:00) para evitar deslocamento em outros fusos.
export const WEDDING = {
  data: new Date("2026-10-10T20:00:00-03:00"),
  dataFormatada: "10 de Outubro de 2026",
  horarioRecepcao: "19h30",
  horarioCerimonia: "20h00",
  horarioFesta: "21h00",
  local: "Igreja Matriz — Nepomuceno, MG",
  endereco: "Praça da Matriz — Nepomuceno, MG",
  wazeUrl:
    "https://waze.com/ul?q=Igreja+Matriz+Nepomuceno+MG&navigate=yes",
  gmapsUrl:
    "https://www.google.com/maps/search/Igreja+Matriz+Nepomuceno+MG",
  pix: "cr.reis@live.com",
  whatsappBase: "https://wa.me/5535997167717",
} as const;

export function whatsappLink(text: string) {
  return `${WEDDING.whatsappBase}?text=${encodeURIComponent(text)}`;
}
