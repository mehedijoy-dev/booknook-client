import Link from "next/link";
import type { Book } from "@/types/book";
import BookCard from "@/components/books/BookCard";

interface NewArrivalsProps {
  books: Book[];
  failed: boolean;
}

export default function NewArrivals({ books, failed }: NewArrivalsProps) {
  return (
    <section className="py-20 sm:py-24">
      <div className="page-container">
        <div>
          <span className="eyebrow">Fresh on the shelf</span>
          <h2 className="section-title mt-4">New arrivals</h2>
          <p className="section-subtitle">
            The latest books added to the BookNook shelf.
          </p>
        </div>

        {failed ? (
          <div
            role="alert"
            className="alert alert-error alert-soft mt-12 max-w-xl"
          >
            <span>
              We could not load the new arrivals right now. Please try again in
              a moment.
            </span>
          </div>
        ) : books.length === 0 ? (
          <div className="mt-12 max-w-xl rounded-box border border-dashed border-base-300 p-8">
            <p className="text-base-content/70">
              The shelf is empty for now. Be the first to add a book.
            </p>
            <Link href="/add-book" className="btn btn-primary mt-4">
              Add a Book
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book, index) => (
                <BookCard key={book._id} book={book} index={index} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/books" className="btn btn-primary btn-lg">
                See All Books
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
