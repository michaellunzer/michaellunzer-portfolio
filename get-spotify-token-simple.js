const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎵 Spotify Token Helper (Simple Version)\n');

// Step 1: Get credentials and generate authorization URL
rl.question('Enter your Spotify Client ID: ', (clientId) => {
  rl.question('Enter your Spotify Client Secret: ', (clientSecret) => {
    rl.close();
    
    const scopes = [
      'user-read-currently-playing',
      'user-read-recently-played', 
      'user-top-read',
      'playlist-read-private',
      'user-read-private'
    ].join(' ');
    
    const redirectUri = 'http://localhost:3000/api/callback';
    const state = Math.random().toString(36).substring(7);
    
    const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&state=${state}`;
    
    console.log('\n📋 Follow these steps:\n');
    console.log('1. Copy and paste this URL into your browser:');
    console.log(`   ${authorizeURL}\n`);
    console.log('2. Log in to Spotify and authorize the app');
    console.log('3. You\'ll be redirected to a URL that looks like:');
    console.log('   http://localhost:3000/api/callback?code=YOUR_AUTH_CODE&state=...\n');
    console.log('4. Copy the "code" parameter from that URL (the part after "code=" and before "&state")');
    console.log('5. Run this command to get your refresh token:');
    console.log(`   node get-spotify-token-simple.js ${clientId} ${clientSecret} YOUR_AUTH_CODE\n`);
    console.log('💡 Example:');
    console.log('   node get-spotify-token-simple.js abc123 def456 AQAA...\n');
  });
});

// Step 2: Exchange auth code for tokens
if (process.argv.length >= 5) {
  const clientId = process.argv[2];
  const clientSecret = process.argv[3];
  const authCode = process.argv[4];
  
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const postData = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: 'http://localhost:3000/api/callback'
  }).toString();
  
  const options = {
    hostname: 'accounts.spotify.com',
    port: 443,
    path: '/api/token',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.error) {
          console.error('❌ Error:', response.error_description || response.error);
        } else {
          console.log('✅ Success! Here are your tokens:\n');
          console.log('Access Token:', response.access_token);
          console.log('Refresh Token:', response.refresh_token);
          console.log('\n📝 Add these to your .env.local file:');
          console.log(`SPOTIFY_CLIENT_ID=${clientId}`);
          console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret}`);
          console.log(`SPOTIFY_REFRESH_TOKEN=${response.refresh_token}`);
          console.log('\n⚠️  Keep your tokens secure and never commit them to version control!');
        }
      } catch (error) {
        console.error('❌ Error parsing response:', error.message);
        console.log('Raw response:', data);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('❌ Request error:', error.message);
  });
  
  req.write(postData);
  req.end();
} 