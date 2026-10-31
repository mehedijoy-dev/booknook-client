"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="booknook"
      themes={["booknook", "booknook-dark"]}
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
