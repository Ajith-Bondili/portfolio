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

function toLocalDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function timestampToLocalDateKey(timestamp) {
  const date = new Date(timestamp * 1000);
  return toLocalDateKey(date);
}

function localDateKeyToDate(dateKey) {
  const [yearRaw, monthRaw, dayRaw] = dateKey.split("-");
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function normalizeSubmissionCalendar(rawCalendar) {
  if (!rawCalendar || typeof rawCalendar !== "object") {
    return {};
  }

  const normalized = {};

  for (const [timestamp, rawCount] of Object.entries(rawCalendar)) {
    const parsedTimestamp = Number(timestamp);
    const parsedCount = Number(rawCount);

    if (!Number.isFinite(parsedTimestamp) || !Number.isFinite(parsedCount)) {
      continue;
    }

    normalized[String(Math.trunc(parsedTimestamp))] = Math.max(0, Math.trunc(parsedCount));
  }

  return normalized;
}

function calculateSubmissionInsights(submissionCalendar) {
  const dayMap = new Map();

  for (const [timestamp, count] of Object.entries(submissionCalendar)) {
    const key = timestampToLocalDateKey(Number(timestamp));
    dayMap.set(key, (dayMap.get(key) || 0) + Number(count));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function rangeTotals(days) {
    let total = 0;
    let activeDays = 0;

    for (let i = 0; i < days; i += 1) {
      const current = new Date(today);
      current.setDate(today.getDate() - i);
      const count = dayMap.get(toLocalDateKey(current)) || 0;
      total += count;
      if (count > 0) activeDays += 1;
    }

    return { total, activeDays };
  }

  let currentSubmissionStreak = 0;
  const streakCursor = new Date(today);
  for (let i = 0; i < 3660; i += 1) {
    const count = dayMap.get(toLocalDateKey(streakCursor)) || 0;
    if (count <= 0) break;
    currentSubmissionStreak += 1;
    streakCursor.setDate(streakCursor.getDate() - 1);
  }

  const activeDayKeys = [...dayMap.entries()]
    .filter(([, count]) => count > 0)
    .map(([key]) => key)
    .sort((a, b) => a.localeCompare(b));

  let bestSubmissionStreak = 0;
  let running = 0;
  let previousDate = null;

  for (const key of activeDayKeys) {
    const currentDate = localDateKeyToDate(key);
    if (!currentDate) continue;

    if (previousDate) {
      const diff = Math.round((currentDate.getTime() - previousDate.getTime()) / 86400000);
      running = diff === 1 ? running + 1 : 1;
    } else {
      running = 1;
    }

    previousDate = currentDate;
    if (running > bestSubmissionStreak) bestSubmissionStreak = running;
  }

  const last7 = rangeTotals(7);
  const last14 = rangeTotals(14);

  return {
    last7Submissions: last7.total,
    last14Submissions: last14.total,
    activeDays14: last14.activeDays,
    currentSubmissionStreak,
    bestSubmissionStreak,
  };
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
    const submissionCalendar = normalizeSubmissionCalendar(data.submissionCalendar);
    const insights = calculateSubmissionInsights(submissionCalendar);

    const stats = {
      easySolved: Number(data.easySolved) || 0,
      hardSolved: Number(data.hardSolved) || 0,
      mediumSolved: Number(data.mediumSolved) || 0,
      totalSolved: Number(data.totalSolved) || 0,
      acceptanceRate: Number(data.acceptanceRate) || 0,
      ranking: Number(data.ranking) || 0,
      contributionPoints: Number(data.contributionPoints) || 0,
      totalQuestions: Number(data.totalQuestions) || 0,
      totalEasy: Number(data.totalEasy) || 0,
      totalMedium: Number(data.totalMedium) || 0,
      totalHard: Number(data.totalHard) || 0,
      submissionCalendar,
      ...insights,
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
