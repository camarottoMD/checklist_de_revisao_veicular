interface ItemChecklistProps {
  id: string;
  label: string;
  marcado: boolean;
  onChange: (id: string, marcado: boolean) => void;
}

export default function ItemChecklist({
  id,
  label,
  marcado,
  onChange,
}: ItemChecklistProps) {
  return (
    <label
      htmlFor={`item-${id}`}
      className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-3 transition-colors ${
        marcado ? "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" : "border-red-300 bg-red-50 dark:border-red-500/50 dark:bg-red-950/40"
      }`}
    >
      <input
        id={`item-${id}`}
        type="checkbox"
        checked={marcado}
        onChange={(e) => onChange(id, e.target.checked)}
        className="h-6 w-6 shrink-0 accent-green-600"
      />
      <span className="flex-1 font-medium">{label}</span>
      <span
        className={`text-xs font-semibold ${
          marcado ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
        }`}
      >
        {marcado ? "OK" : "Reprovado"}
      </span>
    </label>
  );
}
