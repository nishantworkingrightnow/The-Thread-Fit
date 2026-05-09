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
    <section className="page-shell section">
      <div className="grid-heading">
        <div>
          <p className="eyebrow">Saved products</p>
          <h1>Wishlist</h1>
        </div>
      </div>
      <WishlistClient products={products} />
    </section>
  );
}
