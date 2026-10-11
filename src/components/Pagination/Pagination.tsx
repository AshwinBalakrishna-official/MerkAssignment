import Link from "next/link";

interface Props {
  page: number;
  totalPages: number;
  /** Builds the href for a page number, preserving other filters. */
  hrefFor: (page: number) => string;
}

export function Pagination({ page, totalPages, hrefFor }: Props) {
  if (totalPages <= 1) return null;
  const linkCls = "rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800";
  const disabledCls = "rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-400 dark:border-zinc-800";
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-4">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={linkCls}>Previous</Link>
      ) : (
        <span aria-disabled="true" className={disabledCls}>Previous</span>
      )}
      <span className="text-sm">Page {page} of {totalPages}</span>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className={linkCls}>Next</Link>
      ) : (
        <span aria-disabled="true" className={disabledCls}>Next</span>
      )}
    </nav>
  );
}
