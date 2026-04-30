export default function LatestJobsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border rounded-xl p-6 bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <div className="h-12 w-12 rounded animate-shimmer shrink-0"></div>
            <div className="space-y-2 w-full max-w-md">
              <div className="h-6 w-3/4 animate-shimmer rounded"></div>
              <div className="flex gap-2">
                <div className="h-4 w-24 animate-shimmer rounded"></div>
                <div className="h-4 w-16 animate-shimmer rounded"></div>
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
  );
}
