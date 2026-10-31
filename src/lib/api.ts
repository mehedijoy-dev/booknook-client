import type { Book } from "@/types/book";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function getBooks(limit?: number): Promise<Book[]> {
  const query = limit ? `?limit=${limit}` : "";
  const response = await fetch(`${API_URL}/books${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not load books");
  }

  return response.json();
}
