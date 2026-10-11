import { ENDPOINTS } from "@/lib/api/endpoints";
import { buildUrl } from "@/lib/api/http";
import type { DrugSummary, ListDrugsParams, Paginated } from "@/lib/drugs/types";

/** Fetches one page of drugs. Uncached: the result depends on live query params. */
export async function fetchDrugs(params: ListDrugsParams): Promise<Paginated<DrugSummary>> {
  const res = await fetch(buildUrl(ENDPOINTS.DRUGS_LIST, { ...params }), { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load drugs (${res.status})`);
  return res.json();
}
