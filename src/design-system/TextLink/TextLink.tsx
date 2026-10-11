import Link from "next/link";
import type { ReactNode } from "react";

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
      {children}
    </Link>
  );
}
