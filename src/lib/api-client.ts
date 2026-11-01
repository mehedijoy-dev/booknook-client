import { authClient } from "./auth-client";
import { API_URL, ApiError, parseResponse } from "./api";

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
}

// Adds the Better Auth JWT, so the Express server knows who is calling
export async function authRequest<T>(
  path: string,
  { method = "GET", body }: RequestOptions = {},
): Promise<T> {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new ApiError("Please log in to continue", 401);
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  return parseResponse<T>(response);
}
