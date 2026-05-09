export type Collection = "men" | "women" | "unisex";

export type Product = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  sizes: string[];
  colors: string[];
  category: string;
  collection: Collection;
  inStock: boolean;
  featured?: boolean;
  createdAt?: string;
};

export type BaggageItem = {
  id: string;
  productId: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};
