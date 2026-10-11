import { useId, type ComponentProps } from "react";

interface TextInputProps extends Omit<ComponentProps<"input">, "className"> {
  /** Accessible label (visually hidden). */
  label: string;
  /** Fill the remaining space in a row. */
  grow?: boolean;
}

export function TextInput({ label, grow, id, ...props }: TextInputProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  return (
    <div className={grow ? "flex-1" : undefined}>
      <label htmlFor={inputId} className="sr-only">{label}</label>
      <input
        id={inputId}
        className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-700"
        {...props}
      />
    </div>
  );
}
