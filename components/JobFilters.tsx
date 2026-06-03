"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Briefcase, Tags, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

interface JobFiltersProps {
  initialSearch: string;
  initialLocation: string;
  initialType: string;
  initialCategory: string;
  locations: string[];
  types: string[];
  categories: { id: string; name: string; slug: string }[];
}

export default function JobFilters({
  initialSearch,
  initialLocation,
  initialType,
  initialCategory,
  locations,
  types,
  categories,
}: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for instant UI updates
  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [type, setType] = useState(initialType);
  const [category, setCategory] = useState(initialCategory);

  // Debounce search input by 500ms
  const debouncedSearch = useDebounce(search, 500);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (category) params.set("category", category);

    // If any filter changes, we want to reset the page to 1 automatically
    router.push(`/jobs?${params.toString()}`);
  }, [debouncedSearch, location, type, category, router]);

  // Sync state from URL (if user uses browser back/forward buttons)
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setLocation(searchParams.get("location") || "");
    setType(searchParams.get("type") || "");
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setType("");
    setCategory("");
    router.push("/jobs");
  };

  const hasActiveFilters = search || location || type || category;

  const formatType = (t: string) => t.replace('_', ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

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
              <option key={t} value={t}>{formatType(t)}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center text-muted-foreground">
            <Tags className="h-4 w-4 mr-2" /> Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
          >
            <option value="">Any Category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
