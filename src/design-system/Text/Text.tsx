import type { ReactNode } from "react";

const TONES = {
  default: "",
  muted: "text-zinc-600 dark:text-zinc-400",
} as const;
const SIZES = { md: "", sm: "text-sm" } as const;

interface TextProps {
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  /** Truncate to three lines. */
  clamp?: boolean;
  as?: "p" | "span";
  children: ReactNode;
  "aria-live"?: "polite" | "assertive";
}

export function Text({ tone = "default", size = "md", clamp, as: Tag = "p", children, ...rest }: TextProps) {
  return (
    <Tag className={`${TONES[tone]} ${SIZES[size]} ${clamp ? "line-clamp-3" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}
