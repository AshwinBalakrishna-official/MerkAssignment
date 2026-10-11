"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Cluster, Select, TextInput } from "@/design-system";
import { DRUG_STATUSES } from "@/lib/drugs/types";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  ...DRUG_STATUSES.map((s) => ({ value: s, label: s })),
];

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
    <Cluster collapse gap="md" role="search">
      <TextInput
        grow
        type="search"
        label="Search drugs by name"
        placeholder="Search by name…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          clearTimeout(timer.current);
          timer.current = setTimeout(() => update("drugName", e.target.value.trim()), SEARCH_DEBOUNCE_MS);
        }}
      />
      <Select
        label="Filter by status"
        value={searchParams.get("status") ?? ""}
        onChange={(e) => update("status", e.target.value)}
        options={STATUS_OPTIONS}
      />
    </Cluster>
  );
}
