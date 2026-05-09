import type { Metadata } from "next";
import { BaggageClient } from "@/components/baggage-client";

export const metadata: Metadata = {
  title: "Baggage",
  description: "Review your selected clothing and place a WhatsApp order."
};

export default function BaggagePage() {
  return (
    <section className="page-shell section">
      <div className="grid-heading">
        <div>
          <p className="eyebrow">Selected items</p>
          <h1>Baggage</h1>
        </div>
      </div>
      <BaggageClient />
    </section>
  );
}
