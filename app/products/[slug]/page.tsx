import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    <section className="page-shell detail-layout">
      <div className="detail-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.title} />
      </div>

      <div className="detail-copy">
        <p className="eyebrow">
          {product.collection} / {product.category}
        </p>
        <h1>{product.title}</h1>
        <p className="price">{formatPrice(product.price)}</p>
        <p>{product.description}</p>
        <div className="chips">
          <span className="chip">{product.inStock ? "In stock" : "Out of stock"}</span>
          {product.colors.map((color) => (
            <span className="chip" key={color}>
              {color}
            </span>
          ))}
        </div>
        <ProductActions product={product} />
      </div>
    </section>
  );
}
