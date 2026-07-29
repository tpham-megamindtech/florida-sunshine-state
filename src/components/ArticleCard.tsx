import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/types/article";
import { getCategoryBadgeClass, getCategoryName } from "@/lib/categories";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur ${getCategoryBadgeClass(
            article.category,
          )}`}
        >
          {getCategoryName(article.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{article.excerpt}</p>
      </div>
    </Link>
  );
}
