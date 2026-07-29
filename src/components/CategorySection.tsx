import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/types/article";
import type { Category } from "@/lib/categories";
import { getCategoryBadgeClass } from "@/lib/categories";

export default function CategorySection({
  category,
  articles,
}: {
  category: Category;
  articles: ArticleMeta[];
}) {
  if (articles.length === 0) return null;

  const lead = articles[0];
  const rest = articles.slice(1, 5);

  return (
    <section className="py-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            <span className="text-accent">/</span> {category.name}
          </h2>
          <p className="mt-1 text-sm text-muted">{category.tagline}</p>
        </div>
        <Link
          href={`/category/${category.slug}`}
          className="shrink-0 text-sm font-semibold text-violet hover:text-violet-hover"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Lead article — left. Fixed 16:9 frame keeps it balanced with the list. */}
        <Link
          href={`/article/${lead.slug}`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={lead.coverImage}
              alt={lead.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur ${getCategoryBadgeClass(
                lead.category,
              )}`}
            >
              {category.name}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-5">
            <h3 className="font-display text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-accent sm:text-2xl">
              {lead.title}
            </h3>
            <p className="line-clamp-3 text-sm text-muted">{lead.excerpt}</p>
          </div>
        </Link>

        {/* Secondary list — right. Rows share the height of the lead card. */}
        <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          {rest.map((article) => (
            <li key={article.slug} className="flex-1">
              <Link
                href={`/article/${article.slug}`}
                className="group flex h-full items-center gap-4 p-4 transition-colors hover:bg-background"
              >
                <div className="relative aspect-[16/9] w-28 shrink-0 overflow-hidden rounded-lg sm:w-32">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {article.title}
                </h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
