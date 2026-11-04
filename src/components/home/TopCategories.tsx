import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuBaby,
  LuFeather,
  LuFlaskConical,
  LuLandmark,
  LuLibrary,
} from "react-icons/lu";
import BookCover from "@/components/books/BookCover";
import Reveal from "@/components/ui/Reveal";
import type { Book, Category } from "@/types/book";

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
    tone: "bg-cat-fiction text-white",
  },
  {
    name: "Science",
    text: "Curious minds",
    Icon: LuFlaskConical,
    tone: "bg-cat-science text-white",
  },
  {
    name: "History",
    text: "Look back in time",
    Icon: LuLandmark,
    tone: "bg-cat-history text-[#0f1f1c]",
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

// Covers sit in the top right corner, so the name below is never covered
const coverSpots = [
  "right-10 top-5 w-[36%] -rotate-6 sm:right-14",
  "-right-2 top-9 w-[40%] rotate-6",
];

export default function TopCategories({ books }: { books: Book[] }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="page-container">
        <Reveal className="text-center">
          <span className="eyebrow">Book categories</span>
          <h2 className="section-title mx-auto mt-3 max-w-3xl">
            What kind of story are you craving today?
          </h2>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {categories.map(({ name, text, Icon, tone }, index) => {
            const list = books.filter((book) => book.category === name);
            const covers = list.slice(0, 2);

            return (
              <Reveal
                as="li"
                key={name}
                delay={index * 0.06}
                className="last:col-span-2 sm:last:col-span-1"
              >
                <Link
                  href={`/books?category=${name}`}
                  className={`group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${tone}`}
                >
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 transition-transform duration-300 group-hover:rotate-45">
                    <LuArrowUpRight className="h-5 w-5" />
                  </span>

                  {covers.length > 0 ? (
                    covers.map((book, coverIndex) => (
                      <div
                        key={book._id}
                        className={`absolute overflow-hidden rounded-md shadow-xl ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-105 ${coverSpots[coverIndex]}`}
                      >
                        <div className="relative aspect-[3/4] w-full bg-base-300">
                          <BookCover
                            src={book.image}
                            alt={`Cover of ${book.title}`}
                            className="absolute inset-0 h-full w-full"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <Icon className="absolute right-4 top-6 h-20 w-20 opacity-25" />
                  )}

                  <div className="relative z-10">
                    <p className="text-sm font-semibold opacity-90">
                      {list.length > 0
                        ? `${list.length} ${list.length === 1 ? "book" : "books"}`
                        : text}
                    </p>
                    <p className="font-display text-4xl font-extrabold uppercase leading-none">
                      {name}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
