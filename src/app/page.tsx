import { Suspense } from "react";
import type { Metadata } from "next";
import { getBooks } from "@/lib/api";
import type { Book } from "@/types/book";
import HeroSlider from "@/components/home/HeroSlider";
import HeroSearch from "@/components/home/HeroSearch";
import NewArrivals from "@/components/home/NewArrivals";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";
import AddBookPromo from "@/components/home/AddBookPromo";
import Spinner from "@/components/ui/Spinner";

export const metadata: Metadata = { title: "Home" };

async function HomeContent() {
  // The newest 6 come from MongoDB with sort and limit. The full list only
  // feeds the category tiles (counts and covers).
  const [latest, everything] = await Promise.allSettled([
    getBooks(6),
    getBooks(),
  ]);

  const newest: Book[] = latest.status === "fulfilled" ? latest.value : [];
  const all: Book[] = everything.status === "fulfilled" ? everything.value : [];

  return (
    <>
      <HeroSlider books={newest} />
      <HeroSearch />
      <NewArrivals books={newest} failed={latest.status === "rejected"} />
      <HowItWorks />
      <TopCategories books={all} />
      <AddBookPromo />
    </>
  );
}

export default function Home() {
  return (
    <>
      <h1 className="sr-only">BookNook, a small online library</h1>
      <Suspense fallback={<Spinner fullPage label="Loading BookNook" />}>
        <HomeContent />
      </Suspense>
    </>
  );
}
