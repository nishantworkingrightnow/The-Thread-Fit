"use client";

import { useMemo, useState } from "react";
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
    <div className="filters-layout">
      <button
        className="filter-toggle"
        type="button"
        aria-expanded={filtersOpen}
        onClick={() => setFiltersOpen((open) => !open)}
      >
        Filter options
        <span>{filtersOpen ? "Close" : "Open"}</span>
      </button>

      <aside className={`filters${filtersOpen ? " open" : ""}`}>
        <p className="eyebrow">Filter catalog</p>
        <div className="filter-group">
          <label htmlFor="catalog-search">Search</label>
          <input
            id="catalog-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Shirt, black, denim..."
          />
        </div>

        <div className="filter-group">
          <label htmlFor="collection">Collection</label>
          <select id="collection" value={collection} onChange={(event) => setCollection(event.target.value)}>
            <option value="">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">All</option>
            {categories.map((categoryOption) => (
              <option value={categoryOption} key={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="size">Size</label>
          <select id="size" value={size} onChange={(event) => setSize(event.target.value)}>
            <option value="">All</option>
            {sizes.map((sizeOption) => (
              <option value={sizeOption} key={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="color">Color</label>
          <select id="color" value={color} onChange={(event) => setColor(event.target.value)}>
            <option value="">All</option>
            {colors.map((colorOption) => (
              <option value={colorOption} key={colorOption}>
                {colorOption}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="max-price">Max price</label>
          <input
            id="max-price"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            inputMode="numeric"
            placeholder="Example: 3000"
          />
        </div>

        <button
          className="button ghost"
          type="button"
          style={{ marginTop: 18, width: "100%" }}
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
        <div className="grid-heading">
          <div>
            <p className="eyebrow">{filteredProducts.length} products found</p>
            <h2>Catalog</h2>
          </div>
          {maxPrice ? <p className="muted">Showing up to {formatPrice(Number(maxPrice))}</p> : null}
        </div>

        {filteredProducts.length ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No products match those filters.</h3>
            <p className="muted">Try clearing a filter or searching for a different colour, size, or category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
