/**
 * Single source of truth for every API path the UI calls.
 * Mirrors the route handlers under src/app/api/**. Parameterised endpoints are
 * functions so path-segment encoding happens in exactly one place.
 */
export const ENDPOINTS = {
  /** GET – paginated, filterable list of drug summaries. */
  DRUGS_LIST: "/api/drugs",
  /** GET – full record for one drug; 404 when unknown. */
  DRUG_DETAILS: (id: string) => `/api/drugs/${encodeURIComponent(id)}`,
} as const;
