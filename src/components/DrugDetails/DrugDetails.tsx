import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { fetchDrug } from "./DrugDetails.api";

/** Detail content for one drug; triggers the not-found UI for unknown ids. */
export async function DrugDetails({ params }: Pick<PageProps<"/drugs/[id]">, "params">) {
  const { id } = await params;
  const drug = await fetchDrug(id);
  if (!drug) notFound();

  const facts: [string, string][] = [
    ["Indication", drug.indication],
    ["Developer", drug.developer],
    ["Phase", drug.phase],
    ["Approval date", drug.approvalDate ?? "—"],
  ];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-10">
      <Link href="/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">← Back to all candidates</Link>

      <header className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold">{drug.name}</h1>
        <StatusBadge status={drug.status} />
      </header>
      <p>{drug.description}</p>

      <dl className="grid gap-4 sm:grid-cols-2">
        {facts.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>

      <section>
        <h2 className="mb-1 text-xl font-semibold">Mechanism of Action</h2>
        <p>{drug.mechanismOfAction}</p>
      </section>

      <section>
        <h2 className="mb-1 text-xl font-semibold">Side Effects</h2>
        <ul className="list-disc pl-5">
          {drug.sideEffects.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>
    </main>
  );
}
