"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { LuArrowLeft, LuCalendar, LuUser } from "react-icons/lu";
import { useAuth } from "@/hooks/useAuth";
import { ApiError, getBook } from "@/lib/api";
import { authRequest } from "@/lib/api-client";
import { formatDate } from "@/lib/format";
import type { Book, Category } from "@/types/book";
import BookCover from "./BookCover";
import BorrowModal from "./BorrowModal";

const dots: Record<Category, string> = {
  Fiction: "bg-cat-fiction",
  Science: "bg-cat-science",
  History: "bg-cat-history",
  Kids: "bg-cat-kids",
  Others: "bg-cat-others",
};

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
        className="inline-flex items-center gap-2 text-sm font-semibold text-base-content/70 transition-colors hover:text-primary"
      >
        <LuArrowLeft className="h-4 w-4" />
        Back to All Books
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-14">
        <div className="rounded-[2rem] bg-base-200 p-6 sm:p-10">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl bg-base-300 shadow-2xl">
            <BookCover
              src={book.image}
              alt={`Cover of ${book.title}`}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-base-content/75">
            <span
              className={`h-2.5 w-2.5 rounded-full ${dots[book.category]}`}
            />
            {book.category}
          </span>

          <h1 className="section-title mt-3">{book.title}</h1>
          <p className="mt-3 text-lg font-medium text-base-content/80">
            by {book.author}
          </p>

          <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl bg-base-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-base-content/65">
                Copies available
              </p>
              <p className="font-display mt-1 text-3xl font-extrabold">
                {book.availableCopies}
                <span className="text-lg font-bold text-base-content/50">
                  {" "}
                  / {book.totalCopies}
                </span>
              </p>
            </div>

            <div className="rounded-2xl bg-base-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-base-content/65">
                Status
              </p>
              <p className="mt-2 flex items-center gap-2 text-lg font-bold">
                <span
                  className={`h-3 w-3 rounded-full ${
                    available ? "bg-success" : "bg-error"
                  }`}
                />
                {available ? "Available" : "Not Available"}
              </p>
            </div>
          </div>

          <h2 className="mt-10 text-xl font-bold">About this book</h2>
          <p className="mt-2 whitespace-pre-line text-base-content/80">
            {book.description}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-base-content/75">
            <li className="flex items-center gap-2">
              <LuUser className="h-4 w-4 shrink-0 text-primary" />
              <span>
                Added by{" "}
                <span className="font-bold text-base-content">
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
