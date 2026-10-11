import { connection, NextResponse } from "next/server";
import { apiDocsEnabled, docsDisabledResponse } from "@/lib/docs/flag";
import { openApiSpec } from "@/lib/docs/openapi";

/** GET /api/openapi.json – machine-readable API spec (404 when docs are disabled). */
export async function GET() {
  await connection(); // evaluate the env flag per request, not at build time
  if (!apiDocsEnabled()) return docsDisabledResponse();
  return NextResponse.json(openApiSpec);
}
