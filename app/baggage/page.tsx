import type { Metadata } from "next";
import { BaggageClient } from "@/components/baggage-client";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your selected clothing and place a WhatsApp order."
};

export default function BaggagePage() {
  return (
    <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-[72px] max-sm:w-[min(100%-22px,1180px)] max-sm:py-10">
      <div className="mb-6 flex items-end justify-between gap-5 max-sm:grid max-sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Selected items</p>
          <h1 className="mt-2 font-heading text-4xl font-black tracking-[-0.04em]">Cart</h1>
        </div>
      </div>
      <BaggageClient />
    </section>
  );
}
