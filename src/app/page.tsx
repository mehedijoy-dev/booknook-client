import { Suspense } from "react";
import type { Metadata } from "next";
import { getBooks } from "@/lib/api";
import type { Book } from "@/types/book";
import HeroSlider from "@/components/home/HeroSlider";
import HeroSearch from "@/components/home/HeroSearch";
import NewArrivals from "@/components/home/NewArrivals";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";
import Spinner from "@/components/ui/Spinner";

export const metadata: Metadata = { title: "Home" };

async function HomeContent() {
  let books: Book[] = [];
  let failed = false;

  try {
    // The server sorts by newest and limits to 6 in MongoDB
    books = await getBooks(6);
  } catch {
    failed = true;
  }

  return (
    <>
      <HeroSlider books={books} />
      <HeroSearch />
      <NewArrivals books={books} failed={failed} />
      <HowItWorks />
      <TopCategories />
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
