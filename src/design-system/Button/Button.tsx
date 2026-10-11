import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const BASE = "rounded-md border px-3 py-1.5 text-sm";
const ENABLED = `${BASE} border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800`;
const DISABLED = `${BASE} border-zinc-200 text-zinc-400 dark:border-zinc-800`;

export function Button(props: Omit<ComponentProps<"button">, "className">) {
  return <button className={ENABLED} {...props} />;
}

/** Link styled as a button; renders an inert, aria-disabled span when `disabled`. */
export function ButtonLink({ href, disabled, children }: { href: string; disabled?: boolean; children: ReactNode }) {
  return disabled ? (
    <span aria-disabled="true" className={DISABLED}>{children}</span>
  ) : (
    <Link href={href} className={ENABLED}>{children}</Link>
  );
}
