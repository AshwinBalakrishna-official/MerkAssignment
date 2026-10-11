import { NextRequest, NextResponse } from "next/server";
import { listDrugs } from "@/lib/drugs/repository";
import { DRUG_STATUSES, type DrugStatus } from "@/lib/drugs/types";
// import { simulateLatency } from "@/lib/api/latency";

/** GET /api/drugs?drugName=&status=&page=&limit= */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const status = sp.get("status");
  if (status && !DRUG_STATUSES.includes(status as DrugStatus)) {
    return NextResponse.json(
      { error: `Invalid status. Expected one of: ${DRUG_STATUSES.join(", ")}` },
      { status: 400 },
    );
  }
  // COmmenting latency to show loader
  // await simulateLatency();
  const result = await listDrugs({
    drugName: sp.get("drugName") ?? undefined,
    status: (status as DrugStatus) || undefined,
    page: sp.has("page") ? Number(sp.get("page")) : undefined,
    limit: sp.has("limit") ? Number(sp.get("limit")) : undefined,
  });
  return NextResponse.json(result);
}
