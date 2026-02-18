import { getMissingSpotifyAuthVars, getSpotifyRedirectUri } from "./spotify-auth.js";

export default function handler(req, res) {
  const missingVars = getMissingSpotifyAuthVars();
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = getSpotifyRedirectUri(req);

  if (missingVars.length > 0 || !redirectUri) {
    return res.status(500).json({
      error: "Spotify auth is not configured",
      missing: [...missingVars, ...(!redirectUri ? ["SPOTIFY_REDIRECT_URI"] : [])],
      message:
        "Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REDIRECT_URI in your deployment environment.",
    });
  }

  const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-playback-position",
    "user-read-recently-played",
    "user-top-read",
    "user-library-read",
  ].join(" ");
  const state = Math.random().toString(36).slice(2);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
    state,
    show_dialog: "true",
  });

  // Redirect the user to Spotify's authorization page
  res.writeHead(302, {
    Location: `https://accounts.spotify.com/authorize?${params.toString()}`,
  });
  res.end();
}
