"use client";

export default function ErrorPage({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="page-shell section">
      <div className="empty-state">
        <p className="eyebrow">Something went wrong</p>
        <h1>The store could not load this view.</h1>
        <p className="muted">Please try again. If it keeps happening, check the Sanity settings.</p>
        <button className="button" type="button" onClick={reset}>
          Try again
        </button>
      </div>
    </section>
  );
}
