"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle2, AlertCircle, Upload, Link, Globe } from "lucide-react";

interface ApplyModalProps {
  jobId: string;
  jobTitle: string;
}

export default function ApplyModal({ jobId, jobTitle }: ApplyModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
    errors?: any[];
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("jobId", jobId);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "Your application has been submitted successfully!" });
        form.reset();
      } else {
        setStatus({ 
          type: "error", 
          message: json.message || "Something went wrong. Please try again.",
          errors: json.errors
        });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-bold hover:bg-primary-hover transition-colors shadow-sm flex items-center justify-center w-full md:w-auto"
      >
        Apply Now
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
      <div className="bg-white text-[#171717] rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border">
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-[#171717]">Apply for Role</h2>
            <p className="text-sm text-gray-500 mt-1">{jobTitle}</p>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              setStatus(null);
            }}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-[#171717]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {status?.type === "success" ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-[#171717]">Application Sent!</h3>
              <p className="text-gray-600 mb-6">
                {status.message}
              </p>
              <button
                onClick={() => setOpen(false)}
                className="bg-[#7e22ce] text-white px-8 py-2 rounded-md font-medium hover:bg-[#6b21a8] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status?.type === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{status.message}</p>
                    {status.errors && (
                      <ul className="text-sm mt-1 list-disc list-inside">
                        {status.errors.map((err, i) => (
                          <li key={i}>{err.message}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-bold text-[#171717]">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2 bg-white text-[#171717] border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7e22ce] transition-all cursor-text placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-[#171717]">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 bg-white text-[#171717] border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7e22ce] transition-all cursor-text placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-bold text-[#171717]">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2 bg-white text-[#171717] border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7e22ce] transition-all cursor-text placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="linkedInUrl" className="text-sm font-bold text-[#171717] flex items-center gap-2">
                    <Link className="h-4 w-4 text-[#7e22ce]" /> LinkedIn URL
                  </label>
                  <input
                    id="linkedInUrl"
                    name="linkedInUrl"
                    type="url"
                    placeholder="https://linkedin.com/..."
                    className="w-full px-4 py-2 bg-white text-[#171717] border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7e22ce] transition-all cursor-text placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="portfolioGithubUrl" className="text-sm font-bold text-[#171717] flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#7e22ce]" /> GitHub / Portfolio
                  </label>
                  <input
                    id="portfolioGithubUrl"
                    name="portfolioGithubUrl"
                    type="url"
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2 bg-white text-[#171717] border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7e22ce] transition-all cursor-text placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="resume" className="text-sm font-bold text-[#171717]">Resume (PDF, PNG, JPG - Max 5MB)</label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  required
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="w-full px-4 py-2 bg-white text-[#171717] border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7e22ce] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7e22ce1a] file:text-[#7e22ce] hover:file:bg-[#7e22ce33] cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="coverLetter" className="text-sm font-bold text-[#171717]">Cover Letter</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={4}
                  placeholder="Tell us why you're a great fit..."
                  className="w-full px-4 py-2 bg-white text-[#171717] border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7e22ce] transition-all resize-none cursor-text placeholder:text-gray-400"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors font-bold text-[#171717] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-[#7e22ce] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#6b21a8] transition-colors shadow-md disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
