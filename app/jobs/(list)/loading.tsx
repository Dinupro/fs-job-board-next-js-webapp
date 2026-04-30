import { Search, MapPin, Briefcase, GraduationCap, Code2 } from "lucide-react";

export default function JobsLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Find Your Next Role</h1>
        <p className="text-lg text-muted-foreground">Browse through highly curated opportunities for software students.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters Skeleton */}
        <div className="w-full lg:w-1/4 space-y-6">
          <div className="bg-background border rounded-xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
            </div>

            <div className="space-y-6">
              {[Search, MapPin, Briefcase, GraduationCap, Code2].map((Icon, i) => (
                <div key={i} className="space-y-2">
                  <label className="text-sm font-medium flex items-center text-muted-foreground">
                    <Icon className="h-4 w-4 mr-2" />
                    <div className="h-4 w-20 animate-shimmer rounded"></div>
                  </label>
                  <div className="w-full h-9 animate-shimmer rounded-md"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="w-full lg:w-3/4">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-7 w-32 animate-shimmer rounded"></div>
          </div>

          <div className="space-y-4">
            {/* Render 5 skeleton job cards */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border rounded-xl p-6 bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full">
                  <div className="h-12 w-12 rounded animate-shimmer shrink-0"></div>
                  <div className="space-y-2 w-full max-w-md">
                    <div className="h-6 w-3/4 animate-shimmer rounded"></div>
                    <div className="flex gap-2">
                      <div className="h-4 w-24 animate-shimmer rounded"></div>
                      <div className="h-4 w-16 animate-shimmer rounded"></div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="h-5 w-16 animate-shimmer rounded"></div>
                      <div className="h-5 w-20 animate-shimmer rounded"></div>
                      <div className="h-5 w-14 animate-shimmer rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-20 animate-shimmer rounded-full"></div>
                    <div className="h-5 w-16 animate-shimmer rounded"></div>
                  </div>
                  <div className="hidden sm:block h-9 w-28 animate-shimmer rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
