import { Card, Text } from "@/design-system";
import type { DrugSummary } from "@/lib/drugs/types";
import { StatusBadge } from "@/components/StatusBadge";

export function DrugCard({ drug }: { drug: DrugSummary }) {
  return (
    <li>
      <Card href={`/drugs/${drug.id}`} title={drug.name} aside={<StatusBadge status={drug.status} />}>
        <Text tone="muted" size="sm" clamp>{drug.description}</Text>
      </Card>
    </li>
  );
}
