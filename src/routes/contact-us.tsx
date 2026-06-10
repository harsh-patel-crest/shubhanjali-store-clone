import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — Shubhanjali" },
      {
        name: "description",
        content:
          "Get in touch with Shubhanjali. Email info@shubhanjalistore.com, call +91 98190 10536, or visit our showroom in Mumbai.",
      },
      { property: "og:title", content: "Contact Us — Shubhanjali" },
      { property: "og:url", content: "/contact-us" },
    ],
    links: [{ rel: "canonical", href: "/contact-us" }],
  }),
  component: ContactPage,
});

const details = [
  { icon: Mail, label: "Email", value: "info@shubhanjalistore.com", href: "mailto:info@shubhanjalistore.com" },
  { icon: Phone, label: "Phone / WhatsApp", value: "+91 98190 10536", href: "tel:+919819010536" },
  { icon: MapPin, label: "Showroom", value: "Mumbai, India", href: undefined },
];

function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" crumb="Contact Us" subtitle="We'd love to hear from you." />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 lg:grid-cols-2">
        <div className="space-y-6">
          {details.map((d) => (
            <div key={d.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <d.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{d.label}</p>
                {d.href ? (
                  <a href={d.href} className="text-foreground hover:text-primary">{d.value}</a>
                ) : (
                  <p className="text-foreground">{d.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground">Send us a message</h2>
          <ContactForm />
        </div>
      </div>
    </>
  );
}