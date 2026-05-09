import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/sanity/products";

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 3);

  return (
    <>
      <section className="page-shell hero">
        <div>
          <p className="eyebrow">Menswear now, more collections soon</p>
          <h1>Clothing that feels sharp without trying too hard.</h1>
          <p>
            Browse current men&apos;s stock, save pieces to your wishlist, add
            the right size and colour to your baggage, and place your order
            through WhatsApp.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/products?collection=men">
              Shop men
            </Link>
            <Link className="button secondary" href="/products">
              View all products
            </Link>
          </div>
        </div>

        <aside className="hero-card" aria-label="Featured collection">
          <div className="hero-card-image" />
          <div className="hero-card-copy">
            <p className="eyebrow">New drops</p>
            <h2>Check out our latest collection.</h2>
          </div>
        </aside>
      </section>

      <section className="page-shell section">
        <div className="grid-heading">
          <div>
            <p className="eyebrow">Featured stock</p>
            <h2>Ready to shop</h2>
          </div>
          <Link className="button ghost" href="/products">
            Browse catalog
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
