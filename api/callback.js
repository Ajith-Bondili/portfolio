import { getMissingSpotifyAuthVars, getSpotifyRedirectUri } from "./_lib/spotify-auth.js";

export default async function handler(req, res) {
  const code = req.query.code || null;
  if (!code) return res.status(400).send("Missing code");

  const missingVars = getMissingSpotifyAuthVars();
  const redirectUri = getSpotifyRedirectUri(req);
  if (missingVars.length > 0 || !redirectUri) {
    return res.status(500).json({
      error: "Spotify auth is not configured",
      missing: [...missingVars, ...(!redirectUri ? ["SPOTIFY_REDIRECT_URI"] : [])],
      message:
        "Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REDIRECT_URI in your deployment environment.",
    });
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    return res.status(tokenRes.status).send(`
      <html>
        <body style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
          <h2>Spotify token exchange failed</h2>
          <pre style="background:#f6f8fa;padding:8px;border-radius:6px;">${JSON.stringify(tokenData, null, 2)}</pre>
          <p>Double-check your Spotify app Redirect URI and deployment env vars.</p>
        </body>
      </html>
    `);
  }

  const refreshToken = tokenData.refresh_token;

  // tokenData contains: access_token, refresh_token, expires_in, token_type
  // For a personal portfolio, copy the refresh_token now and store it in deployment env vars.
  // Return a tiny HTML page instructing the user to copy the refresh token.
  return res.status(200).send(`
      <html>
        <body style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
          <h2>Spotify tokens received</h2>
          ${refreshToken ? `
            <p><strong>Copy this <code>refresh_token</code> into your deployment env var <code>SPOTIFY_REFRESH_TOKEN</code>.</strong></p>
            <pre style="background:#f6f8fa;padding:8px;border-radius:6px;white-space:pre-wrap;word-break:break-all;">${refreshToken}</pre>
          ` : `
            <p><strong>No new <code>refresh_token</code> was returned.</strong> Try the login flow again and approve consent.</p>
          `}
          <p>Then redeploy and test <code>/api/recent-tracks</code>.</p>
        </body>
      </html>
    `);
}
