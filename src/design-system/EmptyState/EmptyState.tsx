import type { ReactNode } from "react";

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border border-dashed p-8 text-center">{children}</p>;
}
