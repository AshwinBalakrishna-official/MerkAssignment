# Drug Candidates Explorer

Frontend assignment for Merk: a Next.js (App Router) + TypeScript + Tailwind CSS app to **view, search and filter drug candidates** and open a **details page** for each one. Data comes from a mock REST API backed by a JSON file. All drug data is fictional.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build && npm start` | Production build/serve (set `PORT` if not 3000) |
| `npm test` | Vitest unit/component tests |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

Requires Node 20+.

## Features
- **Home (`/`)** – cards with Name, Status badge, Description; paginated (9/page).
- **Search** – debounced (300 ms) name search; **status filter** as a bonus.
- **Details (`/drugs/[id]`)** – description, indication, developer, phase, approval date, Mechanism of Action, Side Effects; friendly not-found page.
- Loading skeleton, error boundary, responsive layout, dark mode, accessible labels/`aria-live` result count.

## Architecture

```
Browser ──> Server components (page.tsx, drugs/[id]/page.tsx)
              │  <Component>.api.ts  (fetchers; paths from src/lib/api/endpoints.ts)
              ▼
         Route handlers  /api/drugs, /api/drugs/:id   (validation, simulated latency)
              ▼
         src/lib/drugs/repository.ts   (filter, sort, paginate)
              ▼
         src/data/drugs.json           (mock database)
```

```
src/
  app/            routes: pages, loading/error/not-found, api/drugs route handlers
  components/     one folder per component: DrugList, DrugDetails (each with a
                  <Name>.api.ts holding its fetcher), DrugCard, SearchBar (client),
                  StatusBadge, Pagination
  lib/drugs/      types.ts, repository.ts (data access; swap for a DB here)
  lib/api/        endpoints.ts (all API paths), http.ts (URL helpers), latency.ts
  lib/docs/       openapi.ts (spec), flag.ts (docs on/off switch)
  data/drugs.json mock data
__tests__/        repository, API route, and component tests
```

### API
Interactive docs (Swagger UI): **http://localhost:3000/api-docs** (loads UI assets from a CDN, so needs internet). **Enabled in development, disabled (404) in production** by default; set `ENABLE_API_DOCS=true` to expose it on a deployment (e.g. for the walkthrough) or `false` to hide it anywhere. Raw OpenAPI spec: `/api/openapi.json`, defined in `src/lib/docs/openapi.ts`.

- `GET /api/drugs?q=<name>&status=<In Development|Approved|Discontinued|Withdrawn>&page=<n>&limit=<1-100>`
  → `{ items: DrugSummary[], page, limit, total, totalPages }`. Invalid `status` → `400`. Out-of-range `page`/`limit` are clamped.
- `GET /api/drugs/:id` → full `Drug`, or `404 { error }`.

## Design decisions
- **URL is the state.** Search, status and page live in the query string, so views are shareable, bookmarkable and back-button friendly. `SearchBar` is the only client component needed for state; everything else renders on the server, keeping client JS small.
- **Built for large data.** Filtering and pagination happen server-side; the list endpoint returns lightweight summaries (no mechanism/side-effects), so payload size depends on page size, not dataset size. `limit` is capped at 100.
- **Repository boundary.** `lib/drugs/repository.ts` is the only code that knows about the JSON file. Replacing it with a database/search service (same two functions) requires no UI or route changes. The UI talks to the API via `fetch`, so pointing `API_BASE_URL` at a real backend also works.
- **Debounce** avoids a request per keystroke; changing a filter resets to page 1.
- **Caching.** The list is fetched `no-store` (it depends on live query params); detail fetches use `revalidate: 60`.

## Scaling notes / next steps
For genuinely large datasets: move to a database with an index on `name` (or trigram/full-text search, e.g. Postgres `pg_trgm` or Elasticsearch), switch to cursor-based pagination to avoid deep-offset cost, add HTTP caching/CDN on the API, and consider infinite scroll with list virtualization if a continuous list is preferred over pages. Search is currently an O(n) in-memory scan, fine for the demo set.

## Testing
Vitest + React Testing Library (`npm test`, 21 tests):
- **Repository** – search (case-insensitive), status filter, combined filters, pagination/clamping, empty results, lookup/miss.
- **API routes** – list, filters, `400` on bad status, detail, `404`.
- **Components** – card content/link, pagination links/disabled state, search debounce, status change resetting the page, clearing the query.

## Notes
- This project uses Next.js 16 (async `searchParams`/`params`); see `AGENTS.md`.
- Server-side fetches use `API_BASE_URL` (default `http://localhost:$PORT`). Set `MOCK_API_LATENCY_MS=0` to disable the simulated 150 ms latency.
