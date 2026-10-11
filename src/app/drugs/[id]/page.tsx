import { Suspense } from "react";
import type { Metadata } from "next";
import { Page, Skeleton, Stack } from "@/design-system";
import { DrugDetails } from "@/components/DrugDetails";
import { fetchDrug } from "@/components/DrugDetails/DrugDetails.api";

export async function generateMetadata({ params }: PageProps<"/drugs/[id]">): Promise<Metadata> {
  const { id } = await params;
  const drug = await fetchDrug(id);
  return { title: drug ? `${drug.name} · Drug Candidates` : "Not found" };
}

export default function DrugDetailsPage({ params }: PageProps<"/drugs/[id]">) {
  // Request data (params) is read inside Suspense so the static shell can prerender.
  return (
    <Suspense fallback={<DetailsSkeleton />}>
      <DrugDetails params={params} />
    </Suspense>
  );
}

function DetailsSkeleton() {
  return (
    <Page size="md" aria-busy="true">
      <Stack gap="lg">
        <Skeleton variant="title" />
        <Skeleton variant="panel" />
      </Stack>
    </Page>
  );
}
