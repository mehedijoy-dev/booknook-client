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
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-content"
      >
        <LuBookOpen className="h-5 w-5" />
      </span>
      <span className="text-2xl font-extrabold tracking-tight">BookNook</span>
    </Link>
  );
}
