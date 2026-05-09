import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-[72px] max-sm:w-[min(100%-22px,1180px)] max-sm:py-10">
      <div className="rounded-[28px] border border-border bg-surface p-6 max-sm:rounded-3xl max-sm:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Not found</p>
        <h1 className="mt-2 font-heading text-4xl font-black tracking-[-0.04em]">We could not find that page.</h1>
        <p className="mt-3 text-muted">The product may have been removed or the link may be incorrect.</p>
        <Link
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-text bg-text px-5 font-heading font-bold text-white transition hover:-translate-y-px"
          href="/products"
        >
          Back to shop
        </Link>
      </div>
    </section>
  );
}
