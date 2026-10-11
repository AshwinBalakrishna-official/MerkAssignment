export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10" aria-busy="true">
      <div className="mb-6 h-9 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        ))}
      </div>
    </main>
  );
}
