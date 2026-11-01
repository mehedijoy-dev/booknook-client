import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuArrowRight,
  LuBaby,
  LuFeather,
  LuFlaskConical,
  LuLandmark,
  LuLibrary,
} from "react-icons/lu";
import type { Category } from "@/types/book";
import Reveal from "@/components/ui/Reveal";

const categories: {
  name: Category;
  text: string;
  Icon: IconType;
  tone: string;
}[] = [
  {
    name: "Fiction",
    text: "Novels and stories",
    Icon: LuFeather,
    tone: "bg-cat-fiction text-[#1e1b3a]",
  },
  {
    name: "Science",
    text: "Curious minds",
    Icon: LuFlaskConical,
    tone: "bg-cat-science text-[#1e1b3a]",
  },
  {
    name: "History",
    text: "Look back in time",
    Icon: LuLandmark,
    tone: "bg-cat-history text-[#1e1b3a]",
  },
  {
    name: "Kids",
    text: "Tales for little readers",
    Icon: LuBaby,
    tone: "bg-cat-kids text-white",
  },
  {
    name: "Others",
    text: "Everything else",
    Icon: LuLibrary,
    tone: "bg-cat-others text-white",
  },
];

export default function TopCategories() {
  return (
    <section className="py-20 sm:py-24">
      <div className="page-container">
        <Reveal className="text-center">
          <span className="eyebrow">Pick your mood</span>
          <h2 className="section-title mt-4">Top Categories</h2>
          <p className="section-subtitle mx-auto">
            Jump straight to the kind of book you feel like reading.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {categories.map(({ name, text, Icon, tone }, index) => (
            <Reveal as="li" key={name} delay={index * 0.08} className="h-full">
              <Link
                href={`/books?category=${name}`}
                className={`group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl sm:min-h-[220px] ${tone}`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[8rem] font-extrabold leading-none opacity-15"
                >
                  {name.charAt(0)}
                </span>

                <Icon className="relative h-9 w-9 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />

                <div className="relative">
                  <span className="block font-display text-2xl font-extrabold">
                    {name}
                  </span>
                  <span className="mt-1 block text-sm opacity-80">{text}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold">
                    Browse
                    <LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* A little shelf under the books */}
        <div
          aria-hidden="true"
          className="mx-auto mt-5 hidden h-3 rounded-full bg-base-300 lg:block"
        />
      </div>
    </section>
  );
}
