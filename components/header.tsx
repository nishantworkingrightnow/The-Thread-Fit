"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { readBaggage, readWishlist, writeWishlist } from "@/lib/storage";

type HeaderProps = {
  validProductIds: string[];
};

export function Header({ validProductIds }: HeaderProps) {
  const router = useRouter();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function syncCounts() {
      const validProductIdSet = new Set(validProductIds);
      const wishlist = readWishlist();
      const validWishlist = wishlist.filter((productId) => validProductIdSet.has(productId));

      if (validWishlist.length !== wishlist.length) {
        writeWishlist(validWishlist);
      }

      setWishlistCount(validWishlist.length);
      setCartCount(
        readBaggage().reduce((count, item) => count + item.quantity, 0)
      );
    }

    syncCounts();
    window.addEventListener("storage", syncCounts);
    window.addEventListener("p1-storage", syncCounts);

    return () => {
      window.removeEventListener("storage", syncCounts);
      window.removeEventListener("p1-storage", syncCounts);
    };
  }, [validProductIds]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") || "").trim();
    router.push(
      query ? `/products?query=${encodeURIComponent(query)}` : "/products"
    );
  }

  return (
    <header className="header">
      <div className="page-shell header-inner">
        <Link className="brand" href="/">
          The Thread Fit
        </Link>

        <nav className="nav" aria-label="Primary navigation">
          <Link href="/products">Shop</Link>
          <Link href="/products?collection=men">Men</Link>
          <Link href="/products?collection=women">Women</Link>
        </nav>

        <div className="header-actions">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              name="q"
              type="search"
              placeholder="Search clothing"
              aria-label="Search clothing"
            />
            <button type="submit">Search</button>
          </form>
          <Link className="count-link" href="/wishlist">
            Wishlist<span className="count-pill">{wishlistCount}</span>
          </Link>
          <Link className="count-link" href="/baggage">
            Cart<span className="count-pill">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
