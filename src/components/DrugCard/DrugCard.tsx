import Link from "next/link";
import type { DrugSummary } from "@/lib/drugs/types";
import { StatusBadge } from "@/components/StatusBadge";

export function DrugCard({ drug }: { drug: DrugSummary }) {
  return (
    <li>
      <Link
        href={`/drugs/${drug.id}`}
        className="flex h-full flex-col gap-2 rounded-lg border border-zinc-200 p-4 transition hover:border-blue-500 hover:shadow focus-visible:outline-2 focus-visible:outline-blue-600 dark:border-zinc-800"
      >
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold">{drug.name}</h2>
          <StatusBadge status={drug.status} />
        </div>
        <p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">{drug.description}</p>
      </Link>
    </li>
  );
}
