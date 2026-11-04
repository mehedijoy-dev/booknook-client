"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "booknook-dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "booknook" : "booknook-dark")}
      disabled={theme === null}
      className="btn btn-ghost btn-circle text-white hover:bg-white/10"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      {theme === null ? (
        <span className="h-5 w-5" />
      ) : isDark ? (
        <LuSun className="h-5 w-5" />
      ) : (
        <LuMoon className="h-5 w-5" />
      )}
    </button>
  );
}
