import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiError, getBook } from "@/lib/api";
import type { Book } from "@/types/book";
import BookDetails from "@/components/books/BookDetails";
import Spinner from "@/components/ui/Spinner";

export const instant = false;

type BookResult = { book: Book | null; failed: boolean };

// One fetch is shared by the page and its title
const loadBook = cache(async (id: string): Promise<BookResult> => {
  try {
    return { book: await getBook(id), failed: false };
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 404 || error.status === 400)
    ) {
      return { book: null, failed: false };
    }
    return { book: null, failed: true };
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { book } = await loadBook(id);

  return { title: book ? book.title : "Book Details" };
}

async function BookContent({ id }: { id: string }) {
  const { book, failed } = await loadBook(id);

  if (failed) {
    return (
      <div className="page-container py-16">
        <div
          role="alert"
          className="alert alert-error alert-soft mx-auto max-w-xl"
        >
          <span>
            We could not load this book right now. Please try again in a moment.
          </span>
        </div>
      </div>
    );
  }

  if (!book) notFound();

  return <BookDetails initialBook={book} />;
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<Spinner fullPage label="Loading book" />}>
      <BookContent id={id} />
    </Suspense>
  );
}
