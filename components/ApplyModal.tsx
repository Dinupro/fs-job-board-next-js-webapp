"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle2, AlertCircle, Upload, Link, Globe, Briefcase, User, Mail, Phone, FileText } from "lucide-react";

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
        // Success: Only show the success state after the backend confirms storage
        setStatus({ type: "success", message: "Your application has been successfully saved to our database. We will review it shortly!" });
        form.reset();
      } else {
        // Error: Show the error returned by the server
        setStatus({
          type: "error",
          message: json.message || "Something went wrong. Please try again.",
          errors: json.errors
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setStatus(null);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/25 active:scale-[0.98]"
      >
        <div className="absolute inset-0 bg-linear-to-r from-primary-hover to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative flex items-center gap-2">
          Apply Now <Briefcase className="h-5 w-5" />
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center  p-4 sm:p-6 transition-all duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleClose} />

      <div className="relative bg-background border border-border shadow-2xl rounded-3xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative flex items-center justify-between p-8 border-b bg-muted/30">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-foreground">Apply for {jobTitle}</h2>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm uppercase tracking-wider">Talent Acquisition</span>
            </div>
          </div>
          <button onClick={handleClose} className="p-2.5 rounded-full bg-background border hover:bg-muted transition-all text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative p-8 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20">
          {status?.type === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                <div className="relative bg-green-100 dark:bg-green-500/20 p-5 rounded-full border-4 border-white dark:border-green-500/50">
                  <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-3 text-foreground">Application Received!</h3>
              <p className="text-muted-foreground text-lg max-w-sm mb-8">
                {status.message}
              </p>
              <button
                onClick={handleClose}
                className="bg-primary text-white px-10 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-xl active:scale-95"
              >
                Return to Job Board
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status?.type === "error" && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-2xl flex items-start gap-4 animate-in slide-in-from-top-2">
                  <AlertCircle className="h-6 w-6 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-lg leading-tight">{status.message}</p>
                    {status.errors && (
                      <ul className="text-sm mt-2 list-disc list-inside opacity-90 space-y-1">
                        {status.errors.map((err, i) => (
                          <li key={i}>{err.message}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/80 flex items-center gap-2"><User className="h-4 w-4 text-primary" /> Full Name</label>
                  <input name="fullName" type="text" required placeholder="e.g. John Doe" className="w-full px-5 py-3 bg-muted/40 border-2 border-transparent focus:border-primary focus:bg-background rounded-2xl outline-none transition-all placeholder:text-muted-foreground/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/80 flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> Email Address</label>
                  <input name="email" type="email" required placeholder="e.g. john@example.com" className="w-full px-5 py-3 bg-muted/40 border-2 border-transparent focus:border-primary focus:bg-background rounded-2xl outline-none transition-all placeholder:text-muted-foreground/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/80 flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> Phone Number</label>
                <input name="phone" type="tel" required placeholder="e.g. +1 (555) 000-0000" className="w-full px-5 py-3 bg-muted/40 border-2 border-transparent focus:border-primary focus:bg-background rounded-2xl outline-none transition-all placeholder:text-muted-foreground/50" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/80 flex items-center gap-2"><Link className="h-4 w-4 text-primary" /> LinkedIn Profile</label>
                  <input name="linkedInUrl" type="url" placeholder="https://linkedin.com/..." className="w-full px-5 py-3 bg-muted/40 border-2 border-transparent focus:border-primary focus:bg-background rounded-2xl outline-none transition-all placeholder:text-muted-foreground/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/80 flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /> GitHub / Portfolio</label>
                  <input name="portfolioGithubUrl" type="url" placeholder="https://github.com/..." className="w-full px-5 py-3 bg-muted/40 border-2 border-transparent focus:border-primary focus:bg-background rounded-2xl outline-none transition-all placeholder:text-muted-foreground/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/80 flex items-center gap-2"><Upload className="h-4 w-4 text-primary" /> Upload Resume (PDF, PNG, JPG)</label>
                <input name="resume" type="file" required accept=".pdf,.png,.jpg,.jpeg" className="w-full px-5 py-3 bg-muted/40 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 rounded-2xl outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white cursor-pointer shadow-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/80 flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> Cover Letter</label>
                <textarea name="coverLetter" required rows={4} placeholder="Tell us why you are the perfect fit..." className="w-full px-5 py-3 bg-muted/40 border-2 border-transparent focus:border-primary focus:bg-background rounded-2xl outline-none transition-all resize-none placeholder:text-muted-foreground/50 shadow-sm" />
              </div>

              <div className="pt-6 flex gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-4 border-2 border-muted hover:bg-muted rounded-2xl transition-all font-bold text-muted-foreground hover:text-foreground active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-2 bg-primary text-white px-6 py-4 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-primary/40 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      Saving to Database...
                    </>
                  ) : (
                    "Send Application"
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
