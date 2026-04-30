import { getAllJobs } from "@/lib/jobs";
import PaginatedJobs from "@/components/PaginatedJobs";

export default async function LatestJobs() {
  const jobs = await getAllJobs();
  
  return <PaginatedJobs initialJobs={jobs} />;
}
