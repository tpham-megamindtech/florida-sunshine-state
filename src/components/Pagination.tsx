import Link from "next/link";

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <Link
          href={href(currentPage - 1)}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-accent hover:text-accent"
        >
          ← Prev
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold shadow-sm transition-colors ${
            p === currentPage
              ? "bg-accent text-white"
              : "border border-border bg-surface text-foreground hover:border-accent hover:text-accent"
          }`}
        >
          {p}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={href(currentPage + 1)}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-accent hover:text-accent"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
