import Link from "next/link";
import type { Veiculo } from "@/types";
import SeloStatus from "./SeloStatus";

function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function CardVeiculo({ veiculo }: { veiculo: Veiculo }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="font-mono text-lg font-bold tracking-wider">
            {veiculo.placa}
          </h2>
          <p className="truncate text-sm text-slate-600">{veiculo.modelo}</p>
        </div>
        <SeloStatus status={veiculo.status} />
      </div>

      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div className="min-w-0">
          <dt className="text-xs text-slate-500">Motorista</dt>
          <dd className="truncate font-medium">{veiculo.motorista}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Última revisão</dt>
          <dd className="font-medium">{formatarData(veiculo.ultimaRevisao)}</dd>
        </div>
      </dl>

      <Link
        href={`/checklist/${veiculo.id}`}
        className="mt-auto rounded-md bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Iniciar Checklist
      </Link>
    </article>
  );
}
