import FormularioChecklist from "@/components/FormularioChecklist";
import { mockVeiculos } from "@/data/mockVeiculos";

export function generateStaticParams() {
  return mockVeiculos.map((veiculo) => ({ id: String(veiculo.id) }));
}

export default async function Checklist({
  params,
}: PageProps<"/checklist/[id]">) {
  const { id } = await params;

  return <FormularioChecklist veiculoId={Number(id)} />;
}
