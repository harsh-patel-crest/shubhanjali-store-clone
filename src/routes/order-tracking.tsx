import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/PageBanner";

export const Route = createFileRoute("/order-tracking")({
  head: () => ({
    meta: [
      { title: "Order Tracking — Shubhanjali" },
      {
        name: "description",
        content:
          "Track your Shubhanjali order. Enter your Order ID and billing email to check your order status.",
      },
      { property: "og:title", content: "Order Tracking — Shubhanjali" },
      { property: "og:url", content: "/order-tracking" },
    ],
    links: [{ rel: "canonical", href: "/order-tracking" }],
  }),
  component: OrderTrackingPage,
});

function OrderTrackingPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageBanner title="Order Tracking" crumb="Order Tracking" />
      <div className="mx-auto max-w-xl px-4 py-12">
        <p className="text-center text-muted-foreground">
          To track your order please enter your Order ID in the box below and press the "Track"
          button. This was given to you on your receipt and in the confirmation email you should have
          received.
        </p>
        <form
          className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div>
            <label htmlFor="orderId" className="mb-1 block text-sm font-medium text-foreground">
              Order ID
            </label>
            <input
              id="orderId"
              required
              placeholder="Found in your order confirmation email"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="billingEmail" className="mb-1 block text-sm font-medium text-foreground">
              Billing email
            </label>
            <input
              id="billingEmail"
              type="email"
              required
              placeholder="Email you used during checkout"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Track
          </button>
        </form>
        {submitted && (
          <div className="mt-6 rounded-xl bg-muted p-5 text-center text-sm text-muted-foreground">
            We couldn't find live tracking details in this demo. For order status, please email{" "}
            <a href="mailto:info@shubhanjalistore.com" className="text-primary underline">
              info@shubhanjalistore.com
            </a>{" "}
            or WhatsApp +91 98190 10536.
          </div>
        )}
      </div>
    </>
  );
}