"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BookCover from "@/components/books/BookCover";
import type { Book } from "@/types/book";

interface Part {
  t: string;
  c?: string;
}

interface Slide {
  parts: Part[];
  text: string;
  image: string;
  shift: number;
}

const slides: Slide[] = [
  {
    parts: [
      { t: "The next " },
      { t: "chapter", c: "text-cat-science" },
      { t: " in your " },
      { t: "reading", c: "text-accent" },
      { t: " journey" },
    ],
    text: "Browse a shelf full of page-turners shared by readers like you.",
    image: "/images/hero/slide-1.jpg",
    shift: 0,
  },
  {
    parts: [
      { t: "Got a book? " },
      { t: "Share", c: "text-accent" },
      { t: " it with the " },
      { t: "shelf", c: "text-cat-science" },
    ],
    text: "List it in a minute so someone else can enjoy it too.",
    image: "/images/hero/slide-2.jpg",
    shift: 2,
  },
  {
    parts: [
      { t: "Borrow for " },
      { t: "seven days", c: "text-cat-science" },
      { t: ", return in " },
      { t: "one click", c: "text-accent" },
    ],
    text: "Pick a book, confirm, and read at your own pace.",
    image: "/images/hero/slide-3.jpg",
    shift: 4,
  },
];

const spots = [
  "left-[6%] top-[10%] w-20 -rotate-6",
  "left-[16%] top-[40%] w-24 rotate-3",
  "left-[7%] top-[66%] w-20 rotate-6",
  "right-[6%] top-[10%] w-20 rotate-6",
  "right-[16%] top-[40%] w-24 -rotate-3",
  "right-[7%] top-[66%] w-20 -rotate-6",
];

const swiperTheme = {
  "--swiper-theme-color": "#ffc043",
  "--swiper-navigation-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-opacity": "0.4",
} as React.CSSProperties;

function Floaters({ books, shift }: { books: Book[]; shift: number }) {
  if (books.length === 0) return null;

  return (
    <>
      {spots.map((spot, index) => {
        const book = books[(index + shift) % books.length];

        return (
          <Link
            key={index}
            href={`/books/${book._id}`}
            aria-label={`Open ${book.title}`}
            style={{ animationDelay: `${index * 0.8}s` }}
            className={`animate-float absolute z-10 hidden overflow-hidden rounded-md opacity-95 shadow-2xl ring-1 ring-white/20 transition-opacity hover:opacity-100 xl:block ${spot}`}
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
    </>
  );
}

export default function HeroSlider({ books }: { books: Book[] }) {
  return (
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
      className="hero-swiper"
      style={swiperTheme}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.text}>
          <div className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden bg-neutral px-4 pb-28 pt-16 text-center sm:min-h-[600px]">
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-neutral/80" />

            <Floaters books={books} shift={slide.shift} />

            <div className="relative z-20 mx-auto max-w-3xl">
              <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {slide.parts.map((part, partIndex) => (
                  <span key={partIndex} className={part.c}>
                    {part.t}
                  </span>
                ))}
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                {slide.text}
              </p>

              <Link href="/books" className="btn btn-primary btn-lg mt-8">
                Browse Books
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
