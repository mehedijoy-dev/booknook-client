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
    <section className="bg-base-200 py-20 sm:py-28">
      <div className="page-container">
        <Reveal>
          <span className="eyebrow">How it works</span>
          <h2 className="section-title mt-2">How borrowing works</h2>
          <p className="section-subtitle">
            Three simple steps from the shelf to your hands.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-14">
          {steps.map(({ Icon, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 0.1}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base-100 shadow-sm ring-1 ring-base-300">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-6 text-sm font-semibold text-secondary">
                Step {index + 1}
              </p>
              <h3 className="mt-1 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-base-content/65">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
