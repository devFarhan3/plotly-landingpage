import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://plotly.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-11-26"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: new Date("2026-11-26"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
