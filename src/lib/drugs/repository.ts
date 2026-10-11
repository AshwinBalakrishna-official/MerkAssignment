/**
 * Data-access layer for drugs.
 *
 * This is the ONLY module that touches the JSON "database". To move to a real
 * store (Postgres, Elasticsearch, a remote service) re-implement `listDrugs`
 * and `getDrug` with the same signatures; nothing else needs to change.
 */
import raw from "@/data/drugs.json";
import type {
  Drug,
  DrugSummary,
  ListDrugsParams,
  Paginated,
} from "./types";

export const DEFAULT_LIMIT = 9;
export const MAX_LIMIT = 100;

const drugs = raw as Drug[];

const toSummary = ({ id, name, status, description }: Drug): DrugSummary => ({
  id,
  name,
  status,
  description,
});

const clampInt = (value: number | undefined, min: number, max: number, fallback: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, Math.trunc(value as number))) : fallback;

/** Filters by name/status and returns one page of summaries (sorted by name). */
export async function listDrugs(
  params: ListDrugsParams = {},
): Promise<Paginated<DrugSummary>> {
  const q = params.q?.trim().toLowerCase();
  const limit = clampInt(params.limit, 1, MAX_LIMIT, DEFAULT_LIMIT);

  const matches = drugs
    .filter((d) => (!q || d.name.toLowerCase().includes(q)) && (!params.status || d.status === params.status))
    .sort((a, b) => a.name.localeCompare(b.name));

  const total = matches.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const page = clampInt(params.page, 1, totalPages, 1);
  const start = (page - 1) * limit;

  return {
    items: matches.slice(start, start + limit).map(toSummary),
    page,
    limit,
    total,
    totalPages,
  };
}

/** Returns the full drug record, or null when the id is unknown. */
export async function getDrug(id: string): Promise<Drug | null> {
  return drugs.find((d) => d.id === id) ?? null;
}
