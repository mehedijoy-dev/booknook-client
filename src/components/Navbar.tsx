"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMenu, LuX } from "react-icons/lu";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import { useAuth } from "@/hooks/useAuth";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-base-200 ${
      isActive(href) ? "bg-base-200 text-primary" : "text-base-content/80"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="page-container flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          {user ? (
            <UserMenu user={user} onLogout={logout} />
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="btn btn-ghost btn-sm sm:btn-md">
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-primary btn-sm sm:btn-md"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <LuX className="h-6 w-6" />
            ) : (
              <LuMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile and tablet panel */}
      {open && (
        <div className="border-t border-base-300 bg-base-100 lg:hidden">
          <nav
            className="page-container flex flex-col gap-1 py-3"
            aria-label="Mobile"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}

            {!user && (
              <div className="mt-2 grid grid-cols-2 gap-2 sm:hidden">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="btn btn-outline"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
