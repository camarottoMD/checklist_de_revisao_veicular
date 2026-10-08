import type { SecaoChecklist } from "@/types";

export const secoesChecklist: SecaoChecklist[] = [
  {
    id: "documentacao",
    titulo: "Documentação",
    itens: [
      { id: "cnh", label: "CNH" },
      { id: "crlv", label: "CRLV" },
    ],
  },
  {
    id: "seguranca",
    titulo: "Segurança",
    itens: [
      { id: "freios", label: "Freios" },
      { id: "pneus", label: "Pneus" },
      { id: "farois", label: "Faróis" },
      { id: "cinto", label: "Cinto" },
      { id: "extintor", label: "Extintor" },
    ],
  },
  {
    id: "operacional",
    titulo: "Operacional",
    itens: [
      { id: "oleo", label: "Nível de óleo" },
      { id: "agua", label: "Água" },
      { id: "combustivel", label: "Combustível" },
      { id: "buzina", label: "Buzina" },
      { id: "limpador", label: "Limpador" },
    ],
  },
];

export const todosItens = secoesChecklist.flatMap((secao) => secao.itens);

export function labelDoItem(id: string): string {
  return todosItens.find((item) => item.id === id)?.label ?? id;
}
