"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Slide {
  title: string;
  text: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  {
    title: "Your next favourite book is on our shelf",
    text: "Browse stories, science, history and more, shared by readers like you.",
    image: "/images/hero/slide-1.jpg",
    alt: "Tall wooden shelves full of books in a library",
  },
  {
    title: "Add a book and share the joy of reading",
    text: "Have a book collecting dust? List it in a minute so others can enjoy it.",
    image: "/images/hero/slide-2.jpg",
    alt: "A person reading a book beside a window",
  },
  {
    title: "Borrow for a week and return it with one click",
    text: "Pick a book, confirm, and read at your own pace. Returning is just as easy.",
    image: "/images/hero/slide-3.jpg",
    alt: "A stack of books on a wooden table",
  },
];

const swiperTheme = {
  "--swiper-theme-color": "var(--color-accent)",
  "--swiper-navigation-color": "var(--color-accent)",
  "--swiper-navigation-size": "26px",
  "--swiper-pagination-bullet-inactive-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-opacity": "0.5",
} as React.CSSProperties;

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      slidesPerView={1}
      loop
      speed={500}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: false,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
      className="hero-swiper"
      style={swiperTheme}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.title}>
          <div className="relative flex min-h-[460px] items-center overflow-hidden sm:min-h-[500px] lg:min-h-[560px]">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />

            {/* Phone and tablet: even dark layer so the text is always readable */}
            <div className="absolute inset-0 bg-black/60 lg:hidden" />
            {/* Desktop: dark on the text side, photo shows on the right */}
            <div className="absolute inset-0 hidden bg-linear-to-r from-black/80 via-black/55 to-black/10 lg:block" />

            <div className="page-container relative z-10 py-14">
              <div className="max-w-2xl text-white">
                <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h2>
                <p className="mt-4 text-base text-white/90 sm:text-lg">
                  {slide.text}
                </p>
                <Link href="/books" className="btn btn-accent mt-8">
                  Browse Books
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
