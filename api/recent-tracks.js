import { getValidAccessToken } from "./token-manager.js";
import {
  isRateLimited,
  getRateLimitInfo,
  handleRateLimitResponse,
} from "./rate-limit-manager.js";

let cachedTracks = null;
let lastFetched = 0;

// Fetch preview URL from Spotify embed page (workaround for deprecated preview_url)
async function fetchPreviewUrlFromEmbed(trackId) {
  if (!trackId) return null;

  try {
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
    const response = await fetch(embedUrl);
    if (!response.ok) return null;
    const html = await response.text();

    const regex = /"audioPreview":\s*{\s*"url":\s*"([^"]+)"/;
    const match = html.match(regex);
    if (match && match[1]) return match[1];

    const altRegex = /"audioPreview":\s*"([^"]+)"/;
    const altMatch = html.match(altRegex);
    return altMatch && altMatch[1] ? altMatch[1] : null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const CACHE_TTL = 1000 * 60 * 5;

  if (cachedTracks && Date.now() - lastFetched < CACHE_TTL) {
    return res.status(200).json({ ...cachedTracks, cached: true });
  }

  if (isRateLimited()) {
    const rateLimitInfo = getRateLimitInfo();
    if (cachedTracks) {
      return res.status(200).json({
        ...cachedTracks,
        cached: true,
        warning: `Rate limited. Retry after ${rateLimitInfo.remainingSeconds} seconds.`,
      });
    }

    return res.status(429).json({
      error: "Rate limited",
      message: `Please wait ${rateLimitInfo.remainingSeconds} seconds before retrying`,
      retryAfter: rateLimitInfo.remainingSeconds,
    });
  }

  try {
    const accessToken = await getValidAccessToken();
    const [recentResponse, topArtistResponse] = await Promise.all([
      fetch("https://api.spotify.com/v1/me/player/recently-played?limit=3", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      fetch("https://api.spotify.com/v1/me/top/artists?limit=1&time_range=medium_term", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    const recentRateLimitResult = handleRateLimitResponse(recentResponse);
    if (recentRateLimitResult.isRateLimited) {
      if (cachedTracks) {
        return res.status(200).json({
          ...cachedTracks,
          cached: true,
          warning: recentRateLimitResult.message,
        });
      }

      return res.status(429).json({
        error: "Spotify rate limit exceeded",
        message: recentRateLimitResult.message,
        retryAfter: recentRateLimitResult.retryAfterSeconds,
      });
    }

    if (!recentResponse.ok) {
      throw new Error(`Spotify API error (${recentResponse.status})`);
    }

    const payload = await recentResponse.json();
    const topArtistPayload = topArtistResponse.ok ? await topArtistResponse.json() : null;
    const tracks = await Promise.all(
      (payload.items || []).map(async (entry) => {
        const track = entry.track;
        if (!track) return null;

        let previewUrl = track.preview_url || null;
        if (!previewUrl && track.id) {
          previewUrl = await fetchPreviewUrlFromEmbed(track.id);
        }

        return {
          id: track.id,
          name: track.name,
          artists: track.artists?.map((artist) => artist.name) || [],
          album: track.album?.name || "",
          album_image: track.album?.images?.[0]?.url || "",
          spotify_url: track.external_urls?.spotify || "",
          preview_url: previewUrl,
          played_at: entry.played_at || null,
        };
      }),
    );

    const compactTracks = tracks.filter(Boolean);
    const favoriteArtist = topArtistPayload?.items?.[0]
      ? {
          name: topArtistPayload.items[0].name,
          image: topArtistPayload.items[0].images?.[0]?.url || "",
          url: topArtistPayload.items[0].external_urls?.spotify || "",
        }
      : null;

    cachedTracks = {
      tracks: compactTracks,
      favorite_artist: favoriteArtist,
    };
    lastFetched = Date.now();

    return res.status(200).json({ ...cachedTracks, cached: false });
  } catch (error) {
    if (cachedTracks) {
      return res.status(200).json({
        ...cachedTracks,
        cached: true,
        warning: "Spotify API error, showing cached data",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
