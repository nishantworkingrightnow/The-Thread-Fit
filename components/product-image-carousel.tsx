"use client";

import { useMemo, useState } from "react";

type ProductImageCarouselProps = {
  title: string;
  images: string[];
};

export function ProductImageCarousel({ title, images }: ProductImageCarouselProps) {
  const uniqueImages = useMemo(
    () => Array.from(new Set(images.filter(Boolean))),
    [images]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = uniqueImages[activeIndex] || "/placeholder-product.svg";
  const hasMultipleImages = uniqueImages.length > 1;

  function goToPrevious() {
    setActiveIndex((index) => (index === 0 ? uniqueImages.length - 1 : index - 1));
  }

  function goToNext() {
    setActiveIndex((index) => (index === uniqueImages.length - 1 ? 0 : index + 1));
  }

  return (
    <div className="product-carousel">
      <div className="detail-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={activeImage} alt={`${title} image ${activeIndex + 1}`} />

        {hasMultipleImages ? (
          <div className="carousel-controls" aria-label="Product image carousel controls">
            <button type="button" onClick={goToPrevious} aria-label="Previous image">
              Prev
            </button>
            <span>
              {activeIndex + 1} / {uniqueImages.length}
            </span>
            <button type="button" onClick={goToNext} aria-label="Next image">
              Next
            </button>
          </div>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div className="carousel-thumbnails" aria-label="Product image thumbnails">
          {uniqueImages.map((image, index) => (
            <button
              className={activeIndex === index ? "active" : ""}
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
