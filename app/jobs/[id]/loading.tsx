"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function JobDetailsLoading() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Loading Job...";

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all jobs
        </Link>
      </div>

      <div className="bg-background border rounded-2xl p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-6 w-full">
            <div className="h-16 w-16 rounded-xl animate-shimmer shrink-0"></div>
            <div className="w-full">
              {/* Title Skeleton */}
              <div className="w-3/4 max-w-md animate-shimmer rounded-md mb-3 flex items-center px-2 py-1">
                <span className="text-white/50 text-xl font-extrabold select-none">{title}</span>
              </div>
              {/* Company Skeleton */}
              <div className="h-6 w-48 animate-shimmer rounded-md mb-6"></div>
              
              {/* Meta details skeleton */}
              <div className="flex flex-wrap gap-4">
                <div className="h-5 w-24 animate-shimmer rounded"></div>
                <div className="h-5 w-24 animate-shimmer rounded"></div>
                <div className="h-5 w-24 animate-shimmer rounded"></div>
                <div className="h-5 w-32 animate-shimmer rounded"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
            {/* Action Buttons Skeleton */}
            <div className="h-12 w-full md:w-40 animate-shimmer rounded-md"></div>
            <div className="h-12 w-full md:w-40 animate-shimmer rounded-md border-border border"></div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="h-7 w-40 animate-shimmer rounded-md mb-4"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-8 w-20 animate-shimmer rounded-full"></div>
            <div className="h-8 w-24 animate-shimmer rounded-full"></div>
            <div className="h-8 w-16 animate-shimmer rounded-full"></div>
            <div className="h-8 w-28 animate-shimmer rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Description Body Skeleton */}
      <div className="bg-background border rounded-2xl p-8 shadow-sm">
        <div className="w-48 animate-shimmer rounded-md mb-6 flex items-center px-2 py-1">
          <span className="text-white/50 text-lg font-bold select-none">About the Role</span>
        </div>
        
        <div className="space-y-3 mb-10">
          <div className="h-4 w-full animate-shimmer rounded"></div>
          <div className="h-4 w-full animate-shimmer rounded"></div>
          <div className="h-4 w-11/12 animate-shimmer rounded"></div>
          <div className="h-4 w-full animate-shimmer rounded"></div>
          <div className="h-4 w-4/5 animate-shimmer rounded"></div>
        </div>

        <div className="w-40 animate-shimmer rounded-md mt-8 mb-6 flex items-center px-2 py-0.5">
          <span className="text-white/50 text-lg font-bold select-none">Responsibilities</span>
        </div>
        <div className="space-y-3 pl-6">
          <div className="h-4 w-5/6 animate-shimmer rounded"></div>
          <div className="h-4 w-11/12 animate-shimmer rounded"></div>
          <div className="h-4 w-4/5 animate-shimmer rounded"></div>
          <div className="h-4 w-full animate-shimmer rounded"></div>
        </div>

        <div className="w-40 animate-shimmer rounded-md mt-8 mb-6 flex items-center px-2 py-0.5">
          <span className="text-white/50 text-lg font-bold select-none">Qualifications</span>
        </div>
        <div className="space-y-3 pl-6">
          <div className="h-4 w-3/4 animate-shimmer rounded"></div>
          <div className="h-4 w-5/6 animate-shimmer rounded"></div>
          <div className="h-4 w-11/12 animate-shimmer rounded"></div>
        </div>
      </div>
    </div>
  );
}
