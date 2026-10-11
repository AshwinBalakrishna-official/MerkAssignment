/**
 * OpenAPI 3.0 description of the mock API. Served at /api/openapi.json and
 * rendered by Swagger UI at /api-docs. Enum values come from DRUG_STATUSES and
 * paths from ENDPOINTS' route layout, so the spec can't drift from the types.
 */
import { DEFAULT_LIMIT, MAX_LIMIT } from "@/lib/drugs/repository";
import { DRUG_STATUSES } from "@/lib/drugs/types";

const statusSchema = { type: "string", enum: [...DRUG_STATUSES] };

const drugSummary = {
  type: "object",
  required: ["id", "name", "status", "description"],
  properties: {
    id: { type: "string", example: "glucora" },
    name: { type: "string", example: "Glucora" },
    status: statusSchema,
    description: { type: "string" },
  },
};

const drug = {
  allOf: [
    drugSummary,
    {
      type: "object",
      required: ["mechanismOfAction", "sideEffects", "indication", "developer", "phase", "approvalDate"],
      properties: {
        mechanismOfAction: { type: "string" },
        sideEffects: { type: "array", items: { type: "string" } },
        indication: { type: "string" },
        developer: { type: "string" },
        phase: { type: "string", example: "Phase 3" },
        approvalDate: { type: "string", format: "date", nullable: true },
      },
    },
  ],
};

const error = {
  type: "object",
  required: ["error"],
  properties: { error: { type: "string" } },
};

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Drug Candidates Mock API",
    version: "1.0.0",
    description: "Read-only mock API backed by a JSON file. All data is fictional.",
  },
  servers: [{ url: "/" }],
  tags: [{ name: "Drugs" }],
  paths: {
    "/api/drugs": {
      get: {
        tags: ["Drugs"],
        summary: "List drug candidates",
        description: "Server-side search, filter and pagination. Results are sorted by name; out-of-range page/limit are clamped.",
        parameters: [
          { name: "q", in: "query", description: "Case-insensitive substring match on name", schema: { type: "string" } },
          { name: "status", in: "query", schema: statusSchema },
          { name: "page", in: "query", schema: { type: "integer", minimum: 1, default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", minimum: 1, maximum: MAX_LIMIT, default: DEFAULT_LIMIT } },
        ],
        responses: {
          "200": {
            description: "A page of drug summaries",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["items", "page", "limit", "total", "totalPages"],
                  properties: {
                    items: { type: "array", items: { $ref: "#/components/schemas/DrugSummary" } },
                    page: { type: "integer" },
                    limit: { type: "integer" },
                    total: { type: "integer" },
                    totalPages: { type: "integer" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid status value",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/api/drugs/{id}": {
      get: {
        tags: ["Drugs"],
        summary: "Get a drug candidate",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, example: "glucora" }],
        responses: {
          "200": {
            description: "Full drug record",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Drug" } } },
          },
          "404": {
            description: "Unknown id",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
  },
  components: { schemas: { DrugSummary: drugSummary, Drug: drug, Error: error } },
};
