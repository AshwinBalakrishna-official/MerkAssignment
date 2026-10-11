import { Suspense } from "react";
import { DRUG_STATUSES, type DrugStatus } from "@/lib/drugs/types";
import { EmptyState, Grid, Heading, Page, Stack, Text } from "@/design-system";
import { DrugCard } from "@/components/DrugCard";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { fetchDrugs } from "./DrugList.api";

/** Home content: reads filters from the URL, fetches one page and renders it. */
export async function DrugList({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

  const drugName = first(sp.drugName)?.trim() || undefined;
  const statusParam = first(sp.status);
  const status = DRUG_STATUSES.includes(statusParam as DrugStatus)
    ? (statusParam as DrugStatus)
    : undefined;
  const page = Number(first(sp.page)) || 1;

  const result = await fetchDrugs({ drugName, status, page });

  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    if (drugName) params.set("drugName", drugName);
    if (status) params.set("status", status);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <Page size="lg">
      <Stack gap="lg">
        <Stack as="header" gap="xs">
          <Heading level={1}>Drug Candidates</Heading>
          <Text tone="muted">Browse, search and filter the drug pipeline. (Fictional demo data.)</Text>
        </Stack>

        <Suspense>
          <SearchBar />
        </Suspense>

        <Text tone="muted" size="sm" aria-live="polite">
          {result.total} {result.total === 1 ? "result" : "results"}
        </Text>

        {result.items.length === 0 ? (
          <EmptyState>No drug candidates match your search.</EmptyState>
        ) : (
          <Grid as="ul" cols={3}>
            {result.items.map((d) => (
              <DrugCard key={d.id} drug={d} />
            ))}
          </Grid>
        )}

        <Pagination page={result.page} totalPages={result.totalPages} hrefFor={hrefFor} />
      </Stack>
    </Page>
  );
}
