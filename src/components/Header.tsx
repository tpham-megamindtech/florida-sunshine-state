"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import type { SearchDoc } from "@/lib/articles";
import SearchBar from "./SearchBar";

export default function Header({ index }: { index: SearchDoc[] }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top row: centered brand, with search pinned to the right */}
        <div className="relative flex items-center justify-center py-4 sm:py-5">
          <Link
            href="/"
            className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-0 text-center leading-none"
          >
            <span className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Sunshine State
            </span>
            <span className="font-display text-4xl font-extrabold tracking-tight text-accent sm:text-5xl lg:text-6xl">
              Herald
            </span>
          </Link>

          {/* Search anchored to the right so it doesn't offset the centered title */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            {/* Desktop search bar (roomy screens only) */}
            <div className="hidden lg:block">
              <SearchBar index={index} />
            </div>
            {/* Compact search toggle for smaller screens */}
            <button
              type="button"
              aria-label="Toggle search"
              aria-expanded={mobileSearchOpen}
              onClick={() => setMobileSearchOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-sm lg:hidden"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                <circle
                  cx="9"
                  cy="9"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="m14 14 3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable search for small/medium screens */}
        {mobileSearchOpen && (
          <div className="pb-3 lg:hidden">
            <SearchBar index={index} variant="mobile" />
          </div>
        )}

        {/* Category nav — spread evenly across the full width */}
        <nav className="no-scrollbar -mb-px flex items-center justify-start gap-2 overflow-x-auto border-t border-border/70 sm:gap-4 md:justify-between md:gap-0">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="shrink-0 whitespace-nowrap border-b-2 border-transparent px-2 py-4 text-base font-semibold text-muted transition-colors hover:border-accent hover:text-foreground sm:px-3 sm:text-lg"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
