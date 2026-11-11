const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const MAX_USERNAMES = 5;

const cache = new Map();

// Accepts "a,b", ["a", "b"], or ["a,b"]. Trims, drops empties, de-dupes case-insensitively.
function parseUsernames(value) {
  const items = Array.isArray(value) ? value : [value];
  const seen = new Set();
  const usernames = [];

  for (const item of items) {
    if (typeof item !== "string") continue;
    for (const piece of item.split(",")) {
      const trimmed = piece.trim();
      const key = trimmed.toLowerCase();
      if (!trimmed || seen.has(key)) continue;
      seen.add(key);
      usernames.push(trimmed);
    }
  }

  return usernames;
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

async function fetchAccountStats(username) {
  const response = await fetch(`https://leetcode-stats.tashif.codes/${encodeURIComponent(username)}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch LeetCode stats for ${username}: ${response.statusText}`);
  }

  const data = await response.json();

  // The proxy answers 200 even for unknown users and signals failure in the body.
  if (data?.status && data.status !== "success") {
    throw new Error(`LeetCode stats unavailable for ${username}: ${data.message || "unknown error"}`);
  }

  return {
    easySolved: Number(data.easySolved) || 0,
    mediumSolved: Number(data.mediumSolved) || 0,
    hardSolved: Number(data.hardSolved) || 0,
    totalSolved: Number(data.totalSolved) || 0,
    acceptanceRate: Number(data.acceptanceRate) || 0,
    ranking: Number(data.ranking) || 0,
    contributionPoints: Number(data.contributionPoints) || 0,
    totalQuestions: Number(data.totalQuestions) || 0,
    totalEasy: Number(data.totalEasy) || 0,
    totalMedium: Number(data.totalMedium) || 0,
    totalHard: Number(data.totalHard) || 0,
    submissionCalendar: normalizeSubmissionCalendar(data.submissionCalendar),
  };
}

// Combines several accounts into one view. Solved counts and calendars are summed
// (a problem solved on two accounts counts twice; the proxy exposes no per-problem
// data to de-duplicate), question totals take the max, ranking takes the best.
function mergeAccountStats(accounts) {
  const merged = {
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalSolved: 0,
    acceptanceRate: 0,
    ranking: 0,
    contributionPoints: 0,
    totalQuestions: 0,
    totalEasy: 0,
    totalMedium: 0,
    totalHard: 0,
    submissionCalendar: {},
  };
  let weightedRate = 0;
  let rateWeight = 0;

  for (const account of accounts) {
    merged.easySolved += account.easySolved;
    merged.mediumSolved += account.mediumSolved;
    merged.hardSolved += account.hardSolved;
    merged.totalSolved += account.totalSolved;
    merged.contributionPoints += account.contributionPoints;
    merged.totalQuestions = Math.max(merged.totalQuestions, account.totalQuestions);
    merged.totalEasy = Math.max(merged.totalEasy, account.totalEasy);
    merged.totalMedium = Math.max(merged.totalMedium, account.totalMedium);
    merged.totalHard = Math.max(merged.totalHard, account.totalHard);

    if (account.ranking > 0 && (merged.ranking === 0 || account.ranking < merged.ranking)) {
      merged.ranking = account.ranking;
    }

    // Approximation: weight by solved count, since the proxy doesn't expose raw submission totals.
    if (account.acceptanceRate > 0 && account.totalSolved > 0) {
      weightedRate += account.acceptanceRate * account.totalSolved;
      rateWeight += account.totalSolved;
    }

    for (const [timestamp, count] of Object.entries(account.submissionCalendar)) {
      merged.submissionCalendar[timestamp] = (merged.submissionCalendar[timestamp] || 0) + count;
    }
  }

  merged.acceptanceRate = rateWeight > 0 ? Math.round((weightedRate / rateWeight) * 100) / 100 : 0;

  return merged;
}

export default async function handler(req, res) {
  const requested = parseUsernames(req.query?.username);
  const usernames = requested.length > 0 ? requested : parseUsernames(process.env.LEETCODE_USERNAME || "");

  if (
    usernames.length === 0 ||
    usernames.length > MAX_USERNAMES ||
    !usernames.every(isValidLeetCodeUsername)
  ) {
    return res.status(400).json({
      error: "Invalid LeetCode username",
      message: `Provide 1-${MAX_USERNAMES} valid usernames in query param ?username=a,b`,
    });
  }

  const key = usernames.map((name) => name.toLowerCase()).sort().join(",");
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return res.status(200).json({ ...cached.data, cached: true });
  }

  const results = await Promise.allSettled(usernames.map(fetchAccountStats));
  const accounts = [];
  const failed = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      accounts.push(result.value);
    } else {
      failed.push(usernames[index]);
      console.error("Error fetching LeetCode stats:", result.reason);
    }
  });

  if (accounts.length === 0) {
    if (cached) {
      return res.status(200).json({
        ...cached.data,
        cached: true,
        warning: "API error, showing cached data",
      });
    }

    const reason = results[0]?.reason;
    return res.status(500).json({
      error: "Internal Server Error",
      message: reason instanceof Error ? reason.message : "Unknown error",
    });
  }

  const merged = mergeAccountStats(accounts);
  const stats = { ...merged, ...calculateSubmissionInsights(merged.submissionCalendar) };

  if (failed.length > 0) {
    // Prefer complete stale data over fresh partial data, and never cache a partial result.
    if (cached) {
      return res.status(200).json({
        ...cached.data,
        cached: true,
        warning: `Could not fetch LeetCode stats for ${failed.join(", ")}; showing cached data`,
      });
    }

    return res.status(200).json({
      ...stats,
      cached: false,
      warning: `Could not fetch LeetCode stats for ${failed.join(", ")}; showing partial data`,
    });
  }

  cache.set(key, { data: stats, timestamp: Date.now() });

  return res.status(200).json({ ...stats, cached: false });
}
