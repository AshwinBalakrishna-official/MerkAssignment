"use client";

import { Button, Heading, Page, Stack } from "@/design-system";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Page size="md" role="alert">
      <Stack>
        <Heading level={1} size={2}>Something went wrong</Heading>
        <div>
          <Button onClick={reset}>Try again</Button>
        </div>
      </Stack>
    </Page>
  );
}
