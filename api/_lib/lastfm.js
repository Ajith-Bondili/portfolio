// Last.fm data source for /api/recent-tracks.
// Unlike Spotify, Last.fm needs no OAuth: a static API key plus a username is
// enough to read a public profile's scrobbles, so there is no token to expire.

const API_ROOT = "https://ws.audioscrobbler.com/2.0/";
const TRACK_LIMIT = 3;
const TOP_ARTIST_PERIOD = "1month";

// Last.fm no longer serves real artist photos; every artist gets this grey star.
const PLACEHOLDER_IMAGE_HASH = "2a96cbd8b46e442fc41c2b86b821562f";

export function getLastfmConfig() {
  const apiKey = process.env.LASTFM_API_KEY?.trim();
  const username = process.env.LASTFM_USERNAME?.trim();
  if (!apiKey || !username) return null;
  return { apiKey, username };
}

async function callLastfm(apiKey, params) {
  const url = new URL(API_ROOT);
  url.search = new URLSearchParams({ ...params, api_key: apiKey, format: "json" }).toString();

  const response = await fetch(url);
  const payload = await response.json().catch(() => null);

  // Last.fm reports failures in the body (e.g. 10 = bad key, 29 = rate limited).
  if (payload?.error) {
    throw new Error(`Last.fm error ${payload.error}: ${payload.message || "unknown"}`);
  }
  if (!response.ok || !payload) {
    throw new Error(`Last.fm API error (${response.status})`);
  }
  return payload;
}

// Last.fm's XML-to-JSON bridge yields a bare object for a single item and an array otherwise.
function asList(value) {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function absoluteUrl(value) {
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

// Image arrays run small -> extralarge, so the largest usable one is the last.
function largestImage(images) {
  const list = asList(images);
  for (let i = list.length - 1; i >= 0; i -= 1) {
    const url = list[i]?.["#text"];
    if (url && !url.includes(PLACEHOLDER_IMAGE_HASH)) return url;
  }
  return "";
}

function toTrack(entry) {
  const artist = entry.artist?.name || entry.artist?.["#text"] || "";
  const uts = Number(entry.date?.uts);
  const hasTimestamp = Number.isFinite(uts) && uts > 0;

  return {
    id: `${entry.mbid || `${artist}/${entry.name}`}@${hasTimestamp ? uts : "now"}`,
    name: entry.name || "",
    artists: artist ? [artist] : [],
    album: entry.album?.["#text"] || "",
    album_image: largestImage(entry.image),
    spotify_url: absoluteUrl(entry.url),
    preview_url: null,
    played_at: hasTimestamp ? new Date(uts * 1000).toISOString() : null,
  };
}

// Artist photos are placeholders (see above), so borrow the artist's top album cover instead.
async function fetchArtistImage(apiKey, artistName) {
  try {
    const payload = await callLastfm(apiKey, {
      method: "artist.gettopalbums",
      artist: artistName,
      autocorrect: "1",
      limit: "1",
    });
    return largestImage(asList(payload.topalbums?.album)[0]?.image);
  } catch (error) {
    console.warn("Last.fm artist image lookup failed", error);
    return "";
  }
}

export async function fetchLastfmMusic({ apiKey, username }) {
  const [recent, top] = await Promise.all([
    callLastfm(apiKey, {
      method: "user.getrecenttracks",
      user: username,
      limit: String(TRACK_LIMIT),
    }),
    callLastfm(apiKey, {
      method: "user.gettopartists",
      user: username,
      period: TOP_ARTIST_PERIOD,
      limit: "1",
    }),
  ]);

  // A now-playing track is returned on top of `limit`, so trim to the widget's three rows.
  const tracks = asList(recent.recenttracks?.track).slice(0, TRACK_LIMIT).map(toTrack);

  const topArtist = asList(top.topartists?.artist)[0];
  const favoriteArtist = topArtist?.name
    ? {
        name: topArtist.name,
        image: await fetchArtistImage(apiKey, topArtist.name),
        url: absoluteUrl(topArtist.url),
      }
    : null;

  return { tracks, favorite_artist: favoriteArtist };
}
