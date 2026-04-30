import Link from "next/link";
import { ArrowLeft, SearchX, Briefcase, Search } from "lucide-react";

export default function JobNotFound() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-hover transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to active jobs
        </Link>
      </div>

      {/* Main Error Banner */}
      <div className="bg-muted/20 border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-muted/80 flex items-center justify-center text-muted-foreground border shadow-sm shrink-0">
            <SearchX className="h-8 w-8" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
              Job Unavailable
            </h1>
            <p className="text-muted-foreground">
              This position is no longer active or the link is broken.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-3">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow hover:bg-primary-hover transition-colors"
          >
            <Briefcase className="mr-2 h-4 w-4" /> Browse All Jobs
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Looking for something similar? */}
      <div className="max-w-4xl mx-auto bg-muted/20 border rounded-3xl p-10 md:p-14 text-center shadow-sm">
        <h3 className="text-2xl font-bold mb-4">Looking for something similar?</h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          The role you're looking for might have been filled by another great candidate, but companies are constantly posting new opportunities for students and recent grads.
        </p>

        {/* Native HTML Form for search - works without JS! */}
        <form action="/jobs" method="GET" className="relative mb-10 max-w-xl mx-auto text-left">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            name="search"
            placeholder="Search by job title, company, or keywords..."
            className="w-full pl-12 pr-4 py-4 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm text-base"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors">
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
          <Link href="/jobs?term=Software" className="group block bg-background border rounded-xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm">
            <h4 className="font-semibold text-primary mb-2 text-lg">Software Engineering</h4>
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Find SDE internships and new grad roles.
            </p>
          </Link>

          <Link href="/jobs?term=Data" className="group block bg-background border rounded-xl p-6 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all shadow-sm">
            <h4 className="font-semibold text-blue-500 mb-2 text-lg">Data & Systems</h4>
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Discover data science and cloud infra roles.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
