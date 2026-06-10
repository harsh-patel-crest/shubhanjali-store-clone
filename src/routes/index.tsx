import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Sparkles, Gem, Truck, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-bracelets.jpg";
import crystalsImg from "@/assets/crystals-collection.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shubhanjali — Healing Crystals, Bracelets & Spiritual Decor" },
      {
        name: "description",
        content:
          "Shop authentic healing crystals, gemstone bracelets, gem trees, pyramids and spiritual decor. Affordable, handpicked products with nationwide delivery.",
      },
      { property: "og:title", content: "Shubhanjali — Healing Crystals & Spiritual Store" },
      {
        property: "og:description",
        content: "Authentic handpicked healing crystals, bracelets and spiritual decor.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const categories = [
  { label: "Bracelets", desc: "Absorb the energy of crystals", to: "/customized-bracelet" },
  { label: "Gem Trees", desc: "Bring positivity into your home", to: "/shop" },
  { label: "Healing Crystals", desc: "Authentic natural stones", to: "/shop" },
  { label: "Spheres & Pyramids", desc: "Balance your space", to: "/shop" },
];

const features = [
  { icon: Gem, title: "100% Authentic", desc: "Handpicked, high-energy natural crystals & stones." },
  { icon: Truck, title: "Nationwide Delivery", desc: "Carefully packaged and shipped across India & globally." },
  { icon: Sparkles, title: "Customizable", desc: "Design your own crystal bracelet to match your intention." },
  { icon: ShieldCheck, title: "Secure Shopping", desc: "Safe payments and complete privacy of your details." },
];

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-peach">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:py-20">
          <div className="text-center lg:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Spiritual & Holistic Healing
            </p>
            <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Bracelets
            </h1>
            <p className="mt-4 text-xl text-foreground/80">
              The best way to absorb the energy of crystals.
            </p>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground lg:mx-0">
              Discover authentic healing crystals, gemstone bracelets and spiritual decor —
              handpicked and crafted with care.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                to="/customized-bracelet"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Create Your Bracelet
              </Link>
              <Link
                to="/about-us"
                className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                Our Story
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img
              src={heroImg}
              alt="Stacked natural healing crystal bracelets on a wrist"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-peach-soft p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">On your first order</p>
            <p className="mt-2 text-3xl font-bold text-foreground">₹50 OFF</p>
            <p className="mt-1 text-muted-foreground">Use code <strong>FIRST50</strong> — bring positivity & good energy home.</p>
          </div>
          <div className="rounded-2xl bg-muted p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Limited time offer</p>
            <p className="mt-2 text-3xl font-bold text-foreground">10% – 20% OFF</p>
            <p className="mt-1 text-muted-foreground">On your favourite healing crystals.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">Shop by Category</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className="group rounded-2xl border border-border bg-card p-6 text-center transition hover:border-primary hover:shadow-md"
            >
              <span className="font-heading text-lg font-semibold text-foreground group-hover:text-primary">
                {c.label}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature image + text */}
      <section className="mx-auto mt-8 grid max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl">
          <img
            src={crystalsImg}
            alt="Collection of healing crystals, gem tree and spiritual decor"
            width={1200}
            height={800}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Authentic Healing Crystals & Spiritual Decor
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            From Reiki products and crystals to gem trees, angels, yantras, pyramids and jap malas,
            Shubhanjali offers an endless line of affordable spiritual products. Every item is
            authentic, handpicked and can be customized to your needs.
          </p>
          <Link
            to="/about-us"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <f.icon size={22} />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
