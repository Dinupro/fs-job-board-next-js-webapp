import Link from "next/link";
import { Job } from "@/data/jobs";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <div className="group border rounded-xl p-6 bg-background hover:border-primary/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground shrink-0">
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{job.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground gap-3 mt-1 flex-wrap">
              <span>{job.company}</span>
              <span className="hidden sm:inline">•</span>
              <span>{job.location}</span>
              <span className="hidden sm:inline">•</span>
              <span>{job.term}</span>
            </div>
            {job.skills && job.skills.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {job.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
                {job.skills.length > 3 && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    +{job.skills.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {job.type}
            </span>
            <span className="text-sm font-medium">{job.salary}</span>
          </div>
          <button className="hidden sm:inline-flex rounded-md bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
