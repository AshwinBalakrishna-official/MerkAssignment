import { Suspense } from "react";
import Loading from "./loading";
import { DrugList } from "@/components/DrugList";

export default function HomePage({ searchParams }: PageProps<"/">) {
  // Request data (searchParams) is read inside Suspense so the static shell can prerender.
  return (
    <Suspense fallback={<Loading />}>
      <DrugList searchParams={searchParams} />
    </Suspense>
  );
}
