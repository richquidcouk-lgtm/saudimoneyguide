import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.saudimoneyguide.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search and user-directed retrieval; wildcard access was already allowed.
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User"],
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
