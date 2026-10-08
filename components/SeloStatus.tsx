import type { StatusVeiculo } from "@/types";

const estilos: Record<StatusVeiculo, string> = {
  Apto: "bg-green-100 text-green-800 ring-green-600/30 dark:bg-green-500/15 dark:text-green-300 dark:ring-green-400/30",
  Inapto: "bg-red-100 text-red-800 ring-red-600/30 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-400/30",
  Pendente: "bg-yellow-100 text-yellow-800 ring-yellow-600/40 dark:bg-yellow-500/15 dark:text-yellow-300 dark:ring-yellow-400/30",
};

const bolinhas: Record<StatusVeiculo, string> = {
  Apto: "bg-green-500",
  Inapto: "bg-red-500",
  Pendente: "bg-yellow-500",
};

export default function SeloStatus({ status }: { status: StatusVeiculo }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${estilos[status]}`}
    >
      <span aria-hidden className={`h-2 w-2 rounded-full ${bolinhas[status]}`} />
      {status}
    </span>
  );
}
