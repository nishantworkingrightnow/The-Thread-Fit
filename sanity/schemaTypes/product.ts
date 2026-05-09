import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().positive()
    }),
    defineField({
      name: "images",
      title: "Product images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true
          }
        }
      ],
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      },
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      },
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets", "Accessories"]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "string",
      initialValue: "men",
      options: {
        list: [
          { title: "Men", value: "men" },
          { title: "Women", value: "women" },
          { title: "Unisex", value: "unisex" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "inStock",
      title: "In stock",
      type: "boolean",
      initialValue: true
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "images.0"
    }
  }
});
