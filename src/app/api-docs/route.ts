/**
 * GET /api-docs – Swagger UI. Loaded from a version-pinned CDN, so it needs
 * internet access but adds no dependency to the app bundle.
 * Returns 404 when disabled (see lib/api-docs-flag.ts).
 */
import { connection } from "next/server";
import { apiDocsEnabled, docsDisabledResponse } from "@/lib/docs/flag";

const SWAGGER_UI_VERSION = "5.17.14";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Drug Candidates API docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@${SWAGGER_UI_VERSION}/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@${SWAGGER_UI_VERSION}/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({ url: "/api/openapi.json", dom_id: "#swagger-ui" });
    </script>
  </body>
</html>`;

export async function GET() {
  await connection(); // evaluate the env flag per request, not at build time
  if (!apiDocsEnabled()) return docsDisabledResponse();
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
