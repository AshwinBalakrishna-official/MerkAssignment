/** Shared helpers for calling the API from server components. */

/** Point API_BASE_URL at a real backend to replace the built-in mock API. */
export const baseUrl = () =>
  process.env.API_BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;

/** Builds an absolute URL, skipping undefined/empty query values. */
export function buildUrl(path: string, query: Record<string, unknown> = {}): URL {
  const url = new URL(path, baseUrl());
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
  }
  return url;
}
