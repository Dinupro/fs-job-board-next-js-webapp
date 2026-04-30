import { NextResponse } from "next/server";
import { getJobs, GetJobsParams } from "@/lib/jobs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const params: GetJobsParams = {
    search: searchParams.get("search") || undefined,
    location: searchParams.get("location") || undefined,
    type: searchParams.get("type") || undefined,
    term: searchParams.get("term") || undefined,
    skill: searchParams.get("skill") || undefined,
    page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
    limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 5,
  };

  try {
    const data = await getJobs(params);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
