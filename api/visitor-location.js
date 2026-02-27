const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

const cache = new Map();

export default function handler(req, res) {
  const forwarded = req.headers["x-forwarded-for"] || "";
  const ip = (typeof forwarded === "string" ? forwarded.split(",")[0] : "").trim() || "unknown";

  const cached = cache.get(ip);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=600");
    return res.status(200).json({ greeting: cached.greeting });
  }

  const rawCity = req.headers["x-vercel-ip-city"] || "";
  const rawRegion = req.headers["x-vercel-ip-country-region"] || "";
  const rawCountry = req.headers["x-vercel-ip-country"] || "";

  const city = rawCity ? decodeURIComponent(rawCity) : "";
  const region = rawRegion ? decodeURIComponent(rawRegion) : "";
  const country = rawCountry ? decodeURIComponent(rawCountry) : "";

  const parts = [city, region, country].filter(Boolean);
  const greeting = parts.join(", ");

  cache.set(ip, { greeting, ts: Date.now() });

  // Evict stale entries periodically
  if (cache.size > 10000) {
    const now = Date.now();
    for (const [key, value] of cache) {
      if (now - value.ts > CACHE_TTL_MS) cache.delete(key);
    }
  }

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=600");
  return res.status(200).json({ greeting });
}
