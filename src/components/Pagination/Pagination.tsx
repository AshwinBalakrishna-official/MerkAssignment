import { ButtonLink, Cluster, Text } from "@/design-system";

interface Props {
  page: number;
  totalPages: number;
  /** Builds the href for a page number, preserving other filters. */
  hrefFor: (page: number) => string;
}

export function Pagination({ page, totalPages, hrefFor }: Props) {
  if (totalPages <= 1) return null;
  return (
    <Cluster as="nav" aria-label="Pagination" justify="center" gap="md">
      <ButtonLink href={hrefFor(page - 1)} disabled={page <= 1}>Previous</ButtonLink>
      <Text as="span" size="sm">Page {page} of {totalPages}</Text>
      <ButtonLink href={hrefFor(page + 1)} disabled={page >= totalPages}>Next</ButtonLink>
    </Cluster>
  );
}
