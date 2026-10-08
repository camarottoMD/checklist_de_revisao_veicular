"use client";

import { useState } from "react";
import CardContador from "@/components/CardContador";
import CardVeiculo from "@/components/CardVeiculo";
import { useFrota } from "@/context/FrotaContext";

export default function Garagem() {
  const { veiculos } = useFrota();
  const [busca, setBusca] = useState("");

  const totalAptos = veiculos.filter((v) => v.status === "Apto").length;
  const totalInaptos = veiculos.filter((v) => v.status === "Inapto").length;
  const totalPendentes = veiculos.filter((v) => v.status === "Pendente").length;

  const termo = busca.trim().toLowerCase();
  const veiculosFiltrados = veiculos.filter(
    (v) =>
      v.placa.toLowerCase().includes(termo) ||
      v.modelo.toLowerCase().includes(termo),
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-6">
      <h1 className="text-2xl font-bold">Garagem</h1>

      <section
        aria-label="Resumo da frota"
        className="grid grid-cols-3 gap-2 sm:gap-4"
      >
        <CardContador titulo="Aptos" valor={totalAptos} cor="verde" />
        <CardContador titulo="Inaptos" valor={totalInaptos} cor="vermelho" />
        <CardContador titulo="Pendentes" valor={totalPendentes} cor="amarelo" />
      </section>

      <input
        type="search"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por placa ou modelo..."
        aria-label="Buscar por placa ou modelo"
        className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      />

      {veiculosFiltrados.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-8 text-center text-slate-500 dark:text-slate-400">
          Nenhum veículo encontrado para &quot;{busca}&quot;.
        </p>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {veiculosFiltrados.map((veiculo) => (
            <CardVeiculo key={veiculo.id} veiculo={veiculo} />
          ))}
        </section>
      )}
    </main>
  );
}
