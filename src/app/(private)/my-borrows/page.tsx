import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Borrows" };
export const instant = false;
export default function MyBorrowsPage() {
  return (
    <section className="page-container py-10 sm:py-16">
      <h1 className="section-title">My Borrows</h1>
      <p className="section-subtitle">The books you borrowed will show here.</p>
    </section>
  );
}
