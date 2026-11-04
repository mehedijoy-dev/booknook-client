import { Suspense } from "react";
import type { Metadata } from "next";
import { getBooks } from "@/lib/api";
import { CATEGORIES } from "@/types/book";
import type { Book } from "@/types/book";
import BooksExplorer from "@/components/books/BooksExplorer";
import Spinner from "@/components/ui/Spinner";

export const metadata: Metadata = { title: "All Books" };

type SearchParams = Promise<{ category?: string; q?: string }>;

async function BooksList({ searchParams }: { searchParams: SearchParams }) {
  const { category, q } = await searchParams;
  const initialCategory = CATEGORIES.find((item) => item === category) ?? "All";
  const initialQuery = (q ?? "").trim().slice(0, 80);

  let books: Book[] = [];
  try {
    books = await getBooks();
  } catch {
    return (
      <div
        role="alert"
        className="alert alert-error alert-soft mx-auto max-w-xl"
      >
        <span>
          We could not load the books right now. Please try again in a moment.
        </span>
      </div>
    );
  }

  return (
    <BooksExplorer
      books={books}
      initialCategory={initialCategory}
      initialQuery={initialQuery}
    />
  );
}

export default function BooksPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <section className="page-container py-10 sm:py-16">
      <div className="text-center">
        <span className="eyebrow">The shelf</span>
        <h1 className="section-title mt-3">All Books</h1>
        <p className="section-subtitle mx-auto">
          Every book on the BookNook shelf. Find one and borrow it for a week.
        </p>
      </div>

      <div className="mt-10">
        <Suspense fallback={<Spinner label="Loading books" />}>
          <BooksList searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
