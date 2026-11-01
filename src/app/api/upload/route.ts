import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json(
      { message: "Please log in to upload an image" },
      { status: 401 },
    );
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Image upload is not set up yet" },
      { status: 500 },
    );
  }

  const incoming = await request.formData();
  const file = incoming.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "Please choose an image to upload" },
      { status: 400 },
    );
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { message: "The selected file is not an image" },
      { status: 400 },
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { message: "The image must be 5 MB or smaller" },
      { status: 400 },
    );
  }

  try {
    const body = new FormData();
    body.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      { method: "POST", body },
    );
    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.data?.url) {
      return NextResponse.json(
        { message: "Could not upload the image. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: data.data.url as string });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json(
      { message: "Could not upload the image. Please try again." },
      { status: 502 },
    );
  }
}
