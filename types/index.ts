export type StatusVeiculo = "Apto" | "Inapto" | "Pendente";

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  motorista: string;
  status: StatusVeiculo;
  /** Data no formato AAAA-MM-DD */
  ultimaRevisao: string;
}

export interface ItemChecklistDef {
  id: string;
  label: string;
}

export interface SecaoChecklist {
  id: string;
  titulo: string;
  itens: ItemChecklistDef[];
}

export interface Revisao {
  id: string;
  veiculoId: number;
  placa: string;
  motorista: string;
  /** Horário no formato HH:mm */
  horario: string;
  status: Exclude<StatusVeiculo, "Pendente">;
  /** Ids dos itens do checklist que foram reprovados */
  itensReprovados: string[];
  observacoes: string;
}
