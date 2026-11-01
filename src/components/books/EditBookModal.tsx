"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuX } from "react-icons/lu";
import Modal from "@/components/ui/Modal";
import { ApiError } from "@/lib/api";
import { authRequest } from "@/lib/api-client";
import { uploadImage } from "@/lib/upload";
import { CATEGORIES } from "@/types/book";
import type { Book } from "@/types/book";
import BookCover from "./BookCover";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

interface EditBookModalProps {
  book: Book;
  onClose: () => void;
  onSaved: (book: Book) => void;
}

export default function EditBookModal({
  book,
  onClose,
  onSaved,
}: EditBookModalProps) {
  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    category: book.category as string,
    totalCopies: String(book.totalCopies),
    description: book.description,
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const borrowed = book.totalCopies - book.availableCopies;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const update =
    (field: keyof typeof form) =>
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

  const keepCurrentImage = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
    if (copies < borrowed) {
      return fail(
        `${borrowed} ${borrowed === 1 ? "copy is" : "copies are"} borrowed right now, so total copies cannot be less than ${borrowed}`,
      );
    }
    if (!form.description.trim()) {
      return fail("Please write a short description");
    }

    setSaving(true);
    try {
      const image = file ? await uploadImage(file) : book.image;

      const updated = await authRequest<Book>(`/books/${book._id}`, {
        method: "PATCH",
        body: {
          title: form.title.trim(),
          author: form.author.trim(),
          category: form.category,
          image,
          description: form.description.trim(),
          totalCopies: copies,
        },
      });

      toast.success("Book updated successfully");
      onSaved(updated);
      onClose();
    } catch (error) {
      fail(
        error instanceof ApiError
          ? error.message
          : "Could not update the book. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open onClose={onClose} wide>
      <h3 className="font-display text-2xl font-bold">Edit book</h3>
      <p className="mt-1 text-sm text-base-content/70">
        Change what you need and save.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        {formError && (
          <div role="alert" className="alert alert-error alert-soft text-sm">
            <span>{formError}</span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="edit-title" className="mb-1 block text-sm font-medium">
              Book Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={form.title}
              onChange={update("title")}
              className="input w-full"
            />
          </div>

          <div>
            <label htmlFor="edit-author" className="mb-1 block text-sm font-medium">
              Author Name
            </label>
            <input
              id="edit-author"
              type="text"
              value={form.author}
              onChange={update("author")}
              className="input w-full"
            />
          </div>

          <div>
            <label htmlFor="edit-category" className="mb-1 block text-sm font-medium">
              Category
            </label>
            <select
              id="edit-category"
              value={form.category}
              onChange={update("category")}
              className="select w-full"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="edit-copies" className="mb-1 block text-sm font-medium">
              Total Copies
            </label>
            <input
              id="edit-copies"
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              value={form.totalCopies}
              onChange={update("totalCopies")}
              className="input w-full"
            />
            {borrowed > 0 && (
              <p className="mt-1 text-xs text-base-content/60">
                {borrowed} {borrowed === 1 ? "copy is" : "copies are"} borrowed
                right now.
              </p>
            )}
          </div>
        </div>

        <div>
          <span className="mb-1 block text-sm font-medium">Book Image</span>
          <div className="flex flex-wrap items-end gap-4">
            <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-box border border-base-300 bg-base-200">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="New cover preview"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <BookCover
                  src={book.image}
                  alt={`Current cover of ${book.title}`}
                  className="absolute inset-0 h-full w-full"
                />
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                aria-label="Choose a new book image"
                className="file-input file-input-sm w-full"
              />
              <p className="text-xs text-base-content/60">
                {file
                  ? "This new image will replace the current one."
                  : "Leave empty to keep the current image."}
              </p>
              {file && (
                <button
                  type="button"
                  onClick={keepCurrentImage}
                  disabled={saving}
                  className="btn btn-outline btn-error btn-xs"
                >
                  <LuX className="h-3 w-3" />
                  Keep current image
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="edit-description" className="mb-1 block text-sm font-medium">
            Short Description
          </label>
          <textarea
            id="edit-description"
            value={form.description}
            onChange={update("description")}
            rows={4}
            maxLength={600}
            className="textarea w-full"
          />
          <p className="mt-1 text-right text-xs text-base-content/60">
            {form.description.length}/600
          </p>
        </div>

        <div className="modal-action flex-col-reverse gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving && <span className="loading loading-spinner loading-sm" />}
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}