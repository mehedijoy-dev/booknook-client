"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// The server snapshot is a fixed year, the browser shows the real current year
export default function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026,
  );

  return <>{year}</>;
}
