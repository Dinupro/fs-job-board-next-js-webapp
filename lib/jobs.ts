import { jobs, Job } from "@/data/jobs";

export interface GetJobsParams {
  search?: string;
  location?: string;
  type?: string;
  term?: string;
  skill?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Get all jobs without pagination or filtering.
 * Useful for static generation or sitemaps.
 */
export async function getAllJobs(): Promise<Job[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return [...jobs];
}

/**
 * Get jobs with optional filtering, searching, and pagination.
 */
export async function getJobs(params: GetJobsParams = {}): Promise<PaginatedResponse<Job>> {
  // Simulate network delay to make it realistic
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredJobs = [...jobs];

  // Apply Search (title or company)
  if (params.search) {
    const query = params.search.toLowerCase();
    filteredJobs = filteredJobs.filter(
      job => 
        job.title.toLowerCase().includes(query) || 
        job.company.toLowerCase().includes(query)
    );
  }

  // Apply Filters
  if (params.location) {
    filteredJobs = filteredJobs.filter(job => job.location === params.location);
  }
  
  if (params.type) {
    filteredJobs = filteredJobs.filter(job => job.type === params.type);
  }

  if (params.term) {
    filteredJobs = filteredJobs.filter(job => job.term === params.term);
  }

  if (params.skill) {
    filteredJobs = filteredJobs.filter(job => job.skills.includes(params.skill!));
  }

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 5;
  const total = filteredJobs.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = filteredJobs.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total,
    page,
    limit,
    totalPages
  };
}

/**
 * Get a single job by its ID/Slug
 */
export async function getJobById(id: string): Promise<Job | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const job = jobs.find(j => j.id === id);
  return job || null;
}

/**
 * Extract unique options for filter dropdowns based on available data
 */
export async function getFilterOptions() {
  const locations = Array.from(new Set(jobs.map(j => j.location))).sort();
  const types = Array.from(new Set(jobs.map(j => j.type))).sort();
  const terms = Array.from(new Set(jobs.map(j => j.term))).sort();
  const skills = Array.from(new Set(jobs.flatMap(j => j.skills))).sort();

  return { locations, types, terms, skills };
}
