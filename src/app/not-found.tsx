import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <title>BookNook | Page Not Found</title>
      <p className="font-display text-7xl font-bold text-primary sm:text-8xl">
        404
      </p>
      <h1 className="section-title mt-4">This page is not on our shelf</h1>
      <p className="section-subtitle mx-auto">
        The page you are looking for may have moved, or the link may be wrong.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to Home
      </Link>
    </section>
  );
}
