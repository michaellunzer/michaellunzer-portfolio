# Spotify Integration Setup Guide

This guide will help you set up Spotify integration for your Next.js portfolio site.

## Prerequisites

1. A Spotify account
2. Spotify Developer account (free)

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - **App name**: Your portfolio name (e.g., "Michael Lunzer Portfolio")
   - **App description**: Brief description of your app
   - **Website**: Your portfolio URL
   - **Redirect URI**: `http://localhost:3000/api/callback` (for development)
5. Accept the terms and create the app

## Step 2: Get Your Credentials

After creating the app, you'll see:
- **Client ID**: Copy this
- **Client Secret**: Click "Show Client Secret" and copy it

## Step 3: Get Refresh Token

You need to get a refresh token to access your Spotify data. Here's how:

### Option A: Use the Spotify Web API Console

1. Go to [Spotify Web API Console](https://developer.spotify.com/console/)
2. Click "Get Token"
3. Select the following scopes:
   - `user-read-currently-playing`
   - `user-read-recently-played`
   - `user-top-read`
   - `playlist-read-private`
   - `user-read-private`
4. Click "Request Token"
5. Copy the access token (this is temporary)

### Option B: Use the Helper Script

I've created a helper script for you! Run it to get your refresh token:

```bash
node get-spotify-token-simple.js
```

The script will:
1. Ask for your Client ID and Client Secret
2. Generate an authorization URL
3. Guide you through the authorization process
4. Help you exchange the auth code for a refresh token

**Step-by-step:**
1. Run: `node get-spotify-token-simple.js`
2. Enter your Client ID and Client Secret when prompted
3. Copy the authorization URL and paste it in your browser
4. Log in to Spotify and authorize the app
5. Copy the auth code from the redirect URL
6. Run the script again with the auth code to get your refresh token

## Step 4: Set Environment Variables

Add these to your `.env.local` file:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

## Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/spotify`
3. You should see:
   - Currently playing track (if any)
   - Top 20 artists from the past 4 weeks
   - Monthly playlists

## Features

The Spotify integration includes:

### 🎵 Now Playing
- Shows currently playing track
- Auto-refreshes every 30 seconds
- Displays album art, track name, artist, and album

### 🎤 Top Artists
- Shows your top 20 artists from the past 4 weeks
- Displays artist images and links to Spotify profiles

### 📝 Monthly Playlists
- Filters your playlists to show monthly ones
- Looks for playlists with "monthly" or year names (2014-2024)
- Displays playlist covers and links

## API Endpoints

The integration creates these API routes:

- `/api/spotify/now-playing` - Current track
- `/api/spotify/top-artists` - Top artists
- `/api/spotify/playlists` - User playlists

## Troubleshooting

### Common Issues

1. **"Failed to fetch" errors**
   - Check your environment variables
   - Ensure your refresh token is valid
   - Verify your Spotify app has the correct scopes

2. **No data showing**
   - Make sure you have listening history on Spotify
   - Check that your playlists are public or you have access

3. **Authentication errors**
   - Regenerate your refresh token
   - Verify client ID and secret are correct

### Getting a New Refresh Token

If your refresh token expires:

1. Go to [Spotify Web API Console](https://developer.spotify.com/console/)
2. Request a new token with the required scopes
3. Update your `.env.local` file

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your client secret secure
- The refresh token provides access to your Spotify account, so keep it private

## Deployment

For production deployment:

1. Update the redirect URI in your Spotify app to your production domain
2. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
3. Ensure your domain is added to the allowed origins in your Spotify app

## References

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
- [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) 