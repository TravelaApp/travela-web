import type { MetadataRoute } from "next";
import { COUNTIES } from "@/data/counties";
import { DESTINATIONS } from "@/data/destinations";
import { siteUrl } from "@/lib/site-url";

/** The fixed pages, in the order a visitor is most likely to need them. */
const PAGES: Array<{ path: string; priority: number }> = [
  { path: "", priority: 1 },
  { path: "/download", priority: 0.9 },
  { path: "/destinations", priority: 0.8 },
  { path: "/counties", priority: 0.8 },
  { path: "/features", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...PAGES.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: (path === "" || path === "/download" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority,
    })),
    ...COUNTIES.map((county) => ({
      url: `${siteUrl}/counties/${county.id}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...DESTINATIONS.map((destination) => ({
      url: `${siteUrl}/destinations/${destination.id}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
