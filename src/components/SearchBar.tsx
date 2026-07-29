"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { SearchDoc } from "@/lib/articles";
import { getCategoryName } from "@/lib/categories";

function scoreMatch(doc: SearchDoc, q: string): boolean {
  const needle = q.toLowerCase();
  return (
    doc.title.toLowerCase().includes(needle) ||
    doc.excerpt.toLowerCase().includes(needle) ||
    getCategoryName(doc.category).toLowerCase().includes(needle)
  );
}

export default function SearchBar({
  index,
  variant = "desktop",
}: {
  index: SearchDoc[];
  variant?: "desktop" | "mobile";
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return index.filter((doc) => scoreMatch(doc, q)).slice(0, 6);
  }, [query, index]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function goToResults() {
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = results[active];
      if (chosen && open) {
        setOpen(false);
        router.push(`/article/${chosen.slug}`);
      } else {
        goToResults();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${variant === "desktop" ? "w-full max-w-xs" : "w-full"}`}
    >
      <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 shadow-sm focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition">
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className="h-4 w-4 shrink-0 text-muted"
        >
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="m14 14 3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search Florida stories…"
          aria-label="Search articles"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
      </div>

      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-muted">
              No stories match &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : (
            <ul className="max-h-96 overflow-y-auto py-1">
              {results.map((doc, i) => (
                <li key={doc.slug}>
                  <Link
                    href={`/article/${doc.slug}`}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => setActive(i)}
                    className={`block px-4 py-3 transition-colors ${
                      i === active ? "bg-background" : "hover:bg-background"
                    }`}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                      {getCategoryName(doc.category)}
                    </span>
                    <span className="mt-0.5 block text-sm font-medium leading-snug text-foreground">
                      {doc.title}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="border-t border-border">
                <button
                  type="button"
                  onClick={goToResults}
                  className="block w-full px-4 py-2.5 text-left text-xs font-semibold text-violet hover:bg-background"
                >
                  See all results for &ldquo;{query.trim()}&rdquo; →
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
