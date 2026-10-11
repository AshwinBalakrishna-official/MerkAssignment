"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DRUG_STATUSES } from "@/lib/drugs/types";

export const SEARCH_DEBOUNCE_MS = 300;

/**
 * Search + status filter. The URL is the source of truth: changes are written
 * to the query string (debounced for typing) and the server component re-renders.
 */
export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("drugName") ?? "");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Always read the latest params so a status change isn't clobbered by a stale debounce.
  const paramsRef = useRef(searchParams);
  useEffect(() => {
    paramsRef.current = searchParams;
  }, [searchParams]);

  function update(key: "drugName" | "status", value: string) {
    const next = new URLSearchParams(paramsRef.current.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page"); // filters changed → back to first page
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="flex flex-col gap-3 sm:flex-row" role="search">
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">Search drugs by name</label>
        <input
          id="search"
          type="search"
          value={query}
          placeholder="Search by name…"
          onChange={(e) => {
            setQuery(e.target.value);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => update("drugName", e.target.value.trim()), SEARCH_DEBOUNCE_MS);
          }}
          className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-700"
        />
      </div>
      <div>
        <label htmlFor="status" className="sr-only">Filter by status</label>
        <select
          id="status"
          value={searchParams.get("status") ?? ""}
          onChange={(e) => update("status", e.target.value)}
          className="w-full appearance-none rounded-md border border-zinc-300 bg-transparent bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2216%22%20height=%2216%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23888%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22m6%209%206%206%206-6%22/></svg>')] bg-[length:16px_16px] bg-[position:right_0.75rem_center] bg-no-repeat py-2 pl-3 pr-10 dark:border-zinc-700 dark:[&>option]:bg-zinc-900"
        >
          <option value="">All statuses</option>
          {DRUG_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
