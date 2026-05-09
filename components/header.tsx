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
      const validWishlist = wishlist.filter((productId) =>
        validProductIdSet.has(productId)
      );

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
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-lg max-sm:static">
      <div className="mx-auto grid min-h-[76px] w-[min(1180px,calc(100%-32px))] grid-cols-[auto_minmax(220px,1fr)_auto] items-center gap-5 max-lg:grid-cols-1 max-sm:w-[min(100%-22px,1180px)] max-sm:gap-3.5 max-sm:py-3.5">
        <Link
          className="inline-flex min-h-11 min-w-36 items-center justify-center whitespace-nowrap rounded-[18px] bg-text px-4 text-center font-heading text-base font-black leading-none tracking-[-0.08em] text-background max-sm:min-w-full max-sm:rounded-2xl"
          href="/"
        >
          The Thread Fit
        </Link>

        <nav
          className="flex items-center justify-center gap-7 text-sm font-bold text-muted max-lg:justify-start max-sm:w-full max-sm:justify-between max-sm:gap-2.5 max-sm:rounded-full max-sm:border max-sm:border-border max-sm:bg-surface/70 max-sm:px-3.5 max-sm:py-2.5"
          aria-label="Primary navigation"
        >
          <Link href="/products">Shop</Link>
          <Link href="/products?collection=men">Men</Link>
          <Link href="/products?collection=women">Women</Link>
        </nav>

        <div className="flex flex-wrap items-center justify-end gap-2.5 max-lg:justify-start max-sm:grid max-sm:w-full max-sm:grid-cols-2">
          <form
            className="flex overflow-hidden rounded-full border border-border bg-surface-strong max-sm:col-span-2 max-sm:w-full"
            onSubmit={handleSearch}
          >
            <input
              className="w-[min(34vw,340px)] border-0 bg-transparent px-3.5 py-3 outline-0 max-lg:w-full max-sm:min-w-0"
              name="q"
              type="search"
              placeholder="Search clothing"
              aria-label="Search clothing"
            />
            <button
              className="border-0 bg-text px-4 font-heading font-extrabold text-white max-sm:px-3.5"
              type="submit"
            >
              Search
            </button>
          </form>
          <Link
            className="rounded-full border border-border bg-surface-strong px-3.5 py-2.5 font-heading font-extrabold max-sm:inline-flex max-sm:justify-center max-sm:px-3"
            href="/wishlist"
          >
            Wishlist
            <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-text text-xs text-white">
              {wishlistCount}
            </span>
          </Link>
          <Link
            className="rounded-full border border-border bg-surface-strong px-3.5 py-2.5 font-heading font-extrabold max-sm:inline-flex max-sm:justify-center max-sm:px-3"
            href="/baggage"
          >
            Cart
            <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-text text-xs text-white">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
