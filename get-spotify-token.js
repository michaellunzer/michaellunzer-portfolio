const SpotifyWebApi = require('spotify-web-api-node');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎵 Spotify Token Helper\n');

// Get user input
rl.question('Enter your Spotify Client ID: ', (clientId) => {
  rl.question('Enter your Spotify Client Secret: ', (clientSecret) => {
    rl.close();
    
    const spotifyApi = new SpotifyWebApi({
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: 'http://localhost:3000/api/callback'
    });

    const scopes = [
      'user-read-currently-playing',
      'user-read-recently-played', 
      'user-top-read',
      'playlist-read-private',
      'user-read-private'
    ];

    const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    
    console.log('\n📋 Follow these steps:\n');
    console.log('1. Copy and paste this URL into your browser:');
    console.log(`   ${authorizeURL}\n`);
    console.log('2. Log in to Spotify and authorize the app');
    console.log('3. You\'ll be redirected to a URL that looks like:');
    console.log('   http://localhost:3000/api/callback?code=YOUR_AUTH_CODE\n');
    console.log('4. Copy the "code" parameter from that URL');
    console.log('5. Run this script again with the auth code to get your refresh token\n');
    console.log('💡 Tip: If you already have an auth code, run:');
    console.log('   node get-spotify-token.js <auth_code>');
  });
});

// Check if auth code was provided as command line argument
if (process.argv[2]) {
  const authCode = process.argv[2];
  
  // You'll need to set these manually or use environment variables
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    console.log('❌ Error: Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables');
    console.log('   Or run the script without arguments to get the authorization URL');
    process.exit(1);
  }
  
  const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: 'http://localhost:3000/api/callback'
  });

  // Exchange auth code for tokens
  spotifyApi.authorizationCodeGrant(authCode)
    .then(data => {
      console.log('✅ Success! Here are your tokens:\n');
      console.log('Access Token:', data.body.access_token);
      console.log('Refresh Token:', data.body.refresh_token);
      console.log('\n📝 Add this to your .env.local file:');
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.body.refresh_token}`);
      console.log('\n⚠️  Keep your refresh token secure and never commit it to version control!');
    })
    .catch(error => {
      console.error('❌ Error getting tokens:', error.message);
    });
} 