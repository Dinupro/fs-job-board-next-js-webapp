import { getJobs, getFilterOptions } from "@/lib/jobs";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function JobsPage(props: Props) {
  const searchParams = await props.searchParams;
  
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
  const location = typeof searchParams.location === "string" ? searchParams.location : undefined;
  const type = typeof searchParams.type === "string" ? searchParams.type : undefined;
  const term = typeof searchParams.term === "string" ? searchParams.term : undefined;
  const skill = typeof searchParams.skill === "string" ? searchParams.skill : undefined;
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;

  // Fetch filter options and jobs in parallel
  const [filterOptions, jobsResponse] = await Promise.all([
    getFilterOptions(),
    getJobs({
      search,
      location,
      type,
      term,
      skill,
      page,
      limit: 5
    })
  ]);

  const { locations, types, terms, skills } = filterOptions;
  const { data: visibleJobs, total, totalPages, page: currentPage } = jobsResponse;

  const createPageUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (term) params.set("term", term);
    if (skill) params.set("skill", skill);
    if (newPage > 1) params.set("page", newPage.toString());
    
    return `/jobs?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Find Your Next Role</h1>
        <p className="text-lg text-muted-foreground">Browse through highly curated opportunities for software students.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 space-y-6">
          <JobFilters 
            initialSearch={search || ""}
            initialLocation={location || ""}
            initialType={type || ""}
            initialTerm={term || ""}
            initialSkill={skill || ""}
            locations={locations}
            types={types}
            terms={terms}
            skills={skills}
          />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {total} {total === 1 ? 'Job' : 'Jobs'} Found
            </h2>
          </div>

          {visibleJobs.length === 0 ? (
            <div className="text-center py-24 border rounded-xl bg-muted/20">
              <h3 className="text-xl font-semibold mb-2">No jobs match your criteria</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <Link 
                href="/jobs"
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Link
                href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
                className={`p-2 rounded-md border transition-colors ${
                  currentPage === 1 
                    ? "text-muted-foreground opacity-50 cursor-not-allowed" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={createPageUrl(p)}
                    className={`flex items-center justify-center w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                      currentPage === p
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>

              <Link
                href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
                className={`p-2 rounded-md border transition-colors ${
                  currentPage === totalPages 
                    ? "text-muted-foreground opacity-50 cursor-not-allowed" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
