"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { LuUndo2 } from "react-icons/lu";
import BookCover from "@/components/books/BookCover";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/lib/api";
import { authRequest } from "@/lib/api-client";
import { formatDate } from "@/lib/format";
import type { Borrow } from "@/types/borrow";

const DAY = 24 * 60 * 60 * 1000;

function DueBadge({ returnDate }: { returnDate: string }) {
  const daysLeft = Math.ceil(
    (new Date(returnDate).getTime() - Date.now()) / DAY,
  );

  if (daysLeft < 0) {
    return <span className="badge badge-error badge-soft">Overdue</span>;
  }
  if (daysLeft === 0) {
    return <span className="badge badge-warning badge-soft">Due today</span>;
  }
  return (
    <span className="badge badge-success badge-soft">
      {daysLeft} {daysLeft === 1 ? "day" : "days"} left
    </span>
  );
}

export default function MyBorrows() {
  const { user } = useAuth();
  const email = user?.email;

  const [borrows, setBorrows] = useState<Borrow[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    let active = true;
    authRequest<Borrow[]>("/borrows")
      .then((data) => {
        if (active) setBorrows(data);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, [email, reloadKey]);

  const retry = () => {
    setFailed(false);
    setBorrows(null);
    setReloadKey((key) => key + 1);
  };

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow._id);

    try {
      await authRequest(`/borrows/${borrow._id}`, { method: "DELETE" });
      setBorrows((current) =>
        current ? current.filter((item) => item._id !== borrow._id) : current,
      );
      toast.success(`"${borrow.bookTitle}" returned. Thank you!`);
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Could not return the book. Please try again.",
      );
    } finally {
      setReturningId(null);
    }
  };

  if (failed) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div role="alert" className="alert alert-error alert-soft">
          <span>We could not load your borrowed books right now.</span>
        </div>
        <button type="button" onClick={retry} className="btn btn-primary mt-4">
          Try again
        </button>
      </div>
    );
  }

  if (borrows === null) {
    return <Spinner label="Loading your borrowed books" />;
  }

  if (borrows.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-box border border-dashed border-base-300 p-8 text-center">
        <p className="text-base-content/70">
          You have not borrowed any books yet.
        </p>
        <Link href="/books" className="btn btn-primary mt-4">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-base-content/70">
        You have borrowed {borrows.length}{" "}
        {borrows.length === 1 ? "book" : "books"}.
      </p>

      {/* Desktop and tablet: table */}
      <div className="hidden overflow-x-auto rounded-box border border-base-300 md:block">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow) => (
              <tr key={borrow._id} className="hover:bg-base-200/60">
                <td>
                  <div className="relative h-20 w-14 overflow-hidden rounded-md bg-base-200">
                    <BookCover
                      src={borrow.bookImage}
                      alt={`Cover of ${borrow.bookTitle}`}
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </td>
                <td className="max-w-xs">
                  <Link
                    href={`/books/${borrow.bookId}`}
                    className="line-clamp-2 font-semibold hover:text-primary"
                  >
                    {borrow.bookTitle}
                  </Link>
                </td>
                <td className="whitespace-nowrap">
                  {formatDate(borrow.borrowDate)}
                </td>
                <td>
                  <div className="whitespace-nowrap">
                    {formatDate(borrow.returnDate)}
                  </div>
                  <div className="mt-1">
                    <DueBadge returnDate={borrow.returnDate} />
                  </div>
                </td>
                <td>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleReturn(borrow)}
                      disabled={returningId === borrow._id}
                      className="btn btn-outline btn-primary btn-sm"
                    >
                      {returningId === borrow._id ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        <LuUndo2 className="h-4 w-4" />
                      )}
                      Return Book
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phone: cards */}
      <ul className="space-y-4 md:hidden">
        {borrows.map((borrow) => (
          <li
            key={borrow._id}
            className="rounded-box border border-base-300 bg-base-100 p-4"
          >
            <div className="flex gap-4">
              <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-md bg-base-200">
                <BookCover
                  src={borrow.bookImage}
                  alt={`Cover of ${borrow.bookTitle}`}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/books/${borrow.bookId}`}
                  className="line-clamp-2 font-display text-lg font-bold leading-snug hover:text-primary"
                >
                  {borrow.bookTitle}
                </Link>
                <p className="mt-2 text-xs text-base-content/70">
                  Borrowed {formatDate(borrow.borrowDate)}
                </p>
                <p className="text-xs text-base-content/70">
                  Return by {formatDate(borrow.returnDate)}
                </p>
                <div className="mt-2">
                  <DueBadge returnDate={borrow.returnDate} />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleReturn(borrow)}
              disabled={returningId === borrow._id}
              className="btn btn-outline btn-primary btn-sm mt-4 w-full"
            >
              {returningId === borrow._id ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <LuUndo2 className="h-4 w-4" />
              )}
              Return Book
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
