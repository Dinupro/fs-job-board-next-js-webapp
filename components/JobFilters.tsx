"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Briefcase, GraduationCap, Code2, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce"; // Will create this hook

interface JobFiltersProps {
  initialSearch: string;
  initialLocation: string;
  initialType: string;
  initialTerm: string;
  initialSkill: string;
  locations: string[];
  types: string[];
  terms: string[];
  skills: string[];
}

export default function JobFilters({
  initialSearch,
  initialLocation,
  initialType,
  initialTerm,
  initialSkill,
  locations,
  types,
  terms,
  skills,
}: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for instant UI updates
  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [type, setType] = useState(initialType);
  const [term, setTerm] = useState(initialTerm);
  const [skill, setSkill] = useState(initialSkill);

  // Debounce search input by 500ms so we don't spam the URL on every keystroke
  const debouncedSearch = useDebounce(search, 500);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (term) params.set("term", term);
    if (skill) params.set("skill", skill);

    // If any filter changes, we want to reset the page to 1 automatically
    // The current page is only preserved if we haven't changed filters since page load
    // Actually, handling page reset is complex when mixing with pagination links,
    // but building the URL search params without 'page' naturally resets it to page 1.
    
    router.push(`/jobs?${params.toString()}`);
  }, [debouncedSearch, location, type, term, skill, router]);

  // Sync state from URL (if user uses browser back/forward buttons)
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setLocation(searchParams.get("location") || "");
    setType(searchParams.get("type") || "");
    setTerm(searchParams.get("term") || "");
    setSkill(searchParams.get("skill") || "");
  }, [searchParams]);

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setType("");
    setTerm("");
    setSkill("");
    router.push("/jobs");
  };

  const hasActiveFilters = search || location || type || term || skill;

  return (
    <div className="bg-background border rounded-xl p-6 shadow-sm sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm text-primary hover:text-primary-hover flex items-center">
            <X className="h-4 w-4 mr-1" /> Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center text-muted-foreground">
            <Search className="h-4 w-4 mr-2" /> Search
          </label>
          <input
            type="text"
            placeholder="Job title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" /> Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center text-muted-foreground">
            <Briefcase className="h-4 w-4 mr-2" /> Job Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Term */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center text-muted-foreground">
            <GraduationCap className="h-4 w-4 mr-2" /> Term
          </label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
          >
            <option value="">Any Term</option>
            {terms.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center text-muted-foreground">
            <Code2 className="h-4 w-4 mr-2" /> Required Skill
          </label>
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
          >
            <option value="">Any Skill</option>
            {skills.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
