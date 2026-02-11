const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

const cache = new Map();

function normalizeUsername(value) {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value) && typeof value[0] === "string") return value[0].trim();
  return "";
}

function isValidLeetCodeUsername(username) {
  return /^[a-zA-Z0-9_-]{1,30}$/.test(username);
}

export default async function handler(req, res) {
  const requested = normalizeUsername(req.query?.username);
  const username = requested || process.env.LEETCODE_USERNAME || "";

  if (!username || !isValidLeetCodeUsername(username)) {
    return res.status(400).json({
      error: "Invalid LeetCode username",
      message: "Provide a valid username in query param ?username=...",
    });
  }

  const key = username.toLowerCase();
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return res.status(200).json({ ...cached.data, cached: true });
  }

  try {
    const response = await fetch(`https://leetcode-stats.tashif.codes/${username}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch LeetCode stats: ${response.statusText}`);
    }

    const data = await response.json();

    const stats = {
      easySolved: data.easySolved,
      hardSolved: data.hardSolved,
      mediumSolved: data.mediumSolved,
      totalSolved: data.totalSolved,
      submissionCalendar: data.submissionCalendar,
    };

    cache.set(key, {
      data: stats,
      timestamp: Date.now(),
    });

    return res.status(200).json({ ...stats, cached: false });
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);

    if (cached) {
      return res.status(200).json({
        ...cached.data,
        cached: true,
        warning: "API error, showing cached data",
      });
    }

    return res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
