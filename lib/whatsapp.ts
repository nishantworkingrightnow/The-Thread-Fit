import { formatPrice } from "@/lib/format";
import type { BaggageItem } from "@/lib/types";

export function createWhatsAppOrderUrl(items: BaggageItem[], phoneNumber?: string) {
  const configuredPhone = phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lines = [
    "Hi, I would like to order:",
    "",
    ...items.map(
      (item, index) =>
        `${index + 1}. ${item.title} - ${item.size}, ${item.color} x ${item.quantity} (${formatPrice(
          item.price * item.quantity
        )})`
    ),
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "Please confirm availability and delivery details."
  ];

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${configuredPhone}?text=${text}`;
}
