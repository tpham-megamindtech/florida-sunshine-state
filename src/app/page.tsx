import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import { CATEGORIES } from "@/lib/categories";
import { getArticlesByCategory, getFeaturedArticle } from "@/lib/articles";

export default function HomePage() {
  const featured = getFeaturedArticle();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Hero article={featured} />

      <div className="divide-y divide-border">
        {CATEGORIES.map((category) => {
          const articles = getArticlesByCategory(category.slug).filter(
            (a) => a.slug !== featured.slug,
          );
          return (
            <CategorySection
              key={category.slug}
              category={category}
              articles={articles}
            />
          );
        })}
      </div>
    </div>
  );
}
