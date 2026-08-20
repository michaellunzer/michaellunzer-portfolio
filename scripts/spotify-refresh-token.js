/**
 * One-shot helper to mint a new SPOTIFY_REFRESH_TOKEN.
 *
 * Spotify revokes refresh tokens on password changes, on removing the app at
 * spotify.com/account/apps, and on client-secret rotation. When that happens
 * lib/spotify.js starts sending "Bearer undefined" and every call 401s.
 *
 * Usage:  node scripts/spotify-refresh-token.js
 *
 * Requires http://127.0.0.1:8888/callback to be listed as a Redirect URI in
 * the app at developer.spotify.com/dashboard. Spotify only accepts the literal
 * loopback IP for http:// redirects -- "localhost" is rejected.
 */

require('dotenv').config({ path: '.env.local', quiet: true });

const http = require('http');
const crypto = require('crypto');
const fs = require('fs');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:8888/callback';
const PORT = Number(new URL(REDIRECT_URI).port || 8888);

// Matches every endpoint lib/spotify.js reaches for. playlist-read-private is
// what makes the monthly playlists show up -- without it you get a valid token
// that returns only public playlists.
const SCOPES = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-top-read',
].join(' ');

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET in .env.local');
  process.exit(1);
}

const state = crypto.randomBytes(16).toString('hex');

const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  response_type: 'code',
  client_id: CLIENT_ID,
  scope: SCOPES,
  redirect_uri: REDIRECT_URI,
  state,
  show_dialog: 'true',
})}`;

function updateEnvLocal(token) {
  const path = '.env.local';
  const body = fs.readFileSync(path, 'utf8');
  const line = `SPOTIFY_REFRESH_TOKEN=${token}`;
  const next = /^SPOTIFY_REFRESH_TOKEN=.*$/m.test(body)
    ? body.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, line)
    : `${body.replace(/\n?$/, '\n')}${line}\n`;
  fs.copyFileSync(path, `${path}.bak`);
  fs.writeFileSync(path, next);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== new URL(REDIRECT_URI).pathname) {
    res.writeHead(404).end();
    return;
  }

  const done = (msg) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<html><body style="font-family:system-ui;padding:3rem"><h2>${msg}</h2><p>You can close this tab and return to the terminal.</p></body></html>`);
  };

  if (url.searchParams.get('error')) {
    done('Authorization denied.');
    console.error('\nDenied:', url.searchParams.get('error'));
    server.close();
    process.exit(1);
  }

  if (url.searchParams.get('state') !== state) {
    done('State mismatch - aborted.');
    console.error('\nState mismatch; ignoring this callback.');
    server.close();
    process.exit(1);
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: url.searchParams.get('code'),
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok || !data.refresh_token) {
    done('Token exchange failed.');
    console.error(`\nToken exchange failed: HTTP ${tokenRes.status}`);
    console.error(`${data.error || '?'} | ${data.error_description || ''}`);
    server.close();
    process.exit(1);
  }

  updateEnvLocal(data.refresh_token);
  done('Refresh token saved.');

  console.log('\nSaved to .env.local (previous copy at .env.local.bak)');
  console.log(`Granted scopes: ${data.scope}`);
  console.log('\nFull token to paste into Vercel:\n');
  console.log(data.refresh_token);
  console.log('\nSet it for Production, Preview AND Development -- the /spotify page');
  console.log('prerenders at build time, so the Build step needs it too.\n');

  server.close();
  process.exit(0);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\nListening on ${REDIRECT_URI}`);
  console.log('\nOpen this URL in your browser and approve:\n');
  console.log(authUrl);
  console.log('');
});
