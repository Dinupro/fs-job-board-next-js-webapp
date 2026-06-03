import { getJobs } from "@/lib/jobs";
import JobCard from "@/components/JobCard";

export default async function LatestJobs() {
  // Fetch top 5 newest jobs
  const { data: jobs } = await getJobs({ limit: 5 });
  
  if (jobs.length === 0) {
    return <div className="text-center p-8 border rounded-xl bg-muted/20">No jobs found. Check back later!</div>;
  }

  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
