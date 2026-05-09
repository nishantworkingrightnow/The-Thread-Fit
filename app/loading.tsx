export default function Loading() {
  return (
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-[72px] max-sm:w-[min(100%-22px,1180px)] max-sm:py-10">
      <div className="rounded-[28px] border border-border bg-surface p-6 max-sm:rounded-3xl max-sm:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Loading</p>
        <h1 className="mt-2 font-heading text-4xl font-black tracking-[-0.04em]">Preparing the store...</h1>
        <p className="mt-3 text-muted">Fetching the latest products and stock details.</p>
      </div>
    </section>
  );
}
