"use client";

import { useState } from "react";
import { jobs } from "@/data/jobs";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginatedJobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  
  const startIndex = (currentPage - 1) * jobsPerPage;
  const visibleJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div>
      <div className="space-y-4">
        {visibleJobs.map((job) => (
          <div key={job.id} className="group border rounded-xl p-6 bg-background hover:border-primary/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                {job.company.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{job.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground gap-3 mt-1">
                  <span>{job.company}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                {job.type}
              </span>
              <span className="text-sm font-medium">{job.salary}</span>
              <button className="hidden sm:inline-flex rounded-md bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20 transition-colors">
                Apply
              </button>
            </div>
          </div>
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
                className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                  currentPage === page
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
