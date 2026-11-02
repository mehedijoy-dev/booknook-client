import Link from "next/link";
import { LuBookOpen } from "react-icons/lu";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="BookNook home"
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-content"
      >
        <LuBookOpen className="h-4 w-4" />
      </span>
      <span className="text-xl font-semibold tracking-tight">BookNook</span>
    </Link>
  );
}
