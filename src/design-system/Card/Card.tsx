import Link from "next/link";
import type { ReactNode } from "react";
import { Heading } from "../Heading";

interface CardProps {
  href: string;
  title: string;
  /** Shown beside the title, e.g. a badge. */
  aside?: ReactNode;
  children: ReactNode;
}

/** Clickable summary card. */
export function Card({ href, title, aside, children }: CardProps) {
  return (
    <Link
      href={href}
      className="flex h-full flex-col gap-2 rounded-lg border border-zinc-200 p-4 transition hover:border-blue-500 hover:shadow focus-visible:outline-2 focus-visible:outline-blue-600 dark:border-zinc-800"
    >
      <div className="flex items-start justify-between gap-2">
        <Heading level={2} size={3}>{title}</Heading>
        {aside}
      </div>
      {children}
    </Link>
  );
}
