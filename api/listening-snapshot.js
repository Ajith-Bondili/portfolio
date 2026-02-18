import { getValidAccessToken } from "./token-manager.js";
import {
  getRateLimitInfo,
  handleRateLimitResponse,
  isRateLimited,
} from "./rate-limit-manager.js";

let cachedSnapshot = null;
let lastFetched = 0;

function simplifyTrack(track) {
  if (!track) return null;
  return {
    kind: "track",
    title: track.name,
    subtitle: track.artists?.map((artist) => artist.name).join(", ") || "",
    meta: track.album?.name || "",
    image: track.album?.images?.[0]?.url || "",
    url: track.external_urls?.spotify || "",
    preview_url: track.preview_url || null,
  };
}

function simplifyEpisode(episode) {
  if (!episode) return null;
  return {
    kind: "episode",
    title: episode.name,
    subtitle: episode.show?.name || "",
    meta: episode.release_date || "",
    image: episode.images?.[0]?.url || "",
    url: episode.external_urls?.spotify || "",
    preview_url: episode.audio_preview_url || null,
  };
}

function simplifyShow(show) {
  if (!show) return null;
  return {
    kind: "show",
    title: show.name,
    subtitle: show.publisher || "",
    meta: `${show.total_episodes || 0} episodes`,
    image: show.images?.[0]?.url || "",
    url: show.external_urls?.spotify || "",
    preview_url: null,
  };
}

function simplifyArtist(artist) {
  if (!artist) return null;
  return {
    kind: "artist",
    title: artist.name,
    subtitle: "favorite artist",
    meta: `${artist.followers?.total?.toLocaleString() || "0"} followers`,
    image: artist.images?.[0]?.url || "",
    url: artist.external_urls?.spotify || "",
    preview_url: null,
  };
}

async function spotifyJson(url, accessToken) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const rateLimitResult = handleRateLimitResponse(response);
  if (rateLimitResult.isRateLimited) {
    throw new Error(rateLimitResult.message);
  }

  if (!response.ok) {
    throw new Error(`Spotify request failed (${response.status})`);
  }

  return response.json();
}

export default async function handler(req, res) {
  const CACHE_TTL = 1000 * 60 * 5;

  if (cachedSnapshot && Date.now() - lastFetched < CACHE_TTL) {
    return res.status(200).json({ ...cachedSnapshot, cached: true });
  }

  if (isRateLimited()) {
    const rateLimitInfo = getRateLimitInfo();
    if (cachedSnapshot) {
      return res.status(200).json({
        ...cachedSnapshot,
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

    const [playback, recentTracks, topArtists, followedShows, savedEpisodes] = await Promise.all([
      spotifyJson(
        "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode",
        accessToken,
      ).catch(() => null),
      spotifyJson("https://api.spotify.com/v1/me/player/recently-played?limit=1", accessToken).catch(
        () => null,
      ),
      spotifyJson("https://api.spotify.com/v1/me/top/artists?limit=1&time_range=medium_term", accessToken).catch(
        () => null,
      ),
      spotifyJson("https://api.spotify.com/v1/me/shows?limit=5", accessToken).catch(() => null),
      spotifyJson("https://api.spotify.com/v1/me/episodes?limit=1", accessToken).catch(() => null),
    ]);

    const currentlyPlayingItem = playback?.item || null;
    const isEpisodeNow = currentlyPlayingItem?.type === "episode";

    const musicLastListened = simplifyTrack(recentTracks?.items?.[0]?.track);
    const musicFavoriteArtist = simplifyArtist(topArtists?.items?.[0]);

    let musicLatest = null;
    if (topArtists?.items?.[0]?.id) {
      const artistAlbums = await spotifyJson(
        `https://api.spotify.com/v1/artists/${topArtists.items[0].id}/albums?include_groups=album,single&market=US&limit=10`,
        accessToken,
      ).catch(() => null);

      if (artistAlbums?.items?.length) {
        const [latestAlbum] = artistAlbums.items;
        const albumTracks = await spotifyJson(
          `https://api.spotify.com/v1/albums/${latestAlbum.id}/tracks?market=US&limit=1`,
          accessToken,
        ).catch(() => null);

        if (albumTracks?.items?.[0]) {
          musicLatest = {
            kind: "track",
            title: albumTracks.items[0].name,
            subtitle: topArtists.items[0].name,
            meta: `latest release · ${latestAlbum.name}`,
            image: latestAlbum.images?.[0]?.url || "",
            url: albumTracks.items[0].external_urls?.spotify || latestAlbum.external_urls?.spotify || "",
            preview_url: null,
          };
        }
      }
    }

    const shows = followedShows?.items?.map((item) => item.show) || [];
    const podcastFavorite = simplifyShow(shows[0]);
    const savedEpisode = savedEpisodes?.items?.[0]?.episode || null;
    const podcastLastListened = isEpisodeNow
      ? simplifyEpisode(currentlyPlayingItem)
      : simplifyEpisode(savedEpisode);

    const latestEpisodes = await Promise.all(
      shows.slice(0, 5).map(async (show) => {
        const showEpisodes = await spotifyJson(
          `https://api.spotify.com/v1/shows/${show.id}/episodes?market=US&limit=3`,
          accessToken,
        ).catch(() => null);
        return showEpisodes?.items?.[0] || null;
      }),
    );

    const podcastLatest = latestEpisodes
      .filter(Boolean)
      .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())[0] || null;

    const snapshot = {
      music: {
        lastListened: musicLastListened,
        favorite: musicFavoriteArtist,
        latest: musicLatest,
      },
      podcasts: {
        lastListened: podcastLastListened,
        favorite: podcastFavorite,
        latest: simplifyEpisode(podcastLatest),
      },
    };

    cachedSnapshot = snapshot;
    lastFetched = Date.now();

    return res.status(200).json({ ...snapshot, cached: false });
  } catch (error) {
    if (cachedSnapshot) {
      return res.status(200).json({
        ...cachedSnapshot,
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
