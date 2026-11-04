import Link from "next/link";
import { LuCalendarCheck, LuSearch, LuUndo2 } from "react-icons/lu";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    Icon: LuSearch,
    title: "Find a book",
    text: "Browse the shelf and open any book to see its details and how many copies are left.",
  },
  {
    Icon: LuCalendarCheck,
    title: "Borrow it for a week",
    text: "Log in, confirm your details and the book is yours for seven days.",
  },
  {
    Icon: LuUndo2,
    title: "Return it with one click",
    text: "Finished reading? Return it from My Borrows so the next reader can enjoy it.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-accent/15 py-20 sm:py-24">
      <div className="page-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal>
          <span className="eyebrow">Simple as 1, 2, 3</span>
          <h2 className="section-title mt-3">
            How borrowing
            <br />
            works
          </h2>
          <p className="section-subtitle">
            Three simple steps from the shelf to your hands.
          </p>
          <Link href="/books" className="btn btn-primary mt-8">
            Browse Books
          </Link>
        </Reveal>

        <ol className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ Icon, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 0.1} className="h-full">
              <div className="flex h-full flex-col rounded-3xl bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <span className="font-display text-6xl font-extrabold leading-none text-accent">
                    {`0${index + 1}`}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-content">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-base-content/70">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
