import { Suspense } from "react";
import type { Metadata } from "next";
import { DrugDetails } from "@/components/DrugDetails";
import { fetchDrug } from "@/components/DrugDetails/DrugDetails.api";

export async function generateMetadata({ params }: PageProps<"/drugs/[id]">): Promise<Metadata> {
  const { id } = await params;
  const drug = await fetchDrug(id);
  return { title: drug ? `${drug.name} · Drug Candidates` : "Not found" };
}

export default function DrugDetailsPage({ params }: PageProps<"/drugs/[id]">) {
  // Request data (params) is read inside Suspense so the static shell can prerender.
  return (
    <Suspense fallback={<DetailsSkeleton />}>
      <DrugDetails params={params} />
    </Suspense>
  );
}

function DetailsSkeleton() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-10" aria-busy="true">
      <div className="h-9 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-40 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </main>
  );
}
