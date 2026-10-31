import Link from "next/link";
import { getBooks } from "@/lib/api";
import type { Book } from "@/types/book";
import BookCard from "@/components/books/BookCard";

export default async function NewArrivals() {
  let books: Book[] = [];
  let failed = false;

  try {
    books = await getBooks(6);
  } catch {
    failed = true;
  }

  return (
    <section className="py-14 sm:py-20">
      <div className="page-container">
        <div className="text-center">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle mx-auto">
            The latest books added to the BookNook shelf.
          </p>
        </div>

        {failed ? (
          <div
            role="alert"
            className="alert alert-error alert-soft mx-auto mt-10 max-w-xl"
          >
            <span>
              We could not load the new arrivals right now. Please try again in
              a moment.
            </span>
          </div>
        ) : books.length === 0 ? (
          <div className="mx-auto mt-10 max-w-xl rounded-box border border-dashed border-base-300 p-8 text-center">
            <p className="text-base-content/70">
              The shelf is empty for now. Be the first to add a book.
            </p>
            <Link href="/add-book" className="btn btn-primary mt-4">
              Add a Book
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book, index) => (
                <BookCard key={book._id} book={book} index={index} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/books" className="btn btn-primary">
                See All Books
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
