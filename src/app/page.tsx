export default function Home() {
  return (
    <section className="page-container py-16">
      <h1 className="section-title">BookNook</h1>
      <p className="section-subtitle">
        Add a book, borrow a book, return a book.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button className="btn btn-primary">Browse Books</button>
        <button className="btn btn-secondary">Borrow</button>
        <button className="btn btn-outline">View Details</button>
      </div>

      <div className="mt-10 max-w-sm rounded-box border border-base-300 bg-base-200 p-6">
        <h2 className="font-display text-xl font-bold">Card preview</h2>
        <p className="mt-2 text-sm text-base-content/70">
          Warm paper tones, deep green accents and a serif heading.
        </p>
      </div>
    </section>
  );
}
