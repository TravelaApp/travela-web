import type { Metadata } from "next";
import type { County } from "@/data/counties";
import type { Destination } from "@/data/destinations";
import { CATEGORIES, primaryPhoto } from "@/data/destinations";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

/** Shown in sitemap `lastModified` until pages carry their own content dates. */
export const siteContentUpdated = new Date("2026-11-01T00:00:00.000Z");

export const defaultShareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Travela — the free Android travel app for Kenya and all 45 counties",
} as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function shareImageUrl(localOrRemote?: string): string | undefined {
  if (!localOrRemote) return undefined;
  return absoluteUrl(localOrRemote);
}

export function pageMetadata({
  path,
  title,
  description,
  image,
  imageAlt,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}): Metadata {
  const canonical = absoluteUrl(path);
  const ogUrl = image ? shareImageUrl(image) : absoluteUrl(defaultShareImage.url);
  const alt = imageAlt ?? title;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      type,
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630, alt }] : [defaultShareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogUrl ? [ogUrl] : [absoluteUrl(defaultShareImage.url)],
    },
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function destinationPlaceJsonLd(destination: Destination, county?: County) {
  const url = absoluteUrl(`/destinations/${destination.id}`);
  const image = shareImageUrl(primaryPhoto(destination));
  const categoryLabel = CATEGORIES[destination.category].label;

  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${url}#place`,
    name: destination.name,
    description: destination.summary,
    url,
    ...(image ? { image } : {}),
    touristType: categoryLabel,
    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
      ...(county ? { addressRegion: county.name } : {}),
    },
    ...(county
      ? {
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: `${county.name} County`,
            url: absoluteUrl(`/counties/${county.id}`),
          },
        }
      : {}),
    isPartOf: { "@id": `${siteUrl}/#website` },
  };
}

export function countyAreaJsonLd(county: County, placeCount: number) {
  const url = absoluteUrl(`/counties/${county.id}`);
  const image = shareImageUrl(county.photo);

  return {
    "@context": "https://schema.org",
    "@type": "AdministrativeArea",
    "@id": `${url}#county`,
    name: `${county.name} County`,
    description: `${county.name} in the ${county.region} region of Kenya. Capital ${county.capital}. ${county.knownFor}.`,
    url,
    ...(image ? { image } : {}),
    containedInPlace: {
      "@type": "Country",
      name: "Kenya",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Capital", value: county.capital },
      { "@type": "PropertyValue", name: "Region", value: county.region },
      { "@type": "PropertyValue", name: "Featured places on Travela", value: String(placeCount) },
    ],
  };
}

/** Merge nodes into one JSON-LD document (drops per-node `@context`). */
export function jsonLdGraph(...nodes: Record<string, unknown>[]) {
  if (nodes.length === 1) return nodes[0];
  const graph = nodes.map((node) => {
    const { ["@context"]: _drop, ...rest } = node;
    return rest;
  });
  return { "@context": "https://schema.org", "@graph": graph };
}