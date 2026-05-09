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
    <div className="grid gap-3.5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] border border-border bg-accent-soft max-sm:rounded-[26px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-full w-full object-cover" src={activeImage} alt={`${title} image ${activeIndex + 1}`} />

        {hasMultipleImages ? (
          <div
            className="absolute inset-x-[18px] bottom-[18px] flex items-center justify-between gap-3 rounded-full border border-background/30 bg-text/80 p-2 text-background backdrop-blur-md max-sm:inset-x-3 max-sm:bottom-3"
            aria-label="Product image carousel controls"
          >
            <button
              className="rounded-full border-0 bg-background px-3 py-2 font-heading font-black text-text"
              type="button"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              Prev
            </button>
            <span className="font-heading font-black">
              {activeIndex + 1} / {uniqueImages.length}
            </span>
            <button
              className="rounded-full border-0 bg-background px-3 py-2 font-heading font-black text-text"
              type="button"
              onClick={goToNext}
              aria-label="Next image"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div className="grid grid-cols-4 gap-2.5" aria-label="Product image thumbnails">
          {uniqueImages.map((image, index) => (
            <button
              className={`aspect-square overflow-hidden rounded-[18px] border-2 bg-accent-soft p-0 ${
                activeIndex === index ? "border-text" : "border-transparent"
              }`}
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="h-full w-full object-cover" src={image} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
