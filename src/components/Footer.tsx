import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { LuArrowUp, LuClock, LuMail } from "react-icons/lu";
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

const categories = [
  { name: "Fiction", dot: "bg-cat-fiction" },
  { name: "Science", dot: "bg-cat-science" },
  { name: "History", dot: "bg-cat-history" },
  { name: "Kids", dot: "bg-cat-kids" },
  { name: "Others", dot: "bg-cat-others" },
];

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

const linkClass = "inline-block py-1 transition-colors hover:text-accent";
const headingClass = "font-display text-lg font-bold text-white sm:text-xl";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      {/* One stripe in the colour of every category */}
      <div aria-hidden="true" className="flex h-1.5">
        {categories.map(({ name, dot }) => (
          <span key={name} className={`flex-1 ${dot}`} />
        ))}
      </div>

      <div className="page-container grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:gap-x-10 sm:py-16 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] lg:gap-x-12">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-neutral-content/70">
            {siteConfig.tagline}
          </p>

          <ul className="mt-6 flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-accent-content sm:h-10 sm:w-10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className={headingClass}>Explore</h3>
          <ul className="mt-3 space-y-1 text-sm text-neutral-content/70">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className={headingClass}>Categories</h3>
          <ul className="mt-3 space-y-1 text-sm text-neutral-content/70">
            {categories.map(({ name, dot }) => (
              <li key={name}>
                <Link
                  href={`/books?category=${name}`}
                  className={`flex items-center gap-2 ${linkClass}`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 rounded-2xl bg-white/5 p-5 lg:col-span-1 lg:bg-transparent lg:p-0">
          <h3 className={headingClass}>Contact</h3>
          <ul className="mt-3 space-y-3 text-sm text-neutral-content/70">
            <li className="flex items-start gap-3">
              <LuMail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <LuClock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{siteConfig.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-container flex flex-col items-center gap-3 py-6 text-center text-xs text-neutral-content/60 sm:flex-row sm:justify-between sm:text-left sm:text-sm">
          <a
            href="#"
            aria-label="Back to top"
            className="order-first flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-neutral-content transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-accent-content sm:order-last sm:h-10 sm:w-10"
          >
            <LuArrowUp className="h-5 w-5" />
          </a>
          <p>
            &copy; <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p>Add a book. Borrow a book. Return a book.</p>
        </div>
      </div>
    </footer>
  );
}
