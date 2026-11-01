"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/lib/api";
import { authRequest } from "@/lib/api-client";
import { uploadImage } from "@/lib/upload";
import { CATEGORIES } from "@/types/book";
import type { Book } from "@/types/book";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const emptyForm = {
  title: "",
  author: "",
  category: "",
  totalCopies: "1",
  description: "",
};

export default function AddBookForm() {
  const { user } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Free the preview memory when the image changes or the page closes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const update =
    (field: keyof typeof emptyForm) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = event.target.files?.[0] ?? null;

    if (!chosen) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    if (!chosen.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      event.target.value = "";
      return;
    }
    if (chosen.size > MAX_IMAGE_SIZE) {
      toast.error("The image must be 5 MB or smaller");
      event.target.value = "";
      return;
    }

    setFile(chosen);
    setPreviewUrl(URL.createObjectURL(chosen));
  };

  const fail = (message: string) => {
    setFormError(message);
    toast.error(message);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const copies = Number(form.totalCopies);

    if (!form.title.trim()) return fail("Please enter the book title");
    if (!form.author.trim()) return fail("Please enter the author name");
    if (!form.category) return fail("Please choose a category");
    if (!Number.isInteger(copies) || copies < 1) {
      return fail("Total copies must be a whole number of 1 or more");
    }
    if (!file) return fail("Please choose a book image");
    if (!form.description.trim()) {
      return fail("Please write a short description");
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage(file);

      await authRequest<Book>("/books", {
        method: "POST",
        body: {
          title: form.title.trim(),
          author: form.author.trim(),
          category: form.category,
          image: imageUrl,
          description: form.description.trim(),
          totalCopies: copies,
        },
      });

      toast.success("Book added successfully");
      setForm(emptyForm);
      setFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      fail(
        error instanceof ApiError
          ? error.message
          : "Could not add the book. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
      {formError && (
        <div role="alert" className="alert alert-error alert-soft text-sm">
          <span>{formError}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Book Title
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={update("title")}
            placeholder="e.g. The Alchemist"
            className="input w-full"
          />
        </div>

        <div>
          <label htmlFor="author" className="mb-1 block text-sm font-medium">
            Author Name
          </label>
          <input
            id="author"
            type="text"
            value={form.author}
            onChange={update("author")}
            placeholder="e.g. Paulo Coelho"
            className="input w-full"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={update("category")}
            className="select w-full"
          >
            <option value="">Choose a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="copies" className="mb-1 block text-sm font-medium">
            Total Copies
          </label>
          <input
            id="copies"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            value={form.totalCopies}
            onChange={update("totalCopies")}
            className="input w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="mb-1 block text-sm font-medium">
          Book Image
        </label>
        <input
          id="image"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="file-input w-full"
        />
        <p className="mt-2 text-xs text-base-content/60">
          JPG, PNG or WebP, up to 5 MB.
        </p>

        {previewUrl && (
          <div className="mt-3 w-32 overflow-hidden rounded-box border border-base-300 sm:w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Selected book cover preview"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">
          Short Description
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={update("description")}
          rows={4}
          maxLength={600}
          placeholder="What is this book about?"
          className="textarea w-full"
        />
        <p className="mt-1 text-right text-xs text-base-content/60">
          {form.description.length}/600
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="user-name" className="mb-1 block text-sm font-medium">
            Your Name
          </label>
          <input
            id="user-name"
            type="text"
            value={user?.name ?? ""}
            readOnly
            className="input w-full cursor-not-allowed bg-base-200"
          />
        </div>

        <div>
          <label
            htmlFor="user-email"
            className="mb-1 block text-sm font-medium"
          >
            Your Email
          </label>
          <input
            id="user-email"
            type="email"
            value={user?.email ?? ""}
            readOnly
            className="input w-full cursor-not-allowed bg-base-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full sm:w-auto"
      >
        {loading && <span className="loading loading-spinner loading-sm" />}
        {loading ? "Adding book" : "Add Book"}
      </button>
    </form>
  );
}
