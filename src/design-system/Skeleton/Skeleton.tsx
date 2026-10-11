const VARIANTS = {
  title: "h-9 w-64",
  card: "h-28",
  panel: "h-40",
} as const;

/** Loading placeholder. */
export function Skeleton({ variant }: { variant: keyof typeof VARIANTS }) {
  return <div className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 ${VARIANTS[variant]}`} />;
}
