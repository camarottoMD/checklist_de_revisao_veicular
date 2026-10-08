/** @type {import("@/types").Veiculo[]} */
export const mockVeiculos = [
  { id: 1, placa: "BRA2E19", modelo: "Fiat Strada", motorista: "Carlos Souza", status: "Apto", ultimaRevisao: "2026-10-07" },
  { id: 2, placa: "RIO4B32", modelo: "VW Saveiro", motorista: "Ana Lima", status: "Inapto", ultimaRevisao: "2026-10-07" },
  { id: 3, placa: "QWE7C45", modelo: "Renault Master", motorista: "João Pereira", status: "Pendente", ultimaRevisao: "2026-10-06" },
  { id: 4, placa: "FGH1D88", modelo: "Fiat Fiorino", motorista: "Mariana Costa", status: "Apto", ultimaRevisao: "2026-10-07" },
  { id: 5, placa: "JKL5F02", modelo: "Toyota Hilux", motorista: "Pedro Alves", status: "Inapto", ultimaRevisao: "2026-10-07" },
  { id: 6, placa: "MNO9G67", modelo: "Chevrolet S10", motorista: "Luciana Rocha", status: "Pendente", ultimaRevisao: "2026-10-05" },
  { id: 7, placa: "PQR3H21", modelo: "Mercedes Sprinter", motorista: "Rafael Martins", status: "Apto", ultimaRevisao: "2026-10-07" },
  { id: 8, placa: "STU6J54", modelo: "Ford Ranger", motorista: "Beatriz Nunes", status: "Inapto", ultimaRevisao: "2026-10-07" },
  { id: 9, placa: "VWX8K90", modelo: "Hyundai HR", motorista: "Tiago Ferreira", status: "Apto", ultimaRevisao: "2026-10-07" },
  { id: 10, placa: "YZA0L13", modelo: "Fiat Ducato", motorista: "Camila Ribeiro", status: "Pendente", ultimaRevisao: "2026-10-06" },
];

// Revisões já feitas hoje — uma para cada veículo que não está Pendente.
// itensReprovados usa os ids definidos em data/itensChecklist.ts
/** @type {import("@/types").Revisao[]} */
export const mockRevisoes = [
  { id: "mock-1", veiculoId: 1, placa: "BRA2E19", motorista: "Carlos Souza", horario: "06:42", status: "Apto", itensReprovados: [], observacoes: "" },
  { id: "mock-2", veiculoId: 2, placa: "RIO4B32", motorista: "Ana Lima", horario: "06:55", status: "Inapto", itensReprovados: ["freios", "pneus"], observacoes: "Pneu dianteiro direito careca." },
  { id: "mock-4", veiculoId: 4, placa: "FGH1D88", motorista: "Mariana Costa", horario: "07:03", status: "Apto", itensReprovados: [], observacoes: "" },
  { id: "mock-5", veiculoId: 5, placa: "JKL5F02", motorista: "Pedro Alves", horario: "07:10", status: "Inapto", itensReprovados: ["freios", "farois", "oleo"], observacoes: "Farol esquerdo queimado." },
  { id: "mock-7", veiculoId: 7, placa: "PQR3H21", motorista: "Rafael Martins", horario: "07:18", status: "Apto", itensReprovados: [], observacoes: "" },
  { id: "mock-8", veiculoId: 8, placa: "STU6J54", motorista: "Beatriz Nunes", horario: "07:26", status: "Inapto", itensReprovados: ["pneus", "extintor", "freios"], observacoes: "Extintor vencido." },
  { id: "mock-9", veiculoId: 9, placa: "VWX8K90", motorista: "Tiago Ferreira", horario: "07:31", status: "Apto", itensReprovados: [], observacoes: "" },
];
