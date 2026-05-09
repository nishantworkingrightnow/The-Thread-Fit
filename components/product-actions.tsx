"use client";

import { useEffect, useMemo, useState } from "react";
import { readBaggage, readWishlist, writeBaggage, writeWishlist } from "@/lib/storage";
import type { Product } from "@/lib/types";

export function ProductActions({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [status, setStatus] = useState("");

  const canAddToCart = useMemo(
    () => Boolean(product.inStock && selectedSize && selectedColor),
    [product.inStock, selectedColor, selectedSize]
  );

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

  function addToCart() {
    if (!canAddToCart) {
      setStatus("Please choose an available size and colour.");
      return;
    }

    const confirmed = window.confirm(
      `Add ${product.title} in ${selectedSize} / ${selectedColor} to your cart?`
    );

    if (!confirmed) {
      return;
    }

    const items = readBaggage();
    const id = `${product._id}-${selectedSize}-${selectedColor}`;
    const existingItem = items.find((item) => item.id === id);
    const nextItems = existingItem
      ? items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
      : [
          ...items,
          {
            id,
            productId: product._id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: 1
          }
        ];

    writeBaggage(nextItems);
    setStatus("Added to cart.");
  }

  return (
    <div>
      <div className="my-5 grid gap-2">
        <strong>Size</strong>
        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((size) => (
            <button
              className={`rounded-full border px-3.5 py-2 font-heading font-extrabold ${
                selectedSize === size
                  ? "border-text bg-text text-white"
                  : "border-border bg-surface text-text"
              }`}
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="my-5 grid gap-2">
        <strong>Colour</strong>
        <div className="flex flex-wrap gap-2.5">
          {product.colors.map((color) => (
            <button
              className={`rounded-full border px-3.5 py-2 font-heading font-extrabold ${
                selectedColor === color
                  ? "border-text bg-text text-white"
                  : "border-border bg-surface text-text"
              }`}
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 max-sm:grid max-sm:grid-cols-1">
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-text bg-text px-5 font-heading font-bold text-white transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50 max-sm:w-full"
          type="button"
          disabled={!canAddToCart}
          onClick={addToCart}
        >
          Add to cart
        </button>
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-text bg-transparent px-5 font-heading font-bold text-text transition hover:-translate-y-px max-sm:w-full"
          type="button"
          onClick={toggleWishlist}
        >
          {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        </button>
      </div>

      {status ? <p className="mt-3 text-muted">{status}</p> : null}
    </div>
  );
}
