import type { Metadata } from "next";
import MyBooks from "@/components/books/MyBooks";

export const metadata: Metadata = { title: "My Books" };

export const instant = false;

export default function MyBooksPage() {
  return (
    <section className="page-container py-10 sm:py-16">
      <div className="text-center">
        <h1 className="section-title">My Books</h1>
        <p className="section-subtitle mx-auto">
          The books you added. Edit the details or remove a book from the shelf.
        </p>
      </div>

      <div className="mt-10">
        <MyBooks />
      </div>
    </section>
  );
}
