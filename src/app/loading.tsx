import { Grid, Page, Skeleton, Stack } from "@/design-system";

export default function Loading() {
  return (
    <Page size="lg" aria-busy="true">
      <Stack gap="lg">
        <Skeleton variant="title" />
        <Grid cols={3}>
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} variant="card" />
          ))}
        </Grid>
      </Stack>
    </Page>
  );
}
