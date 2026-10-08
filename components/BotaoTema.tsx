"use client";

import { useSyncExternalStore } from "react";

const CHAVE_STORAGE = "tema";
const ouvintes = new Set<() => void>();

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

// A classe "dark" no <html> é aplicada antes da pintura pelo script do layout
function temaEscuroAtivo() {
  return document.documentElement.classList.contains("dark");
}

function alternarTema() {
  const escuro = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem(CHAVE_STORAGE, escuro ? "dark" : "light");
  } catch {
    // sem storage a escolha vale só até recarregar a página
  }
  ouvintes.forEach((ouvinte) => ouvinte());
}

export default function BotaoTema() {
  const escuro = useSyncExternalStore(assinar, temaEscuroAtivo, () => false);

  return (
    <button
      type="button"
      onClick={alternarTema}
      aria-label={escuro ? "Ativar modo claro" : "Ativar modo escuro"}
      title={escuro ? "Modo claro" : "Modo escuro"}
      className="rounded-md px-3 py-2 text-lg leading-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      <span aria-hidden>{escuro ? "☀️" : "🌙"}</span>
    </button>
  );
}
