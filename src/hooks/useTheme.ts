"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "booknook" | "booknook-dark";

export const THEME_STORAGE_KEY = "booknook-theme";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "booknook-dark"
    ? "booknook-dark"
    : "booknook";
}

// null on the server, so the toggle can wait until the browser knows the theme
function getServerSnapshot(): Theme | null {
  return null;
}

export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked, the theme still changes for this visit
    }
  }, []);

  return { theme, setTheme };
}
