import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex-1 max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-2xl font-bold">Drug candidate not found</h1>
      <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">← Back to all candidates</Link>
    </main>
  );
}
