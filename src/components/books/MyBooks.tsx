"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { ApiError, getBooks } from "@/lib/api";
import { authRequest } from "@/lib/api-client";
import { formatDate } from "@/lib/format";
import type { Book } from "@/types/book";
import BookCover from "./BookCover";
import DeleteBookModal from "./DeleteBookModal";
import EditBookModal from "./EditBookModal";

export default function MyBooks() {
  const { user } = useAuth();
  const email = user?.email;

  const [books, setBooks] = useState<Book[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  useEffect(() => {
    if (!email) return;

    let active = true;
    getBooks(undefined, email)
      .then((data) => {
        if (active) setBooks(data);
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
    setBooks(null);
    setReloadKey((key) => key + 1);
  };

  const handleSaved = (updated: Book) => {
    setBooks((current) =>
      current
        ? current.map((book) => (book._id === updated._id ? updated : book))
        : current,
    );
  };

  const handleDelete = async () => {
    if (!deleting) return;

    setDeleteBusy(true);
    try {
      await authRequest(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((current) =>
        current ? current.filter((book) => book._id !== deleting._id) : current,
      );
      toast.success("Book deleted successfully");
      setDeleting(null);
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Could not delete the book. Please try again.",
      );
    } finally {
      setDeleteBusy(false);
    }
  };

  if (failed) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div role="alert" className="alert alert-error alert-soft">
          <span>We could not load your books right now.</span>
        </div>
        <button type="button" onClick={retry} className="btn btn-primary mt-4">
          Try again
        </button>
      </div>
    );
  }

  if (books === null) {
    return <Spinner label="Loading your books" />;
  }

  if (books.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-box border border-dashed border-base-300 p-8 text-center">
        <p className="text-base-content/70">
          You have not added any books yet.
        </p>
        <Link href="/add-book" className="btn btn-primary mt-4">
          Add a Book
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-base-content/70">
        You added {books.length} {books.length === 1 ? "book" : "books"}.
      </p>

      {/* Desktop and tablet: table */}
      <div className="hidden overflow-x-auto rounded-box border border-base-300 md:block">
        <table className="table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Book</th>
              <th>Category</th>
              <th>Copies</th>
              <th>Added</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-base-200/60">
                <td>
                  <div className="relative h-20 w-14 overflow-hidden rounded-md bg-base-200">
                    <BookCover
                      src={book.image}
                      alt={`Cover of ${book.title}`}
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </td>
                <td className="max-w-xs">
                  <Link
                    href={`/books/${book._id}`}
                    className="line-clamp-2 font-semibold hover:text-primary"
                  >
                    {book.title}
                  </Link>
                  <p className="line-clamp-1 text-sm text-base-content/70">
                    by {book.author}
                  </p>
                </td>
                <td>
                  <span className="badge badge-secondary badge-soft">
                    {book.category}
                  </span>
                </td>
                <td className="whitespace-nowrap">
                  {book.availableCopies} / {book.totalCopies}
                </td>
                <td className="whitespace-nowrap">
                  {formatDate(book.createdAt)}
                </td>
                <td>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditing(book)}
                      className="btn btn-outline btn-primary btn-sm"
                    >
                      <LuPencil className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleting(book)}
                      className="btn btn-outline btn-error btn-sm"
                    >
                      <LuTrash2 className="h-4 w-4" />
                      Delete
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
        {books.map((book) => (
          <li
            key={book._id}
            className="rounded-box border border-base-300 bg-base-100 p-4"
          >
            <div className="flex gap-4">
              <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-md bg-base-200">
                <BookCover
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/books/${book._id}`}
                  className="line-clamp-2 font-display text-lg font-bold leading-snug hover:text-primary"
                >
                  {book.title}
                </Link>
                <p className="line-clamp-1 text-sm text-base-content/70">
                  by {book.author}
                </p>
                <span className="badge badge-secondary badge-soft mt-2">
                  {book.category}
                </span>
                <p className="mt-2 text-xs text-base-content/70">
                  {book.availableCopies} of {book.totalCopies} copies available
                </p>
                <p className="text-xs text-base-content/70">
                  Added {formatDate(book.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEditing(book)}
                className="btn btn-outline btn-primary btn-sm"
              >
                <LuPencil className="h-4 w-4" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleting(book)}
                className="btn btn-outline btn-error btn-sm"
              >
                <LuTrash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editing && (
        <EditBookModal
          key={editing._id}
          book={editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}

      {deleting && (
        <DeleteBookModal
          bookTitle={deleting.title}
          loading={deleteBusy}
          onClose={() => !deleteBusy && setDeleting(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
