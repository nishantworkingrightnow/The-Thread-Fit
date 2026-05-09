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
      <div className="empty-state">
        <h2>Your wishlist is empty.</h2>
        <p className="muted">Save pieces while browsing so you can return to them quickly.</p>
        <Link className="button" href="/products">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {wishlistProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
