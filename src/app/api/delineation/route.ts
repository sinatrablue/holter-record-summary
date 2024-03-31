import { NextRequest, NextResponse } from "next/server";
import { generateHolterSummary } from "./delineation.worker";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const processedData = await generateHolterSummary(
      formData.get("file") as File
    );
    return NextResponse.json({ data: processedData });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
