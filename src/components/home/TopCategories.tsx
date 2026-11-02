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
import type { Category } from "@/types/book";
import Reveal from "@/components/ui/Reveal";

const categories: {
  name: Category;
  text: string;
  Icon: IconType;
  tile: string;
  icon: string;
}[] = [
  {
    name: "Fiction",
    text: "Novels and stories",
    Icon: LuFeather,
    tile: "bg-cat-fiction/10 hover:bg-cat-fiction/20",
    icon: "text-cat-fiction",
  },
  {
    name: "Science",
    text: "Curious minds",
    Icon: LuFlaskConical,
    tile: "bg-cat-science/10 hover:bg-cat-science/20",
    icon: "text-cat-science",
  },
  {
    name: "History",
    text: "Look back in time",
    Icon: LuLandmark,
    tile: "bg-cat-history/10 hover:bg-cat-history/20",
    icon: "text-cat-history",
  },
  {
    name: "Kids",
    text: "Tales for little readers",
    Icon: LuBaby,
    tile: "bg-cat-kids/10 hover:bg-cat-kids/20",
    icon: "text-cat-kids",
  },
  {
    name: "Others",
    text: "Everything else",
    Icon: LuLibrary,
    tile: "bg-cat-others/10 hover:bg-cat-others/20",
    icon: "text-cat-others",
  },
];

export default function TopCategories() {
  return (
    <section className="py-20 sm:py-28">
      <div className="page-container">
        <Reveal>
          <span className="eyebrow">Categories</span>
          <h2 className="section-title mt-2">Top categories</h2>
          <p className="section-subtitle">
            Jump straight to the kind of book you feel like reading.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {categories.map(({ name, text, Icon, tile, icon }, index) => (
            <Reveal
              as="li"
              key={name}
              delay={index * 0.06}
              className="last:col-span-2 sm:last:col-span-1"
            >
              <Link
                href={`/books?category=${name}`}
                className={`group flex h-full min-h-[180px] flex-col justify-between rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 sm:min-h-[200px] ${tile}`}
              >
                <div className="flex items-start justify-between">
                  <Icon className={`h-8 w-8 ${icon}`} />
                  <LuArrowUpRight className="h-5 w-5 text-base-content/0 transition-all duration-300 group-hover:text-base-content/60" />
                </div>
                <div>
                  <span className="block text-xl font-semibold">{name}</span>
                  <span className="mt-0.5 block text-sm text-base-content/60">
                    {text}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
