import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="BookNook home"
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-end justify-center gap-[3px] rounded-xl bg-[#1e1b3a] pb-2.5 ring-1 ring-white/20"
      >
        <span className="h-3.5 w-1.5 rounded-full bg-secondary" />
        <span className="h-5 w-1.5 rounded-full bg-accent" />
        <span className="h-4 w-1.5 rounded-full bg-primary" />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
        BookNook
      </span>
    </Link>
  );
}
