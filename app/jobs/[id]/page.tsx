import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Clock, DollarSign, ExternalLink } from "lucide-react";
import { getJobById, getAllJobs } from "@/lib/jobs";
import ApplyModal from "@/components/ApplyModal";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JobDetailsPage(props: Props) {
  const params = await props.params;
  const job = await getJobById(params.id);

  if (!job) {
    notFound();
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "Competitive";
    if (min && !max) return `$${(min / 1000).toFixed(0)}k+`;
    if (!min && max) return `Up to $${(max / 1000).toFixed(0)}k`;
    return `$${(min! / 1000).toFixed(0)}k - $${(max! / 1000).toFixed(0)}k`;
  };

  const typeDisplay = job.type.replace('_', ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all jobs
        </Link>
      </div>

      <div className="bg-background border rounded-2xl p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground shrink-0 overflow-hidden">
              {job.recruiter.companyLogo ? (
                <img src={job.recruiter.companyLogo} alt={job.recruiter.companyName} className="w-full h-full object-cover" />
              ) : (
                job.recruiter.companyName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{job.title}</h1>
              <div className="text-xl text-muted-foreground mb-4">{job.recruiter.companyName}</div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="mr-1.5 h-4 w-4" /> {job.location}
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-1.5 h-4 w-4" /> {typeDisplay}
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-1.5 h-4 w-4" /> {formatSalary(job.salaryMin, job.salaryMax)}
                </div>
                {job.category && (
                  <div className="flex items-center">
                    <GraduationCap className="mr-1.5 h-4 w-4" /> {job.category.name}
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="mr-1.5 h-4 w-4" /> Posted {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <ApplyModal jobId={job.id} jobTitle={job.title} />
            <button className="border px-8 py-3 rounded-md font-medium hover:bg-muted transition-colors">
              Save Job
            </button>
          </div>
        </div>
      </div>

      <div className="bg-background border rounded-2xl p-8 shadow-sm prose prose-neutral max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About the Role</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {job.description}
        </p>
        
        {/* Placeholder for more content */}
        <h3 className="text-xl font-bold mt-8 mb-4 text-foreground">Responsibilities</h3>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
          <li>Unit-test code for robustness, including edge cases, usability, and general reliability.</li>
          <li>Work on bug fixing and improving application performance.</li>
          <li>Continuously discover, evaluate, and implement new technologies to maximize development efficiency.</li>
        </ul>

        <h3 className="text-xl font-bold mt-8 mb-4 text-foreground">Qualifications</h3>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Currently pursuing a degree in Computer Science, Software Engineering, or a related field.</li>
          <li>Strong understanding of fundamental computer science concepts.</li>
          <li>Excellent problem-solving and analytical skills.</li>
          <li>Strong communication and teamwork abilities.</li>
        </ul>
      </div>
    </div>
  );
}

// Generate static params for all jobs so they are pre-rendered at build time
export async function generateStaticParams() {
  const allJobs = await getAllJobs();
  return allJobs.map((job) => ({
    id: job.id,
  }));
}
