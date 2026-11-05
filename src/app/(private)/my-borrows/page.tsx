import type { Metadata } from "next";
import MyBorrows from "@/components/borrows/MyBorrows";

export const metadata: Metadata = { title: "My Borrows" };

export const instant = false;

export default function MyBorrowsPage() {
  return (
    <section className="page-container py-10 sm:py-16">
      <span className="eyebrow">Reading now</span>
      <h1 className="section-title mt-3">My borrows</h1>
      <p className="section-subtitle">
        The books you borrowed. Return them on time so others can read them too.
      </p>

      <div className="mt-10">
        <MyBorrows />
      </div>
    </section>
  );
}
