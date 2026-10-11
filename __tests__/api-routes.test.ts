import { NextRequest } from "next/server";
import { GET as list } from "@/app/api/drugs/route";
import { GET as detail } from "@/app/api/drugs/[id]/route";

const req = (qs = "") => new NextRequest(`http://localhost/api/drugs${qs}`);

describe("GET /api/drugs", () => {
  it("returns a paginated list", async () => {
    const res = await list(req("?limit=2"));
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.items).toHaveLength(2);
  });

  it("applies q and status", async () => {
    const body = await (await list(req("?q=cardio&status=Approved"))).json();
    expect(body.items.map((d: { name: string }) => d.name)).toEqual(["Cardiorex"]);
  });

  it("rejects an invalid status with 400", async () => {
    expect((await list(req("?status=bogus"))).status).toBe(400);
  });
});

describe("GET /api/drugs/:id", () => {
  const call = (id: string) => detail(new Request("http://localhost"), { params: Promise.resolve({ id }) });

  it("returns the drug", async () => {
    const res = await call("cardiorex");
    expect(res.status).toBe(200);
    expect((await res.json()).name).toBe("Cardiorex");
  });

  it("returns 404 for unknown ids", async () => {
    expect((await call("missing")).status).toBe(404);
  });
});
