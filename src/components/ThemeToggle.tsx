"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "booknook-dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "booknook" : "booknook-dark")}
      className="btn btn-ghost btn-circle"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      {isDark ? <LuSun className="h-5 w-5" /> : <LuMoon className="h-5 w-5" />}
    </button>
  );
}
