import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "./Logo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/customized-bracelet", label: "Custom Bracelet" },
  { to: "/bulk-order", label: "Bulk Order" },
  { to: "/about-us", label: "About Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact-us", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-primary text-primary-foreground text-center text-xs sm:text-sm py-2 px-4">
        <strong>Free Shipping</strong> on orders over ₹2000 (Prepaid) · Use{" "}
        <strong>FIRST50</strong> for ₹50 off your first order
      </div>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Logo />

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-foreground/80">
            <button aria-label="Search" className="hover:text-primary"><Search size={20} /></button>
            <Link to="/order-tracking" aria-label="Account" className="hover:text-primary"><User size={20} /></Link>
            <button aria-label="Cart" className="relative hover:text-primary">
              <ShoppingBag size={20} />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                0
              </span>
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden border-t border-border bg-background px-4 py-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}