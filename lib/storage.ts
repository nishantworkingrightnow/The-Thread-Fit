"use client";

import type { BaggageItem } from "@/lib/types";

export const WISHLIST_KEY = "p1:wishlist";
export const BAGGAGE_KEY = "p1:baggage";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("p1-storage"));
}

export function readWishlist() {
  return readJson<string[]>(WISHLIST_KEY, []);
}

export function writeWishlist(productIds: string[]) {
  writeJson(WISHLIST_KEY, productIds);
}

export function readBaggage() {
  return readJson<BaggageItem[]>(BAGGAGE_KEY, []);
}

export function writeBaggage(items: BaggageItem[]) {
  writeJson(BAGGAGE_KEY, items);
}
