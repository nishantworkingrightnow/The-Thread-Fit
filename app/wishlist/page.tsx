import type { Metadata } from "next";
import { WishlistClient } from "@/components/wishlist-client";
import { getProducts } from "@/lib/sanity/products";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Saved clothing pieces from The Thread Fit.",
};

export default async function WishlistPage() {
  const products = await getProducts();

  return (
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-[72px] max-sm:w-[min(100%-22px,1180px)] max-sm:py-10">
      <div className="mb-6 flex items-end justify-between gap-5 max-sm:grid max-sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Saved products</p>
          <h1 className="mt-2 font-heading text-4xl font-black tracking-[-0.04em]">Wishlist</h1>
        </div>
      </div>
      <WishlistClient products={products} />
    </section>
  );
}
