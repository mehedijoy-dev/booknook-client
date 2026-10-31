import type { Metadata } from "next";

export const metadata: Metadata = { title: "Add Book" };

export const instant = false;

export default function AddBookPage() {
  return (
    <section className="page-container py-10 sm:py-16">
      <h1 className="section-title">Add a Book</h1>
      <p className="section-subtitle">The add book form is coming next.</p>
    </section>
  );
}
