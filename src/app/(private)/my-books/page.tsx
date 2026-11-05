import type { Metadata } from "next";
import MyBooks from "@/components/books/MyBooks";

export const metadata: Metadata = { title: "My Books" };

export const instant = false;

export default function MyBooksPage() {
  return (
    <section className="page-container py-10 sm:py-16">
      <span className="eyebrow">Your shelf</span>
      <h1 className="section-title mt-3">My books</h1>
      <p className="section-subtitle">
        The books you added. Edit the details or remove a book from the shelf.
      </p>

      <div className="mt-10">
        <MyBooks />
      </div>
    </section>
  );
}
