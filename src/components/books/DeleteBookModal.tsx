"use client";

import { LuTriangleAlert } from "react-icons/lu";
import Modal from "@/components/ui/Modal";

interface DeleteBookModalProps {
  bookTitle: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteBookModal({
  bookTitle,
  loading,
  onClose,
  onConfirm,
}: DeleteBookModalProps) {
  return (
    <Modal open onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-error/15 text-error">
          <LuTriangleAlert className="h-7 w-7" />
        </span>

        <h3 className="mt-4 font-display text-2xl font-bold">
          Delete this book?
        </h3>
        <p className="mt-2 text-sm text-base-content/70">
          <span className="font-semibold text-base-content">{bookTitle}</span>{" "}
          will be removed from the shelf, together with its borrow records. This
          cannot be undone.
        </p>
      </div>

      <div className="modal-action flex-col-reverse gap-2 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="btn btn-error"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          Yes, delete
        </button>
      </div>
    </Modal>
  );
}
