export type CategorySlug =
  | "business"
  | "beauty-wellness"
  | "fashion"
  | "sports"
  | "travel";

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  coverImage: string;
  date: string;
  imageCredit: string;
  featured?: boolean;
}

export interface Article extends ArticleMeta {
  contentHtml: string;
  readingTime: string;
}
