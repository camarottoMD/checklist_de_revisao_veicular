"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { mockRevisoes, mockVeiculos } from "@/data/mockVeiculos";
import type { Revisao, Veiculo } from "@/types";

const CHAVE_STORAGE = "frota-checklist-v1";

interface DadosFrota {
  veiculos: Veiculo[];
  revisoes: Revisao[];
}

interface FrotaContextValue extends DadosFrota {
  buscarVeiculo: (id: number) => Veiculo | undefined;
  salvarRevisao: (
    veiculoId: number,
    itensReprovados: string[],
    observacoes: string,
  ) => void;
}

const dadosIniciais: DadosFrota = {
  veiculos: mockVeiculos,
  revisoes: mockRevisoes,
};

// O localStorage é a fonte dos dados; o React assina as mudanças via
// useSyncExternalStore, o que evita divergência entre servidor e navegador.
let cache: DadosFrota | null = null;
const ouvintes = new Set<() => void>();

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

function lerDados(): DadosFrota {
  if (cache) return cache;
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    cache = salvo ? (JSON.parse(salvo) as DadosFrota) : dadosIniciais;
  } catch {
    // storage indisponível ou corrompido: segue com o mock
    cache = dadosIniciais;
  }
  return cache;
}

function gravarDados(novos: DadosFrota) {
  cache = novos;
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(novos));
  } catch {
    // sem storage os dados valem só enquanto a aba estiver aberta
  }
  ouvintes.forEach((ouvinte) => ouvinte());
}

function doisDigitos(n: number) {
  return String(n).padStart(2, "0");
}

const FrotaContext = createContext<FrotaContextValue | null>(null);

export function FrotaProvider({ children }: { children: React.ReactNode }) {
  const dados = useSyncExternalStore(assinar, lerDados, () => dadosIniciais);

  function buscarVeiculo(id: number) {
    return dados.veiculos.find((veiculo) => veiculo.id === id);
  }

  function salvarRevisao(
    veiculoId: number,
    itensReprovados: string[],
    observacoes: string,
  ) {
    const atual = lerDados();
    const veiculo = atual.veiculos.find((v) => v.id === veiculoId);
    if (!veiculo) return;

    const agora = new Date();
    const status = itensReprovados.length > 0 ? "Inapto" : "Apto";
    const hoje = `${agora.getFullYear()}-${doisDigitos(agora.getMonth() + 1)}-${doisDigitos(agora.getDate())}`;

    const revisao: Revisao = {
      id: `rev-${veiculoId}-${agora.getTime()}`,
      veiculoId,
      placa: veiculo.placa,
      motorista: veiculo.motorista,
      horario: `${doisDigitos(agora.getHours())}:${doisDigitos(agora.getMinutes())}`,
      status,
      itensReprovados,
      observacoes,
    };

    gravarDados({
      veiculos: atual.veiculos.map((v) =>
        v.id === veiculoId ? { ...v, status, ultimaRevisao: hoje } : v,
      ),
      // Um checklist por veículo por dia: refazer substitui o anterior
      revisoes: [
        revisao,
        ...atual.revisoes.filter((r) => r.veiculoId !== veiculoId),
      ],
    });
  }

  return (
    <FrotaContext.Provider value={{ ...dados, buscarVeiculo, salvarRevisao }}>
      {children}
    </FrotaContext.Provider>
  );
}

export function useFrota() {
  const contexto = useContext(FrotaContext);
  if (!contexto) {
    throw new Error("useFrota precisa estar dentro de <FrotaProvider>");
  }
  return contexto;
}
