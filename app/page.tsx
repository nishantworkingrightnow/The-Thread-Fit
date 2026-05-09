import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/sanity/products";

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 3);

  return (
    <>
      <section className="mx-auto grid w-[min(1180px,calc(100%-32px))] grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] items-center gap-10 py-[76px] pb-12 max-lg:grid-cols-1 max-sm:w-[min(100%-22px,1180px)] max-sm:gap-6 max-sm:py-10 max-sm:pb-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Menswear now, more collections soon</p>
          <h1 className="my-4 max-w-3xl font-heading text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.08em] max-sm:text-[clamp(2.7rem,15vw,4.2rem)]">
            Clothing that feels sharp without trying too hard.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            Browse current men&apos;s stock, save pieces to your wishlist, add
            the right size and colour to your cart, and place your order
            through WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-text bg-text px-5 font-heading font-bold text-white transition hover:-translate-y-px"
              href="/products?collection=men"
            >
              Shop men
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-text bg-transparent px-5 font-heading font-bold text-text transition hover:-translate-y-px"
              href="/products"
            >
              View all products
            </Link>
          </div>
        </div>

        <aside className="overflow-hidden rounded-[36px] border border-border bg-surface shadow-soft" aria-label="Featured collection">
          <div className="min-h-[420px] bg-[linear-gradient(140deg,rgba(25,21,18,0.1),rgba(25,21,18,0.55)),url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center max-sm:min-h-80" />
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">New drops</p>
            <h2 className="mt-2 font-heading text-3xl font-black tracking-[-0.04em]">Check out our latest collection.</h2>
          </div>
        </aside>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-[72px] max-sm:w-[min(100%-22px,1180px)] max-sm:py-10">
        <div className="mb-6 flex items-end justify-between gap-5 max-sm:grid max-sm:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Featured stock</p>
            <h2 className="mt-2 font-heading text-[clamp(2rem,4vw,3.4rem)] font-black tracking-[-0.06em]">Ready to shop</h2>
          </div>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface px-5 font-heading font-bold text-text transition hover:-translate-y-px"
            href="/products"
          >
            Browse catalog
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-[22px] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-[18px]">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
