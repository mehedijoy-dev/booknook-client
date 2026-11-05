interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const spines = [
  "h-28 w-12 bg-cat-science",
  "h-40 w-12 bg-cat-history",
  "h-32 w-12 bg-cat-kids",
  "h-44 w-12 bg-cat-others",
  "h-36 w-12 bg-cat-fiction",
];

export default function AuthShell({
  title,
  subtitle,
  children,
}: AuthShellProps) {
  return (
    <section className="page-container py-10 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-base-100 shadow-xl ring-1 ring-base-300 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-neutral p-10 text-neutral-content lg:flex">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              BookNook
            </span>
            <p className="font-display mt-4 text-4xl font-extrabold text-white">
              Add a book. <span className="text-accent">Borrow</span> a book.{" "}
              <span className="text-cat-science">Return</span> a book.
            </p>
            <p className="mt-4 text-sm text-neutral-content/70">
              A small online library, shared by readers like you.
            </p>
          </div>

          <div aria-hidden="true" className="mt-10 flex items-end gap-2">
            {spines.map((spine, index) => (
              <span
                key={spine}
                className={`rounded-t-md ${spine} ${
                  index % 2 === 0 ? "-rotate-3" : "rotate-2"
                }`}
              />
            ))}
          </div>
        </aside>

        <div className="p-6 sm:p-10">
          <h1 className="section-title lg:text-4xl">{title}</h1>
          <p className="section-subtitle">{subtitle}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
