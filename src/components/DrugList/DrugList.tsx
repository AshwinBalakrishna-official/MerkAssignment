import { Suspense } from "react";
import { DRUG_STATUSES, type DrugStatus } from "@/lib/drugs/types";
import { DrugCard } from "@/components/DrugCard";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { fetchDrugs } from "./DrugList.api";

/** Home content: reads filters from the URL, fetches one page and renders it. */
export async function DrugList({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

  const q = first(sp.q)?.trim() || undefined;
  const statusParam = first(sp.status);
  const status = DRUG_STATUSES.includes(statusParam as DrugStatus)
    ? (statusParam as DrugStatus)
    : undefined;
  const page = Number(first(sp.page)) || 1;

  const result = await fetchDrugs({ q, status, page });

  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold">Drug Candidates</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Browse, search and filter the drug pipeline. (Fictional demo data.)
        </p>
      </header>

      <Suspense>
        <SearchBar />
      </Suspense>

      <p aria-live="polite" className="text-sm text-zinc-600 dark:text-zinc-400">
        {result.total} {result.total === 1 ? "result" : "results"}
      </p>

      {result.items.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center">No drug candidates match your search.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.items.map((d) => (
            <DrugCard key={d.id} drug={d} />
          ))}
        </ul>
      )}

      <Pagination page={result.page} totalPages={result.totalPages} hrefFor={hrefFor} />
    </main>
  );
}
