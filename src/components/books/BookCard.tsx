"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Book } from "@/types/book";
import BookCover from "./BookCover";

interface BookCardProps {
  book: Book;
  index?: number;
}

const cardVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
  },
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow: "0 24px 44px -14px rgba(0, 0, 0, 0.45)",
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
};

const coverVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.12, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BookCard({ book, index = 0 }: BookCardProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

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
        variants={cardVariants}
        initial="rest"
        animate="rest"
        whileHover="hover"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={`flex w-full flex-col overflow-hidden rounded-box border bg-base-100 transition-colors duration-300 ${
          hovered ? "border-primary" : "border-base-300"
        }`}
      >
        <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-base-200">
          <motion.div variants={coverVariants} className="absolute inset-0">
            <BookCover
              src={book.image}
              alt={`Cover of ${book.title}`}
              className="h-full w-full"
            />
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="badge badge-secondary badge-soft self-start">
            {book.category}
          </span>

          <div>
            <h3
              className={`line-clamp-2 min-h-[3.5rem] font-display text-xl font-bold leading-snug transition-colors duration-300 ${
                hovered ? "text-primary" : ""
              }`}
            >
              {book.title}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-base-content/70">
              by {book.author}
            </p>
          </div>

          <Link
            href={`/books/${book._id}`}
            className={`btn mt-auto w-full ${
              hovered ? "btn-primary" : "btn-outline"
            }`}
          >
            View Details
          </Link>
        </div>
      </motion.article>
    </motion.div>
  );
}
