import Link from "next/link";
import type { Book } from "@/types/book";
import BookCover from "./BookCover";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-base-200">
        <BookCover
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="badge badge-secondary badge-soft self-start">
          {book.category}
        </span>

        <div>
          <h3 className="line-clamp-2 min-h-[3 rem] font-display text-xl font-bold leading-snug">
            {book.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-base-content/70">
            by {book.author}
          </p>
        </div>

        <Link
          href={`/books/${book._id}`}
          className="btn btn-outline mt-auto w-full"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
