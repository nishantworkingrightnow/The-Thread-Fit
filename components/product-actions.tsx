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
      <div className="selector">
        <strong>Size</strong>
        <div className="option-row">
          {product.sizes.map((size) => (
            <button
              className={`option-button${selectedSize === size ? " active" : ""}`}
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="selector">
        <strong>Colour</strong>
        <div className="option-row">
          {product.colors.map((color) => (
            <button
              className={`option-button${selectedColor === color ? " active" : ""}`}
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="inline-actions">
        <button className="button" type="button" disabled={!canAddToCart} onClick={addToCart}>
          Add to cart
        </button>
        <button className="button secondary" type="button" onClick={toggleWishlist}>
          {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        </button>
      </div>

      {status ? <p className="muted">{status}</p> : null}
    </div>
  );
}
