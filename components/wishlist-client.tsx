"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { readWishlist, writeWishlist } from "@/lib/storage";
import type { Product } from "@/lib/types";

export function WishlistClient({ products }: { products: Product[] }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    function syncWishlist() {
      const productIds = new Set(products.map((product) => product._id));
      const wishlist = readWishlist();
      const validWishlist = wishlist.filter((productId) => productIds.has(productId));

      if (validWishlist.length !== wishlist.length) {
        writeWishlist(validWishlist);
      }

      setWishlistIds(validWishlist);
    }

    syncWishlist();
    window.addEventListener("storage", syncWishlist);
    window.addEventListener("p1-storage", syncWishlist);

    return () => {
      window.removeEventListener("storage", syncWishlist);
      window.removeEventListener("p1-storage", syncWishlist);
    };
  }, [products]);

  const wishlistProducts = useMemo(
    () => products.filter((product) => wishlistIds.includes(product._id)),
    [products, wishlistIds]
  );

  if (!wishlistProducts.length) {
    return (
      <div className="rounded-[28px] border border-border bg-surface p-6 max-sm:rounded-3xl max-sm:p-5">
        <h2 className="font-heading text-2xl font-black">Your wishlist is empty.</h2>
        <p className="mt-3 text-muted">Save pieces while browsing so you can return to them quickly.</p>
        <Link
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-text bg-text px-5 font-heading font-bold text-white transition hover:-translate-y-px"
          href="/products"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[22px] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-[18px]">
      {wishlistProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
