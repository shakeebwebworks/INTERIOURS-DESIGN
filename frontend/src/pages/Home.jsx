import "../styles/sections.css";

import About from "../components/sections/About.jsx";
import ContactSection from "../components/sections/ContactSection.jsx";
import FeaturedProjects from "../components/sections/FeaturedProjects.jsx";
import Hero from "../components/sections/Hero.jsx";
import Process from "../components/sections/Process.jsx";
import Services from "../components/sections/Services.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import WhyChooseUs from "../components/sections/WhyChooseUs.jsx";
import { useSiteSettings } from "../context/SiteSettingsContext.jsx";
import { FOOTER_SERVICES } from "../utils/navLinks.js";
import { SITE_NAME, SITE_URL, useSeo } from "../utils/seo.js";

function absoluteUrl(url) {
  return /^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

// Structured data. This is a fictional demo, so phone, address and ratings are intentionally left out.
// For a real client, add their real telephone, address and opening hours here.
// Never add review or rating markup for sample testimonials.
function buildSeo(heroImage) {
  const image = absoluteUrl(heroImage);
  return {
    title: "Interior Design & Home Renovation | Haven & Hue (Demo)",
    description:
      "Demo website for Haven & Hue Interiors, a fictional studio offering interior design, home renovation, modular kitchens and space planning.",
    path: "/",
    image,
    jsonLd: [
      { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/` },
      {
        "@type": "HomeAndConstructionBusiness",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        image,
        description:
          "Fictional interior design and home renovation studio created for portfolio demonstration.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Interior design and renovation services",
          itemListElement: FOOTER_SERVICES.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
    ],
  };
}

export default function Home() {
  const { settings, loaded } = useSiteSettings();
  useSeo(loaded ? buildSeo(settings.hero_image) : null);

  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <Process />
      <About />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
    </>
  );
}