import type { CategorySlug } from "@/types/article";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** short tagline shown on the category landing page */
  tagline: string;
  /** Tailwind utility classes for the category's accent badge */
  badgeClass: string;
}

// Order matters — this is the exact display order across the whole site.
export const CATEGORIES: Category[] = [
  {
    slug: "business",
    name: "Business",
    tagline: "Startups, deals, and the people powering Florida's economy.",
    badgeClass: "bg-violet-600/12 text-violet-700",
  },
  {
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    tagline: "Spas, skincare, and the Sunshine State art of feeling good.",
    badgeClass: "bg-pink-500/12 text-pink-600",
  },
  {
    slug: "fashion",
    name: "Fashion",
    tagline: "Designers, runways, and the style lighting up South Beach.",
    badgeClass: "bg-fuchsia-500/12 text-fuchsia-600",
  },
  {
    slug: "sports",
    name: "Sports",
    tagline: "Every team, every arena — Florida in full motion.",
    badgeClass: "bg-orange-500/14 text-orange-600",
  },
  {
    slug: "travel",
    name: "Travel",
    tagline: "Beaches, the Keys, and adventures across the peninsula.",
    badgeClass: "bg-emerald-600/12 text-emerald-700",
  },
];

export function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryBadgeClass(slug: string): string {
  return (
    CATEGORIES.find((c) => c.slug === slug)?.badgeClass ??
    "bg-stone-500/12 text-stone-600"
  );
}
