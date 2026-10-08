import { labelDoItem } from "@/data/itensChecklist";
import type { Revisao } from "@/types";

export default function GraficoReprovacoes({ revisoes }: { revisoes: Revisao[] }) {
  const contagem: Record<string, number> = {};
  for (const revisao of revisoes) {
    for (const itemId of revisao.itensReprovados) {
      contagem[itemId] = (contagem[itemId] ?? 0) + 1;
    }
  }

  const totalReprovacoes = Object.values(contagem).reduce((a, b) => a + b, 0);
  // Percentual = participação do item no total de reprovações do dia
  const barras = Object.entries(contagem)
    .map(([itemId, quantidade]) => ({
      itemId,
      quantidade,
      percentual: Math.round((quantidade / totalReprovacoes) * 100),
    }))
    .sort((a, b) => b.quantidade - a.quantidade);

  if (barras.length === 0) {
    return <p className="text-sm text-slate-500">Nenhum item reprovado hoje.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {barras.map((barra) => (
        <li key={barra.itemId}>
          <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
            <span className="font-medium">{labelDoItem(barra.itemId)}</span>
            <span className="text-slate-500">
              {barra.quantidade}x · <strong>{barra.percentual}%</strong>
            </span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded bg-slate-100">
            <div
              className="h-full rounded bg-red-500"
              style={{ width: `${barra.percentual}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
