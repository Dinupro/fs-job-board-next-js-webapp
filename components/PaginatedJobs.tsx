"use client";

import { useState } from "react";
import { Job } from "@/data/jobs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import JobCard from "@/components/JobCard";

export default function PaginatedJobs({ initialJobs }: { initialJobs: Job[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const totalPages = Math.ceil(initialJobs.length / jobsPerPage);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const visibleJobs = initialJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div>
      <div className="space-y-4">
        {visibleJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md border text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
