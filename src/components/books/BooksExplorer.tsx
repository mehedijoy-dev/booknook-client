"use client";

import { useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { CATEGORIES } from "@/types/book";
import type { Book, Category } from "@/types/book";
import BookCard from "./BookCard";

export type CategoryFilter = "All" | Category;

const filters: CategoryFilter[] = ["All", ...CATEGORIES];

interface BooksExplorerProps {
  books: Book[];
  initialCategory?: CategoryFilter;
}

export default function BooksExplorer({
  books,
  initialCategory = "All",
}: BooksExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);

  const visibleBooks = useMemo(() => {
    const term = query.trim().toLowerCase();

    return books.filter((book) => {
      const matchesCategory = category === "All" || book.category === category;
      const matchesQuery =
        !term ||
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term);

      return matchesCategory && matchesQuery;
    });
  }, [books, query, category]);

  const hasFilters = query.trim() !== "" || category !== "All";

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <label className="input w-full">
          <LuSearch className="h-4 w-4 opacity-60" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or author"
            aria-label="Search books by title or author"
          />
        </label>
      </div>

      <div
        className="mt-5 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter by category"
      >
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`btn btn-sm ${
              category === item ? "btn-primary" : "btn-outline"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p
        className="mt-6 text-center text-sm text-base-content/70"
        aria-live="polite"
      >
        Showing {visibleBooks.length} of {books.length}{" "}
        {books.length === 1 ? "book" : "books"}
      </p>

      {visibleBooks.length === 0 ? (
        <div className="mx-auto mt-8 max-w-xl rounded-box border border-dashed border-base-300 p-8 text-center">
          <p className="text-base-content/70">
            {books.length === 0
              ? "No books have been added yet."
              : "No books match your search."}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="btn btn-primary mt-4"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
