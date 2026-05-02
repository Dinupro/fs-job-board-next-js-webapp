import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Form validation schema
const applicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  coverLetter: z.string().min(10, "Cover letter must be at least 10 characters"),
  linkedInUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  portfolioGithubUrl: z.string().url("Invalid Portfolio/GitHub URL").optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const jobId = formData.get("jobId") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const linkedInUrl = formData.get("linkedInUrl") as string;
    const portfolioGithubUrl = formData.get("portfolioGithubUrl") as string;
    const resumeFile = formData.get("resume") as File | null;

    // Validate fields with Zod
    const validatedData = applicationSchema.parse({
      jobId,
      fullName,
      email,
      phone,
      coverLetter,
      linkedInUrl,
      portfolioGithubUrl,
    });

    // Validate resume file
    if (!resumeFile || resumeFile.size === 0) {
      return NextResponse.json(
        { message: "Resume file is required" },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        { message: "Invalid file type. Only PDF, PNG, and JPEG are allowed." },
        { status: 400 }
      );
    }

    // Check file size (max 5MB)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    // Save file to local storage (non-public uploads folder)
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Ignore if dir already exists
    }

    const uniqueFilename = `${Date.now()}-${resumeFile.name.replace(/\s+/g, "-")}`;
    const filePath = path.join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);

    // Save to database
    const application = await prisma.application.create({
      data: {
        jobId: validatedData.jobId,
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        coverLetter: validatedData.coverLetter,
        resumePath: filePath,
        linkedInUrl: validatedData.linkedInUrl || null,
        portfolioGithubUrl: validatedData.portfolioGithubUrl || null,
      },
    });

    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
