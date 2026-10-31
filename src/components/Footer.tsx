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
  { href: "/my-borrows", label: "My Borrows" },
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
    <footer className="border-t border-base-300 bg-base-200">
      <div className="page-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm text-base-content/70">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 text-base-content/80 transition-colors hover:border-primary hover:bg-primary hover:text-primary-content"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-display text-lg font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-base-content/70">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-lg font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-base-content/70">
            <li className="flex items-start gap-2">
              <LuMail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all transition-colors hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <LuClock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{siteConfig.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="page-container flex flex-col items-center justify-between gap-2 py-5 text-center text-sm text-base-content/60 sm:flex-row sm:text-left">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Add a book. Borrow a book. Return a book.</p>
        </div>
      </div>
    </footer>
  );
}
