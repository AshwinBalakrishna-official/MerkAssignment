import { ENDPOINTS } from "@/lib/api/endpoints";
import { buildUrl } from "@/lib/api/http";
import type { Drug } from "@/lib/drugs/types";

/** Returns null on 404 so callers can render notFound(). Revalidated every 60s. */
export async function fetchDrug(id: string): Promise<Drug | null> {
  const res = await fetch(buildUrl(ENDPOINTS.DRUG_DETAILS(id)), { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load drug (${res.status})`);
  return res.json();
}
