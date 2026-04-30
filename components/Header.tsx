import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Easy Job Board Logo" width={48} height={48} className="h-12 w-auto object-contain scale-110" priority />
          <Link href="/" className="font-bold text-xl tracking-tight text-primary">
            Easy Job Board
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/jobs" className="text-sm font-medium hover:text-primary transition-colors">
            Find Jobs
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/employers/post"
            className="text-sm font-medium text-primary border border-primary/30 bg-primary/5 px-4 py-2 rounded-md hover:bg-primary/10 transition-colors"
          >
            Post a Job
          </Link>
          <div className="h-4 w-px bg-border mx-1"></div>
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-hover transition-colors"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-foreground">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
