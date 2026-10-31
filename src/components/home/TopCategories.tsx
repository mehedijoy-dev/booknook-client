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
        <div className="text-center">
          <h2 className="section-title">Top Categories</h2>
          <p className="section-subtitle mx-auto">
            Jump straight to the kind of book you feel like reading.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map(({ name, text, Icon }) => (
            <li key={name}>
              <Link
                href={`/books?category=${name}`}
                className="flex h-full flex-col items-center rounded-box border border-base-300 bg-base-100 p-5 text-center transition-colors hover:border-primary hover:bg-base-200"
              >
                <Icon className="h-8 w-8 text-primary" />
                <span className="mt-3 font-display text-lg font-bold">
                  {name}
                </span>
                <span className="mt-1 text-xs text-base-content/70">
                  {text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
