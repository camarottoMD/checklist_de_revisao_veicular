"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFrota } from "@/context/FrotaContext";
import { secoesChecklist, todosItens } from "@/data/itensChecklist";
import type { StatusVeiculo } from "@/types";
import ItemChecklist from "./ItemChecklist";
import SeloStatus from "./SeloStatus";

export default function FormularioChecklist({
  veiculoId,
}: {
  veiculoId: number;
}) {
  const router = useRouter();
  const { buscarVeiculo, salvarRevisao } = useFrota();
  const veiculo = buscarVeiculo(veiculoId);

  // Todo item começa OK; o motorista desmarca o que reprovar
  const [marcados, setMarcados] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(todosItens.map((item) => [item.id, true])),
  );
  const [observacoes, setObservacoes] = useState("");

  const itensReprovados = todosItens.filter((item) => !marcados[item.id]);
  const status: StatusVeiculo = itensReprovados.length > 0 ? "Inapto" : "Apto";

  function alterarItem(id: string, marcado: boolean) {
    setMarcados((atual) => ({ ...atual, [id]: marcado }));
  }

  function finalizar(e: React.FormEvent) {
    e.preventDefault();
    salvarRevisao(
      veiculoId,
      itensReprovados.map((item) => item.id),
      observacoes.trim(),
    );
    alert("Checklist salvo!");
    router.push("/relatorios");
  }

  if (!veiculo) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start gap-4 px-4 py-6">
        <h1 className="text-2xl font-bold">Veículo não encontrado</h1>
        <Link href="/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
          ← Voltar para a garagem
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
      <Link href="/" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
        ← Voltar para a garagem
      </Link>

      <header className="mt-3 flex items-start justify-between gap-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
        <div className="min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400">Checklist de revisão</p>
          <h1 className="font-mono text-2xl font-bold tracking-wider">
            {veiculo.placa}
          </h1>
          <p className="truncate text-slate-600 dark:text-slate-300">
            {veiculo.modelo} · {veiculo.motorista}
          </p>
        </div>
        <SeloStatus status={status} />
      </header>

      <form onSubmit={finalizar} className="mt-5 flex flex-col gap-6">
        {secoesChecklist.map((secao) => (
          <fieldset key={secao.id} className="flex flex-col gap-2">
            <legend className="mb-2 text-lg font-semibold">{secao.titulo}</legend>
            {secao.itens.map((item) => (
              <ItemChecklist
                key={item.id}
                id={item.id}
                label={item.label}
                marcado={marcados[item.id]}
                onChange={alterarItem}
              />
            ))}
          </fieldset>
        ))}

        <div className="flex flex-col gap-2">
          <label htmlFor="observacoes" className="text-lg font-semibold">
            Observações
          </label>
          <textarea
            id="observacoes"
            rows={4}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Descreva qualquer problema encontrado..."
            className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="foto-hodometro" className="text-lg font-semibold">
            Foto do hodômetro
          </label>
          {/* Só visual: o arquivo não é enviado nem salvo */}
          <input
            id="foto-hodometro"
            type="file"
            accept="image/*"
            capture="environment"
            className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm file:mr-3 file:border-0 file:bg-slate-100 dark:file:bg-slate-700 dark:file:text-slate-100 file:px-4 file:py-3 file:font-semibold"
          />
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {itensReprovados.length === 0
                ? "Todos os itens OK"
                : `Reprovado em: ${itensReprovados.map((item) => item.label).join(", ")}`}
            </span>
            <SeloStatus status={status} />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Finalizar Revisão
          </button>
        </div>
      </form>
    </main>
  );
}
