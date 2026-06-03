import Link from "next/link";
import { JobWithRelations } from "@/lib/jobs";

interface JobCardProps {
  job: JobWithRelations;
}

export default function JobCard({ job }: JobCardProps) {
  // Format salary
  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "Competitive";
    if (min && !max) return `$${(min / 1000).toFixed(0)}k+`;
    if (!min && max) return `Up to $${(max / 1000).toFixed(0)}k`;
    return `$${(min! / 1000).toFixed(0)}k - $${(max! / 1000).toFixed(0)}k`;
  };

  const typeDisplay = job.type.replace('_', ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <div className="group border rounded-xl p-6 bg-background hover:border-primary/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground shrink-0 overflow-hidden">
            {job.recruiter.companyLogo ? (
              <img src={job.recruiter.companyLogo} alt={job.recruiter.companyName} className="w-full h-full object-cover" />
            ) : (
              job.recruiter.companyName.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{job.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground gap-3 mt-1 flex-wrap">
              <span>{job.recruiter.companyName}</span>
              <span className="hidden sm:inline">•</span>
              <span>{job.location}</span>
            </div>
            {job.category && (
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  {job.category.name}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {typeDisplay}
            </span>
            <span className="text-sm font-medium">{formatSalary(job.salaryMin, job.salaryMax)}</span>
          </div>
          <button className="hidden sm:inline-flex rounded-md bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
