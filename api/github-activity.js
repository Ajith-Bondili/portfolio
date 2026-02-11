const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

const cache = new Map();

function normalizeUsername(value) {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value) && typeof value[0] === "string") return value[0].trim();
  return "";
}

function isValidGithubUsername(username) {
  return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username);
}

function parseContributionCount(text) {
  if (/No contributions/i.test(text)) return 0;
  const match = text.match(/(\d[\d,]*)\s+contributions?/i);
  if (!match) return 0;
  return Number.parseInt(match[1].replace(/,/g, ""), 10) || 0;
}

function toUtcDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`);
}

function dayDiff(a, b) {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

function calculateStreaks(days) {
  if (days.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));

  let longestStreak = 0;
  let running = 0;
  let previousActiveDate = null;

  for (const day of sorted) {
    if (day.count <= 0) {
      running = 0;
      previousActiveDate = null;
      continue;
    }

    const currentDate = toUtcDate(day.date);
    if (previousActiveDate && dayDiff(currentDate, previousActiveDate) === 1) {
      running += 1;
    } else {
      running = 1;
    }

    previousActiveDate = currentDate;
    if (running > longestStreak) longestStreak = running;
  }

  let currentStreak = 0;
  const lastDay = sorted[sorted.length - 1];

  if (lastDay.count > 0) {
    currentStreak = 1;
    let expectedDate = toUtcDate(lastDay.date);

    for (let i = sorted.length - 2; i >= 0; i -= 1) {
      expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);
      const day = sorted[i];
      const actualDate = toUtcDate(day.date);

      if (dayDiff(expectedDate, actualDate) !== 0 || day.count <= 0) {
        break;
      }

      currentStreak += 1;
    }
  }

  return { currentStreak, longestStreak };
}

function parseGithubContributions(html) {
  const tooltipCountById = new Map();
  const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;

  for (const match of html.matchAll(tooltipRegex)) {
    const id = match[1];
    const tooltipText = match[2]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    tooltipCountById.set(id, parseContributionCount(tooltipText));
  }

  const days = [];
  const dayCellRegex = /<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;

  for (const tagMatch of html.matchAll(dayCellRegex)) {
    const tag = tagMatch[0];
    const dateMatch = tag.match(/data-date="([^"]+)"/);
    const levelMatch = tag.match(/data-level="([0-4])"/);
    const idMatch = tag.match(/id="([^"]+)"/);

    if (!dateMatch || !levelMatch) {
      continue;
    }

    const id = idMatch ? idMatch[1] : "";
    const count = tooltipCountById.get(id) ?? Number.parseInt(levelMatch[1], 10);

    days.push({
      date: dateMatch[1],
      level: Number.parseInt(levelMatch[1], 10),
      count,
    });
  }

  const normalized = days
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((day) => ({
      date: day.date,
      count: day.count,
      level: day.level,
    }));

  const totalContributions = normalized.reduce((sum, day) => sum + day.count, 0);
  const { currentStreak, longestStreak } = calculateStreaks(normalized);

  return {
    totalContributions,
    currentStreak,
    longestStreak,
    days: normalized,
  };
}

export default async function handler(req, res) {
  const requested = normalizeUsername(req.query?.username);
  const username = requested || process.env.GITHUB_USERNAME || "";

  if (!username || !isValidGithubUsername(username)) {
    return res.status(400).json({
      error: "Invalid GitHub username",
      message: "Provide a valid username in query param ?username=...",
    });
  }

  const key = username.toLowerCase();
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return res.status(200).json({
      ...cached.data,
      cached: true,
      fetchedAt: cached.fetchedAt,
    });
  }

  try {
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "portfolio-coding-panel",
        Accept: "text/html",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub contributions fetch failed: ${response.status}`);
    }

    const html = await response.text();
    const parsed = parseGithubContributions(html);

    const payload = {
      username,
      ...parsed,
    };

    cache.set(key, {
      data: payload,
      timestamp: Date.now(),
      fetchedAt: new Date().toISOString(),
    });

    return res.status(200).json({
      ...payload,
      cached: false,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);

    if (cached) {
      return res.status(200).json({
        ...cached.data,
        cached: true,
        fetchedAt: cached.fetchedAt,
        warning: "GitHub fetch failed, showing cached data",
      });
    }

    return res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
