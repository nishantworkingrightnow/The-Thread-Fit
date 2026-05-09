import type { Metadata } from "next";
import { CatalogClient } from "@/components/catalog-client";
import { getProducts } from "@/lib/sanity/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Search and filter clothing by size, colour, collection, category, and price."
};

type ProductsPageProps = {
  searchParams?: Promise<{
    query?: string;
    collection?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const products = await getProducts();

  return (
    <section className="page-shell section">
      <div className="grid-heading">
        <div>
          <p className="eyebrow">Shop the store</p>
          <h1>Find the right fit</h1>
        </div>
      </div>
      <CatalogClient
        products={products}
        initialQuery={params?.query || ""}
        initialCollection={params?.collection || ""}
      />
    </section>
  );
}
