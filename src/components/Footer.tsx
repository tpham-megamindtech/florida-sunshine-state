import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="font-display text-2xl font-extrabold tracking-tight">
              Sunshine State <span className="text-accent">Herald</span>
            </Link>
            <p className="mt-3 text-sm text-muted">
              Florida news across Business, Beauty &amp; Wellness, Fashion,
              Sports, and Travel — from South Beach to the Panhandle.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} Sunshine State Herald. All rights
          reserved. Made in Florida.
        </div>
      </div>
    </footer>
  );
}
