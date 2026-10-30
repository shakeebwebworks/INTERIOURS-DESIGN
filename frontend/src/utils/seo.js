import { useEffect } from "react";

export const SITE_NAME = "Haven & Hue Interiors";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");
export const DEFAULT_IMAGE = `${SITE_URL}/images/hero.jpg`;

const JSON_LD_ID = "page-structured-data";

// Shortens text for meta descriptions without cutting a word in half.
export function truncate(text = "", max = 155) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}\u2026`;
}

function upsertMeta(attr, key, content) {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Sets the title, description, canonical URL, social tags and structured data for a page.
 * Pass null while data is still loading to leave the current tags untouched.
 *
 * config: { title, description, path, image, type, noindex, jsonLd }
 *   jsonLd is an array of schema.org nodes (the @context is added for you).
 */
export function useSeo(config) {
  const key = JSON.stringify(config || null);

  useEffect(() => {
    const settings = JSON.parse(key);
    if (!settings) return undefined;

    const {
      title,
      description,
      path = "/",
      image = DEFAULT_IMAGE,
      type = "website",
      noindex = false,
      jsonLd,
    } = settings;
    const url = `${SITE_URL}${path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setCanonical(noindex ? null : url);

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", `${SITE_NAME} (Demo)`);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    document.getElementById(JSON_LD_ID)?.remove();
    if (jsonLd && jsonLd.length > 0) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSON_LD_ID;
      script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd });
      document.head.appendChild(script);
    }

    return () => document.getElementById(JSON_LD_ID)?.remove();
  }, [key]);
}