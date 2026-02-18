function getRequestOrigin(req) {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const forwardedHost = req.headers["x-forwarded-host"];
  const host = forwardedHost || req.headers.host;
  const proto = forwardedProto || (host && host.includes("localhost") ? "http" : "https");

  if (!host) return null;
  return `${proto}://${host}`;
}

export function getSpotifyRedirectUri(req) {
  if (process.env.SPOTIFY_REDIRECT_URI) {
    return process.env.SPOTIFY_REDIRECT_URI;
  }

  const origin = getRequestOrigin(req);
  if (!origin) return null;

  return `${origin}/api/callback`;
}

export function getMissingSpotifyAuthVars() {
  const requiredVars = ["SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET"];
  return requiredVars.filter((name) => !process.env[name]);
}
