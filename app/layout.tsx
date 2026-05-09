import type { Metadata } from "next";
import { Hanken_Grotesk, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { RouteProgress } from "@/components/route-progress";
import { getProducts } from "@/lib/sanity/products";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "The Thread Fit",
    template: "%s | The Thread Fit",
  },
  description:
    "A curated clothing store for everyday menswear and upcoming collections.",
  openGraph: {
    title: "The Thread Fit",
    description: "Shop menswear now, with more collections coming soon.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getProducts();
  const validProductIds = products.map((product) => product._id);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${hankenGrotesk.variable} ${spaceGrotesk.variable}`}>
        <Suspense fallback={null}>
          <RouteProgress />
        </Suspense>
        <Header validProductIds={validProductIds} />
        <main>{children}</main>
      </body>
    </html>
  );
}
