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
      <div className="empty-state">
        <h2>Your baggage is empty.</h2>
        <p className="muted">Add clothing with your preferred size and colour before placing an order.</p>
        <Link className="button" href="/products">
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <div className="baggage-layout">
      <div className="list-stack">
        {items.map((item) => (
          <article className="bag-item" key={item.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.title} />
            <div className="bag-item-info">
              <p className="eyebrow">
                {item.size} / {item.color}
              </p>
              <h3>
                <Link href={`/products/${item.slug}`}>{item.title}</Link>
              </h3>
              <p className="muted">{formatPrice(item.price)} each</p>
              <button className="text-button danger" type="button" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
            <div className="quantity" aria-label={`Quantity for ${item.title}`}>
              <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <strong>{item.quantity}</strong>
              <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="panel summary">
        <p className="eyebrow">Order summary</p>
        <div className="summary-row">
          <span>Items</span>
          <span>{items.reduce((count, item) => count + item.quantity, 0)}</span>
        </div>
        <div className="summary-row">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <a className="button" href={createWhatsAppOrderUrl(items)} target="_blank" rel="noreferrer">
          Order on WhatsApp
        </a>
        <p className="muted">
          The WhatsApp message includes product names, selected sizes, colours, quantities, and total.
        </p>
      </aside>
    </div>
  );
}
