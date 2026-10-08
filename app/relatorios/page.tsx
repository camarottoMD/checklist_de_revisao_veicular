"use client";

import CardContador from "@/components/CardContador";
import GraficoReprovacoes from "@/components/GraficoReprovacoes";
import SeloStatus from "@/components/SeloStatus";
import { useFrota } from "@/context/FrotaContext";
import { labelDoItem } from "@/data/itensChecklist";

export default function Relatorios() {
  const { veiculos, revisoes } = useFrota();

  const totalAptos = veiculos.filter((v) => v.status === "Apto").length;
  const totalInaptos = veiculos.filter((v) => v.status === "Inapto").length;
  const totalPendentes = veiculos.filter((v) => v.status === "Pendente").length;
  const percentualApta =
    veiculos.length > 0 ? Math.round((totalAptos / veiculos.length) * 100) : 0;

  const historico = [...revisoes].sort((a, b) =>
    b.horario.localeCompare(a.horario),
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Painel do Gestor de Frota</h1>
        <button
          type="button"
          onClick={() => alert("Relatório exportado!")}
          className="rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Exportar PDF
        </button>
      </div>

      <section
        aria-label="Indicadores"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        <CardContador
          titulo="% de Frota Apta"
          valor={`${percentualApta}%`}
          cor="verde"
        />
        <CardContador
          titulo="Veículos Inaptos Hoje"
          valor={totalInaptos}
          cor="vermelho"
        />
        <CardContador
          titulo="Checklists Pendentes"
          valor={totalPendentes}
          cor="amarelo"
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">
          Histórico de Revisões de Hoje
        </h2>
        {historico.length === 0 ? (
          <p className="text-sm text-slate-500">Nenhuma revisão feita hoje.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-2 pr-4 font-semibold">Placa</th>
                  <th className="py-2 pr-4 font-semibold">Motorista</th>
                  <th className="py-2 pr-4 font-semibold">Horário</th>
                  <th className="py-2 pr-4 font-semibold">Status</th>
                  <th className="py-2 font-semibold">Quem reprovou</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((revisao) => (
                  <tr
                    key={revisao.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-3 pr-4 font-mono font-semibold">
                      {revisao.placa}
                    </td>
                    <td className="py-3 pr-4">{revisao.motorista}</td>
                    <td className="py-3 pr-4">{revisao.horario}</td>
                    <td className="py-3 pr-4">
                      <SeloStatus status={revisao.status} />
                    </td>
                    <td className="py-3">
                      {revisao.itensReprovados.length > 0
                        ? revisao.itensReprovados.map(labelDoItem).join(", ")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Itens que mais reprovam</h2>
        <GraficoReprovacoes revisoes={revisoes} />
      </section>
    </main>
  );
}
