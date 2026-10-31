"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import { LuBookOpen, LuLibrary, LuUndo2 } from "react-icons/lu";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Slide {
  title: string;
  text: string;
  tone: string;
  Icon: IconType;
}

const slides: Slide[] = [
  {
    title: "Your next favourite book is on our shelf",
    text: "Browse stories, science, history and more, shared by readers like you.",
    tone: "bg-primary text-primary-content",
    Icon: LuLibrary,
  },
  {
    title: "Add a book and share the joy of reading",
    text: "Have a book collecting dust? List it in a minute so others can enjoy it.",
    tone: "bg-secondary text-secondary-content",
    Icon: LuBookOpen,
  },
  {
    title: "Borrow for a week and return it with one click",
    text: "Pick a book, confirm, and read at your own pace. Returning is just as easy.",
    tone: "bg-neutral text-neutral-content",
    Icon: LuUndo2,
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
      {slides.map(({ title, text, tone, Icon }) => (
        <SwiperSlide key={title}>
          <div
            className={`${tone} flex min-h-[460px] items-center sm:min-h-[500px] lg:min-h-[560px]`}
          >
            <div className="page-container grid items-center gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {title}
                </h2>
                <p className="mt-4 text-base opacity-90 sm:text-lg">{text}</p>
                <Link href="/books" className="btn btn-accent mt-8">
                  Browse Books
                </Link>
              </div>

              <div className="hidden justify-center lg:flex" aria-hidden="true">
                <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-current/30 bg-white/10">
                  <Icon className="h-28 w-28" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
