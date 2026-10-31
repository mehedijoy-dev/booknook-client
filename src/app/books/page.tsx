import { Suspense } from "react";
import type { Metadata } from "next";
import { getBooks } from "@/lib/api";
import { CATEGORIES } from "@/types/book";
import type { Book } from "@/types/book";
import BooksExplorer from "@/components/books/BooksExplorer";
import Spinner from "@/components/ui/Spinner";

export const metadata: Metadata = { title: "All Books" };

async function BooksList({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialCategory = CATEGORIES.find((item) => item === category) ?? "All";

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

  return <BooksExplorer books={books} initialCategory={initialCategory} />;
}

export default function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <section className="page-container py-10 sm:py-16">
      <div className="text-center">
        <h1 className="section-title">All Books</h1>
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
