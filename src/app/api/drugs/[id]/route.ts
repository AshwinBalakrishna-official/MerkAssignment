import { NextResponse } from "next/server";
import { getDrug } from "@/lib/drugs/repository";
import { simulateLatency } from "@/lib/api/latency";

/** GET /api/drugs/:id */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await simulateLatency();
  const drug = await getDrug(id);
  if (!drug) {
    return NextResponse.json({ error: "Drug not found" }, { status: 404 });
  }
  return NextResponse.json(drug);
}
