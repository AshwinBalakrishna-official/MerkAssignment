import type { ComponentProps, ElementType } from "react";

export const GAPS = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6" } as const;

interface StackProps extends ComponentProps<"div"> {
  gap?: keyof typeof GAPS;
  as?: ElementType;
}

/** Vertical layout with consistent spacing. */
export function Stack({ gap = "md", as: Tag = "div", ...props }: StackProps) {
  return <Tag className={`flex flex-col ${GAPS[gap]}`} {...props} />;
}
