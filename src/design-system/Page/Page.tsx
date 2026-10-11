import type { ComponentProps } from "react";

const SIZES = { md: "max-w-3xl", lg: "max-w-5xl" } as const;

interface PageProps extends ComponentProps<"main"> {
  size?: keyof typeof SIZES;
}

/** Centered page container. */
export function Page({ size = "lg", ...props }: PageProps) {
  return <main className={`mx-auto w-full flex-1 px-4 py-10 ${SIZES[size]}`} {...props} />;
}
