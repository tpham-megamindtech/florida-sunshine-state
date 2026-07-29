"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getCategoryName } from "@/lib/categories";
import type { ArticleMeta } from "@/types/article";

export default function SearchResults({
  articles,
}: {
  articles: ArticleMeta[];
}) {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim();

  const results = useMemo(() => {
    if (query.length < 1) return [];
    const needle = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(needle) ||
        a.excerpt.toLowerCase().includes(needle) ||
        getCategoryName(a.category).toLowerCase().includes(needle),
    );
  }, [query, articles]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8 border-b border-border pb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-violet">
          Search
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
          {query ? (
            <>
              Results for &ldquo;<span className="text-accent">{query}</span>
              &rdquo;
            </>
          ) : (
            "Search Florida stories"
          )}
        </h1>
        {query && (
          <p className="mt-2 text-muted">
            {results.length} {results.length === 1 ? "story" : "stories"} found
          </p>
        )}
      </header>

      {!query ? (
        <p className="text-muted">
          Type a keyword in the search bar to find stories.
        </p>
      ) : results.length === 0 ? (
        <p className="text-muted">
          No stories match your search. Try another keyword.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
