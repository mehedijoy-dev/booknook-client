import Link from "next/link";
import { LuBookOpen } from "react-icons/lu";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="BookNook home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-content">
        <LuBookOpen className="h-5 w-5" />
      </span>
      <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">
        BookNook
      </span>
    </Link>
  );
}
