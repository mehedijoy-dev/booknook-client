"use client";

import Link from "next/link";
import type { AuthUser } from "@/hooks/useAuth";

interface UserMenuProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar hover:bg-white/10"
        aria-label="Open user menu"
      >
        <div className="w-10 rounded-full ring-2 ring-accent ring-offset-2 ring-offset-neutral">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-primary text-primary-content">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 text-base-content shadow-xl"
      >
        <li className="menu-title truncate px-3 py-2 text-base-content">
          {user.name}
        </li>
        <li>
          <Link href="/profile">My Profile</Link>
        </li>
        <li>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
