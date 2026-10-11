import type { ComponentProps, ElementType } from "react";
import { GAPS } from "../Stack";

const JUSTIFY = { start: "justify-start", between: "justify-between", center: "justify-center" } as const;
const ALIGN = { start: "items-start", center: "items-center" } as const;

interface ClusterProps extends ComponentProps<"div"> {
  gap?: keyof typeof GAPS;
  justify?: keyof typeof JUSTIFY;
  align?: keyof typeof ALIGN;
  /** Stack vertically on small screens, row from the `sm` breakpoint. */
  collapse?: boolean;
  as?: ElementType;
}

/** Horizontal layout that wraps (or collapses to a column on mobile). */
export function Cluster({
  gap = "sm",
  justify = "start",
  align = "center",
  collapse,
  as: Tag = "div",
  ...props
}: ClusterProps) {
  const direction = collapse ? "flex-col sm:flex-row" : "flex-wrap";
  return <Tag className={`flex ${direction} ${GAPS[gap]} ${JUSTIFY[justify]} ${ALIGN[align]}`} {...props} />;
}
