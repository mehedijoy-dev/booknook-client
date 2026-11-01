import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuBaby,
  LuFeather,
  LuFlaskConical,
  LuLandmark,
  LuLibrary,
} from "react-icons/lu";
import type { Category } from "@/types/book";
import Reveal from "@/components/ui/Reveal";

const categories: { name: Category; text: string; Icon: IconType }[] = [
  { name: "Fiction", text: "Novels and stories", Icon: LuFeather },
  { name: "Science", text: "Curious minds", Icon: LuFlaskConical },
  { name: "History", text: "Look back in time", Icon: LuLandmark },
  { name: "Kids", text: "Tales for little readers", Icon: LuBaby },
  { name: "Others", text: "Everything else", Icon: LuLibrary },
];

export default function TopCategories() {
  return (
    <section className="py-14 sm:py-20">
      <div className="page-container">
        <Reveal className="text-center">
          <h2 className="section-title">Top Categories</h2>
          <p className="section-subtitle mx-auto">
            Jump straight to the kind of book you feel like reading.
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map(({ name, text, Icon }, index) => (
            <Reveal as="li" key={name} delay={index * 0.08}>
              <Link
                href={`/books?category=${name}`}
                className="group flex h-full flex-col items-center rounded-box border border-base-300 bg-base-100 p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:bg-base-200 hover:shadow-lg"
              >
                <Icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />
                <span className="mt-3 font-display text-lg font-bold">
                  {name}
                </span>
                <span className="mt-1 text-xs text-base-content/70">
                  {text}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
