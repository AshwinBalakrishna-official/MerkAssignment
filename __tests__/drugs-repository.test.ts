import { getDrug, listDrugs, MAX_LIMIT } from "@/lib/drugs/repository";

describe("listDrugs", () => {
  it("paginates and reports totals", async () => {
    const r = await listDrugs({ limit: 5 });
    expect(r.items).toHaveLength(5);
    expect(r.page).toBe(1);
    expect(r.totalPages).toBe(Math.ceil(r.total / 5));
  });

  it("returns summaries only (no heavy fields)", async () => {
    const [item] = (await listDrugs()).items;
    expect(Object.keys(item).sort()).toEqual(["description", "id", "name", "status"]);
  });

  it("searches names case-insensitively", async () => {
    const r = await listDrugs({ q: "  GLUC " });
    expect(r.items.map((d) => d.name)).toEqual(["Glucora"]);
  });

  it("filters by status", async () => {
    const r = await listDrugs({ status: "Withdrawn", limit: 100 });
    expect(r.total).toBeGreaterThan(0);
    expect(r.items.every((d) => d.status === "Withdrawn")).toBe(true);
  });

  it("combines search and status", async () => {
    expect((await listDrugs({ q: "glucora", status: "Withdrawn" })).total).toBe(0);
  });

  it("clamps page and limit", async () => {
    expect((await listDrugs({ page: 999 })).page).toBe((await listDrugs()).totalPages);
    expect((await listDrugs({ page: -3 })).page).toBe(1);
    expect((await listDrugs({ limit: 10_000 })).limit).toBe(MAX_LIMIT);
    expect((await listDrugs({ page: NaN })).page).toBe(1);
  });

  it("returns an empty page for no matches", async () => {
    const r = await listDrugs({ q: "zzzz" });
    expect(r.items).toEqual([]);
    expect(r.total).toBe(0);
    expect(r.totalPages).toBe(1);
  });
});

describe("getDrug", () => {
  it("returns the full record", async () => {
    const d = await getDrug("glucora");
    expect(d?.mechanismOfAction).toBeTruthy();
    expect(d?.sideEffects.length).toBeGreaterThan(0);
  });
  it("returns null for unknown ids", async () => {
    expect(await getDrug("nope")).toBeNull();
  });
});
