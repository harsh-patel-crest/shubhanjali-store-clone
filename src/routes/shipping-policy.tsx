import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/PageBanner";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy — Shubhanjali" },
      {
        name: "description",
        content:
          "Shubhanjali shipping policy: nationwide and global delivery via reputed courier services, shipped within 3-7 working days.",
      },
      { property: "og:title", content: "Shipping Policy — Shubhanjali" },
      { property: "og:url", content: "/shipping-policy" },
    ],
    links: [{ rel: "canonical", href: "/shipping-policy" }],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <>
      <PageBanner title="Shipping Policy" crumb="Shipping Policy" />
      <article className="prose-policy mx-auto max-w-3xl px-4 py-12">
        <p>All products are carefully packaged as we deliver products nationally and globally.</p>
        <p>
          Shubhanjali sends all packages via reputed courier services such as Fedex, Delhivery, Blue
          Dart, First Flight, India Post etc.
        </p>
        <p>Shipping charges would be applicable depending upon the location the order has been placed from.</p>
        <p>Once an order is placed, the product would be shipped within 3-7 working days.</p>
      </article>
    </>
  );
}