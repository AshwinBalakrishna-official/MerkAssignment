/** Lifecycle stage of a drug candidate. */
export const DRUG_STATUSES = [
  "In Development",
  "Approved",
  "Discontinued",
  "Withdrawn",
] as const;

export type DrugStatus = (typeof DRUG_STATUSES)[number];

/** Full drug record, as returned by the details endpoint. */
export interface Drug {
  id: string;
  name: string;
  status: DrugStatus;
  description: string;
  mechanismOfAction: string;
  sideEffects: string[];
  indication: string;
  developer: string;
  phase: string;
  /** ISO date (YYYY-MM-DD); null if not approved. */
  approvalDate: string | null;
}

/** Lightweight projection used by list views, keeps list payloads small. */
export type DrugSummary = Pick<Drug, "id" | "name" | "status" | "description">;

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListDrugsParams {
  /** Case-insensitive substring match on name. */
  drugName?: string;
  status?: DrugStatus;
  page?: number;
  limit?: number;
}
