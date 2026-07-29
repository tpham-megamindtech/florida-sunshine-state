import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import type { CategorySlug } from "@/types/article";

const PAGE_SIZE = 9;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;

  const category = getCategory(slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(slug as CategorySlug);

  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, Number.parseInt(page ?? "1", 10) || 1),
    totalPages,
  );
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageArticles = articles.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8 border-b border-border pb-6">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
          <span className="text-accent">/</span> {category.name}
        </h1>
        <p className="mt-2 max-w-2xl text-muted">{category.tagline}</p>
      </header>

      {pageArticles.length === 0 ? (
        <p className="text-muted">No articles in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}

      <Pagination
        basePath={`/category/${category.slug}`}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
