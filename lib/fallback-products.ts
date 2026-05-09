import type { Product } from "@/lib/types";

export const fallbackProducts: Product[] = [
  {
    _id: "sample-overshirt",
    title: "Textured Resort Overshirt",
    slug: "textured-resort-overshirt",
    description:
      "A relaxed layer with a soft textured hand-feel, made for warm evenings and weekend plans.",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Black"],
    category: "Shirts",
    collection: "men",
    inStock: true,
    featured: true
  },
  {
    _id: "sample-denim",
    title: "Straight Fit Denim",
    slug: "straight-fit-denim",
    description:
      "Everyday straight-fit denim with a balanced rise and a clean wash that pairs with everything.",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue", "Charcoal"],
    category: "Jeans",
    collection: "men",
    inStock: true,
    featured: true
  },
  {
    _id: "sample-tee",
    title: "Essential Heavy Tee",
    slug: "essential-heavy-tee",
    description:
      "A heavyweight cotton tee with a structured drape, built for repeat wear through the week.",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Olive", "Black"],
    category: "T-Shirts",
    collection: "men",
    inStock: true,
    featured: true
  },
  {
    _id: "sample-jacket",
    title: "Utility Zip Jacket",
    slug: "utility-zip-jacket",
    description:
      "A lightweight utility jacket with roomy pockets and a clean profile for travel and daily wear.",
    price: 3799,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    sizes: ["M", "L", "XL"],
    colors: ["Tan", "Navy"],
    category: "Jackets",
    collection: "men",
    inStock: true
  }
];
