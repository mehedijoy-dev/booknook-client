import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { LuClock, LuMail } from "react-icons/lu";
import Logo from "./Logo";
import CurrentYear from "./CurrentYear";
import { siteConfig } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const socials = [
  { label: "BookNook on X", href: siteConfig.socials.x, Icon: FaXTwitter },
  {
    label: "BookNook on Facebook",
    href: siteConfig.socials.facebook,
    Icon: FaFacebookF,
  },
  {
    label: "BookNook on LinkedIn",
    href: siteConfig.socials.linkedin,
    Icon: FaLinkedinIn,
  },
  {
    label: "BookNook on GitHub",
    href: siteConfig.socials.github,
    Icon: FaGithub,
  },
];

const linkClass = "transition-colors hover:text-base-content";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-base-300 bg-base-200">
      <div className="page-container grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-base-content/60">
            {siteConfig.tagline}
          </p>

          <ul className="mt-6 flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 text-base-content/70 ring-1 ring-base-300 transition-colors hover:bg-primary hover:text-primary-content"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-base-content/60">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Categories</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-base-content/60">
            {categories.map((name) => (
              <li key={name}>
                <Link href={`/books?category=${name}`} className={linkClass}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-base-content/60">
            <li className="flex items-start gap-2">
              <LuMail className="mt-0.5 h-4 w-4 shrink-0" />
              <a
                href={`mailto:${siteConfig.email}`}
                className={`break-all ${linkClass}`}
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <LuClock className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{siteConfig.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="page-container flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-base-content/55 sm:flex-row sm:text-left">
          <p>
            &copy; <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p>Add a book. Borrow a book. Return a book.</p>
        </div>
      </div>
    </footer>
  );
}
