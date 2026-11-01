import type { Metadata } from "next";
import AddBookForm from "@/components/books/AddBookForm";

export const metadata: Metadata = { title: "Add Book" };

export const instant = false;

export default function AddBookPage() {
  return (
    <section className="page-container py-10 sm:py-16">
      <div className="mx-auto w-full max-w-3xl rounded-box border border-base-300 bg-base-200 p-6 shadow-sm sm:p-8">
        <h1 className="section-title text-center">Add a Book</h1>
        <p className="section-subtitle mx-auto text-center">
          Share a book with other readers. It shows up on the shelf right away.
        </p>
        <AddBookForm />
      </div>
    </section>
  );
}
