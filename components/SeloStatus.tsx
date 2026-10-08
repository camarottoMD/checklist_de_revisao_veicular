import type { StatusVeiculo } from "@/types";

const estilos: Record<StatusVeiculo, string> = {
  Apto: "bg-green-100 text-green-800 ring-green-600/30",
  Inapto: "bg-red-100 text-red-800 ring-red-600/30",
  Pendente: "bg-yellow-100 text-yellow-800 ring-yellow-600/40",
};

const bolinhas: Record<StatusVeiculo, string> = {
  Apto: "bg-green-500",
  Inapto: "bg-red-500",
  Pendente: "bg-yellow-500",
};

export default function SeloStatus({ status }: { status: StatusVeiculo }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${estilos[status]}`}
    >
      <span aria-hidden className={`h-2 w-2 rounded-full ${bolinhas[status]}`} />
      {status}
    </span>
  );
}
