import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { LuClock, LuMail } from "react-icons/lu";
import Logo from "./Logo";
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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 rounded-t-[2.5rem] bg-neutral text-neutral-content">
      <div className="page-container pt-12 sm:pt-16">
        {/* Call to action */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-primary p-7 text-primary-content sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Got a book to share?
            </h2>
            <p className="mt-2 max-w-xl opacity-90">
              Add it to the shelf in a minute and let other readers borrow it.
            </p>
          </div>
          <Link href="/add-book" className="btn btn-accent btn-lg shrink-0">
            Add a Book
          </Link>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div>
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
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-accent-content"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-content/70">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-white">
              Categories
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-content/70">
              {categories.map(({ name, dot }) => (
                <li key={name}>
                  <Link
                    href={`/books?category=${name}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-content/70">
              <li className="flex items-start gap-2">
                <LuMail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <LuClock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{siteConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-container flex flex-col items-center justify-between gap-2 py-5 text-center text-sm text-neutral-content/60 sm:flex-row sm:text-left">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Add a book. Borrow a book. Return a book.</p>
        </div>
      </div>
    </footer>
  );
}
