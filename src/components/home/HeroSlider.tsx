"use client";

import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BookCover from "@/components/books/BookCover";
import type { Book } from "@/types/book";

interface Slide {
  label: string;
  title: string;
  text: string;
  tone: string;
  picks: number[];
}

const slides: Slide[] = [
  {
    label: "Browse the shelf",
    title: "Your next favourite book is waiting",
    text: "Stories, science, history and more, shared by readers like you.",
    tone: "bg-base-200",
    picks: [0, 1, 2],
  },
  {
    label: "Add a book",
    title: "Got a book? Share it with the shelf",
    text: "List it in a minute so someone else can enjoy it too.",
    tone: "bg-cat-history/15",
    picks: [3, 4, 5],
  },
  {
    label: "Borrow and return",
    title: "Borrow for seven days, return in one click",
    text: "Pick a book, confirm, and read at your own pace.",
    tone: "bg-cat-others/10",
    picks: [2, 5, 0],
  },
];

const lift = ["translate-y-6", "-translate-y-2", "translate-y-10"];

const swiperTheme = {
  "--swiper-theme-color": "var(--color-base-content)",
  "--swiper-navigation-color": "var(--color-base-content)",
  "--swiper-pagination-bullet-inactive-color": "var(--color-base-content)",
  "--swiper-pagination-bullet-inactive-opacity": "0.25",
} as React.CSSProperties;

function Covers({ books, picks }: { books: Book[]; picks: number[] }) {
  if (books.length === 0) return null;

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-6">
      {picks.map((pick, index) => {
        const book = books[pick % books.length];

        return (
          <Link
            key={index}
            href={`/books/${book._id}`}
            aria-label={`Open ${book.title}`}
            className={`block w-[30%] max-w-[190px] overflow-hidden rounded-xl shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 ${lift[index]}`}
          >
            <div className="relative aspect-[3/4] w-full bg-base-300">
              <BookCover
                src={book.image}
                alt={`Cover of ${book.title}`}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function HeroSlider({ books }: { books: Book[] }) {
  return (
    <section className="page-container pt-4 sm:pt-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop
        speed={600}
        autoplay={{
          delay: 3500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="hero-swiper overflow-hidden rounded-[2rem]"
        style={swiperTheme}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.label}>
            <div
              className={`flex min-h-[540px] items-center px-6 pb-16 pt-12 sm:px-12 sm:pt-16 lg:min-h-[560px] lg:px-16 ${slide.tone}`}
            >
              <div className="grid w-full items-center gap-12 lg:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-secondary">
                    {slide.label}
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h2>
                  <p className="mt-4 max-w-md text-lg text-base-content/65">
                    {slide.text}
                  </p>
                  <Link href="/books" className="btn btn-primary btn-lg mt-8">
                    Browse Books
                  </Link>
                </div>

                <Covers books={books} picks={slide.picks} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
