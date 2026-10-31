import { Suspense } from "react";
import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";
import Spinner from "@/components/ui/Spinner";

export const metadata: Metadata = { title: "Home" };

export default function Home() {
  return (
    <>
      <h1 className="sr-only">BookNook, a small online library</h1>
      <HeroSlider />
      <Suspense fallback={<Spinner label="Loading new arrivals" />}>
        <NewArrivals />
      </Suspense>
      <HowItWorks />
      <TopCategories />
    </>
  );
}
