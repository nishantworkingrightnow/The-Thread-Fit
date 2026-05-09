"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { readWishlist, writeWishlist } from "@/lib/storage";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(readWishlist().includes(product._id));
  }, [product._id]);

  function toggleWishlist() {
    const wishlist = readWishlist();
    const nextWishlist = wishlist.includes(product._id)
      ? wishlist.filter((id) => id !== product._id)
      : [...wishlist, product._id];
    writeWishlist(nextWishlist);
    setIsWishlisted(nextWishlist.includes(product._id));
  }

  return (
    <article className="overflow-hidden rounded-[28px] border border-border bg-surface shadow-card max-sm:rounded-3xl">
      <Link className="block aspect-[4/5] overflow-hidden bg-accent-soft" href={`/products/${product.slug}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-full w-full object-cover" src={product.image} alt={product.title} />
      </Link>
      <div className="p-[18px] max-sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{product.category}</p>
            <h3 className="mb-1 text-lg font-black leading-tight">
              <Link href={`/products/${product.slug}`}>{product.title}</Link>
            </h3>
            <p className="text-muted">{product.collection}</p>
          </div>
          <div className="font-heading text-base font-black">{formatPrice(product.price)}</div>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2" aria-label="Available options">
          {product.colors.slice(0, 3).map((color) => (
            <span
              className="rounded-full border border-border bg-white/55 px-2.5 py-1.5 text-sm font-bold text-muted"
              key={color}
            >
              {color}
            </span>
          ))}
          {product.sizes.slice(0, 3).map((size) => (
            <span
              className="rounded-full border border-border bg-white/55 px-2.5 py-1.5 text-sm font-bold text-muted"
              key={size}
            >
              {size}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 max-sm:grid max-sm:grid-cols-2">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface px-5 font-heading font-bold text-text transition hover:-translate-y-px max-sm:w-full max-sm:px-3"
            href={`/products/${product.slug}`}
          >
            View
          </Link>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-text bg-transparent px-5 font-heading font-bold text-text transition hover:-translate-y-px max-sm:w-full max-sm:px-3"
            type="button"
            onClick={toggleWishlist}
          >
            {isWishlisted ? "Saved" : "Wishlist"}
          </button>
        </div>
      </div>
    </article>
  );
}
