import { ApiError } from "./api";

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);

  const response = await fetch("/api/upload", { method: "POST", body: form });
  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.url) {
    throw new ApiError(
      data?.message ?? "Could not upload the image. Please try again.",
      response.status,
    );
  }

  return data.url as string;
}
