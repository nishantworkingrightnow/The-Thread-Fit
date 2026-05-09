"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";
import { readBaggage, writeBaggage } from "@/lib/storage";
import { createWhatsAppOrderUrl } from "@/lib/whatsapp";
import type { BaggageItem } from "@/lib/types";

export function BaggageClient() {
  const [items, setItems] = useState<BaggageItem[]>([]);

  useEffect(() => {
    setItems(readBaggage());
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  function updateItems(nextItems: BaggageItem[]) {
    setItems(nextItems);
    writeBaggage(nextItems);
  }

  function updateQuantity(id: string, quantity: number) {
    const nextQuantity = Math.max(1, quantity);
    updateItems(items.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item)));
  }

  function removeItem(id: string) {
    updateItems(items.filter((item) => item.id !== id));
  }

  if (!items.length) {
    return (
      <div className="rounded-[28px] border border-border bg-surface p-6 max-sm:rounded-3xl max-sm:p-5">
        <h2 className="font-heading text-2xl font-black">Your cart is empty.</h2>
        <p className="mt-3 text-muted">Add clothing with your preferred size and colour before placing an order.</p>
        <Link
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-text bg-text px-5 font-heading font-bold text-white transition hover:-translate-y-px"
          href="/products"
        >
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(320px,400px)] items-start gap-6 max-lg:grid-cols-1">
      <div className="grid gap-4">
        {items.map((item) => (
          <article
            className="grid grid-cols-[116px_minmax(0,1fr)_auto] items-center gap-[18px] rounded-[28px] border border-border bg-surface p-[18px] max-sm:grid-cols-[88px_minmax(0,1fr)] max-sm:items-start max-sm:gap-3.5 max-sm:rounded-3xl max-sm:p-3.5"
            key={item.id}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-36 w-[116px] rounded-[20px] object-cover max-sm:h-28 max-sm:w-[88px]" src={item.image} alt={item.title} />
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                {item.size} / {item.color}
              </p>
              <h3 className="my-1.5 font-heading text-[clamp(1.2rem,2vw,1.55rem)] font-black leading-tight [overflow-wrap:anywhere]">
                <Link href={`/products/${item.slug}`}>{item.title}</Link>
              </h3>
              <p className="mb-3.5 text-muted">{formatPrice(item.price)} each</p>
              <button
                className="rounded-full border border-border bg-surface-strong px-3 py-2 font-heading font-extrabold text-danger"
                type="button"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
            <div
              className="inline-flex items-center justify-center gap-2.5 max-sm:col-span-full max-sm:justify-start"
              aria-label={`Quantity for ${item.title}`}
            >
              <button
                className="rounded-full border border-border bg-surface-strong px-3 py-2 font-heading font-extrabold"
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <strong>{item.quantity}</strong>
              <button
                className="rounded-full border border-border bg-surface-strong px-3 py-2 font-heading font-extrabold"
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="sticky top-24 grid gap-3.5 rounded-[28px] border border-border bg-surface p-6 max-lg:static max-sm:rounded-3xl max-sm:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Order summary</p>
        <div className="flex justify-between font-extrabold">
          <span>Items</span>
          <span>{items.reduce((count, item) => count + item.quantity, 0)}</span>
        </div>
        <div className="flex justify-between font-extrabold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-text bg-text px-5 font-heading font-bold text-white transition hover:-translate-y-px"
          href={createWhatsAppOrderUrl(items)}
          target="_blank"
          rel="noreferrer"
        >
          Order on WhatsApp
        </a>
        <p className="text-muted">
          The WhatsApp message includes product names, selected sizes, colours, quantities, and total.
        </p>
      </aside>
    </div>
  );
}
