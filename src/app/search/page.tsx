import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";
import { getAllArticlesMeta } from "@/lib/articles";

export const metadata = {
  title: "Search — Sunshine State Herald",
};

export default function SearchPage() {
  const articles = getAllArticlesMeta();

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 text-muted sm:px-6">
          Loading search…
        </div>
      }
    >
      <SearchResults articles={articles} />
    </Suspense>
  );
}
