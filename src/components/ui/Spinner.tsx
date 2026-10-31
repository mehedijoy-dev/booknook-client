interface SpinnerProps {
  label?: string;
  fullPage?: boolean;
}

export default function Spinner({
  label = "Loading",
  fullPage = false,
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 ${
        fullPage ? "min-h-[60vh]" : "py-16"
      }`}
    >
      <span className="loading loading-spinner loading-lg text-primary" />
      <span className="text-sm text-base-content/70">{label}...</span>
    </div>
  );
}
