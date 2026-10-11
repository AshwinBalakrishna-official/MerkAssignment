import { Badge, type BadgeTone } from "@/design-system";
import type { DrugStatus } from "@/lib/drugs/types";

const TONES: Record<DrugStatus, BadgeTone> = {
  "In Development": "warning",
  Approved: "success",
  Discontinued: "neutral",
  Withdrawn: "danger",
};

export function StatusBadge({ status }: { status: DrugStatus }) {
  return <Badge tone={TONES[status]}>{status}</Badge>;
}
