export const productsQuery = `*[_type == "product"] | order(featured desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  price,
  "image": images[0].asset->url,
  "images": images[].asset->url,
  sizes,
  colors,
  category,
  collection,
  inStock,
  featured,
  "createdAt": _createdAt
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  price,
  "image": images[0].asset->url,
  "images": images[].asset->url,
  sizes,
  colors,
  category,
  collection,
  inStock,
  featured,
  "createdAt": _createdAt
}`;
