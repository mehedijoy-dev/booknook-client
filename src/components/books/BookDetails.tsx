"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { LuArrowLeft, LuCalendar, LuUser } from "react-icons/lu";
import { useAuth } from "@/hooks/useAuth";
import { ApiError, getBook } from "@/lib/api";
import { authRequest } from "@/lib/api-client";
import { formatDate } from "@/lib/format";
import type { Book } from "@/types/book";
import BookCover from "./BookCover";
import BorrowModal from "./BorrowModal";

export default function BookDetails({ initialBook }: { initialBook: Book }) {
  const { user } = useAuth();
  const [book, setBook] = useState(initialBook);
  const [modalOpen, setModalOpen] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  const available = book.availableCopies > 0;

  const handleConfirm = async () => {
    setBorrowing(true);

    try {
      await authRequest("/borrows", {
        method: "POST",
        body: { bookId: book._id },
      });

      setBook((current) => ({
        ...current,
        availableCopies: Math.max(0, current.availableCopies - 1),
      }));
      setModalOpen(false);
      toast.success("Book borrowed. Please return it within 7 days.");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Could not borrow the book. Please try again.";
      toast.error(message);

      if (error instanceof ApiError && error.status === 409) {
        setModalOpen(false);
        // Copies may have changed, so load the latest numbers
        try {
          setBook(await getBook(book._id));
        } catch {
          // Keep the numbers we already have
        }
      }
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <section className="page-container py-8 sm:py-12">
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <LuArrowLeft className="h-4 w-4" />
        Back to All Books
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-box border border-base-300 bg-base-200 shadow-md lg:mx-0">
          <BookCover
            src={book.image}
            alt={`Cover of ${book.title}`}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <div className="flex flex-col">
          <span className="badge badge-secondary badge-soft self-start">
            {book.category}
          </span>

          <h1 className="section-title mt-3">{book.title}</h1>
          <p className="mt-2 text-lg text-base-content/70">by {book.author}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {available ? (
              <span className="badge badge-success badge-soft">Available</span>
            ) : (
              <span className="badge badge-error badge-soft">
                Not Available
              </span>
            )}
            <span className="text-sm text-base-content/70">
              {book.availableCopies} of {book.totalCopies}{" "}
              {book.totalCopies === 1 ? "copy" : "copies"} available
            </span>
          </div>

          <h2 className="mt-8 font-display text-xl font-bold">
            About this book
          </h2>
          <p className="mt-2 whitespace-pre-line text-base-content/80">
            {book.description}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-base-content/70">
            <li className="flex items-center gap-2">
              <LuUser className="h-4 w-4 shrink-0 text-primary" />
              <span>
                Added by{" "}
                <span className="font-semibold text-base-content">
                  {book.addedBy.name}
                </span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <LuCalendar className="h-4 w-4 shrink-0 text-primary" />
              <span>Added on {formatDate(book.createdAt)}</span>
            </li>
          </ul>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              disabled={!available}
              className="btn btn-primary btn-lg w-full sm:w-auto"
            >
              {available ? "Borrow This Book" : "Not Available"}
            </button>
          </div>
        </div>
      </div>

      <BorrowModal
        open={modalOpen}
        loading={borrowing}
        bookTitle={book.title}
        userName={user?.name ?? ""}
        userEmail={user?.email ?? ""}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </section>
  );
}
