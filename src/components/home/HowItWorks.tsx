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
    <section className="bg-base-200 py-14 sm:py-20">
      <div className="page-container">
        <Reveal className="text-center">
          <h2 className="section-title">How Borrowing Works</h2>
          <p className="section-subtitle mx-auto">
            Three simple steps from the shelf to your hands.
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(({ Icon, title, text }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={index * 0.12}
              className="group flex h-full flex-col items-center rounded-box border border-base-300 bg-base-100 p-6 text-center transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-content transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Icon className="h-7 w-7" />
              </span>
              <span className="mt-4 text-sm font-semibold text-secondary">
                Step {index + 1}
              </span>
              <h3 className="mt-1 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm text-base-content/70">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
