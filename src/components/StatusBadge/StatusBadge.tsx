import type { DrugStatus } from "@/lib/drugs/types";

const STYLES: Record<DrugStatus, string> = {
  "In Development": "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200",
  Approved: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200",
  Discontinued: "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200",
  Withdrawn: "bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-200",
};

export function StatusBadge({ status }: { status: DrugStatus }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}>
      {status}
    </span>
  );
}
