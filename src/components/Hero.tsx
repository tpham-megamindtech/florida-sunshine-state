import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/types/article";
import { getCategoryName } from "@/lib/categories";

export default function Hero({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-border shadow-sm"
    >
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/8] lg:aspect-[16/6.5]">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          sizes="(min-width: 1280px) 1152px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160a29]/90 via-[#160a29]/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Featured · {getCategoryName(article.category)}
        </span>
        <h1 className="mt-3 max-w-3xl font-display text-2xl font-bold leading-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
