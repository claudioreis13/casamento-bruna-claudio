import { useEffect, useState, useCallback } from "react";

const KEY = "reservados";
const RESET_KEY = "reservados:reset:v2";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}


export function useReservados() {
  const [reservados, setReservados] = useState<string[]>([]);

  useEffect(() => {
    // Reset único: limpar reservas antigas para reabrir os presentes.
    if (typeof window !== "undefined" && !localStorage.getItem(RESET_KEY)) {
      localStorage.removeItem(KEY);
      localStorage.setItem(RESET_KEY, "1");
    }
    setReservados(read());
  }, []);


  const marcar = useCallback((id: string) => {
    setReservados((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { reservados, marcar };
}
