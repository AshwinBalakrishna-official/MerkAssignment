import { apiDocsEnabled } from "@/lib/docs/flag";
import { GET } from "@/app/api/openapi.json/route";
import { openApiSpec } from "@/lib/docs/openapi";
import { DRUG_STATUSES } from "@/lib/drugs/types";

vi.mock("next/server", async (orig) => ({
  ...(await orig<typeof import("next/server")>()),
  connection: async () => {}, // only valid inside a real request
}));

afterEach(() => vi.unstubAllEnvs());

describe("OpenAPI spec", () => {
  it("documents both endpoints", () => {
    expect(Object.keys(openApiSpec.paths)).toEqual(["/api/drugs", "/api/drugs/{id}"]);
  });

  it("uses the same status values as the app", () => {
    const status = openApiSpec.paths["/api/drugs"].get.parameters.find((p) => p.name === "status");
    expect(status?.schema).toEqual({ type: "string", enum: [...DRUG_STATUSES] });
  });

  it("is served as JSON when enabled", async () => {
    vi.stubEnv("ENABLE_API_DOCS", "true");
    const res = await GET();
    expect((await res.json()).openapi).toBe("3.0.3");
  });

  it("returns 404 when docs are disabled", async () => {
    vi.stubEnv("ENABLE_API_DOCS", "false");
    expect((await GET()).status).toBe(404);
  });
});

describe("apiDocsEnabled", () => {
  it("defaults to on in development and off in production", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(apiDocsEnabled()).toBe(true);
    vi.stubEnv("NODE_ENV", "production");
    expect(apiDocsEnabled()).toBe(false);
  });

  it("lets ENABLE_API_DOCS override the default", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ENABLE_API_DOCS", "true");
    expect(apiDocsEnabled()).toBe(true);
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ENABLE_API_DOCS", "false");
    expect(apiDocsEnabled()).toBe(false);
  });
});
