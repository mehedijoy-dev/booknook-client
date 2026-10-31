import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Books" };
export const instant = false;
export default function MyBooksPage() {
  return (
    <section className="page-container py-10 sm:py-16">
      <h1 className="section-title">My Books</h1>
      <p className="section-subtitle">The books you added will show here.</p>
    </section>
  );
}
