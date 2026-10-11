import type { ReactNode } from "react";

const SIZES = {
  1: "text-3xl font-bold",
  2: "text-xl font-semibold",
  3: "text-lg font-semibold",
} as const;

interface HeadingProps {
  /** Semantic level (h1–h3). */
  level: keyof typeof SIZES;
  /** Visual size when it should differ from the semantic level. */
  size?: keyof typeof SIZES;
  children: ReactNode;
}

export function Heading({ level, size = level, children }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={SIZES[size]}>{children}</Tag>;
}
