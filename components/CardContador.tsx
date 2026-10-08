type Cor = "verde" | "vermelho" | "amarelo";

const bordas: Record<Cor, string> = {
  verde: "border-l-green-500 dark:border-l-green-500",
  vermelho: "border-l-red-500 dark:border-l-red-500",
  amarelo: "border-l-yellow-500 dark:border-l-yellow-500",
};

interface CardContadorProps {
  titulo: string;
  valor: number | string;
  cor: Cor;
}

export default function CardContador({ titulo, valor, cor }: CardContadorProps) {
  return (
    <div
      className={`rounded-lg border border-l-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 shadow-sm sm:p-4 ${bordas[cor]}`}
    >
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">{titulo}</p>
      <p className="mt-1 text-2xl font-bold sm:text-3xl">{valor}</p>
    </div>
  );
}
