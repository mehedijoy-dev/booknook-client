import { LuCalendarCheck, LuSearch, LuUndo2 } from "react-icons/lu";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    Icon: LuSearch,
    title: "Find a book",
    text: "Browse the shelf and open any book to see its details and how many copies are left.",
    tone: "bg-primary text-primary-content",
  },
  {
    Icon: LuCalendarCheck,
    title: "Borrow it for a week",
    text: "Log in, confirm your details and the book is yours for seven days.",
    tone: "bg-secondary text-secondary-content",
  },
  {
    Icon: LuUndo2,
    title: "Return it with one click",
    text: "Finished reading? Return it from My Borrows so the next reader can enjoy it.",
    tone: "bg-accent text-accent-content",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-base-200 py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

      <div className="page-container relative">
        <Reveal className="text-center">
          <span className="eyebrow">Easy as 1, 2, 3</span>
          <h2 className="section-title mt-4">How Borrowing Works</h2>
          <p className="section-subtitle mx-auto">
            Three simple steps from the shelf to your hands.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ Icon, title, text, tone }, index) => (
            <Reveal as="li" key={title} delay={index * 0.12} className="h-full">
              <div
                className={`group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-8 ${tone}`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-8 select-none font-display text-[9rem] font-extrabold leading-none opacity-15"
                >
                  {index + 1}
                </span>

                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/25 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </span>

                <h3 className="relative mt-6 font-display text-2xl font-extrabold">
                  {title}
                </h3>
                <p className="relative mt-2 text-base opacity-90">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
