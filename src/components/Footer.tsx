import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const policyLinks = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-conditions", label: "Terms & Conditions" },
  { to: "/returns-refund-policy", label: "Returns & Refund Policy" },
  { to: "/shipping-policy", label: "Shipping Policy" },
] as const;

const quickLinks = [
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/order-tracking", label: "Order Tracking" },
  { to: "/bulk-order", label: "Bulk Order" },
  { to: "/customized-bracelet", label: "Custom Bracelet" },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Your one-stop destination for affordable spiritual & holistic healing
            products — authentic crystals, bracelets, gem trees and more.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
            Policies
          </h4>
          <ul className="space-y-2 text-sm">
            {policyLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
            Get in Touch
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 text-primary" />
              <a href="mailto:info@shubhanjalistore.com" className="hover:text-primary">
                info@shubhanjalistore.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 text-primary" />
              <a href="tel:+919819010536" className="hover:text-primary">
                +91 98190 10536
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-primary" />
              <span>Showroom in Mumbai, India</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Shubhanjali. All rights reserved.
      </div>
    </footer>
  );
}