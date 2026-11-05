import type { Metadata } from "next";
import AddBookForm from "@/components/books/AddBookForm";

export const metadata: Metadata = { title: "Add Book" };

export const instant = false;

export default function AddBookPage() {
  return (
    <section className="page-container py-10 sm:py-16">
      <div className="mx-auto w-full max-w-3xl rounded-[2rem] bg-base-200 p-6 sm:p-10">
        <span className="eyebrow">Share a story</span>
        <h1 className="section-title mt-3">Add a book</h1>
        <p className="section-subtitle">
          Share a book with other readers. It shows up on the shelf right away.
        </p>
        <AddBookForm />
      </div>
    </section>
  );
}
