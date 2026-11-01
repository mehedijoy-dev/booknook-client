import type { Book } from "@/types/book";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const data = await response.json();
      if (data?.message) message = String(data.message);
    } catch {
      // The server sent no JSON, keep the default message
    }
    throw new ApiError(message, response.status);
  }

  return response.json();
}

export async function getBooks(limit?: number): Promise<Book[]> {
  const query = limit ? `?limit=${limit}` : "";
  const response = await fetch(`${API_URL}/books${query}`, {
    cache: "no-store",
  });

  return parseResponse<Book[]>(response);
}

export async function getBook(id: string): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    cache: "no-store",
  });

  return parseResponse<Book>(response);
}
