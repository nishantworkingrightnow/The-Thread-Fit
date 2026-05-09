"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

type CatalogClientProps = {
  products: Product[];
  initialQuery?: string;
  initialCollection?: string;
};

function uniqueValues(products: Product[], getter: (product: Product) => string[]) {
  return Array.from(new Set(products.flatMap(getter))).sort((a, b) => a.localeCompare(b));
}

export function CatalogClient({ products, initialQuery = "", initialCollection = "" }: CatalogClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [collection, setCollection] = useState(initialCollection);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
    setCollection(initialCollection);
    setCategory("");
    setSize("");
    setColor("");
    setMaxPrice("");
  }, [initialCollection, initialQuery]);

  const sizes = useMemo(() => uniqueValues(products, (product) => product.sizes), [products]);
  const colors = useMemo(() => uniqueValues(products, (product) => product.colors), [products]);
  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort(),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    const priceLimit = Number(maxPrice);

    return products.filter((product) => {
      const matchesSearch =
        !search ||
        [product.title, product.description, product.category, product.collection, ...product.colors]
          .join(" ")
          .toLowerCase()
          .includes(search);
      const matchesCollection = !collection || product.collection === collection;
      const matchesCategory = !category || product.category === category;
      const matchesSize = !size || product.sizes.includes(size);
      const matchesColor = !color || product.colors.includes(color);
      const matchesPrice = !maxPrice || product.price <= priceLimit;

      return (
        matchesSearch &&
        matchesCollection &&
        matchesCategory &&
        matchesSize &&
        matchesColor &&
        matchesPrice
      );
    });
  }, [category, collection, color, maxPrice, products, query, size]);

  return (
    <div className="grid grid-cols-[260px_minmax(0,1fr)] items-start gap-6 max-lg:grid-cols-1">
      <button
        className="hidden min-h-[52px] w-full items-center justify-between rounded-full border border-border bg-text px-[18px] font-heading font-black text-background max-lg:inline-flex"
        type="button"
        aria-expanded={filtersOpen}
        onClick={() => setFiltersOpen((open) => !open)}
      >
        Filter options
        <span className="text-sm text-background/70">{filtersOpen ? "Close" : "Open"}</span>
      </button>

      <aside
        className={`sticky top-24 rounded-[28px] border border-border bg-surface p-5 max-lg:static ${
          filtersOpen ? "max-lg:block" : "max-lg:hidden"
        } max-sm:rounded-3xl max-sm:p-4`}
      >
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Filter catalog</p>
        <div className="mt-[18px] grid gap-2 max-sm:mt-3.5">
          <label className="text-sm font-extrabold uppercase text-muted" htmlFor="catalog-search">
            Search
          </label>
          <input
            className="w-full rounded-2xl border border-border bg-surface-strong px-3 py-3 outline-0 max-sm:min-h-12"
            id="catalog-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Shirt, black, denim..."
          />
        </div>

        <div className="mt-[18px] grid gap-2 max-sm:mt-3.5">
          <label className="text-sm font-extrabold uppercase text-muted" htmlFor="collection">
            Collection
          </label>
          <select
            className="w-full appearance-none rounded-2xl border border-border bg-surface-strong bg-[linear-gradient(45deg,transparent_50%,#191512_50%),linear-gradient(135deg,#191512_50%,transparent_50%)] bg-[length:6px_6px,6px_6px] bg-[position:calc(100%-20px)_50%,calc(100%-14px)_50%] bg-no-repeat px-3 py-3 pr-10 outline-0 max-sm:min-h-12"
            id="collection"
            value={collection}
            onChange={(event) => setCollection(event.target.value)}
          >
            <option value="">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="mt-[18px] grid gap-2 max-sm:mt-3.5">
          <label className="text-sm font-extrabold uppercase text-muted" htmlFor="category">
            Category
          </label>
          <select
            className="w-full appearance-none rounded-2xl border border-border bg-surface-strong bg-[linear-gradient(45deg,transparent_50%,#191512_50%),linear-gradient(135deg,#191512_50%,transparent_50%)] bg-[length:6px_6px,6px_6px] bg-[position:calc(100%-20px)_50%,calc(100%-14px)_50%] bg-no-repeat px-3 py-3 pr-10 outline-0 max-sm:min-h-12"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">All</option>
            {categories.map((categoryOption) => (
              <option value={categoryOption} key={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-[18px] grid gap-2 max-sm:mt-3.5">
          <label className="text-sm font-extrabold uppercase text-muted" htmlFor="size">
            Size
          </label>
          <select
            className="w-full appearance-none rounded-2xl border border-border bg-surface-strong bg-[linear-gradient(45deg,transparent_50%,#191512_50%),linear-gradient(135deg,#191512_50%,transparent_50%)] bg-[length:6px_6px,6px_6px] bg-[position:calc(100%-20px)_50%,calc(100%-14px)_50%] bg-no-repeat px-3 py-3 pr-10 outline-0 max-sm:min-h-12"
            id="size"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="">All</option>
            {sizes.map((sizeOption) => (
              <option value={sizeOption} key={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-[18px] grid gap-2 max-sm:mt-3.5">
          <label className="text-sm font-extrabold uppercase text-muted" htmlFor="color">
            Color
          </label>
          <select
            className="w-full appearance-none rounded-2xl border border-border bg-surface-strong bg-[linear-gradient(45deg,transparent_50%,#191512_50%),linear-gradient(135deg,#191512_50%,transparent_50%)] bg-[length:6px_6px,6px_6px] bg-[position:calc(100%-20px)_50%,calc(100%-14px)_50%] bg-no-repeat px-3 py-3 pr-10 outline-0 max-sm:min-h-12"
            id="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          >
            <option value="">All</option>
            {colors.map((colorOption) => (
              <option value={colorOption} key={colorOption}>
                {colorOption}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-[18px] grid gap-2 max-sm:mt-3.5">
          <label className="text-sm font-extrabold uppercase text-muted" htmlFor="max-price">
            Max price
          </label>
          <input
            className="w-full rounded-2xl border border-border bg-surface-strong px-3 py-3 outline-0 max-sm:min-h-12"
            id="max-price"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            inputMode="numeric"
            placeholder="Example: 3000"
          />
        </div>

        <button
          className="mt-[18px] inline-flex min-h-11 w-full items-center justify-center rounded-full border border-border bg-surface px-5 font-heading font-bold text-text transition hover:-translate-y-px"
          type="button"
          onClick={() => {
            setQuery("");
            setCollection("");
            setCategory("");
            setSize("");
            setColor("");
            setMaxPrice("");
          }}
        >
          Clear filters
        </button>
      </aside>

      <section>
        <div className="mb-6 flex items-end justify-between gap-5 max-sm:grid max-sm:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
              {filteredProducts.length} products found
            </p>
            <h2 className="mt-2 font-heading text-[clamp(2rem,4vw,3.4rem)] font-black tracking-[-0.06em]">
              Catalog
            </h2>
          </div>
          {maxPrice ? <p className="text-muted">Showing up to {formatPrice(Number(maxPrice))}</p> : null}
        </div>

        {filteredProducts.length ? (
          <div className="grid grid-cols-3 gap-[22px] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-[18px]">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-border bg-surface p-6 max-sm:rounded-3xl max-sm:p-5">
            <h3 className="font-heading text-xl font-black">No products match those filters.</h3>
            <p className="mt-2 text-muted">Try clearing a filter or searching for a different colour, size, or category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
