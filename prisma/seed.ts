import { PrismaClient, JobType, JobStatus, Role } from '@prisma/client';
import { jobs as mockJobs } from '../data/jobs';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning database...');
  // Clear existing data in dependency order to prevent foreign key errors
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.recruiter.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding database...');

  // Create default admin / candidate
  await prisma.user.upsert({
    where: { email: 'admin@devjobs.com' },
    update: {},
    create: {
      email: 'admin@devjobs.com',
      name: 'Admin User',
      passwordHash: 'hashed_password', // Placeholder
      role: Role.ADMIN,
    },
  });

  // Extract unique companies from mock data to create Recruiters
  const uniqueCompanies = Array.from(new Set(mockJobs.map(j => j.company)));
  const recruiters: Record<string, string> = {}; // map company name to recruiter ID

  for (const company of uniqueCompanies) {
    const user = await prisma.user.create({
      data: {
        email: `${company.toLowerCase().replace(/\s+/g, '')}@example.com`,
        name: `${company} Recruiter`,
        role: Role.RECRUITER,
      }
    });

    const recruiter = await prisma.recruiter.create({
      data: {
        userId: user.id,
        companyName: company,
        description: `This is a mock description for ${company}.`,
      }
    });

    recruiters[company] = recruiter.id;
  }

  // Create unique categories based on some logic, let's use "term" or "type" as basis?
  // Let's just create generic categories: Frontend, Backend, Full Stack, Data Science, DevOps, Mobile, Security, QA
  const categories = ['Frontend', 'Backend', 'Full Stack', 'Data Science', 'DevOps', 'Mobile', 'Security', 'QA', 'Design', 'Game Dev'];
  const categoryIds: Record<string, string> = {};

  for (const cat of categories) {
    const category = await prisma.category.create({
      data: {
        name: cat,
        slug: cat.toLowerCase().replace(/\s+/g, '-'),
      }
    });
    categoryIds[cat] = category.id;
  }

  // Map mock jobs to Prisma
  for (const mockJob of mockJobs) {
    let jobType: JobType = JobType.FULL_TIME;
    if (mockJob.type === 'Part-time') jobType = JobType.PART_TIME;
    else if (mockJob.type === 'Internship') jobType = JobType.CONTRACT; // Mapping Internship to Contract
    else if (mockJob.type === 'Contract') jobType = JobType.CONTRACT;

    // Guess category from title
    let assignedCategory = categoryIds['Full Stack'];
    const title = mockJob.title.toLowerCase();
    if (title.includes('frontend') || title.includes('ui/ux') || mockJob.skills.includes('React')) assignedCategory = categoryIds['Frontend'];
    if (title.includes('backend') || mockJob.skills.includes('Go') || mockJob.skills.includes('Java')) assignedCategory = categoryIds['Backend'];
    if (title.includes('data') || title.includes('machine learning')) assignedCategory = categoryIds['Data Science'];
    if (title.includes('devops') || title.includes('cloud')) assignedCategory = categoryIds['DevOps'];
    if (title.includes('mobile') || mockJob.skills.includes('Swift') || mockJob.skills.includes('iOS')) assignedCategory = categoryIds['Mobile'];
    if (title.includes('security') || title.includes('cyber')) assignedCategory = categoryIds['Security'];
    if (title.includes('qa') || title.includes('test')) assignedCategory = categoryIds['QA'];
    if (title.includes('game')) assignedCategory = categoryIds['Game Dev'];

    await prisma.job.create({
      data: {
        id: mockJob.id,
        title: mockJob.title,
        description: mockJob.description,
        location: mockJob.location,
        type: jobType,
        status: JobStatus.PUBLISHED,
        recruiterId: recruiters[mockJob.company],
        categoryId: assignedCategory,
        createdAt: new Date(mockJob.postedAt),
        // Adding salary approximations based on mock data
        salaryMin: parseInt(mockJob.salary.replace(/[^0-9]/g, '')) * (mockJob.salary.includes('/hr') ? 2000 : 1000) || null,
        salaryMax: null,
      }
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
