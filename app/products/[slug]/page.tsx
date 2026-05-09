import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { ProductActions } from "@/components/product-actions";
import { formatPrice } from "@/lib/format";
import { getProductBySlug, getProducts } from "@/lib/sanity/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found"
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto grid w-[min(1180px,calc(100%-32px))] grid-cols-[minmax(280px,0.9fr)_minmax(0,1fr)] items-start gap-10 py-12 pb-20 max-lg:grid-cols-1 max-sm:w-[min(100%-22px,1180px)] max-sm:gap-6 max-sm:py-7 max-sm:pb-12">
      <ProductImageCarousel title={product.title} images={product.images || [product.image]} />

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
          {product.collection} / {product.category}
        </p>
        <h1 className="my-2.5 font-heading text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-[0.95] tracking-[-0.07em] max-sm:text-[clamp(2.3rem,13vw,3.8rem)]">
          {product.title}
        </h1>
        <p className="my-3.5 font-heading text-[clamp(1.45rem,3vw,2rem)] font-black leading-none text-text">
          {formatPrice(product.price)}
        </p>
        <p className="leading-7 text-muted">{product.description}</p>
        <div className="mt-3.5 flex flex-wrap gap-2">
          <span className="rounded-full border border-border bg-white/55 px-2.5 py-1.5 text-sm font-bold text-muted">
            {product.inStock ? "In stock" : "Out of stock"}
          </span>
          {product.colors.map((color) => (
            <span
              className="rounded-full border border-border bg-white/55 px-2.5 py-1.5 text-sm font-bold text-muted"
              key={color}
            >
              {color}
            </span>
          ))}
        </div>
        <ProductActions product={product} />
      </div>
    </section>
  );
}
