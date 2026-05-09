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
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-[72px] max-sm:w-[min(100%-22px,1180px)] max-sm:py-10">
      <div className="mb-6 flex items-end justify-between gap-5 max-sm:grid max-sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Shop the store</p>
          <h1 className="mt-2 font-heading text-4xl font-black tracking-[-0.04em]">Find the right fit</h1>
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
