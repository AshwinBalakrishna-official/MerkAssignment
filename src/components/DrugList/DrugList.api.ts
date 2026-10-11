import { BASE_URL, ENDPOINTS } from "@/lib/api/endpoints";
import type { DrugSummary, ListDrugsParams, Paginated } from "@/lib/drugs/types";

/** Fetches one page of drugs. Uncached: the result depends on live query params. */
export async function fetchDrugs(params: ListDrugsParams): Promise<Paginated<DrugSummary>> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, String(value)); // skip undefined / empty filters
  }
  const res = await fetch(`${BASE_URL}${ENDPOINTS.DRUGS_LIST}?${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load drugs (${res.status})`);
  return res.json();
}
