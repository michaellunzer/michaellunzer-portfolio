const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?limit=20&time_range=short_term`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=short_term`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=20`;
const USER_PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/me/playlists?limit=50`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopArtists = async () => {
  const { access_token } = await getAccessToken();

  return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUserPlaylists = async () => {
  const { access_token } = await getAccessToken();

  return fetch(USER_PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getMonthlyPlaylists = async () => {
  try {
    const { access_token } = await getAccessToken();
    
    // Fetch all playlists (we'll need to paginate to get more than 50)
    let allPlaylists = [];
    let offset = 0;
    const limit = 50;
    
    while (true) {
      const response = await fetch(`${USER_PLAYLISTS_ENDPOINT}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch playlists: ${response.status}`);
      }
      
      const data = await response.json();
      allPlaylists = [...allPlaylists, ...data.items];
      
      // If we got fewer items than the limit, we've reached the end
      if (data.items.length < limit) {
        break;
      }
      
      offset += limit;
      
      // Safety check to prevent infinite loops
      if (offset > 1000) {
        break;
      }
    }
    
    // Filter for monthly playlists (e.g., "January 2024", "Feb 2023", etc.)
    const monthlyPlaylists = allPlaylists.filter(playlist => {
      const name = playlist.name.toLowerCase();
      const months = [
        'january', 'jan', 'february', 'feb', 'march', 'mar', 'april', 'apr',
        'may', 'june', 'july', 'august', 'aug', 'september', 'sept', 'sep',
        'october', 'oct', 'november', 'nov', 'december', 'dec'
      ];
      
      // Check if playlist name contains a month and a year
      const hasMonth = months.some(month => name.includes(month));
      const hasYear = /\b(19|20)\d{2}\b/.test(name);
      
      return hasMonth && hasYear;
    });
    
    // Sort by year and month (newest first)
    monthlyPlaylists.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      // Extract year
      const aYear = aName.match(/\b(19|20)\d{2}\b/)?.[0] || '0';
      const bYear = bName.match(/\b(19|20)\d{2}\b/)?.[0] || '0';
      
      if (aYear !== bYear) {
        return parseInt(bYear) - parseInt(aYear);
      }
      
      // Extract month
      const monthOrder = {
        'january': 1, 'jan': 1, 'february': 2, 'feb': 2, 'march': 3, 'mar': 3,
        'april': 4, 'apr': 4, 'may': 5, 'june': 6, 'july': 7, 'august': 8,
        'aug': 8, 'september': 9, 'sept': 9, 'sep': 9, 'october': 10, 'oct': 10,
        'november': 11, 'nov': 11, 'december': 12, 'dec': 12
      };
      
      const aMonth = Object.keys(monthOrder).find(month => aName.includes(month));
      const bMonth = Object.keys(monthOrder).find(month => bName.includes(month));
      
      const aMonthNum = aMonth ? monthOrder[aMonth] : 0;
      const bMonthNum = bMonth ? monthOrder[bMonth] : 0;
      
      return bMonthNum - aMonthNum;
    });
    
    return monthlyPlaylists;
  } catch (error) {
    console.error('Error fetching monthly playlists:', error);
    return [];
  }
}; 