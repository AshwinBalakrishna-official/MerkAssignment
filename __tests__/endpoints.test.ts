import { ENDPOINTS } from "@/lib/api/endpoints";
import { buildUrl } from "@/lib/api/http";

describe("ENDPOINTS", () => {
  it("exposes the list and detail paths", () => {
    expect(ENDPOINTS.DRUGS_LIST).toBe("/api/drugs");
    expect(ENDPOINTS.DRUG_DETAILS("glucora")).toBe("/api/drugs/glucora");
  });

  it("keeps a malicious id inside a single path segment", () => {
    expect(ENDPOINTS.DRUG_DETAILS("../x?a=b#c")).toBe("/api/drugs/..%2Fx%3Fa%3Db%23c");
  });
});

describe("buildUrl", () => {
  it("skips undefined and empty query values", () => {
    const url = buildUrl(ENDPOINTS.DRUGS_LIST, { q: "gl", status: undefined, page: 2, x: "" });
    expect(url.pathname).toBe("/api/drugs");
    expect(url.search).toBe("?q=gl&page=2");
  });
});
