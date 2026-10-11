import { ENDPOINTS } from "@/lib/api/endpoints";

describe("ENDPOINTS", () => {
  it("exposes the list and detail paths", () => {
    expect(ENDPOINTS.DRUGS_LIST).toBe("/api/drugs");
    expect(ENDPOINTS.DRUG_DETAILS("glucora")).toBe("/api/drugs/glucora");
  });

  it("keeps a malicious id inside a single path segment", () => {
    expect(ENDPOINTS.DRUG_DETAILS("../x?a=b#c")).toBe("/api/drugs/..%2Fx%3Fa%3Db%23c");
  });
});
