import { BulletList, Cluster, Fact, Grid, Heading, Page, Stack, Text, TextLink } from "@/design-system";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { fetchDrug } from "./DrugDetails.api";

/** Detail content for one drug; triggers the not-found UI for unknown ids. */
export async function DrugDetails({ params }: Pick<PageProps<"/drugs/[id]">, "params">) {
  const { id } = await params;
  const drug = await fetchDrug(id);
  if (!drug) notFound();

  const facts: [string, string][] = [
    ["Indication", drug.indication],
    ["Developer", drug.developer],
    ["Phase", drug.phase],
    ["Approval date", drug.approvalDate ?? "—"],
  ];

  return (
    <Page size="md">
      <Stack gap="lg">
        <div>
          <TextLink href="/">← Back to all candidates</TextLink>
        </div>

        <Cluster gap="md">
          <Heading level={1}>{drug.name}</Heading>
          <StatusBadge status={drug.status} />
        </Cluster>
        <Text>{drug.description}</Text>

        <Grid as="dl" cols={2}>
          {facts.map(([label, value]) => (
            <Fact key={label} label={label} value={value} />
          ))}
        </Grid>

        <Stack as="section" gap="xs">
          <Heading level={2}>Mechanism of Action</Heading>
          <Text>{drug.mechanismOfAction}</Text>
        </Stack>

        <Stack as="section" gap="xs">
          <Heading level={2}>Side Effects</Heading>
          <BulletList items={drug.sideEffects} />
        </Stack>
      </Stack>
    </Page>
  );
}
