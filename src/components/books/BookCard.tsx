"use client";

import { useState } from "react";
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
  const [hovered, setHovered] = useState(false);
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
      <motion.article
        whileHover={reduce ? undefined : { y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group flex w-full flex-col"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-base-200 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)] transition-shadow duration-300 group-hover:shadow-[0_28px_50px_-18px_rgba(0,0,0,0.45)]">
          <BookCover
            src={book.image}
            alt={`Cover of ${book.title}`}
            className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-base-100/90 px-3 py-1 text-xs font-semibold text-base-content backdrop-blur">
            <span
              className={`h-2 w-2 rounded-full ${
                available ? "bg-success" : "bg-error"
              }`}
            />
            {available ? "Available" : "Not available"}
          </span>
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-base-content/60">
            <span className={`h-2 w-2 rounded-full ${dots[book.category]}`} />
            {book.category}
          </span>

          <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
            {book.title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-base-content/60">
            by {book.author}
          </p>

          <div className="mt-auto pt-4">
            <Link
              href={`/books/${book._id}`}
              className={`btn w-full ${hovered ? "btn-primary" : "btn-soft"}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
