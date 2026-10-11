"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex-1 max-w-3xl space-y-4 px-4 py-10" role="alert">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <button onClick={reset} className="rounded-md border px-3 py-1.5">Try again</button>
    </main>
  );
}
