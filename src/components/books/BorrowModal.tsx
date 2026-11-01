"use client";

import { useEffect, useRef } from "react";

interface BorrowModalProps {
  open: boolean;
  loading: boolean;
  bookTitle: string;
  userName: string;
  userEmail: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BorrowModal({
  open,
  loading,
  bookTitle,
  userName,
  userEmail,
  onClose,
  onConfirm,
}: BorrowModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box w-11/12 max-w-md">
        <h3 className="font-display text-2xl font-bold">Borrow this book</h3>
        <p className="mt-2 text-sm text-base-content/70">
          You are borrowing <span className="font-semibold">{bookTitle}</span>.
          You can keep it for 7 days.
        </p>

        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onConfirm();
          }}
        >
          <div>
            <label
              htmlFor="borrow-name"
              className="mb-1 block text-sm font-medium"
            >
              Name
            </label>
            <input
              id="borrow-name"
              type="text"
              value={userName}
              readOnly
              className="input w-full cursor-not-allowed bg-base-200"
            />
          </div>

          <div>
            <label
              htmlFor="borrow-email"
              className="mb-1 block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="borrow-email"
              type="email"
              value={userEmail}
              readOnly
              className="input w-full cursor-not-allowed bg-base-200"
            />
          </div>

          <div className="modal-action flex-col-reverse gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading && (
                <span className="loading loading-spinner loading-sm" />
              )}
              Confirm Borrow
            </button>
          </div>
        </form>
      </div>

      <div className="modal-backdrop">
        <button type="button" onClick={onClose} aria-label="Close">
          close
        </button>
      </div>
    </dialog>
  );
}
