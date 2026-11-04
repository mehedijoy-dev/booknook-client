import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const blocks = [
  "h-40 -rotate-6 bg-cat-science",
  "h-48 rotate-2 bg-cat-history",
  "h-36 rotate-6 bg-cat-kids",
];

export default function AddBookPromo() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="page-container">
        <Reveal>
          <div className="relative grid gap-10 overflow-hidden rounded-[2rem] bg-neutral px-6 py-12 text-neutral-content sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Share a story
              </span>
              <h2 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
                Got a book to <span className="text-accent">share?</span>
              </h2>
              <p className="mt-4 max-w-lg text-neutral-content/75">
                Add it to the shelf in a minute and let other readers borrow it.
                You can edit or remove it any time.
              </p>
              <Link href="/add-book" className="btn btn-primary btn-lg mt-8">
                Add a Book
              </Link>
            </div>

            <div
              aria-hidden="true"
              className="relative mx-auto flex h-56 items-end justify-center gap-3 lg:justify-end"
            >
              {blocks.map((block) => (
                <div
                  key={block}
                  className={`relative w-24 rounded-md shadow-xl sm:w-28 ${block}`}
                >
                  <span className="absolute inset-y-0 left-2 w-1.5 rounded-full bg-black/15" />
                  <span className="absolute left-7 top-6 h-1.5 w-10 rounded-full bg-white/60" />
                  <span className="absolute left-7 top-10 h-1.5 w-6 rounded-full bg-white/40" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
