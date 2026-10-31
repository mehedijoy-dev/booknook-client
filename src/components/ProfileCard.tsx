"use client";

import { useAuth } from "@/hooks/useAuth";

export default function ProfileCard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mt-8 flex w-full max-w-md flex-col items-center gap-4 rounded-box border border-base-300 bg-base-200 p-6 text-center sm:p-8">
      <div className="avatar">
        <div className="w-28 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-200">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-primary text-4xl text-primary-content">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold">{user.name}</h2>
        <p className="mt-1 break-all text-sm text-base-content/70">
          {user.email}
        </p>
      </div>
    </div>
  );
}
