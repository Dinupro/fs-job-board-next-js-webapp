import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Easy Job Board Logo" width={40} height={40} className="h-10 w-auto object-contain scale-110" />
              <span className="font-bold text-lg text-primary">Easy Job Board</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting software students with their dream internships and entry-level roles.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Easy Job Board. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
