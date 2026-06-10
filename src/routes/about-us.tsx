import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/PageBanner";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — Shubhanjali" },
      {
        name: "description",
        content:
          "Learn about Shubhanjali, a one-stop destination for affordable spiritual & holistic healing products, founded by Priyanka Gupta in 2019.",
      },
      { property: "og:title", content: "About Us — Shubhanjali" },
      { property: "og:description", content: "The story of Shubhanjali and what we do." },
      { property: "og:url", content: "/about-us" },
    ],
    links: [{ rel: "canonical", href: "/about-us" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" crumb="About Us" />
      <article className="prose-policy mx-auto max-w-3xl px-4 py-12">
        <h4>Here's a Little Bit About WHAT WE DO</h4>
        <p>
          Shubhanjali is a one-stop destination for all your affordable Spiritual & Holistic
          Healing requirements. Our endless product line includes everything from Reiki products,
          Crystals, Healing stone accessories, Gem Trees, Angels, Yantras, Pyramids, Jap Malas,
          precious/semi-precious items and much more.
        </p>
        <h4>Here's the story of HOW WE BEGAN</h4>
        <p>
          Our Director and founder, Priyanka Gupta, a woman of substance, had always envisioned a
          dream of marking her footsteps in an industry that is highly unorganized — Healing
          Crystals and Stones.
        </p>
        <p>
          Carrying this vision forward, she embarked on the journey of Shubhanjali back in 2019. To
          a homemaker and a doting mother of a three-year-old, the idea of Shubhanjali took birth
          under the guidance of her supportive father-in-law, Dr. Prem Gupta. Since then there has
          been no looking back!
        </p>
        <p>
          The brand was born with a desire to bring knowledge about alternative healing and the use
          of transformation tools. Shubhanjali is committed to providing authentic handpicked
          products that can be customized as per your requirements. We are constantly adding more
          and more products every day.
        </p>
        <p>
          Spanning over 5000 sq. ft, Shubhanjali boasts of being the sole showroom in Mumbai with
          over a thousand healing products and accessories on display. The best part? You get to
          touch and feel the products before making a purchase!
        </p>
        <h4>A bit ABOUT PRIYANKA GUPTA</h4>
        <p>
          Priyanka, who has been the core representative of the brand, works with utmost dedication
          to educate people about crystal therapy and healing. She says, "We have given weightage
          and respect to crystals by providing high energy authentic stones and crystals at
          reasonable prices. We are fully dedicated to providing you authentic products that assist
          you in alternative healing, spiritual awakening, corporate gifting, and much more. We also
          participate in various exhibitions and workshops on spiritual items to bring them close to
          people."
        </p>
        <p>We are certain that this is just the start!</p>
        <h4>How you can MAKE A PURCHASE</h4>
        <p>
          If you wish to see something that is not here, please write to us at{" "}
          <a href="mailto:info@shubhanjalistore.com" className="text-primary underline">
            info@shubhanjalistore.com
          </a>
          . Still have questions? You can drop into our Showroom.
        </p>
      </article>
    </>
  );
}