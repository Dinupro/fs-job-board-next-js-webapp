import Link from "next/link";
import { ArrowRight, Home, SearchX } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col min-h-[80vh] relative overflow-hidden items-center justify-center text-center px-4">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-10 w-[400px] h-[400px] bg-purple-500/20 rounded-full filter blur-[100px] -z-10 animate-blob"></div>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full filter blur-[100px] -z-10 animate-blob animation-delay-2000"></div>

      <div className="h-24 w-24 rounded-2xl bg-muted flex items-center justify-center text-primary mb-8 border shadow-sm animate-fade-in-up">
        <SearchX className="h-12 w-12" />
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground animate-fade-in-up animation-delay-100">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in-up animation-delay-200">
        Page Not Found
      </h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-md animate-fade-in-up animation-delay-300">
        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary-hover transition-colors h-12"
        >
          <Home className="mr-2 h-4 w-4" /> Return Home
        </Link>
        <Link
          href="/jobs"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors h-12"
        >
          Browse Jobs <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
