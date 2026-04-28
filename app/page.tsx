import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, Search, Zap } from "lucide-react";
import PaginatedJobs from "@/components/PaginatedJobs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 md:pt-24 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                The #1 Job Board for Software Students
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
                Launch Your <span className="text-primary">Software Career</span> Today
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Find the best internships, entry-level roles, and junior developer positions at top tech companies and fast-growing startups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/jobs"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary-hover transition-colors h-12"
                >
                  Browse Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/employers/post"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors h-12"
                >
                  Post a Job
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted overflow-hidden">
                      <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} width={32} height={32} alt="User avatar" />
                    </div>
                  ))}
                </div>
                <p>Join 10,000+ students hired</p>
              </div>
            </div>
            <div className="relative lg:ml-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary to-purple-300 rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="relative rounded-2xl bg-background border shadow-2xl p-2">
                <Image
                  src="/hero_graphic.png"
                  alt="3D abstract illustration of a web interface showing a job board concept"
                  width={600}
                  height={500}
                  className="rounded-xl object-cover h-[400px] w-full md:h-[500px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why choose Easy Job Board?</h2>
            <p className="text-lg text-muted-foreground">
              We focus exclusively on software engineering, web development, and data science roles for students and recent grads.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Tech Roles</h3>
              <p className="text-muted-foreground">
                No more filtering through irrelevant listings. Every job is hand-picked for software students.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Founder Access</h3>
              <p className="text-muted-foreground">
                Connect directly with hiring managers and founders at early-stage startups looking for fresh talent.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Applications</h3>
              <p className="text-muted-foreground">
                Apply to dozens of companies with a single profile. Say goodbye to repetitive workday forms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Latest Opportunities</h2>
              <p className="text-muted-foreground">Fresh internships and junior roles posted this week.</p>
            </div>
            <Link href="/jobs" className="hidden sm:flex items-center text-primary hover:text-primary-hover font-medium transition-colors">
              View all jobs <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <PaginatedJobs />

          <div className="mt-8 text-center sm:hidden">
            <Link href="/jobs" className="inline-flex items-center text-primary hover:text-primary-hover font-medium transition-colors">
              View all jobs <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to land your dream role?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Create your profile today and get matched with top tech companies looking for students just like you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-md bg-background text-primary px-8 py-3 text-sm font-bold shadow hover:bg-muted transition-colors h-12"
            >
              Create Free Profile
            </Link>
          </div>
          <ul className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-primary-foreground/80">
            <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4" /> No hidden fees</li>
            <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4" /> 1-click apply</li>
            <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4" /> Resume builder included</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
