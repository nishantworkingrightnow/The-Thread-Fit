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
    <article className="product-card">
      <Link className="product-card-image" href={`/products/${product.slug}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="product-card-body">
        <div className="product-card-top">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h3>
              <Link href={`/products/${product.slug}`}>{product.title}</Link>
            </h3>
            <p className="muted">{product.collection}</p>
          </div>
          <div className="price">{formatPrice(product.price)}</div>
        </div>

        <div className="chips" aria-label="Available options">
          {product.colors.slice(0, 3).map((color) => (
            <span className="chip" key={color}>
              {color}
            </span>
          ))}
          {product.sizes.slice(0, 3).map((size) => (
            <span className="chip" key={size}>
              {size}
            </span>
          ))}
        </div>

        <div className="inline-actions" style={{ marginTop: 16 }}>
          <Link className="button ghost" href={`/products/${product.slug}`}>
            View
          </Link>
          <button className="button secondary" type="button" onClick={toggleWishlist}>
            {isWishlisted ? "Saved" : "Wishlist"}
          </button>
        </div>
      </div>
    </article>
  );
}
