import { Suspense } from "react";
import FormularioChecklist from "@/components/FormularioChecklist";
import { mockVeiculos } from "@/data/mockVeiculos";

export function generateStaticParams() {
  return mockVeiculos.map((veiculo) => ({ id: String(veiculo.id) }));
}

export default function Checklist({ params }: PageProps<"/checklist/[id]">) {
  return (
    // O id vem da URL, então a leitura de params precisa ficar dentro de Suspense
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 text-slate-500 dark:text-slate-400">
          Carregando checklist...
        </main>
      }
    >
      {params.then(({ id }) => (
        <FormularioChecklist veiculoId={Number(id)} />
      ))}
    </Suspense>
  );
}
