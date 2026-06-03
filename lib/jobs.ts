import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export interface GetJobsParams {
  search?: string;
  location?: string;
  type?: string;
  category?: string; // Replaced term/skill with category
  page?: number;
  limit?: number;
}

// Extract the generated Job type with its relations included
export type JobWithRelations = Prisma.JobGetPayload<{
  include: { recruiter: true; category: true };
}>;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Get all jobs without pagination or filtering.
 */
export async function getAllJobs(): Promise<JobWithRelations[]> {
  return prisma.job.findMany({
    include: {
      recruiter: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Get jobs with optional filtering, searching, and pagination.
 */
export async function getJobs(params: GetJobsParams = {}): Promise<PaginatedResponse<JobWithRelations>> {
  const page = params.page || 1;
  const limit = params.limit || 5;
  const skip = (page - 1) * limit;

  // Build the where clause
  const where: Prisma.JobWhereInput = {
    status: 'PUBLISHED',
  };

  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: 'insensitive' } },
      { recruiter: { companyName: { contains: params.search, mode: 'insensitive' } } },
    ];
  }

  if (params.location) {
    where.location = params.location;
  }

  if (params.type) {
    // Assuming the param matches the enum string value
    where.type = params.type as any;
  }

  if (params.category) {
    // We expect the category slug to be passed
    where.category = {
      slug: params.category,
    };
  }

  const [total, jobs] = await Promise.all([
    prisma.job.count({ where }),
    prisma.job.findMany({
      where,
      include: {
        recruiter: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: jobs,
    total,
    page,
    limit,
    totalPages
  };
}

/**
 * Get a single job by its ID
 */
export async function getJobById(id: string): Promise<JobWithRelations | null> {
  return prisma.job.findUnique({
    where: { id },
    include: {
      recruiter: true,
      category: true,
    },
  });
}

/**
 * Extract unique options for filter dropdowns based on available data
 */
export async function getFilterOptions() {
  // Get distinct locations
  const locationsData = await prisma.job.findMany({
    where: { status: 'PUBLISHED' },
    distinct: ['location'],
    select: { location: true },
  });
  const locations = locationsData.map(l => l.location).sort();

  // Get distinct types
  const typesData = await prisma.job.findMany({
    where: { status: 'PUBLISHED' },
    distinct: ['type'],
    select: { type: true },
  });
  const types = typesData.map(t => t.type).sort();

  // Get all categories
  const categoriesData = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
  
  return { 
    locations, 
    types, 
    categories: categoriesData 
  };
}
