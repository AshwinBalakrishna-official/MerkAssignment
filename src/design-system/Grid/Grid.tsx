import type { ComponentProps, ElementType } from "react";

const COLS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
} as const;

interface GridProps extends ComponentProps<"div"> {
  /** Max columns; always one column on mobile. */
  cols: keyof typeof COLS;
  as?: ElementType;
}

export function Grid({ cols, as: Tag = "div", ...props }: GridProps) {
  return <Tag className={`grid gap-4 ${COLS[cols]}`} {...props} />;
}
