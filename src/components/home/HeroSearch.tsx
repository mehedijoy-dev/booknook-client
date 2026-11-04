import { LuSearch } from "react-icons/lu";
import { CATEGORIES } from "@/types/book";

export default function HeroSearch() {
  return (
    <div className="page-container relative z-30 -mt-9">
      <form
        action="/books"
        method="get"
        role="search"
        className="mx-auto flex max-w-3xl flex-col gap-2 rounded-3xl bg-base-100 p-2 shadow-xl ring-1 ring-base-300 sm:flex-row sm:items-center sm:rounded-full"
      >
        <label htmlFor="hero-category" className="sr-only">
          Category
        </label>
        <select
          id="hero-category"
          name="category"
          defaultValue=""
          className="select w-full rounded-full border-0 bg-base-200 sm:w-48"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="hero-search" className="sr-only">
          Search books
        </label>
        <input
          id="hero-search"
          name="q"
          type="search"
          placeholder="Search by title or author"
          className="input min-w-0 flex-1 border-0 bg-transparent focus:outline-none"
        />

        <button type="submit" className="btn btn-primary">
          <LuSearch className="h-4 w-4" />
          Search
        </button>
      </form>
    </div>
  );
}
