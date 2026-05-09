import { fallbackProducts } from "@/lib/fallback-products";
import { hasSanityConfig, sanityClient } from "@/lib/sanity/client";
import { productBySlugQuery, productsQuery } from "@/lib/sanity/queries";
import type { Product } from "@/lib/types";

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    slug: product.slug || product._id,
    image: product.image || "/placeholder-product.svg",
    images: product.images?.length ? product.images : [product.image || "/placeholder-product.svg"],
    sizes: product.sizes || [],
    colors: product.colors || [],
    collection: product.collection || "men",
    inStock: product.inStock ?? true
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!hasSanityConfig) {
    return fallbackProducts;
  }

  try {
    const products = await sanityClient.fetch<Product[]>(productsQuery, {}, { next: { revalidate: 60 } });
    return products.length ? products.map(normalizeProduct) : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const fallbackProduct = fallbackProducts.find((product) => product.slug === slug) || null;

  if (!hasSanityConfig) {
    return fallbackProduct;
  }

  try {
    const product = await sanityClient.fetch<Product | null>(
      productBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );
    return product ? normalizeProduct(product) : fallbackProduct;
  } catch {
    return fallbackProduct;
  }
}
