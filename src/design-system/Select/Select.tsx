import { useId, type ComponentProps } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<ComponentProps<"select">, "className" | "children"> {
  /** Accessible label (visually hidden). */
  label: string;
  options: SelectOption[];
}

export function Select({ label, options, id, ...props }: SelectProps) {
  const fallbackId = useId();
  const selectId = id ?? fallbackId;
  return (
    <div>
      <label htmlFor={selectId} className="sr-only">{label}</label>
      <div className="relative">
        <select
          id={selectId}
          className="w-full appearance-none rounded-md border border-zinc-300 bg-transparent py-2 pl-3 pr-10 dark:border-zinc-700 dark:[&>option]:bg-zinc-900"
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {/* Custom chevron: native arrows can't be padded away from the border. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
        >
          <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
