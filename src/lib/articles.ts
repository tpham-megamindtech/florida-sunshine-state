import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import type { Article, ArticleMeta, CategorySlug } from "@/types/article";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

function readArticleFile(filename: string): {
  slug: string;
  meta: ArticleMeta;
  content: string;
} {
  const slug = filename.replace(/\.md$/, "");
  const fullPath = path.join(ARTICLES_DIR, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    meta: {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category as CategorySlug,
      coverImage: data.coverImage,
      date: data.date,
      imageCredit: data.imageCredit,
      featured: data.featured ?? false,
    },
  };
}

export function getAllArticlesMeta(): ArticleMeta[] {
  const filenames = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"));
  const articles = filenames.map((filename) => readArticleFile(filename).meta);
  // newest first
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticlesByCategory(category: CategorySlug): ArticleMeta[] {
  return getAllArticlesMeta().filter(
    (article) => article.category === category,
  );
}

export function getFeaturedArticle(): ArticleMeta {
  const all = getAllArticlesMeta();
  return all.find((article) => article.featured) ?? all[0];
}

export function getRelatedArticles(
  current: ArticleMeta,
  count = 3,
): ArticleMeta[] {
  const sameCategory = getAllArticlesMeta().filter(
    (article) =>
      article.category === current.category && article.slug !== current.slug,
  );
  return sameCategory.slice(0, count);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { meta, content } = readArticleFile(`${slug}.md`);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();
  const stats = readingTime(content);

  return {
    ...meta,
    contentHtml,
    readingTime: stats.text,
  };
}

export function getAllArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export interface SearchDoc {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
}

// Slim, serializable index handed to client components for instant search.
export function getSearchIndex(): SearchDoc[] {
  return getAllArticlesMeta().map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
  }));
}
