import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell section">
      <div className="empty-state">
        <p className="eyebrow">Not found</p>
        <h1>We could not find that page.</h1>
        <p className="muted">The product may have been removed or the link may be incorrect.</p>
        <Link className="button" href="/products">
          Back to shop
        </Link>
      </div>
    </section>
  );
}
