"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Book, Category } from "@/types/book";
import BookCover from "./BookCover";

const dots: Record<Category, string> = {
  Fiction: "bg-cat-fiction",
  Science: "bg-cat-science",
  History: "bg-cat-history",
  Kids: "bg-cat-kids",
  Others: "bg-cat-others",
};

interface BookCardProps {
  book: Book;
  index?: number;
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
  const reduce = useReducedMotion();
  const available = book.availableCopies > 0;

  return (
    <motion.div
      className="flex"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: (index % 3) * 0.08,
        ease: "easeOut",
      }}
    >
      {/* Hover is pure CSS, so it always works */}
      <article className="group flex w-full flex-col rounded-3xl bg-base-200 p-4 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-2 hover:bg-base-100 hover:shadow-2xl hover:ring-primary/40">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-base-300 shadow-md">
          <BookCover
            src={book.image}
            alt={`Cover of ${book.title}`}
            className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
          />

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-base-100/90 px-3 py-1 text-xs font-bold text-base-content shadow-sm backdrop-blur">
            <span
              className={`h-2 w-2 rounded-full ${
                available ? "bg-success" : "bg-error"
              }`}
            />
            {available ? "Available" : "Not available"}
          </span>
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-base-content/75">
            <span className={`h-2 w-2 rounded-full ${dots[book.category]}`} />
            {book.category}
          </span>

          <h3 className="mt-1.5 line-clamp-2 text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
            {book.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm font-medium text-base-content/80">
            by {book.author}
          </p>

          <div className="mt-auto pt-4">
            <Link
              href={`/books/${book._id}`}
              className="btn w-full border-0 bg-base-100 text-base-content shadow-sm transition-colors group-hover:bg-primary group-hover:text-primary-content"
            >
              View Details
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
