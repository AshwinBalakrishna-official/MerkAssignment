import { Heading, Page, Stack, TextLink } from "@/design-system";

export default function NotFound() {
  return (
    <Page size="md">
      <Stack>
        <Heading level={1} size={2}>Drug candidate not found</Heading>
        <div>
          <TextLink href="/">← Back to all candidates</TextLink>
        </div>
      </Stack>
    </Page>
  );
}
