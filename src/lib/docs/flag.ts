/**
 * Whether the Swagger UI and OpenAPI spec are exposed.
 * ENABLE_API_DOCS=true|false wins; otherwise on in development, off in production.
 */
export function apiDocsEnabled(): boolean {
  const flag = process.env.ENABLE_API_DOCS;
  if (flag === "true") return true;
  if (flag === "false") return false;
  return process.env.NODE_ENV !== "production";
}

export const docsDisabledResponse = () =>
  Response.json({ error: "Not found" }, { status: 404 });
