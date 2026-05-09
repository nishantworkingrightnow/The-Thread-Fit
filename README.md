# The Thread Fit Store

A Next.js clothing store SPA backed by Sanity CMS. The first version is focused on
men's stock, while the product schema already supports women's and unisex
collections for future inventory.

## Features

- Sanity-powered product management with image uploads.
- Product catalog with search and filters for collection, category, size, colour,
  and max price.
- Product detail pages with size and colour selection.
- Wishlist and baggage/cart saved in the browser.
- WhatsApp order flow with a prefilled item summary.
- Responsive storefront with launch-ready metadata and empty/loading states.

## Getting Started

Install dependencies:

```bash
npm install
```

Copy the environment template:

```bash
cp .env.example .env.local
```

Fill in:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

Run the storefront:

```bash
npm run dev
```

Run Sanity Studio for product uploads:

```bash
npm run sanity
```

## Product CMS Fields

Products in Sanity include:

- title, slug, description, and price
- product images
- sizes and colours
- category
- collection: men, women, or unisex
- in-stock status
- featured flag for homepage placement

## Deployment Notes

Deploy the Next.js app to Vercel or another Next-compatible host. Add the same
environment variables in the hosting dashboard. The storefront falls back to
sample products if Sanity environment variables are not configured, which is
useful during early development.
